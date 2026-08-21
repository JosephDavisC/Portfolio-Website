import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? top / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[9999] h-[3px] w-full pointer-events-none">
      <div
        className="h-full origin-left"
        style={{ transform: `scaleX(${p})`, transition: "transform 80ms linear" }}
      >
        {/* Light mode: Court Green gradient, Dark mode: Neon gradient */}
        <div className="h-full w-full bg-gradient-to-r from-court via-court-dark to-espresso dark:from-sky-400 dark:via-[#60A5FA] dark:to-blue-600" />
      </div>
    </div>
  );
}
