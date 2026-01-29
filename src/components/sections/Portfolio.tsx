import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, BookOpen, ArrowRight } from 'lucide-react';
import projectsData from '@/data/projects.json';

const projects = projectsData.filter(p => p.featured).slice(0, 4);

const Projects = () => {
  return (
    <section id="portfolio" className="py-16 px-4 sm:px-6 bg-paper overflow-hidden">
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
            Portfolio
          </h2>
          <p className="text-espresso/60 text-xl max-w-3xl mx-auto leading-relaxed font-mono">
            Real-world projects that combine AI, data analytics, and engineering
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              className="card-brutal p-6 flex flex-col group"
            >
              {/* Project Image */}
              <figure className="relative overflow-hidden rounded-lg border-2 border-espresso mb-5">
                <motion.img
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  className="h-56 w-full object-cover object-center md:h-64"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 bg-tennis dark:bg-slate-800 text-espresso dark:text-slate-100 font-mono text-xs font-bold border-2 border-espresso dark:border-slate-600 rounded-full shadow-brutal-sm">
                  {project.category}
                </span>
              </figure>

              {/* Project Title */}
              <h3 className="text-2xl font-heading font-semibold text-espresso dark:text-slate-100 group-hover:text-court-dark dark:group-hover:text-[#60A5FA] transition-colors">
                {project.title}
              </h3>

              {/* Tech Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-espresso/5 dark:bg-slate-700/80 text-espresso/70 dark:text-slate-200 border border-espresso/20 dark:border-slate-500/50 rounded-full text-sm font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-espresso/70 mt-4 mb-6 leading-relaxed flex-grow">
                {project.description}
              </p>

              {/* Action Links */}
              {(project.github || project.demo) && (
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto pt-4 border-t-2 border-espresso/10">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-espresso/5 border-2 border-espresso/20 rounded-lg text-espresso font-medium text-xs sm:text-sm hover:bg-espresso hover:text-paper transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-court/10 dark:bg-[#60A5FA]/10 border-2 border-court/30 dark:border-[#60A5FA]/30 rounded-lg text-court-dark dark:text-[#60A5FA] font-medium text-xs sm:text-sm hover:bg-court dark:hover:bg-[#60A5FA] hover:text-paper dark:hover:text-slate-900 transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} ${project.demoLabel || 'demo'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {project.demoLabel || "Demo"}
                    </motion.a>
                  )}
                  {project.medium && (
                    <motion.a
                      href={project.medium}
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-espresso/5 border-2 border-espresso/20 rounded-lg text-espresso font-medium text-xs sm:text-sm hover:bg-espresso hover:text-paper transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read ${project.title} article on Medium`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BookOpen className="h-4 w-4" />
                      Article
                    </motion.a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link
            to="/projects"
            className="btn-brutal inline-flex items-center gap-2"
          >
            See all projects
            <ArrowRight className="h-5 w-5" />
          </Link>
          <motion.a
            href="https://github.com/JosephDavisC"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal-outline inline-flex items-center gap-2"
            whileHover={{ scale: 1.02, x: -2, y: -2 }}
            whileTap={{ scale: 0.98, x: 2, y: 2 }}
          >
            <Github className="h-5 w-5" />
            GitHub Profile
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
