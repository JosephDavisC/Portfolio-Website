import React from "react";
import { Coffee } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-slate-400 text-lg">© Joseph Davis Chamdani</p>
        <div className="flex justify-center items-center mt-4 gap-2 text-slate-500">
          <Coffee className="h-4 w-4" />
          <span>Powered by coffee and dreams</span>
          <span className="text-lg">🎾</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
