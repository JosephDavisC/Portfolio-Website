import React from 'react';
import { motion } from 'framer-motion';

const MoreThanCode = () => {
  return (
    <section id="tennis-coffees" className="py-24 px-6 bg-black/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">
            More Than Just Code
          </h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Outside of school, I stay grounded with things I love. Tennis, and a good cup of Coffee.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center max-w-4xl mx-auto"
        >
          {/* Tennis */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:scale-105 transition-transform">
            <img src="/Tennis_2.jpg" alt="Tennis" className="w-full h-64 object-cover" />
            <div className="bg-white/5 text-slate-300 text-center py-4 text-sm">
              Tennis: Where I reset, compete, and stay focused 🎾
            </div>
          </div>

          {/* Coffee */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:scale-105 transition-transform">
            <img src="/Coffee.JPG" alt="Coffee time" className="w-full h-64 object-cover" />
            <div className="bg-white/5 text-slate-300 text-center py-4 text-sm">
              A good brew fuels my thinking ☕
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MoreThanCode;
