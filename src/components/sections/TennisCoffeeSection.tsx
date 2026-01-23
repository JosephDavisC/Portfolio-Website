import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Lightbox from "@/components/sections/Lightbox";
import RacketCard from "@/components/sections/RacketCard";

const tennisImages = [
  { src: "/images/moments/Joseph_Chamdani_Tennis.jpg", alt: "Joseph Forehand — 1" },
  { src: "/images/moments/Joseph_Chamdani_Tennis_4.jpg", alt: "Joseph Backhand — 4" },
  { src: "/images/moments/Joseph_Chamdani_Tennis_2.jpg", alt: "Joseph Forehand — 2" },
  { src: "/images/moments/Joseph_Chamdani_Tennis_3.JPG", alt: "Joseph & Denzel — 3" }
];

const rackets = [
  {
    title: "Babolat Pure Aero 2023",
    img: "/images/rackets/babolat-pure-aero.avif",
    glowColor: "yellow" as const,
    rotateDirection: "right" as const,
    specs: [
      "<strong>Use:</strong> Match play",
      "<strong>Weight:</strong> 300g",
      "<strong>Head Size:</strong> 100 sq in",
      "<strong>String:</strong> Ashaway Crossfire 18 Kevlar hybrid",
      "<strong>Mains:</strong> Kevlar 18 gauge @ 48 lbs",
      "<strong>Crosses:</strong> Synthetic gut 16 gauge @ 52 lbs",
      "<strong>Grip Size:</strong> 4 (³⁄₈)",
    ],
  },
  {
    title: "Babolat Pure Drive 2021",
    img: "/images/rackets/babolat_pure_drive.jpg",
    glowColor: "blue" as const,
    rotateDirection: "left" as const,
    specs: [
      "<strong>Use:</strong> Retired",
      "<strong>Weight:</strong> 300g",
      "<strong>Head Size:</strong> 100 sq in",
      "<strong>String:</strong> Wilson NXT 17",
      "<strong>Tension:</strong> 55 lbs (mains & crosses)",
      "<strong>Grip Size:</strong> 4 (³⁄₈)",
    ],
  },
  {
    title: "Diadem Elevate 98",
    img: "/images/rackets/diadem_elevate.jpg",
    glowColor: "blue" as const,
    rotateDirection: "right" as const,
    specs: [
      "<strong>Use:</strong> Retired",
      "<strong>Weight:</strong> 305g",
      "<strong>Head Size:</strong> 98 sq in",
      "<strong>String:</strong> Wilson NXT 17",
      "<strong>Tension:</strong> 55 lbs (mains & crosses)",
      "<strong>Grip Size:</strong> 4 (³⁄₈)",
    ],
  },
];

export default function TennisCoffeeSection() {
  const [tennisIdx, setTennisIdx] = useState(0);

  // shared lightbox
  const [lbSrc, setLbSrc] = useState<string>("");
  const [lbAlt, setLbAlt] = useState<string>("");
  const openLb = (src: string, alt?: string) => {
    setLbSrc(src);
    setLbAlt(alt || "");
  };

  const nextTennis = () => setTennisIdx((i) => (i + 1) % tennisImages.length);
  const prevTennis = () => setTennisIdx((i) => (i - 1 + tennisImages.length) % tennisImages.length);

  return (
    <section id="tennis-coffee" className="py-16 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            More Than Just Code
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
            Tennis keeps me grounded. Coffee keeps me sharp.
          </p>
        </div>

        {/* ATP-Style Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT SIDE - ON THE COURT */}
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-green-400">On The Court</h3>
            </div>

            {/* Tennis Photo Carousel */}
            <motion.figure
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 230, damping: 20 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-green-400/50 shadow-lg bg-slate-800/40 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300"
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

              <div className="relative h-[380px] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={tennisIdx}
                    src={tennisImages[tennisIdx].src}
                    alt={tennisImages[tennisIdx].alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    loading="lazy"
                  />
                </AnimatePresence>

                <button
                  type="button"
                  onClick={prevTennis}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur p-2 text-white/90 hover:text-white border border-white/10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextTennis}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur p-2 text-white/90 hover:text-white border border-white/10"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

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
              <figcaption className="bg-white/5 text-slate-300 text-center py-3 text-sm">
                Where I reset, compete, and stay focused
              </figcaption>
            </motion.figure>

            {/* Play Style Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-800/40 p-5">
              <h4 className="text-lg font-semibold text-green-400 mb-3">Play Style</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
                  Right-handed
                </span>
                <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
                  One-handed backhand
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - OFF THE COURT */}
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-amber-400">Off The Court</h3>
            </div>

            {/* Coffee Photo */}
            <motion.figure
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 230, damping: 20 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 shadow-lg bg-slate-800/40 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300"
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
              <div className="relative h-[380px] w-full overflow-hidden">
                <img
                  src="/images/moments/Coffee.JPG"
                  alt="Coffee time"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.img
                  src="/images/chibis/coffee_chibi.PNG"
                  alt="Coffee chibi"
                  className="absolute bottom-4 left-4 w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl pointer-events-none"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              </div>
              <figcaption className="bg-white/5 text-slate-300 text-center py-3 text-sm">
                A good brew fuels my thinking
              </figcaption>
            </motion.figure>

            {/* Coffee Preferences Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-800/40 p-5">
              <h4 className="text-lg font-semibold text-amber-400 mb-3">Go-to Orders</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm">
                  Latte
                </span>
                <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm">
                  Iced Americano
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RACKETS SECTION - FULL WIDTH */}
        <div className="mt-12">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-300">My Racket Setup</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rackets.map((racket) => (
              <RacketCard
                key={racket.title}
                title={racket.title}
                img={racket.img}
                colorClass="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
                glowColor={racket.glowColor}
                rotateDirection={racket.rotateDirection}
                specs={racket.specs}
              />
            ))}
          </div>
        </div>
      </div>

      <Lightbox src={lbSrc} alt={lbAlt} onClose={() => setLbSrc("")} />
    </section>
  );
}
