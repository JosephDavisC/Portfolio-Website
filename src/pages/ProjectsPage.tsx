import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Github, ExternalLink, BookOpen, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import projectsData from '@/data/projects.json';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
};

interface Project {
  title: string;
  category: string;
  featured?: boolean;
  image: string;
  imageAlt?: string;
  imageStyle?: 'cover-purple' | 'contain-white' | 'cover-top';
  tech: string[];
  description: string;
  github?: string;
  demo?: string;
  demoLabel?: string;
  medium?: string;
}

const getImageClasses = (style?: string) => {
  switch (style) {
    case 'cover-purple':
      return 'h-44 w-full object-contain bg-[#4c3183]';
    case 'contain-white':
      return 'h-44 w-full object-contain bg-white p-2';
    case 'cover-top':
      return 'h-44 w-full object-cover object-bottom';
    default:
      return 'h-44 w-full object-cover object-center';
  }
};

const projects = projectsData as Project[];

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Projects | Joseph's Portfolio</title>
        <meta name="description" content="Explore Joseph Chamdani's portfolio of AI, web development, and game projects." />
        <link rel="canonical" href="https://joechamdani.com/projects" />

        {/* Open Graph */}
        <meta property="og:title" content="Projects | Joseph's Portfolio" />
        <meta property="og:description" content="Explore Joseph Chamdani's portfolio of AI, web development, and game projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://joechamdani.com/projects" />
        <meta property="og:image" content="https://joechamdani.com/Logo_Joseph.PNG" />
        <meta property="og:site_name" content="Joseph Chamdani" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Joseph's Portfolio" />
        <meta name="twitter:description" content="Explore Joseph Chamdani's portfolio of AI, web development, and game projects." />
        <meta name="twitter:image" content="https://joechamdani.com/Logo_Joseph.PNG" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Joseph Chamdani" />
        <meta name="keywords" content="Joseph Chamdani, portfolio, AI projects, web development, React, Python, TypeScript, game development, software engineer" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Projects | Joseph's Portfolio",
            "description": "A collection of AI, web development, and game development projects by Joseph Chamdani",
            "url": "https://joechamdani.com/projects",
            "author": {
              "@type": "Person",
              "name": "Joseph Chamdani",
              "url": "https://joechamdani.com"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": projectsData.map((project, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "CreativeWork",
                  "name": project.title,
                  "description": project.description,
                  "url": project.demo || project.github,
                  "author": {
                    "@type": "Person",
                    "name": "Joseph Chamdani"
                  }
                }
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Navbar />

        <main className="pt-24 pb-16 px-6" role="main" aria-label="Projects portfolio">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/"
              state={{ scrollTo: 'portfolio' }}
              className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                All Projects
              </h1>
              <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
                A collection of projects spanning AI, web development, and game development
              </p>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center gap-3 mb-12 flex-wrap"
              aria-label="Project category filter"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.nav>

            <AnimatePresence mode="wait">
              <motion.section
                key={activeCategory}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                aria-label={`${activeCategory} projects`}
              >
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.title}
                    variants={fadeInUp}
                    layout
                    className="bg-white/5 backdrop-blur-sm rounded-3xl p-5 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 flex flex-col"
                  >
                    <figure className="relative overflow-hidden rounded-2xl border border-white/10 group-hover:border-blue-400/30">
                      <img
                        src={project.image}
                        alt={project.imageAlt || project.title}
                        className={`${getImageClasses(project.imageStyle)} transition-transform duration-500 group-hover:scale-110`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-xs text-slate-200 rounded-full">
                        {project.category}
                      </span>
                    </figure>

                    <h2 className="mt-4 text-xl font-semibold group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-slate-700/50 text-slate-300 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded-full text-xs">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-400 mt-4 mb-5 leading-relaxed text-sm flex-grow">
                      {project.description}
                    </p>

                    {(project.github || project.demo || project.medium) && (
                      <div className="flex gap-4 mt-auto pt-3 border-t border-white/5">
                        {project.github && (
                          <a
                            href={project.github}
                            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-1.5" />
                            Code
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            className="flex items-center text-rose-400 hover:text-rose-300 transition-colors text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1.5" />
                            {project.demoLabel || "Demo"}
                          </a>
                        )}
                        {project.medium && (
                          <a
                            href={project.medium}
                            className="flex items-center text-green-400 hover:text-green-300 transition-colors text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <BookOpen className="h-4 w-4 mr-1.5" />
                            Article
                          </a>
                        )}
                      </div>
                    )}
                  </motion.article>
                ))}
              </motion.section>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-slate-400 text-lg">No projects found in this category.</p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <Link
                to="/"
                state={{ scrollTo: 'portfolio' }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Home
              </Link>
              <a
                href="https://github.com/JosephDavisC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-slate-200 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <Github className="h-5 w-5" />
                More on GitHub
              </a>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProjectsPage;
