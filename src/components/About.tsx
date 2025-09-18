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
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            From Jakarta to Seattle
          </h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Just a kid from Jakarta trying things out in Seattle.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Story */}
          <motion.article
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-all"
          >
            <header className="flex items-center mb-5">
              <MapPin className="h-7 w-7 text-red-400 mr-4" />
              <h3 className="text-2xl font-semibold">The Journey</h3>
            </header>

            <div className="space-y-4 text-slate-300 leading-relaxed text-[17px]">
              <p>
                I grew up in Jakarta 🇮🇩 and now study Informatics at the
                University of Washington. I took an early path through the High
                School Completion Program, which let me jump into college-level
                work sooner and figure out what I actually enjoy.
              </p>
              <p>
                That led me to AI and data. I like building small, useful
                things—sometimes it’s an OCR pipeline, sometimes a web app, and
                sometimes a tool for a club project. I’m still learning every
                day, shipping when it’s “good enough,” then improving it.
              </p>
              <p>
                Outside the screen, I reset with tennis 🎾 and recharge with
                coffee ☕. If a project mixes code, people, and a bit of design,
                I’m usually in.
              </p>
            </div>
          </motion.article>

          {/* Skills */}
          <motion.article
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-all"
          >
            <header className="flex items-center mb-5">
              <Code2 className="h-7 w-7 text-green-400 mr-4" />
              <h3 className="text-2xl font-semibold">Core Skills</h3>
            </header>

            <p className="text-slate-400 mb-6">
              Technologies I work with for school, side projects, and internships.
            </p>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-3">
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