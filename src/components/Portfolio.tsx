import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Static for now — you can import from data file later if preferred
const projects = [
  {
    title: "JAM AI",
    tech: ["Python", "OpenAI", "Kaggle", "Javascript"],
    description: "Built a GPT-powered health assistant for diabetes management. Tuned GPT-3.5 using 600+ Q&A lines to provide personalized insights like nutritional tips and medication reminders.",
    github: "https://github.com/JosephDavisC/Jam.AI",
    demo: "https://devpost.com/software/jam-ai"
  },
  {
    title: "Coffee Shop – Fullstack Demo",
    tech: ["Next.js 15", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    description: "A modern coffee shop web app built with Next.js 15 (App Router), Supabase, and Stripe. Order ahead, manage bookings, track orders, and explore a clean admin dashboard.",
    github: "https://github.com/JosephDavisC/Coffee-Shop"
  },
  {
    title: "Dino Marine VR",
    tech: ["Unity", "C#", "VR"],
    description: "Worked as a Unity Developer Intern at VR Park, helping build the foundation for a multiplayer underwater VR game. I wrote scripts, added subtitles, and implemented core gameplay features during the internship.",
    demo: "https://youtu.be/lgahuoczoiA"
  }
];

const Projects = () => {
  return (
    <section id="portfolio" className="py-24 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            Portfolio
          </h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Real-world projects that combine AI, data analytics, and engineering
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                {project.description}
              </p>
              {(project.github || project.demo) && (
                <div className="flex gap-6">
                  {project.github && (
                    <a 
                      href={project.github}
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors hover:scale-105"
                      target="_blank" rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5 mr-2" />
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo}
                      className="flex items-center text-red-400 hover:text-red-300 transition-colors hover:scale-105"
                      target="_blank" rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Demo
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
