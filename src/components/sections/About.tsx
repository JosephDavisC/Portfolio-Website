import React from "react";
import { motion } from "framer-motion";
import { MapPin, Code2 } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55 }
};

interface Skill {
  name: string;
  displayName?: string; 
  icon: string;
  color: string;
}

const skills: Skill[] = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776ab" },
  { name: "JavaScript", displayName: "JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#f7df1e" },
  { name: "TypeScript", displayName: "TS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178c6" },
  { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", color: "#00add8" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61dafb" },
  { name: "Node.js", displayName: "Node", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#e34f26" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572b6" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#ed8b00" },
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", color: "#239120" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", color: "#00599c" },
  { name: "R", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg", color: "#276dc3" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479a1" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#f05032" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "#f24e1e" },
  { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg", color: "#000000" }
];

export default function About() {
  return (
    <section id="about" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            From Jakarta to Seattle
          </h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Just a kid from Jakarta trying things out in Seattle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.article
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
          >
            <header className="flex items-center mb-5">
              <MapPin className="h-7 w-7 text-red-400 mr-4" />
              <h3 className="text-2xl font-semibold">The Journey</h3>
            </header>

            <div className="space-y-4 text-slate-300 leading-relaxed text-[17px]">
              <p>
                Originally from Jakarta, Indonesia, I moved to Seattle and accelerated my education through the Running Start program at Bellevue College, entering the University of Washington's Informatics program as a junior.
              </p>
              <p>
                My work is driven by a commitment to building technology that augments human judgment rather than replacing it. I believe that trust in AI systems comes from clear boundaries and transparent limitations, not just high confidence scores.
              </p>
              <p>
                Currently, I'm interning at Sector building AI automation for cybersecurity, and I lead BC Tech Club where I organized BC Hacks 2024. I'm passionate about AI ethics, human-computer interaction, and building tools people actually use.
              </p>
            </div>
          </motion.article>

          <motion.article
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 relative overflow-hidden"
          >
            <motion.img
              src="/images/chibis/jo_stress.PNG"
              alt="Stressed Joe learning all these technologies"
              className="absolute top-4 right-4 w-20 h-20 md:w-24 md:h-24 opacity-30 group-hover:opacity-50 pointer-events-none transition-opacity duration-500 drop-shadow-lg"
              animate={{
                rotate: [-5, 5, -5],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <header className="flex items-center mb-5 relative z-10">
              <Code2 className="h-7 w-7 text-green-400 mr-4" />
              <h3 className="text-2xl font-semibold">Core Skills</h3>
            </header>

            <p className="text-slate-400 mb-6 relative z-10">
              Technologies I work with for school, side projects, and internships.
            </p>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-3 relative z-10">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group flex flex-col items-center p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 min-h-[80px]"
                  title={skill.name}
                >
                  <img
                    src={skill.icon}
                    alt={`${skill.name} logo`}
                    className="w-7 h-7 sm:w-8 sm:h-8 mb-1.5 transition-transform group-hover:scale-110 flex-shrink-0"
                    style={{ filter: 'brightness(0.9)' }}
                  />
                  <span className="text-[10px] sm:text-xs text-slate-300 text-center font-medium leading-tight px-1">
                    <span className="block sm:hidden">
                      {skill.displayName || skill.name}
                    </span>
                    <span className="hidden sm:block">
                      {skill.name}
                    </span>
                  </span>
                </div>
              ))}
            </div>

          </motion.article>
        </div>
      </div>
    </section>
  );
}