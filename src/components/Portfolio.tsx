import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const projects = [
  {
    title: "JAM AI",
    image: "/images/portfolio/jam-ai.jpg",
    imageAlt: "JAM AI preview",
    tech: ["Python", "OpenAI", "Kaggle", "Javascript"],
    description:
      "Built a GPT-powered health assistant for diabetes management. Tuned GPT-3.5 using 600+ Q&A lines to provide personalized insights like nutritional tips and medication reminders.",
    github: "https://github.com/JosephDavisC/Jam.AI",
    demo: "https://devpost.com/software/jam-ai"
  },
  {
    title: "Coffee Shop – Fullstack Demo",
    image: "/images/portfolio/coffee-shop.png",
    imageAlt: "Coffee Shop app preview",
    tech: ["Next.js 15", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    description:
      "This Fullstack project is a modern coffee shop website application built with Next.js 15 (App Router), Supabase, and Stripe.",
    github: "https://github.com/JosephDavisC/Coffee-Shop"
  },
  {
    title: "Dino Marine VR",
    image: "/images/portfolio/dino-marine.png",
    imageAlt: "Dino Marine VR preview",
    tech: ["Unity", "C#", "VR"],
    description:
      "Worked as a Unity Developer Intern at VR Park, helping build the foundation for a multiplayer underwater VR game. I wrote scripts, added subtitles, and implemented core gameplay features during the internship.",
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
            <motion.article
              key={index}
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-[1.02]"
            >
              {/* Top image */}
              <figure className="relative overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-48"
                  loading="lazy"
                />
                {/* subtle gradient at bottom to improve title contrast */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
              </figure>

              {/* Title */}
              <h3 className="mt-5 text-2xl font-semibold group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>

              {/* Tech badges */}
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-slate-400 mt-5 mb-6 leading-relaxed text-lg">
                {project.description}
              </p>

              {/* Links */}
              {(project.github || project.demo) && (
                <div className="flex gap-6">
                  {project.github && (
                    <a
                      href={project.github}
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors hover:scale-105"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5 mr-2" />
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="flex items-center text-rose-400 hover:text-rose-300 transition-colors hover:scale-105"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      More
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;