import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ZoomIn, ChevronLeft, ChevronRight, Coffee, Wrench } from "lucide-react";
import Lightbox from "@/components/sections/Lightbox";

// Tennis Ball SVG icon (no emoji) - detailed version
const TennisBallIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ball base with gradient for depth */}
    <defs>
      <radialGradient id="tennisBallGradient" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#E8FF3C" />
        <stop offset="100%" stopColor="#C5E000" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="10.5" fill="url(#tennisBallGradient)" stroke="#3D8C00" strokeWidth="1" />
    {/* Curved seam - left arc */}
    <path
      d="M6 4.5C4 7 3.5 10 4 12C4.5 14 5.5 17 8 20"
      stroke="#FFFFFF"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
      opacity="0.9"
    />
    {/* Curved seam - right arc */}
    <path
      d="M18 4.5C20 7 20.5 10 20 12C19.5 14 18.5 17 16 20"
      stroke="#FFFFFF"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
      opacity="0.9"
    />
    {/* Subtle highlight */}
    <circle cx="8" cy="8" r="2.5" fill="#FFFFFF" opacity="0.25" />
  </svg>
);

// Tennis Racket SVG icon (no emoji)
const TennisRacketIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="12" cy="8" rx="6" ry="7" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="12" y1="15" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="5" x2="16" y2="11" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="16" y1="5" x2="8" y2="11" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="12" y1="2" x2="12" y2="14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
);

const tennisImages = [
  { src: "/images/moments/Joseph_Chamdani_Diadem_Forehand.webp", alt: "Joseph Forehand — Diadem" },
  { src: "/images/moments/Joseph_Chamdani_Diadem_Slice.webp", alt: "Joseph Slice — Diadem" },
  { src: "/images/moments/Joseph_Chamdani_Diadem_Slice_Follow_Through.webp", alt: "Joseph Slice Follow-Through — Diadem" },
  { src: "/images/moments/Joseph_Chamdani_Tennis.jpg", alt: "Joseph Forehand — 1" },
  { src: "/images/moments/Joseph_Chamdani_Tennis_4.jpg", alt: "Joseph Backhand — 4" },
  { src: "/images/moments/Joseph_Chamdani_Tennis_2.jpg", alt: "Joseph Forehand — 2" },
  { src: "/images/moments/Joseph_Chamdani_Tennis_3.JPG", alt: "Joseph & Denzel — 3" }
];

const diademSpecs = [
  { label: "Use", value: "Match play" },
  { label: "Weight", value: "309g (+ 4g lead tape)" },
  { label: "Head Size", value: "98 sq in" },
  { label: "Mains", value: "Luxilon 4G 125 @ 47 lbs" },
  { label: "Crosses", value: "Wilson NXT 17 @ 45 lbs" },
  { label: "Grip Size", value: "4 (³⁄₈)" },
];

function StringBed() {
  const mainsX = Array.from({ length: 10 }, (_, i) => 18 + i * 9.4);
  const crossesY = Array.from({ length: 12 }, (_, i) => 14 + i * 10);
  return (
    <svg viewBox="0 0 120 170" width="90" height="127" aria-hidden="true">
      <defs>
        <clipPath id="racket-head-clip">
          <ellipse cx="60" cy="70" rx="50" ry="60" />
        </clipPath>
      </defs>
      <g clipPath="url(#racket-head-clip)" stroke="#4CBB17" strokeWidth="1.5" opacity="0.9">
        {mainsX.map((x) => <line key={x} x1={x} y1="5" x2={x} y2="135" />)}
      </g>
      <g clipPath="url(#racket-head-clip)" stroke="#60A5FA" strokeWidth="1.5" opacity="0.9">
        {crossesY.map((y) => <line key={y} x1="5" y1={y} x2="115" y2={y} />)}
      </g>
      <ellipse cx="60" cy="70" rx="50" ry="60" stroke="#3D2B1F" strokeWidth="5" fill="none" opacity="0.25" />
      <rect x="52" y="128" width="16" height="38" rx="6" fill="#3D2B1F" opacity="0.2" />
    </svg>
  );
}

export default function TennisCoffeeSection() {
  const [tennisIdx, setTennisIdx] = useState(0);
  const [lbSrc, setLbSrc] = useState<string>("");
  const [lbAlt, setLbAlt] = useState<string>("");

  const openLb = (src: string, alt?: string) => {
    setLbSrc(src);
    setLbAlt(alt || "");
  };

  const nextTennis = () => setTennisIdx((i) => (i + 1) % tennisImages.length);
  const prevTennis = () => setTennisIdx((i) => (i - 1 + tennisImages.length) % tennisImages.length);

  return (
    <section id="tennis-coffee" className="py-16 px-6 bg-paper-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-espresso">
            More Than Just{" "}
            <span className="relative inline-block">
              Code
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8C20 4 40 10 60 6C80 2 90 9 98 5"
                  className="stroke-court dark:stroke-[#60A5FA] transition-colors duration-300"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-espresso/60 text-lg md:text-xl max-w-3xl mx-auto font-mono">
            Tennis keeps me grounded. Coffee keeps me sharp.
          </p>
        </m.div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT - ON THE COURT (Court Green theme) */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <TennisBallIcon className="flex-shrink-0" />
              <h3 className="text-2xl font-heading font-bold text-court-dark dark:text-[#60A5FA]">On The Court</h3>
            </div>

            {/* Tennis Photo Carousel */}
            <m.figure
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card-brutal-court overflow-hidden group"
            >
              <button
                type="button"
                onClick={() => openLb(tennisImages[tennisIdx].src, tennisImages[tennisIdx].alt)}
                className="absolute top-3 right-3 z-10 rounded-full p-2 bg-paper/90 dark:bg-slate-800 text-espresso dark:text-slate-100 border-2 border-court dark:border-slate-500
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-brutal-sm"
                aria-label="View full size"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              <div className="relative h-[380px] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <m.img
                    key={tennisIdx}
                    src={tennisImages[tennisIdx].src}
                    alt={tennisImages[tennisIdx].alt}
                    className="absolute inset-0 h-full w-full object-cover object-[center_65%]"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                  type="button"
                  onClick={prevTennis}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/90 dark:bg-slate-800 p-2 text-espresso dark:text-slate-100 border-2 border-court dark:border-slate-500 shadow-brutal-sm hover:shadow-brutal transition-all"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextTennis}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/90 dark:bg-slate-800 p-2 text-espresso dark:text-slate-100 border-2 border-court dark:border-slate-500 shadow-brutal-sm hover:shadow-brutal transition-all"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {tennisImages.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to photo ${i + 1}`}
                      onClick={() => setTennisIdx(i)}
                      className={`h-3 w-3 rounded-full border-2 border-court dark:border-[#60A5FA] transition-all ${
                        i === tennisIdx ? "bg-court dark:bg-[#60A5FA]" : "bg-paper/80 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <figcaption className="bg-court/10 dark:bg-[#60A5FA]/10 text-espresso dark:text-slate-200 text-center py-3 text-sm font-mono border-t-2 border-court dark:border-[#60A5FA]">
                Where I reset, compete, and stay focused
              </figcaption>
            </m.figure>

            {/* Play Style Card */}
            <m.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="card-brutal-court p-5"
            >
              <h4 className="text-lg font-heading font-semibold text-court-dark dark:text-[#60A5FA] mb-3">Play Style</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-court/20 dark:bg-[#60A5FA]/20 border-2 border-court dark:border-[#60A5FA] text-court-dark dark:text-[#60A5FA] text-sm font-mono shadow-brutal-sm dark:shadow-none">
                  Right-handed
                </span>
                <span className="px-4 py-2 rounded-full bg-court/20 dark:bg-[#60A5FA]/20 border-2 border-court dark:border-[#60A5FA] text-court-dark dark:text-[#60A5FA] text-sm font-mono shadow-brutal-sm dark:shadow-none">
                  One-handed backhand
                </span>
              </div>
            </m.div>

          </m.div>

          {/* RIGHT - OFF THE COURT (Espresso theme) */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Coffee className="w-7 h-7 text-espresso flex-shrink-0" />
              <h3 className="text-2xl font-heading font-bold text-espresso">Off The Court</h3>
            </div>

            {/* Coffee Photo */}
            <m.figure
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card-brutal overflow-hidden group"
            >
              <button
                type="button"
                onClick={() => openLb("/images/moments/Coffee.JPG", "Coffee time")}
                className="absolute top-3 right-3 z-10 rounded-full p-2 bg-paper/90 dark:bg-slate-800 text-espresso dark:text-slate-100 border-2 border-espresso dark:border-slate-500
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-brutal-sm"
                aria-label="View full size"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              <div className="relative h-[380px] w-full overflow-hidden">
                <picture>
                  <source srcSet="/images/moments/Coffee.webp" type="image/webp" />
                  <img src="/images/moments/Coffee.JPG" alt="Coffee time" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </picture>

                <m.img
                  src="/images/chibis/coffee_chibi.webp"
                  alt="Coffee chibi"
                  className="absolute bottom-4 left-4 w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl pointer-events-none"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                />
              </div>

              <figcaption className="bg-espresso/10 text-espresso text-center py-3 text-sm font-mono border-t-2 border-espresso">
                A good brew fuels my thinking
              </figcaption>
            </m.figure>

            {/* Coffee Preferences Card */}
            <m.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="card-brutal p-5"
            >
              <h4 className="text-lg font-heading font-semibold text-espresso mb-3">Go-to Orders</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-espresso/10 border-2 border-espresso text-espresso text-sm font-mono shadow-brutal-sm">
                  Latte
                </span>
                <span className="px-4 py-2 rounded-full bg-espresso/10 border-2 border-espresso text-espresso text-sm font-mono shadow-brutal-sm">
                  Iced Americano
                </span>
              </div>
            </m.div>
          </m.div>
        </div>

        {/* RACKETS SECTION */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <TennisRacketIcon className="text-espresso dark:text-[#60A5FA] flex-shrink-0" />
            <h3 className="text-2xl font-heading font-bold text-espresso dark:text-slate-100">My Racket Setup</h3>
          </div>

          <div className="card-brutal p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left — racket image */}
              <m.div
                whileHover={{ rotate: 2, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex justify-center"
              >
                <div className="rounded-xl border-2 border-espresso/20 dark:border-slate-600 bg-paper dark:bg-slate-800 p-6 w-full max-w-sm">
                  <img loading="lazy" decoding="async"
                    src="/images/rackets/diadem_elevate.jpg"
                    alt="Diadem Elevate V3 98"
                    className="mx-auto w-auto"
                    style={{ height: "420px", objectFit: "contain" }}
                  />
                </div>
              </m.div>

              {/* Right — specs + string diagram + customisation */}
              <div className="space-y-6">
                <h4 className="text-3xl font-heading font-bold text-espresso dark:text-slate-100">
                  Diadem Elevate V3 98
                </h4>

                <ul className="space-y-3">
                  {diademSpecs.map(({ label, value }) => (
                    <li key={label} className="flex gap-3 font-mono text-base">
                      <span className="font-bold text-espresso dark:text-[#60A5FA] min-w-[100px]">{label}</span>
                      <span className="text-espresso/70 dark:text-slate-300">{value}</span>
                    </li>
                  ))}
                </ul>

                {/* String bed diagram */}
                <div>
                  <p className="text-xs font-mono font-semibold uppercase tracking-widest text-espresso/40 dark:text-slate-500 mb-3">String Bed</p>
                  <div className="flex items-center gap-6">
                    <StringBed />
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-block w-5 h-0.5 bg-court rounded-full" />
                          <span className="font-mono text-xs font-semibold text-espresso dark:text-slate-200">Mains · 47 lbs</span>
                        </div>
                        <p className="font-mono text-xs text-espresso/50 dark:text-slate-400 pl-7">Luxilon 4G 125</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-block w-5 h-0.5 bg-[#60A5FA] rounded-full" />
                          <span className="font-mono text-xs font-semibold text-espresso dark:text-slate-200">Crosses · 45 lbs</span>
                        </div>
                        <p className="font-mono text-xs text-espresso/50 dark:text-slate-400 pl-7">Wilson NXT 17</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customisation callout */}
                <div className="flex items-start gap-3 rounded-lg border-2 border-court dark:border-[#60A5FA] bg-court/10 dark:bg-[#60A5FA]/10 px-4 py-3">
                  <Wrench className="w-4 h-4 mt-0.5 flex-shrink-0 text-court-dark dark:text-[#60A5FA]" />
                  <div>
                    <p className="text-xs font-mono font-semibold uppercase tracking-widest text-court-dark dark:text-[#60A5FA] mb-1">Customised</p>
                    <p className="font-mono text-sm text-espresso/80 dark:text-slate-300">+1g at 3 o'clock (inner hoop) · +1g at 9 o'clock (inner hoop) · +2g at throat/yoke (inner face)</p>
                    <p className="font-mono text-sm text-espresso/80 dark:text-slate-300">Total added: 4g · Hybrid tension · 47 lbs mains / 45 lbs crosses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>

      <Lightbox src={lbSrc} alt={lbAlt} onClose={() => setLbSrc("")} />
    </section>
  );
}
