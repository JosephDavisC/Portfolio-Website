import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

/* ============================================
   EASTER EGGS COMPONENT
   - Tennis Rally: Click badge 3x for SVG rain (triggered via custom event)
   - Secret Command: Type "UW" or "INFO" for Husky mode
   - NO EMOJIS - all icons are custom SVGs

   UW Brand Colors (Theme-Aware):
   - UW Purple: #4B2E83
   - UW Gold Light: #B7A57A
   - UW Gold Bright: #D0B787 (for dark mode)
============================================ */

// Tennis Ball SVG component (no emoji) - detailed version
const TennisBallSVG: React.FC<{ size?: number }> = ({ size = 24 }) => {
  const uniqueId = `easterEggBall-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={uniqueId} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#E8FF3C" />
          <stop offset="100%" stopColor="#C5E000" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill={`url(#${uniqueId})`} stroke="#3D8C00" strokeWidth="1" />
      <path
        d="M6 4.5C4 7 3.5 10 4 12C4.5 14 5.5 17 8 20"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M18 4.5C20 7 20.5 10 20 12C19.5 14 18.5 17 16 20"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <circle cx="8" cy="8" r="2.5" fill="#FFFFFF" opacity="0.25" />
    </svg>
  );
};

// Tennis ball SVG rain component
const TennisBallRain: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [balls, setBalls] = useState<{ id: number; x: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    // Generate 30 balls with random positions and sizes
    const newBalls = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      size: 20 + Math.random() * 16, // Random size between 20-36
    }));
    setBalls(newBalls);

    // Clean up after 3.5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {balls.map((ball) => (
        <motion.div
          key={ball.id}
          className="absolute"
          style={{ left: `${ball.x}%` }}
          initial={{ y: -50, rotate: 0, opacity: 1 }}
          animate={{
            y: "110vh",
            rotate: 720,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: 2.5,
            delay: ball.delay,
            ease: "easeIn",
          }}
        >
          <TennisBallSVG size={ball.size} />
        </motion.div>
      ))}
    </div>
  );
};

// Husky SVG Watermark (minimalist)
const HuskyWatermark: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: isDark ? 0.1 : 0.05, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.8 }}
    className="fixed bottom-8 right-8 pointer-events-none z-[9998]"
  >
    <svg
      width="120"
      height="120"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified Husky "W" mark */}
      <path
        d="M15 70L25 30L40 55L50 30L60 55L75 30L85 70"
        stroke="#4B2E83"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="50" cy="85" r="8" fill="#B7A57A" />
    </svg>
  </motion.div>
);

// Main Easter Eggs Provider
export default function EasterEggs() {
  const [showRain, setShowRain] = useState(false);
  const [huskyMode, setHuskyMode] = useState(false);
  const [keySequence, setKeySequence] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Listen for tennis rally trigger from Hero badge
  useEffect(() => {
    const handleTennisRally = () => {
      setShowRain(true);
      toast("Match Point!", {
        description: "You've unlocked the tennis rally!",
        duration: 3000,
      });
    };

    window.addEventListener("tennis-rally", handleTennisRally);
    return () => window.removeEventListener("tennis-rally", handleTennisRally);
  }, []);

  // Listen for secret keyboard commands
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toUpperCase();
      const newSequence = (keySequence + key).slice(-4); // Keep last 4 chars
      setKeySequence(newSequence);

      // Check for "UW" or "INFO" sequence
      if (newSequence.endsWith("UW") || newSequence.endsWith("INFO")) {
        activateHuskyMode();
        setKeySequence("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keySequence]);

  const activateHuskyMode = () => {
    if (huskyMode) return;

    setHuskyMode(true);

    // Add UW Purple class to document
    document.documentElement.classList.add("husky-mode");

    // Theme-aware toast styling
    // Light Mode: Purple background with Gold text
    // Dark Mode: Gold background with Purple text
    toast("Go Huskies!", {
      description: "UW Purple & Gold mode activated!",
      duration: 5000,
      style: isDark
        ? {
            background: "#D0B787",
            color: "#4B2E83",
            border: "2px solid #4B2E83",
            fontWeight: 600,
          }
        : {
            background: "#4B2E83",
            color: "#B7A57A",
            border: "2px solid #B7A57A",
            fontWeight: 600,
          },
    });

    // Remove after 5 seconds
    setTimeout(() => {
      document.documentElement.classList.remove("husky-mode");
      setHuskyMode(false);
    }, 5000);
  };

  return (
    <>
      {/* Tennis Ball Rain Effect */}
      <AnimatePresence>
        {showRain && (
          <TennisBallRain onComplete={() => setShowRain(false)} />
        )}
      </AnimatePresence>

      {/* Husky Watermark - visible during Husky Mode */}
      <AnimatePresence>
        {huskyMode && <HuskyWatermark isDark={isDark} />}
      </AnimatePresence>
    </>
  );
}
