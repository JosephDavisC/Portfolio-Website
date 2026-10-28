import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

// React Router 7 renders every navigation inside startTransition. When the
// next page is a lazy chunk that is still downloading, React keeps the current
// page on screen and skips the Suspense fallback, so a click can look ignored.
// This bar covers that gap: it appears when the address bar has moved on but
// the new route has not rendered yet, and only after SHOW_DELAY so instant
// navigations never flash it.
const SHOW_DELAY = 150;
const MAX_VISIBLE = 15000; // safety net if a chunk never arrives

const pathOf = (l: { pathname: string; search: string }) => l.pathname + l.search;

export default function RouteProgress() {
  const location = useLocation();
  const rendered = useRef(pathOf(location));
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    rendered.current = pathOf(location);
    setVisible(false);
  }, [location]);

  useEffect(() => {
    let showTimer: number | undefined;
    let capTimer: number | undefined;
    const check = () => {
      window.clearTimeout(showTimer);
      showTimer = window.setTimeout(() => {
        if (pathOf(window.location) !== rendered.current) {
          setVisible(true);
          window.clearTimeout(capTimer);
          capTimer = window.setTimeout(() => setVisible(false), MAX_VISIBLE);
        }
      }, SHOW_DELAY);
    };
    window.addEventListener("click", check, true);
    window.addEventListener("popstate", check);
    return () => {
      window.removeEventListener("click", check, true);
      window.removeEventListener("popstate", check);
      window.clearTimeout(showTimer);
      window.clearTimeout(capTimer);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-route-progress=""
      data-active={visible}
      className="pointer-events-none fixed left-0 top-0 z-[10000] h-[3px] w-full origin-left bg-court dark:bg-[#60A5FA] motion-reduce:!transition-none"
      style={
        visible
          ? { opacity: 1, transform: "scaleX(0.9)", transition: "transform 8s cubic-bezier(0.1, 0.7, 0.2, 1), opacity 150ms" }
          : { opacity: 0, transform: "scaleX(0)", transition: "opacity 200ms" }
      }
    />
  );
}
