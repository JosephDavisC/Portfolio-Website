import React from "react";
import { motion } from "framer-motion";
import { MapPin, Code2 } from "lucide-react";

interface Skill {
  name: string;
  displayName?: string;
  icon: string;
}

// devicon (jsdelivr) helper; CSP already allows cdn.jsdelivr.net for img-src
const dv = (p: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${p}.svg`;

const skillGroups: { label: string; items: Skill[] }[] = [
  {
    label: "Languages",
    items: [
      { name: "Python", icon: dv("python/python-original") },
      { name: "TypeScript", displayName: "TS", icon: dv("typescript/typescript-original") },
      { name: "JavaScript", displayName: "JS", icon: dv("javascript/javascript-original") },
      { name: "Go", icon: dv("go/go-original") },
      { name: "Java", icon: dv("java/java-original") },
      { name: "C#", icon: dv("csharp/csharp-original") },
      { name: "C++", icon: dv("cplusplus/cplusplus-original") },
      { name: "R", icon: dv("r/r-original") },
    ],
  },
  {
    label: "AI & Data",
    items: [
      { name: "OpenAI", icon: "/images/tech/openai.svg" },
      { name: "Claude", icon: "/images/tech/claude.svg" },
      { name: "Gemini", icon: "/images/tech/gemini.svg" },
      { name: "Google Cloud", displayName: "GCP", icon: dv("googlecloud/googlecloud-original") },
      { name: "BigQuery", icon: "/images/tech/bigquery.svg" },
      { name: "Tableau", icon: "/images/tech/tableau.svg" },
      { name: "MySQL", icon: dv("mysql/mysql-original") },
    ],
  },
  {
    label: "Web & Design",
    items: [
      { name: "React", icon: dv("react/react-original") },
      { name: "Next.js", displayName: "Next", icon: dv("nextjs/nextjs-original") },
      { name: "Node.js", displayName: "Node", icon: dv("nodejs/nodejs-original") },
      { name: "Tailwind", icon: dv("tailwindcss/tailwindcss-original") },
      { name: "HTML", icon: dv("html5/html5-original") },
      { name: "CSS", icon: dv("css3/css3-original") },
      { name: "Figma", icon: dv("figma/figma-original") },
    ],
  },
  {
    label: "Cloud & Tools",
    items: [
      { name: "AWS", icon: dv("amazonwebservices/amazonwebservices-original-wordmark") },
      { name: "Git", icon: dv("git/git-original") },
      { name: "FastAPI", icon: dv("fastapi/fastapi-original") },
      { name: "Flask", icon: dv("flask/flask-original") },
      { name: "Unity", icon: dv("unity/unity-original") },
    ],
  },
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
            Informatics student at the University of Washington, focused on AI, data science, and product design.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-7">
            {["UW Informatics", "Class of 2027", "Seattle, WA", "1st place · UW Claude Hackathon"].map((stat) => (
              <span
                key={stat}
                className="px-3.5 py-1.5 text-xs font-mono font-medium bg-court/15 dark:bg-[#60A5FA]/15 text-court-dark dark:text-[#60A5FA] rounded-full border-2 border-court/40 dark:border-[#60A5FA]/40"
              >
                {stat}
              </span>
            ))}
          </div>
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

            <div className="space-y-3 relative z-10">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-espresso/40 dark:text-slate-500 mb-1.5">
                    {group.label}
                  </p>
                  <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-8 gap-1.5">
                    {group.items.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.12, y: -2 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.02,
                          type: "spring",
                          stiffness: 300,
                        }}
                        viewport={{ once: true }}
                        className="group/skill flex items-center justify-center aspect-square rounded-lg border border-black/10 bg-white hover:border-black/25 hover:shadow-brutal-sm transition-all duration-200"
                        title={skill.name}
                      >
                        <img
                          src={skill.icon}
                          alt={`${skill.name} logo`}
                          className="w-6 h-6 flex-shrink-0"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
