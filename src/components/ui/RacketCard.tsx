import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RacketCard = ({ title, img, specs, colorClass }: any) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 transition-all cursor-pointer w-72"
      onClick={() => setShowDetails(!showDetails)}
    >
      <img
        src={img}
        alt={title}
        className="rounded-xl mx-auto mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
        style={{ height: '300px', width: 'auto', objectFit: 'contain' }}
      />
      <h3 className={`text-2xl font-semibold mb-2 ${colorClass}`}>{title}</h3>
      {showDetails && (
        <div className="text-sm text-slate-300 space-y-1 mt-2 text-left">
          {specs.map((s: any, i: number) => (
            <p key={i}>
              <span className="text-white font-medium">{s.label}:</span> {s.value}
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RacketCard;
