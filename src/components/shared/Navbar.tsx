import { track } from "@/lib/track";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Briefcase } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const HEADER_OFFSET = 88;

type NavItem = { name: string; href: `#${string}`; short?: string };

const links: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Milestones", href: "#milestones" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Credentials", href: "#certifications" },
  { name: "Blog", href: "#blog" },
  { name: "Tennis & Coffee", href: "#tennis-coffee", short: "Tennis & Coffee" },
  { name: "Contact", href: "#contact" },
];

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

    ids.forEach(observeIfPresent);

    const imgs = Array.from(document.images);
    const onImgLoad = () => ids.forEach(observeIfPresent);
    imgs.forEach((img) => img.addEventListener("load", onImgLoad, { once: true }));

    const mo = new MutationObserver(() => {
      ids.forEach(observeIfPresent);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const onResize = () => ids.forEach(observeIfPresent);
    window.addEventListener("resize", onResize);

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
                className="px-2 py-1 font-medium text-espresso/70 dark:text-slate-300 hover:text-espresso dark:hover:text-white transition-colors"
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
              className={`relative px-2 py-1 font-medium transition-all ${
                isActive
                  ? "text-court-dark dark:text-[#60A5FA]"
                  : "text-espresso/70 dark:text-slate-300 hover:text-espresso dark:hover:text-white"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {link.short || link.name}
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-court dark:bg-[#60A5FA] rounded-full" />
              )}
            </a>
          </li>
        );
      }),
    [active, isHome]
  );

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-paper/90 dark:bg-[#141B2D]/95 backdrop-blur-md border-b-2 border-espresso/10 dark:border-slate-700/30 transition-colors duration-500">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              scrollToId("home");
              window.history.replaceState(null, "", "/");
            }
          }}
          className="flex items-center group"
        >
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-espresso shadow-brutal-sm transition-all duration-200 group-hover:shadow-brutal group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 bg-[#1e3a5f]">
            <picture>
              <source srcSet="/Logo_Joseph.webp" type="image/webp" />
              <img src="/Logo_Joseph.PNG" alt="Logo" className="h-full w-full object-cover" />
            </picture>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {desktopLinks}
        </ul>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Freelance CTA */}
          <a
            href="https://freelance.joechamdani.com"
            onClick={() => track("freelance-cta")}
            target="_blank"
            rel="noopener"
            className="btn-brutal hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm"
          >
            <Briefcase className="w-4 h-4" />
            Work with me
          </a>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen((s) => !s)}
            className="md:hidden p-2 border-2 border-espresso dark:border-slate-600 rounded-lg shadow-brutal-sm hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all bg-paper dark:bg-slate-800"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5 text-espresso dark:text-slate-200" /> : <Menu className="w-5 h-5 text-espresso dark:text-slate-200" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-paper dark:bg-[#141B2D] border-t-2 border-espresso/10 dark:border-slate-700/30 px-6 py-6 space-y-3">
          {links.map((link) =>
            isHome ? (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick(link.href)}
                  className={`block py-2 px-4 font-semibold text-lg rounded-lg transition-all ${
                    active === link.href.slice(1)
                      ? "bg-court/20 dark:bg-[#60A5FA]/20 text-court-dark dark:text-[#60A5FA] border-2 border-court dark:border-[#60A5FA] shadow-brutal-sm"
                      : "text-espresso dark:text-slate-200 hover:bg-espresso/5 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.short || link.name}
                </a>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  to={`/${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-4 font-semibold text-lg text-espresso dark:text-slate-200 hover:bg-espresso/5 dark:hover:bg-slate-800 rounded-lg transition"
                >
                  {link.short || link.name}
                </Link>
              </li>
            )
          )}
          <li className="pt-2">
            <a
              href="https://freelance.joechamdani.com"
              target="_blank"
              rel="noopener"
              onClick={() => {
                track("freelance-cta");
                setIsOpen(false);
              }}
              className="btn-brutal flex items-center justify-center gap-2 py-3 text-lg"
            >
              <Briefcase className="w-5 h-5" />
              Work with me
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
