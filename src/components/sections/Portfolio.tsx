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
    title: "IShowStream",
    image: "/media/IShowStream_Logo.png",
    imageAlt: "IShowStream preview",
    tech: ["React", "Python", "Go", "Gemini AI", "Google Cloud"],
    description:
      "StreamSense is a real-time Twitch chat analysis platform powered by Google's Agent Development Kit (ADK) and Gemini AI, deployed on Cloud Run.",
    github: "https://github.com/JosephDavisC/IShowStream",
    demo: "https://ishowstream-234sus25va-uc.a.run.app/",
    demoLabel: "Live Demo"
  },
  {
    title: "JAM AI",
    image: "/images/portfolio/jam-ai.jpg",
    imageAlt: "JAM AI preview",
    tech: ["Python", "OpenAI", "Kaggle", "Javascript"],
    description:
      "Built a GPT-powered health assistant for diabetes management. Tuned GPT-3.5 using 600+ Q&A lines to provide personalized insights like nutritional tips and medication reminders.",
    github: "https://github.com/JosephDavisC/Jam.AI",
    demo: "https://devpost.com/software/jam-ai",
    demoLabel: "Devpost"
  },
  {
    title: "AI Transfer Evaluation Tool",
    image: "/images/portfolio/UW_Logo.jpeg",
    imageAlt: "AI Transfer Evaluation Tool - UW Husky Logo",
    tech: ["Next.js 14", "TypeScript", "Claude API", "Tailwind CSS", "jsPDF"],
    description:
      "🏆 First place winner at Anthropic Claude Hackathon. An AI-powered tool that helps community college students evaluate transfer credits to UW, automating what traditionally takes hours into seconds using Claude Vision and 157+ verified course equivalencies.",
    github: "https://github.com/JosephDavisC/AI-Transfer-Evaluation-Tool",
    demo: "https://devpost.com/software/ai-transfer-evaluation-tool",
    demoLabel: "Devpost"
  },
  {
    title: "Dino Marine VR",
    image: "/images/portfolio/dino-marine.png",
    imageAlt: "Dino Marine VR preview",
    tech: ["Unity", "C#", "VR"],
    description:
      "Worked as a Unity Developer Intern at VR Park, helping build the foundation for a multiplayer underwater VR game. I wrote scripts, added subtitles, and implemented core gameplay features during the internship.",
    demo: "https://youtu.be/lgahuoczoiA",
    demoLabel: "Video Demo"
  }
];

const Projects = () => {
  return (
    <section id="portfolio" className="py-12 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.article
              key={index}
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 flex flex-col"
            >
              {/* Top image */}
              <figure className="relative overflow-hidden rounded-2xl border border-white/10 group-hover:border-blue-400/30">
                <img
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  className="h-56 w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 md:h-64"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              <p className="text-slate-400 mt-5 mb-6 leading-relaxed text-lg flex-grow">
                {project.description}
              </p>

              {/* Links */}
              {(project.github || project.demo) && (
                <div className="flex gap-6 mt-auto">
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
                      aria-label={`View ${project.title} ${project.demoLabel || 'demo'}`}
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      {project.demoLabel || "Live Demo"}
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>

        {/* Show more button */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/JosephDavisC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-slate-200 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <Github className="h-5 w-5" />
            See more in GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;