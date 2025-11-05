import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type RacketCardProps = {
  title: string;
  img: string;
  specs: string[];
  colorClass?: string;
  glowColor?: 'yellow' | 'blue';
  rotateDirection?: 'right' | 'left';
};

const RacketCard: React.FC<RacketCardProps> = ({
  title,
  img,
  specs,
  colorClass,
  glowColor = 'blue',
  rotateDirection = 'right'
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Define glow colors based on prop
  const glowClasses = {
    yellow: 'hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/20',
    blue: 'hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20',
  };

  // Rotation direction
  const rotateClass = rotateDirection === 'right' ? 'group-hover:rotate-3' : 'group-hover:-rotate-3';

  return (
    <motion.div
      layout="position"
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        borderColor: showDetails ? (glowColor === 'yellow' ? 'rgba(250, 204, 21, 0.5)' : 'rgba(96, 165, 250, 0.5)') : 'rgba(255, 255, 255, 0.1)'
      }}
      transition={{ duration: 0.3 }}
      style={{ cursor: 'url("/cursors/jo-thumb.png") 16 16, pointer' }}
      className={`group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 ${glowClasses[glowColor]}`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={img}
          alt={title}
          className={`mx-auto shadow-lg transition-transform duration-500 group-hover:scale-110 ${rotateClass}`}
          style={{ height: '300px', width: 'auto', objectFit: 'contain' }}
        />
      </div>
      <h3 className={`text-2xl font-semibold mb-2 ${colorClass}`}>{title}</h3>

      <AnimatePresence mode="wait" initial={false}>
        {showDetails ? (
          <motion.ul
            key="specs"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="text-slate-300 text-lg leading-relaxed space-y-1 overflow-hidden"
          >
            {specs.map((spec, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                dangerouslySetInnerHTML={{ __html: spec }}
              />
            ))}
          </motion.ul>
        ) : (
          <motion.p
            key="placeholder"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="text-slate-500 text-sm text-center group-hover:text-slate-400 transition-colors overflow-hidden"
          >
            Click to view specs
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RacketCard;
