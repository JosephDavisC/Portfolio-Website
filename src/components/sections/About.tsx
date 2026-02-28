import React from "react";
import { motion } from "framer-motion";
import { MapPin, Code2 } from "lucide-react";

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
    <section id="about" className="py-16 px-6 bg-paper-dark">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-espresso">
            From Jakarta to{" "}
            <span className="relative inline-block">
              Seattle
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8C30 4 60 10 100 6C140 2 170 9 198 5"
                  className="stroke-court dark:stroke-[#60A5FA] transition-colors duration-300"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-espresso/60 text-xl max-w-3xl mx-auto leading-relaxed font-mono">
            Just a kid from Jakarta trying things out in Seattle.
          </p>
        </motion.div>

        {/* Two Column Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* The Journey Card */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className="card-brutal p-8 md:p-10"
          >
            <header className="flex items-center mb-5">
              <div className="w-12 h-12 rounded-full bg-court/20 dark:bg-[#60A5FA]/20 border-2 border-court dark:border-[#60A5FA] flex items-center justify-center mr-4">
                <MapPin className="h-6 w-6 text-court-dark dark:text-[#60A5FA]" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-espresso">The Journey</h3>
            </header>

            <div className="space-y-4 text-espresso/80 leading-relaxed text-[17px]">
              <p>
                Originally from Jakarta, Indonesia, I moved to Seattle and accelerated my education through the Running Start program at Bellevue College, entering the University of Washington's Informatics program as a junior.
              </p>
              <p>
                My work is driven by a commitment to building technology that augments human judgment rather than replacing it. I believe that trust in AI systems comes from clear boundaries and transparent limitations, not just high confidence scores.
              </p>
              <p>
                I interned at Sector building AI automation for cybersecurity, and I led BC Tech Club where I organized BC Hacks 2024. I'm passionate about AI ethics, human-computer interaction, and building tools people actually use.
              </p>
            </div>
          </motion.article>

          {/* Core Skills Card */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className="card-brutal p-8 md:p-10 relative overflow-hidden"
          >
            {/* Floating Chibi */}
            <motion.img
              src="/images/chibis/jo_stress.webp"
              alt="Stressed Joe learning all these technologies"
              className="absolute top-4 right-4 w-20 h-20 md:w-24 md:h-24 opacity-20 pointer-events-none"
              animate={{
                rotate: [-5, 5, -5],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <header className="flex items-center mb-5 relative z-10">
              <div className="w-12 h-12 rounded-full bg-espresso/10 border-2 border-espresso flex items-center justify-center mr-4">
                <Code2 className="h-6 w-6 text-espresso" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-espresso">Core Skills</h3>
            </header>

            <p className="text-espresso/60 mb-6 relative z-10 font-mono text-sm">
              Technologies I work with for school, side projects, and internships.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4 relative z-10">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 300
                  }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center p-2.5 rounded-xl border-2 border-espresso/20 bg-paper hover:border-espresso/40 hover:shadow-brutal-sm transition-all duration-200 min-h-[80px]"
                  title={skill.name}
                >
                  <img
                    src={skill.icon}
                    alt={`${skill.name} logo`}
                    className="w-7 h-7 sm:w-8 sm:h-8 mb-1.5 flex-shrink-0"
                  />
                  <span className="text-[10px] sm:text-xs text-espresso/70 text-center font-mono font-medium leading-tight">
                    {skill.displayName || skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
