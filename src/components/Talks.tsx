import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Talks = () => {
  return (
    <section id="talks" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            Talks & Events
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:scale-105 transition-all duration-300"
        >
          {/* Thumbnail Image */}
          <a 
            href="https://youtu.be/ydpdE1oaEcI?si=iBYgt3G78uXj6lzT" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <img 
              src="/BCHACKS_Thumbnail.png" 
              alt="BC Hacks Lecture" 
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </a>

          {/* Text Content */}
          <div>
            <a 
              href="https://youtu.be/ydpdE1oaEcI?si=iBYgt3G78uXj6lzT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <h3 className="text-3xl font-semibold text-red-400 mb-4">
                BC Hacks 2024 Lecture
              </h3>
            </a>
            <p className="text-xl text-white mb-2">
              <span className="text-slate-400">Bellevue College — July 2024</span>
            </p>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              After helping organize and launch BC Hacks 2024, I was invited to give 
              a lecture at Bellevue College about how to run a successful hackathon. This session 
              was specially arranged for a group of 20+ Korean exchange students visiting from Korea. 
              I shared practical lessons on planning, outreach, managing sponsors, and creating a smooth 
              experience for over 100 student participants.
            </p>

            {/* Watch Button */}
            <a 
              href="https://youtu.be/ydpdE1oaEcI?si=iBYgt3G78uXj6lzT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors hover:scale-105"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Watch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Talks;
