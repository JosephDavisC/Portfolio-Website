import React from "react";
import { m } from "framer-motion";
import RacketCard from "@/components/sections/RacketCard";

type Props = { embed?: boolean };

function RacketsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <RacketCard
        title="Babolat Pure Aero 2023"
        img="/images/rackets/babolat-pure-aero.avif" // keep your original paths
        colorClass="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
        glowColor="yellow"
        rotateDirection="right"
        specs={[
          "<strong>Use:</strong> Match play",
          "<strong>Weight:</strong> 300g",
          "<strong>Head Size:</strong> 100 sq in",
          "<strong>String:</strong> Ashaway Crossfire 18 Kevlar hybrid",
          "<strong>Mains:</strong> Kevlar 18 gauge @ 48 lbs",
          "<strong>Crosses:</strong> Synthetic gut 16 gauge @ 52 lbs",
          "<strong>Grip Size:</strong> 4 (³⁄₈)",
        ]}
      />
      <RacketCard
        title="Babolat Pure Drive 2021"
        img="/images/rackets/babolat_pure_drive.jpg"
        colorClass="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
        glowColor="blue"
        rotateDirection="left"
        specs={[
          "<strong>Use:</strong> Retired",
          "<strong>Weight:</strong> 300g",
          "<strong>Head Size:</strong> 100 sq in",
          "<strong>String:</strong> Wilson NXT 17",
          "<strong>Tension:</strong> 55 lbs (mains & crosses)",
          "<strong>Grip Size:</strong> 4 (³⁄₈)",
        ]}
      />
      <RacketCard
        title="Diadem Elevate 98"
        img="/images/rackets/diadem_elevate.jpg"
        colorClass="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
        glowColor="blue"
        rotateDirection="right"
        specs={[
          "<strong>Use:</strong> Retired",
          "<strong>Weight:</strong> 305g",
          "<strong>Head Size:</strong> 98 sq in",
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
        <m.div
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
        </m.div>

        <RacketsGrid />
      </div>
    </section>
  );
}


