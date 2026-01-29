import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

/* ============================================
   TACTILE THEME TOGGLE
   Premium pill-shaped slider for theme switching
   - Light Mode: Paper White track, Court Green thumb
   - Dark Mode: Navy track, Neon Blue glowing thumb
============================================ */

// Custom SVG Sun icon (no emoji)
const SunIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

// Custom SVG Moon icon (no emoji)
const MoonIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative w-16 h-8 rounded-full
        border-2 transition-colors duration-400 flex items-center px-1
        ${isDark
          ? "bg-slate-900 border-slate-700"
          : "bg-paper border-espresso/30"
        }
      `}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Currently ${isDark ? "dark" : "light"} mode`}
      style={{
        transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Track icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <span
          className={`transition-opacity duration-300 ${
            isDark ? "opacity-30" : "opacity-60"
          } text-espresso dark:text-slate-400`}
        >
          <SunIcon />
        </span>
        <span
          className={`transition-opacity duration-300 ${
            isDark ? "opacity-60" : "opacity-30"
          } text-espresso dark:text-slate-400`}
        >
          <MoonIcon />
        </span>
      </div>

      {/* Thumb */}
      <motion.div
        className={`
          w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
          ${isDark
            ? "bg-[#60A5FA] shadow-[0_0_12px_rgba(96,165,250,0.6)]"
            : "bg-court shadow-brutal-sm"
          }
        `}
        initial={false}
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        style={{
          transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <motion.span
          initial={false}
          animate={{ rotate: isDark ? 360 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={isDark ? "text-slate-900" : "text-paper"}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </motion.div>
    </motion.button>
  );
}
