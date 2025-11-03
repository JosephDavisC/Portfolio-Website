import React, { useState } from 'react';
import { motion } from 'framer-motion';

type RacketCardProps = {
  title: string;
  img: string;
  specs: string[];
  colorClass?: string;
};

const RacketCard: React.FC<RacketCardProps> = ({ title, img, specs, colorClass }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 transition-all duration-300 cursor-pointer"
      onClick={() => setShowDetails(!showDetails)}
    >
      <img
        src={img}
        alt={title}
        className="rounded-xl mx-auto mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
        style={{ height: '300px', width: 'auto', objectFit: 'contain' }}
      />
      <h3 className={`text-2xl font-semibold mb-2 ${colorClass}`}>{title}</h3>
      {showDetails ? (
        <ul className="text-slate-300 text-lg leading-relaxed space-y-1">
          {specs.map((spec, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: spec }} />
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-sm text-center">Click to view specs</p>
      )}
    </motion.div>
  );
};

export default RacketCard;
