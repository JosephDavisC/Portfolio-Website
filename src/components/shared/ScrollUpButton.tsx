// src/components/ScrollUpButton.tsx
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollUpButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  return (
    <div
      className={[
        "fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none",
      ].join(" ")}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full
                   bg-paper text-espresso border-2 border-espresso shadow-brutal-sm
                   transition-all duration-150 hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5
                   dark:bg-white/5 dark:text-slate-100 dark:border-white/15 dark:backdrop-blur-md dark:shadow-none
                   dark:hover:border-[#60A5FA]/50 dark:hover:shadow-[0_0_16px_rgba(96,165,250,0.3)] dark:hover:translate-x-0
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-court dark:focus-visible:ring-[#60A5FA]
                   motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0"
      >
        <ArrowUp className="relative h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none" strokeWidth={3} />
        <span className="sr-only">Scroll to top</span>
      </button>
    </div>
  );
}
