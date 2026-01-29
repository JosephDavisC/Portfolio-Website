import React from "react";
import { motion } from "framer-motion";

/* ============================================
   COFFEE STEAM SVG ANIMATION
   Minimalist line-art coffee cup with rising steam
   - Triggered on hover over Coffee Lover badge
   - GPU-accelerated with transform and opacity
============================================ */

// Steam line animation variants
const steamVariants = {
  initial: {
    pathLength: 0,
    opacity: 0,
    y: 0,
  },
  animate: (delay: number) => ({
    pathLength: [0, 1, 1, 0],
    opacity: [0, 0.8, 0.6, 0],
    y: [0, -8, -16, -24],
    transition: {
      duration: 2.5,
      delay: delay,
      repeat: Infinity,
      ease: "easeOut",
    },
  }),
};

// Coffee cup icon with steam animation
export const CoffeeCupWithSteam: React.FC<{ isHovered?: boolean; className?: string }> = ({
  isHovered = false,
  className = "",
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ overflow: "visible" }}
    >
      {/* Coffee Cup Body */}
      <path
        d="M17 8h1a4 4 0 1 1 0 8h-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Animated Steam Lines */}
      {isHovered && (
        <g>
          {/* Steam Line 1 - Left */}
          <motion.path
            d="M6 4 C6 2.5, 7 2, 7 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            variants={steamVariants}
            initial="initial"
            animate="animate"
            custom={0}
            style={{ transformOrigin: "center bottom" }}
          />
          {/* Steam Line 2 - Center */}
          <motion.path
            d="M10 4 C10 2.5, 10 2, 10 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            variants={steamVariants}
            initial="initial"
            animate="animate"
            custom={0.3}
            style={{ transformOrigin: "center bottom" }}
          />
          {/* Steam Line 3 - Right */}
          <motion.path
            d="M14 4 C14 2.5, 13 2, 13 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            variants={steamVariants}
            initial="initial"
            animate="animate"
            custom={0.6}
            style={{ transformOrigin: "center bottom" }}
          />
        </g>
      )}
    </svg>
  );
};

// Standalone steam animation for overlay effects
export const SteamAnimation: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none ${className}`}>
      <svg
        width="32"
        height="24"
        viewBox="0 0 32 24"
        fill="none"
        style={{ overflow: "visible" }}
      >
        {/* Three wavy steam lines */}
        <motion.path
          d="M8 20 Q8 14, 10 10 Q12 6, 10 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 0.6, 0],
            y: [0, -4, -8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M16 20 Q16 14, 16 10 Q16 6, 16 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 0.7, 0],
            y: [0, -6, -10],
          }}
          transition={{
            duration: 2.2,
            delay: 0.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M24 20 Q24 14, 22 10 Q20 6, 22 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 0.5, 0],
            y: [0, -5, -9],
          }}
          transition={{
            duration: 1.8,
            delay: 0.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </svg>
    </div>
  );
};

// Coffee cup loading animation (fills from bottom)
export const CoffeeLoadingAnimation: React.FC<{ progress?: number; className?: string }> = ({
  progress = 0,
  className = "",
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {/* Cup outline */}
      <path
        d="M17 8h1a4 4 0 1 1 0 8h-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-30"
      />
      <path
        d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-30"
      />

      {/* Fill mask - clips the filling liquid */}
      <defs>
        <clipPath id="cupClip">
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" />
        </clipPath>
      </defs>

      {/* Animated fill */}
      <motion.rect
        x="3"
        y="8"
        width="14"
        height="13"
        fill="#3D2B1F"
        clipPath="url(#cupClip)"
        initial={{ y: 21 }}
        animate={{ y: 8 + (13 * (1 - progress / 100)) }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </svg>
  );
};

export default CoffeeCupWithSteam;
