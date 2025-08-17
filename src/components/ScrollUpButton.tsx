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
                   text-white/90 border border-white/15 backdrop-blur-md
                   bg-[#0b1220]/50 shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                   transition hover:bg-white/10 focus:outline-none
                   focus-visible:ring-2 focus-visible:ring-pink-400/60"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-full
                     bg-gradient-to-r from-blue-400/50 via-sky-400/30 to-pink-400/50
                     opacity-40 blur-[6px] transition group-hover:opacity-70"
        />
        <span aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-white/5" />
        {/* Thicker/bolder arrow */}
        <ArrowUp className="relative h-5 w-5 drop-shadow-sm" strokeWidth={3.2} />
        <span className="sr-only">Scroll to top</span>
      </button>
    </div>
  );
}
