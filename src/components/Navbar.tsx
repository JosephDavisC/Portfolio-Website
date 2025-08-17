import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const HEADER_OFFSET = 88; // match your fixed header height

type NavItem = { name: string; href: `#${string}`; short?: string };

const links: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Certifications", href: "#certifications" },
  { name: "Milestones", href: "#milestones" },
  { name: "Talks", href: "#talks" },
  { name: "Tennis & Coffee", href: "#tennis-coffee", short: "Tennis & Coffee" },
  { name: "Contact", href: "#contact" },
];

/** Active-section tracker using IntersectionObserver + live re-scan */
function useActiveId(ids: string[], headerOffset = 88) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    if (!ids.length) return;

    const observed = new Set<string>();
    let observer: IntersectionObserver | null = null;

    const ensureObserver = () => {
      if (observer) return observer;
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          if (visible[0]?.target?.id) {
            setActiveId(visible[0].target.id);
          } else {
            // Fallback: last section whose top is above the header line
            const y = window.scrollY + headerOffset + 8;
            let current = ids[0];
            for (const id of ids) {
              const el = document.getElementById(id);
              if (!el) continue;
              const top = el.getBoundingClientRect().top + window.scrollY;
              if (y >= top) current = id;
              else break;
            }
            setActiveId(current);
          }
        },
        {
          root: null,
          rootMargin: `-${headerOffset + 1}px 0px -60% 0px`,
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );
      return observer;
    };

    const observeIfPresent = (id: string) => {
      if (observed.has(id)) return;
      const el = document.getElementById(id);
      if (el) {
        ensureObserver().observe(el);
        observed.add(id);
      }
    };

    // Initial pass for any IDs already in the DOM
    ids.forEach(observeIfPresent);

    // Re-observe after images load (layout shifts can detach internals)
    const imgs = Array.from(document.images);
    const onImgLoad = () => ids.forEach(observeIfPresent);
    imgs.forEach((img) => img.addEventListener("load", onImgLoad, { once: true }));

    // Watch the DOM for sections that appear later (lazy/Suspense, etc.)
    const mo = new MutationObserver(() => {
      ids.forEach(observeIfPresent);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Defensive: on resize, re-ensure everything is observed
    const onResize = () => ids.forEach(observeIfPresent);
    window.addEventListener("resize", onResize);

    // Kick once after paint to catch late mounts
    const raf = requestAnimationFrame(() => ids.forEach(observeIfPresent));

    return () => {
      if (observer) observer.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", onResize);
      imgs.forEach((img) => img.removeEventListener("load", onImgLoad));
      cancelAnimationFrame(raf);
    };
  }, [ids, headerOffset]);

  return activeId;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const ids = useMemo(() => links.map((l) => l.href.slice(1)), []);
  const active = isHome ? useActiveId(ids, HEADER_OFFSET) : "";

  // Keep URL clean on “/”: prevent hash, scroll, then restore "/"
  const handleNavClick =
    (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isHome) {
        e.preventDefault();
        const id = hash.replace("#", "");
        scrollToId(id);
        window.history.replaceState(null, "", "/");
        setIsOpen(false);
      }
    };

  const desktopLinks = useMemo(
    () =>
      links.map((link) => {
        const id = link.href.slice(1);
        const isActive = isHome && active === id;

        if (!isHome) {
          return (
            <li key={link.href} className="relative">
              <Link
                to={`/${link.href}`}
                className="px-1 py-1 transition-colors hover:text-blue-300"
              >
                {link.short || link.name}
              </Link>
            </li>
          );
        }

        return (
          <li key={link.href} className="relative">
            <a
              href={link.href}
              onClick={handleNavClick(link.href)}
              className={`relative px-1 py-1 transition-colors ${
                isActive ? "text-blue-300" : "hover:text-blue-300"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {link.short || link.name}
              {/* gradient underline */}
              <span
                className={`pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] rounded-full transition-opacity ${
                  isActive
                    ? "opacity-100 bg-gradient-to-r from-sky-400 to-rose-400"
                    : "opacity-0"
                }`}
              />
            </a>
          </li>
        );
      }),
    [active, isHome]
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/70 backdrop-blur-lg border-b border-white/10 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white">
        {/* Logo */}
        <a href="#home" onClick={handleNavClick("#home")} className="flex items-center">
          <img
            src="/Logo_Joseph.PNG"
            alt="Logo"
            className="h-11 w-11 rounded-full object-cover shadow-md hover:scale-105 transition-transform"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 font-semibold">
          {desktopLinks}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen((s) => !s)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <ul className="md:hidden bg-slate-900/90 backdrop-blur-lg px-6 py-6 space-y-4 text-center border-t border-white/10 animate-fade-in-down">
          {links.map((link) =>
            isHome ? (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick(link.href)}
                  className="block text-white font-semibold text-lg hover:text-blue-300 transition"
                >
                  {link.short || link.name}
                </a>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  to={`/${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-white font-semibold text-lg hover:text-blue-300 transition"
                >
                  {link.short || link.name}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </header>
  );
}
