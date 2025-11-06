import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import Lightbox from "@/components/sections/Lightbox";
import Rackets from "@/components/sections/Rackets";

const tennisImages = [
  { src: "/images/moments/Joseph_Chamdani_Tennis_4.jpg", alt: "Joseph Backhand — 4" },
  { src: "/images/moments/Joseph_Chamdani_Tennis.jpg", alt: "Joseph Forehand — 1" },
  { src: "/images/moments/Joseph_Chamdani_Tennis_2.jpg", alt: "Joseph Forehand — 2" },
  { src: "/images/moments/Joseph_Chamdani_Tennis_3.JPG", alt: "Joseph & Denzel — 3" }
];

export default function TennisCoffeeSection() {
  const [tab, setTab] = useState<"moments" | "rackets">("moments");

  // tennis carousel
  const [tennisIdx, setTennisIdx] = useState(0);
  const next = () => setTennisIdx((i) => (i + 1) % tennisImages.length);
  const prev = () => setTennisIdx((i) => (i - 1 + tennisImages.length) % tennisImages.length);

  // shared lightbox
  const [lbSrc, setLbSrc] = useState<string>("");
  const [lbAlt, setLbAlt] = useState<string>("");
  const openLb = (src: string, alt?: string) => {
    setLbSrc(src);
    setLbAlt(alt || "");
  };

  return (
    <section id="tennis-coffee" className="py-12 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            More Than Just Code
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
            Tennis keeps me grounded. Coffee keeps me sharp.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Tennis & Coffee sub-sections"
          className="mt-6 mx-auto w-full max-w-xl relative isolate rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-lg p-1 flex"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "moments"}
            aria-controls="panel-moments"
            className={`flex-1 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "moments" ? "text-white" : "text-slate-300 hover:text-white"
            }`}
            onClick={() => setTab("moments")}
          >
            Moments
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "rackets"}
            aria-controls="panel-rackets"
            className={`flex-1 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "rackets" ? "text-white" : "text-slate-300 hover:text-white"
            }`}
            onClick={() => setTab("rackets")}
          >
            Racket Setup
          </button>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-1/2 rounded-full bg-gradient-to-r from-sky-400 to-rose-400 transition-transform"
            style={{ transform: `translateX(${tab === "moments" ? "0%" : "100%"})` }}
          />
        </div>

        {/* Panels */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {tab === "moments" ? (
              <motion.div
                key="moments"
                id="panel-moments"
                role="tabpanel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* Tennis carousel with hover magnifier */}
                <motion.figure
                  whileHover={{ scale: 1.02, y: -8 }}
                  transition={{ type: "spring", stiffness: 230, damping: 20 }}
                  className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-green-400/50 shadow-lg bg-slate-800/40 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => openLb(tennisImages[tennisIdx].src, tennisImages[tennisIdx].alt)}
                    className="absolute top-3 right-3 z-10 rounded-full p-2 bg-black/55 text-white border border-white/20
                               opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="View full size"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>

                  <div className="relative h-[420px] w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={tennisIdx}
                        src={tennisImages[tennisIdx].src}
                        alt={tennisImages[tennisIdx].alt}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                        loading="lazy"
                      />
                    </AnimatePresence>
                    {/* Green overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-500/40 via-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Prev / Next */}
                    <button
                      type="button"
                      onClick={() => setTennisIdx((i) => (i - 1 + tennisImages.length) % tennisImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur px-3 py-1 text-white/90 hover:text-white border border-white/10"
                      aria-label="Previous photo"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => setTennisIdx((i) => (i + 1) % tennisImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur px-3 py-1 text-white/90 hover:text-white border border-white/10"
                      aria-label="Next photo"
                    >
                      ›
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {tennisImages.map((_, i) => (
                        <button
                          key={i}
                          aria-label={`Go to photo ${i + 1}`}
                          onClick={() => setTennisIdx(i)}
                          className={`h-2 w-2 rounded-full transition ${
                            i === tennisIdx ? "bg-white" : "bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <figcaption className="bg-white/5 text-slate-300 text-center py-4 text-sm">
                    Tennis: Where I reset, compete, and stay focused 🎾
                  </figcaption>
                </motion.figure>

                {/* Coffee card with hover magnifier */}
                <motion.figure
                  whileHover={{ scale: 1.02, y: -8 }}
                  transition={{ type: "spring", stiffness: 230, damping: 20 }}
                  className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 shadow-lg bg-slate-800/40 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => openLb("/images/moments/Coffee.JPG", "Coffee time")}
                    className="absolute top-3 right-3 z-10 rounded-full p-2 bg-black/55 text-white border border-white/20
                               opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="View full size"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <div className="relative h-[420px] w-full overflow-hidden">
                    <img
                      src="/images/moments/Coffee.JPG"
                      alt="Coffee time"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Amber/coffee overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/40 via-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Coffee chibi character */}
                    <motion.img
                      src="/images/chibis/coffee_chibi.PNG"
                      alt="Coffee chibi"
                      className="absolute bottom-4 left-4 w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl pointer-events-none"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                  </div>
                  <figcaption className="bg-white/5 text-slate-300 text-center py-4 text-sm">
                    A good brew fuels my thinking ☕
                  </figcaption>
                </motion.figure>
              </motion.div>
            ) : (
              <motion.div
                key="rackets"
                id="panel-rackets"
                role="tabpanel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid md:grid-cols-1"
              >
                <Rackets embed />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Lightbox src={lbSrc} alt={lbAlt} onClose={() => setLbSrc("")} />
    </section>
  );
}
