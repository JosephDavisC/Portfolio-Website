import React from "react";
import { motion } from "framer-motion";
import RacketCard from "./RacketCard";

type Props = { embed?: boolean };

function RacketsGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <RacketCard
        title="Babolat Pure Aero 2023"
        img="/images/rackets/babolat-pure-aero.avif" // keep your original paths
        colorClass="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
        specs={[
          "<strong>Use:</strong> Match play",
          "<strong>Weight:</strong> 300g",
          "<strong>String:</strong> Luxilon Alu Power 125MM",
          "<strong>Tension:</strong> 55 lbs (mains & crosses)",
          "<strong>Grip Size:</strong> 4 (³⁄₈)",
        ]}
      />
      <RacketCard
        title="Babolat Pure Drive 2021"
        img="/images/rackets/babolat_pure_drive.jpg"
        colorClass="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
        specs={[
          "<strong>Use:</strong> Casual hitting",
          "<strong>Weight:</strong> 300g",
          "<strong>String:</strong> Wilson NXT 17",
          "<strong>Tension:</strong> 55 lbs (mains & crosses)",
          "<strong>Grip Size:</strong> 4 (³⁄₈)",
        ]}
      />
    </div>
  );
}

export default function Rackets({ embed = false }: Props) {
  if (embed) return <RacketsGrid />;

  // Standalone section (if you ever want a dedicated page)
  return (
    <section id="rackets" className="py-24 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            My Racket Setup
          </h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Click the rackets to reveal the specs.
          </p>
        </motion.div>

        <RacketsGrid />
      </div>
    </section>
  );
}

// Named export if you prefer to import just the grid:
// export { RacketsGrid };
