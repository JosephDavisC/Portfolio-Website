import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const NAVBAR_HEIGHT = 88; // Match Navbar.tsx HEADER_OFFSET

export default function ScrollFromState() {
  const location = useLocation();
  const scrollTargetRef = useRef<string | null>(null);

  useEffect(() => {
    const st = location.state as { scrollTo?: string } | null;

    // If navigating to home with a scrollTo target, scroll to that section
    if (location.pathname === "/" && st?.scrollTo) {
      scrollTargetRef.current = st.scrollTo;

      // Clean the state immediately to prevent re-triggering
      window.history.replaceState(null, "", "/");

      let lastPosition = -1;
      let stableCount = 0;

      // Wait for the element's position to stabilize (no more layout shifts)
      const waitForStableLayout = () => {
        const targetId = scrollTargetRef.current;
        if (!targetId) return;

        const el = document.getElementById(targetId);
        if (!el) {
          // Element not found yet, retry
          setTimeout(waitForStableLayout, 100);
          return;
        }

        const currentPosition = el.getBoundingClientRect().top + window.pageYOffset;

        if (Math.abs(currentPosition - lastPosition) < 5) {
          // Position is stable (hasn't changed significantly)
          stableCount++;
          if (stableCount >= 3) {
            // Position stable for 3 checks, safe to scroll
            const finalTop = currentPosition - NAVBAR_HEIGHT;
            window.scrollTo({ top: finalTop, behavior: "instant" });
            scrollTargetRef.current = null;
            return;
          }
        } else {
          // Position changed, reset stability counter
          stableCount = 0;
          lastPosition = currentPosition;
        }

        // Keep checking (max 5 seconds)
        if (stableCount < 50) {
          setTimeout(waitForStableLayout, 100);
        }
      };

      // Start checking after initial render delay
      setTimeout(waitForStableLayout, 500);
    } else {
      // For all other navigations, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);

  return null;
}
