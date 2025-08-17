import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, Code, Brain, Database, Target } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            From Jakarta to Seattle
          </h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Just a kid from Jakarta trying things out in Seattle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <MapPin className="h-7 w-7 text-red-400 mr-4" />
                <h3 className="text-2xl font-semibold">The Journey</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                Started in Jakarta 🇮🇩 and now studying at UW. I took an early path through the High School Completion Program, which helped me explore my interests in AI and data analytics a bit sooner than usual. Along the way, I’ve enjoyed working on hands-on projects too.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <Zap className="h-7 w-7 text-blue-400 mr-4" />
                <h3 className="text-2xl font-semibold">Building & Creating</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                From helping with scam detection at Stockbit to building projects for fun, I enjoy exploring AI and data. Outside of that, you'll probably find me playing tennis 🎾.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10"
          >
            <h3 className="text-3xl font-semibold mb-8 flex items-center">
              <Code className="h-8 w-8 text-green-400 mr-4" />
              Tech Arsenal
            </h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-blue-400 font-medium mb-4 flex items-center text-lg">
                  <Brain className="h-5 w-5 mr-3" />
                  AI & Machine Learning
                </h4>
                <div className="flex flex-wrap gap-3">
                  {["Python", "TensorFlow", "Jupyter", "AutoML", "N-Grams & TF-IDF"].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 hover:bg-blue-500/30 transition-colors hover:scale-105">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-red-400 font-medium mb-4 flex items-center text-lg">
                  <Database className="h-5 w-5 mr-3" />
                  Data & Analytics
                </h4>
                <div className="flex flex-wrap gap-3">
                  {["SQL", "Pandas", "BigQuery"].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30 hover:bg-red-500/30 transition-colors hover:scale-105">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-green-400 font-medium mb-4 flex items-center text-lg">
                  <Target className="h-5 w-5 mr-3" />
                  Full-Stack Basics
                </h4>
                <div className="flex flex-wrap gap-3">
                  {["HTML", "CSS", "JavaScript", "C#", "Unity", "React", "Git & GitHub"].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30 hover:bg-green-500/30 transition-colors hover:scale-105">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
