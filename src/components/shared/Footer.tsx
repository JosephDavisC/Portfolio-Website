import React from "react";
import { Coffee, LayoutDashboard } from "lucide-react";

// Tennis Ball SVG icon (no emoji) - detailed version
const TennisBallIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    {/* Ball base with gradient for depth */}
    <defs>
      <radialGradient id="ballGradient" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#E8FF3C" />
        <stop offset="100%" stopColor="#C5E000" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="10.5" fill="url(#ballGradient)" stroke="#3D8C00" strokeWidth="1" />
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

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t-2 border-espresso/10 dark:border-slate-700/30 bg-paper dark:bg-[#141B2D] transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <p className="text-espresso dark:text-slate-200 font-heading text-lg">© Joseph Davis Chamdani</p>

        <div className="flex justify-center items-center gap-2 text-espresso/60 dark:text-slate-400 font-mono">
          <Coffee className="h-4 w-4" />
          <span>Powered by coffee and dreams</span>
          <TennisBallIcon />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2">
          <a
            href="https://freelance.joechamdani.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-espresso/40 dark:text-slate-500 hover:text-court dark:hover:text-[#60A5FA] transition-colors"
          >
            <LayoutDashboard className="w-3 h-3" />
            Client Portal
          </a>

          <a
            href="https://status.joechamdani.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-espresso/40 dark:text-slate-500 hover:text-court dark:hover:text-[#60A5FA] transition-colors"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
            System Status
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
