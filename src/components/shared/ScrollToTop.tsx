import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET = 88; // keep in sync with your navbar height

export default function ScrollFromState() {
  const location = useLocation();

  useEffect(() => {
    // Only act on the home route and when state is present
    const st = location.state as { scrollTo?: string } | null;
    if (location.pathname !== "/" || !st?.scrollTo) return;

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
  }, [location]);

  return null;
}
