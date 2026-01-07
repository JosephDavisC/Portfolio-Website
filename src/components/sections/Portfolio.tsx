import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, BookOpen, ArrowRight } from 'lucide-react';
import projectsData from '@/data/projects.json';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const projects = projectsData.filter(p => p.featured).slice(0, 4);

const Projects = () => {
  return (
    <section id="portfolio" className="py-12 px-6">
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
              <figure className="relative overflow-hidden rounded-2xl border border-white/10 group-hover:border-blue-400/30">
                <img
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  className="h-56 w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 md:h-64"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
              </figure>

              <h3 className="mt-5 text-2xl font-semibold group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>

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

              <p className="text-slate-400 mt-5 mb-6 leading-relaxed text-lg flex-grow">
                {project.description}
              </p>

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
                  {project.medium && (
                    <a
                      href={project.medium}
                      className="flex items-center text-green-400 hover:text-green-300 transition-colors hover:scale-105"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read ${project.title} article on Medium`}
                    >
                      <BookOpen className="h-5 w-5 mr-2" />
                      Article
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
          >
            See all projects
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="https://github.com/JosephDavisC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-slate-200 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <Github className="h-5 w-5" />
            GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;