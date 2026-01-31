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
      let frameId: number;

      // Use requestAnimationFrame for faster, smoother checks
      const waitForStableLayout = () => {
        const targetId = scrollTargetRef.current;
        if (!targetId) return;

        const el = document.getElementById(targetId);
        if (!el) {
          // Element not found yet, retry on next frame
          frameId = requestAnimationFrame(waitForStableLayout);
          return;
        }

        const currentPosition = el.getBoundingClientRect().top + window.pageYOffset;

        if (Math.abs(currentPosition - lastPosition) < 5) {
          // Position is stable (hasn't changed significantly)
          stableCount++;
          if (stableCount >= 2) {
            // Position stable for 2 checks, safe to scroll
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

        // Keep checking using requestAnimationFrame (much faster than setTimeout)
        frameId = requestAnimationFrame(waitForStableLayout);
      };

      // Start checking on next frame (almost immediate)
      frameId = requestAnimationFrame(waitForStableLayout);

      // Cleanup on unmount
      return () => {
        if (frameId) cancelAnimationFrame(frameId);
      };
    } else {
      // For all other navigations, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);

  return null;
}
