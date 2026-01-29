import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type RacketCardProps = {
  title: string;
  img: string;
  specs: string[];
  colorClass?: string;
  glowColor?: 'yellow' | 'blue';
  rotateDirection?: 'right' | 'left';
  retired?: boolean;
};

const RacketCard: React.FC<RacketCardProps> = ({
  title,
  img,
  specs,
  colorClass,
  glowColor = 'blue',
  rotateDirection = 'right',
  retired = false
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Define hover colors based on prop (yellow = tennis/court theme, blue = espresso theme)
  // In dark mode, use consistent blue glow - dimmer for retired rackets
  const hoverBorderClass = isDark
    ? (retired ? 'hover:border-slate-500' : 'hover:border-[#60A5FA]')
    : (glowColor === 'yellow' ? 'hover:border-court' : 'hover:border-espresso');

  // Rotation direction
  const rotateClass = rotateDirection === 'right' ? 'group-hover:rotate-3' : 'group-hover:-rotate-3';

  // Border color for active state - blue in dark mode, dimmer for retired
  const activeBorderColor = isDark
    ? (retired ? '#475569' : '#60A5FA')
    : (glowColor === 'yellow' ? '#4CBB17' : '#3D2B1F');

  const inactiveBorderColor = isDark
    ? (retired ? 'rgba(51, 65, 85, 0.5)' : 'rgba(71, 85, 105, 0.5)')
    : 'rgba(61, 43, 31, 0.2)';

  return (
    <motion.div
      layout="position"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        borderColor: showDetails ? activeBorderColor : inactiveBorderColor
      }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      style={{ cursor: 'url("/cursors/jo-thumb.png") 16 16, pointer' }}
      className={`group card-brutal p-6 ${hoverBorderClass}`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="overflow-hidden rounded-lg border-2 border-espresso/20 dark:border-slate-600 mb-4 bg-paper dark:bg-slate-800">
        <img
          src={img}
          alt={title}
          className={`mx-auto transition-transform duration-500 group-hover:scale-110 ${rotateClass}`}
          style={{ height: '300px', width: 'auto', objectFit: 'contain' }}
        />
      </div>
      <h3 className={`text-xl font-heading font-semibold mb-2 ${colorClass || 'text-espresso'} dark:text-slate-100`}>{title}</h3>

      <AnimatePresence mode="wait" initial={false}>
        {showDetails ? (
          <motion.ul
            key="specs"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="text-espresso/80 dark:text-slate-300 text-base leading-relaxed space-y-1 overflow-hidden font-mono"
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
            className="text-espresso/50 dark:text-slate-400 text-sm text-center group-hover:text-espresso/70 dark:group-hover:text-slate-300 transition-colors overflow-hidden font-mono"
          >
            Click to view specs
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RacketCard;
