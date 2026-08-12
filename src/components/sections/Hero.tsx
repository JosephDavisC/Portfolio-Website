import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { m, AnimatePresence } from "framer-motion";
import { Mail, GraduationCap } from "lucide-react";
import { CoffeeCupWithSteam } from "@/components/shared/CoffeeSteam";

// Custom Tennis Ball SVG (no emoji) - detailed version
const TennisBallIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ball base with gradient for depth */}
    <defs>
      <radialGradient id="heroBallGradient" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#E8FF3C" />
        <stop offset="100%" stopColor="#C5E000" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="10.5" fill="url(#heroBallGradient)" stroke="#3D8C00" strokeWidth="1" />
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

const HEADER_OFFSET = 88;
const CHIBI_ICON = "/logos/jo-sticker.PNG";

function scrollToIdNoHash(id: string, tries = 0) {
  const el = document.getElementById(id);
  if (!el) {
    if (tries < 20) requestAnimationFrame(() => scrollToIdNoHash(id, tries + 1));
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.replaceState(null, "", "/");
}

// Hand-drawn scribble underline SVG - Dynamic color based on theme
const ScribbleUnderline = () => (
  <svg
    className="absolute -bottom-2 left-0 w-full h-3"
    viewBox="0 0 200 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M2 8C30 4 60 10 100 6C140 2 170 9 198 5"
      className="stroke-court dark:stroke-[#60A5FA] transition-colors duration-300"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Hero = () => {
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const [isHoveringCoffee, setIsHoveringCoffee] = useState(false);
  const [tennisClickCount, setTennisClickCount] = useState(0);
  const clickTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Handle tennis badge click for Easter egg
  const handleTennisBadgeClick = () => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    const newCount = tennisClickCount + 1;
    setTennisClickCount(newCount);

    if (newCount >= 3) {
      setTennisClickCount(0);
      // Dispatch custom event for EasterEggs component to handle
      window.dispatchEvent(new CustomEvent("tennis-rally"));
    } else {
      // Reset click count after 2 seconds of no clicks
      clickTimerRef.current = setTimeout(() => {
        setTennisClickCount(0);
      }, 2000);
    }
  };

  return (
    <>
    <Helmet>
      <link rel="preload" as="image" href="/Joseph_Chamdani.webp" type="image/webp" />
    </Helmet>
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20 relative bg-paper dark:bg-[#141B2D]">
      {/* Subtle mesh gradient background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-court/20 dark:bg-[#60A5FA]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-tennis/10 dark:bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-espresso/5 dark:bg-slate-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <m.div
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              {/* Name with scribble underline */}
              <div className="mb-6">
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-espresso dark:text-slate-100 leading-tight tracking-tight">
                  Joseph Davis{" "}
                  <span className="relative inline-block">
                    Chamdani
                    <ScribbleUnderline />
                  </span>
                </h1>
              </div>

              {/* Value prop hook */}
              <p className="text-2xl md:text-3xl text-espresso/80 dark:text-slate-300 mb-4 font-light text-balance">
                I build{" "}
                <span className="text-court-dark dark:text-[#60A5FA] font-medium">AI and data products</span>
                {", and I ship them."}
              </p>

              {/* Proof line */}
              <p className="text-sm md:text-base text-espresso/60 dark:text-slate-400 max-w-2xl leading-relaxed mb-6 font-mono text-pretty">
                {"Informatics @ "}
                <a
                  href="https://www.washington.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-court-dark dark:text-[#60A5FA] hover:text-court dark:hover:text-[#93C5FD] transition-colors"
                >
                  UW
                </a>
                {" · Anthropic hackathon winner · NVIDIA open source contributor"}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-3 flex-wrap">
                <m.span
                  className="inline-flex items-center gap-2 px-4 py-2 bg-espresso/5 dark:bg-slate-800 border-2 border-espresso/20 dark:border-slate-600 rounded-full text-espresso dark:text-slate-200 font-mono text-sm shadow-brutal-sm dark:shadow-none relative"
                  onMouseEnter={() => setIsHoveringCoffee(true)}
                  onMouseLeave={() => setIsHoveringCoffee(false)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <CoffeeCupWithSteam isHovered={isHoveringCoffee} className="text-espresso-light dark:text-slate-300" />
                  Coffee Lover
                </m.span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-court/10 dark:bg-[#60A5FA]/10 border-2 border-court/30 dark:border-[#60A5FA]/30 rounded-full text-court-dark dark:text-[#60A5FA] font-mono text-sm shadow-brutal-sm dark:shadow-none">
                  <TennisBallIcon className="h-5 w-5" />
                  Tennis player
                </span>
              </div>
            </m.div>

            {/* CTA Buttons */}
            <m.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 100 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <m.a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToIdNoHash("portfolio");
                }}
                className="btn-brutal-outline inline-flex items-center justify-center group"
                whileHover={{ scale: 1.02, x: -2, y: -2 }}
                whileTap={{ scale: 0.98, x: 2, y: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="See my work"
              >
                <span className="mr-3 inline-flex">
                  <img
                    src={CHIBI_ICON}
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                    className="h-5 w-5 md:h-6 md:w-6 object-contain transition-transform group-hover:rotate-12"
                  />
                </span>
                See my work
              </m.a>

              <m.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToIdNoHash("contact");
                }}
                className="btn-brutal inline-flex items-center justify-center group"
                whileHover={{ scale: 1.02, x: -2, y: -2 }}
                whileTap={{ scale: 0.98, x: 2, y: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Scroll to Contact section"
              >
                <Mail className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
                Let&apos;s Connect
              </m.a>
            </m.div>
          </m.div>

          {/* Right - Profile Image */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            className="flex justify-center lg:justify-end"
          >
            <m.div
              className="relative group/profile"
              onMouseEnter={() => setIsHoveringProfile(true)}
              onMouseLeave={() => setIsHoveringProfile(false)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* UW Badge */}
              <m.div
                className="absolute -top-4 -left-4 w-14 h-14 rounded-full flex items-center justify-center z-20 border-2 border-espresso shadow-brutal overflow-hidden"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <picture>
                  <source srcSet="/logos/UW_Logo.webp" type="image/webp" />
                  <img src="/logos/UW_Logo.png" alt="University of Washington" className="w-full h-full object-cover" />
                </picture>
              </m.div>

              {/* Profile Image - Using div instead of Avatar for picture tag support */}
              <div className="relative">
                <div className="relative flex w-80 h-80 md:w-96 md:h-96 shrink-0 overflow-hidden rounded-full border-4 border-espresso shadow-brutal-lg z-10 transition-all duration-300">
                  <picture>
                    <source srcSet="/Joseph_Chamdani.webp" type="image/webp" />
                    <img
                      src="/Joseph_Chamdani.JPEG"
                      alt="Joseph Davis Chamdani"
                      className="aspect-square h-full w-full object-cover object-top"
                      // @ts-ignore - fetchpriority is valid HTML but not in React types yet
                      fetchpriority="high"
                    />
                  </picture>
                </div>
              </div>

              {/* Academic Mode Overlay */}
              <AnimatePresence>
                {isHoveringProfile && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 rounded-full bg-espresso/80 dark:bg-slate-900/85 backdrop-blur-sm flex items-center justify-center z-30"
                  >
                    <m.a
                      href="https://uw.joechamdani.com"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-paper dark:bg-slate-800 border-2 border-espresso dark:border-[#60A5FA] rounded-lg font-medium shadow-brutal dark:shadow-none dark:ring-1 dark:ring-[#60A5FA]/50 hover:shadow-brutal-lg dark:hover:ring-2 transition-all duration-200 text-espresso dark:text-slate-100"
                      aria-label="Switch to Academic Mode - View my UW coursework and research"
                    >
                      <GraduationCap className="h-5 w-5 dark:text-[#60A5FA]" />
                      <span>Academic Mode</span>
                    </m.a>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Tennis Badge - Click 3x for Easter Egg! */}
              <m.button
                onClick={handleTennisBadgeClick}
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-tennis rounded-full flex items-center justify-center z-20 border-2 border-espresso shadow-brutal cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 12 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Tennis ball - click 3 times for a surprise!"
                title="Click me!"
              >
                <TennisBallIcon className="w-8 h-8" />
              </m.button>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;
