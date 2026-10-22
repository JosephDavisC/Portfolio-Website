import React, { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "joechamdani-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_KEY) as Theme | null;
      if (stored === "light" || stored === "dark") {
        return stored;
      }
    }
    // Default is light regardless of system preference; visitors can
    // switch with the toggle and their choice is remembered
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Switch in one composited step instead of fading every element's colours, which
  // repaints the whole page each frame and stutters on phones. With View Transitions
  // the new theme is revealed as a circle growing from the toggle (or the click point).
  const toggleTheme = (e?: React.MouseEvent) => {
    const next: Theme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;
    const apply = () => {
      root.classList.toggle("dark", next === "dark");
      flushSync(() => setThemeState(next));
    };
    const startViewTransition = (document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    }).startViewTransition?.bind(document);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("no-transitions");
    if (!startViewTransition || reduce) {
      apply();
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("no-transitions")));
      return;
    }

    const rect = (e?.currentTarget as HTMLElement | undefined)?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const vt = startViewTransition(apply);
    vt.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 550, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
    vt.finished.finally(() => root.classList.remove("no-transitions"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
