import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently at/above the top of the viewport,
 * accounting for a sticky header (offsetTop).
 */
export function useScrollSpy(ids: string[], offsetTop = 96) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + offsetTop + 1;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) current = id;
      }
      setActiveId(current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ids, offsetTop]);

  return activeId;
}
