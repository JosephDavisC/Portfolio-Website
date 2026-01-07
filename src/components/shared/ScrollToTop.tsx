import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET = 88; // keep in sync with your navbar height

export default function ScrollFromState() {
  const location = useLocation();

  useEffect(() => {
    const st = location.state as { scrollTo?: string } | null;

    // If navigating to home with a scrollTo target, scroll to that section
    if (location.pathname === "/" && st?.scrollTo) {
      const targetId = st.scrollTo;
      let tries = 0;

      const attemptScroll = () => {
        const el = document.getElementById(targetId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
          window.scrollTo({ top, behavior: "smooth" });
          // Clean the URL (no hash, no state)
          window.history.replaceState(null, "", "/");
        } else if (tries++ < 20) {
          // Retry while content mounts / images load
          setTimeout(attemptScroll, 60);
        }
      };

      attemptScroll();
    } else {
      // For all other navigations, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
}
