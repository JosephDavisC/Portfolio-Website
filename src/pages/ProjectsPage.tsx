import React, { useState } from 'react';
import { m, AnimatePresence, LazyMotion, useReducedMotion } from 'framer-motion';

// The app loads framer's lighter domAnimation set; the filter's slide-into-place needs
// layout animation (domMax). Load it for this page only, so other pages stay light.
const loadLayoutFeatures = () => import('framer-motion').then((mod) => mod.domMax);
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Github, ExternalLink, BookOpen, FileText, ArrowLeft, Play } from 'lucide-react';
import Lightbox from '@/components/sections/Lightbox';
import Navbar from '@/components/shared/Navbar';
import { getWebPPath, hasWebP } from '@/components/shared/OptimizedImage';
import projectsData from '@/data/projects.json';

// Filtering animates in place: cards that leave fade out, cards that stay slide to their
// new slot, new cards fade in, all at once. A short tween, not a spring, so nothing
// overshoots, and the stagger is capped so a long list never trickles in.
const EASE = [0.22, 1, 0.36, 1] as const;
const cardMotion = (i: number, reduce: boolean | null) => ({
  initial: reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: reduce ? 0 : 0.22, ease: EASE, delay: reduce ? 0 : Math.min(i * 0.03, 0.15) } },
  exit: { opacity: 0, scale: reduce ? 1 : 0.98, transition: { duration: reduce ? 0 : 0.15, ease: EASE } },
  transition: { layout: { duration: reduce ? 0 : 0.3, ease: EASE } },
});

interface Project {
  title: string;
  category: string;
  featured?: boolean;
  image: string;
  imageAlt?: string;
  imageStyle?: 'cover-purple' | 'contain-white' | 'contain-navy' | 'cover-top';
  tech: string[];
  description: string;
  github?: string;
  demo?: string;
  demoLabel?: string;
  demo2?: string;
  demo2Label?: string;
  demo3?: string;
  demo3Label?: string;
  medium?: string;
  mediumLabel?: string;
  caseStudy?: string;
  // A YouTube video (a Short plays vertical) opened in the shared viewer
  video?: { youtubeId: string; label: string; title: string };
}

const getImageClasses = (style?: string) => {
  switch (style) {
    case 'cover-purple':
      return 'h-44 w-full object-contain bg-[#4c3183]';
    case 'contain-white':
      return 'h-44 w-full object-contain bg-white p-2';
    case 'contain-navy':
      return 'h-44 w-full object-contain bg-[#222a48]';
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
  const reduceMotion = useReducedMotion();
  const [video, setVideo] = useState<Project['video'] | null>(null);

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

      <div className="min-h-screen bg-paper">
        <Navbar />

        <main className="pt-24 pb-16 px-6" role="main" aria-label="Projects portfolio">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/"
              state={{ scrollTo: 'portfolio' }}
              className="link-underline inline-flex items-center text-espresso/60 dark:text-slate-400 hover:text-espresso dark:hover:text-slate-200 transition-colors mb-8 group font-mono"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-espresso dark:text-slate-100">
                All{" "}
                <span className="relative inline-block">
                  Projects
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
              </h1>
              <p className="text-espresso/60 dark:text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed font-mono">
                A collection of projects spanning AI, web development, and game development
              </p>
            </m.div>

            <m.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center gap-3 mb-12 flex-wrap"
              aria-label="Project category filter"
            >
              {categories.map((category) => (
                <m.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-5 py-2 rounded-full text-sm font-mono font-medium transition-all duration-300 border-2 ${
                    activeCategory === category
                      ? 'bg-court dark:bg-[#60A5FA]/15 text-espresso dark:text-[#60A5FA] border-espresso dark:border-[#60A5FA]/40 shadow-brutal-sm dark:shadow-none'
                      : 'bg-paper dark:bg-slate-800 text-espresso dark:text-slate-200 border-espresso/20 dark:border-slate-600 hover:border-espresso/40 dark:hover:border-slate-500'
                  }`}
                >
                  {category}
                </m.button>
              ))}
            </m.nav>

            <LazyMotion features={loadLayoutFeatures}>
            <section
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label={`${activeCategory} projects`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredProjects.map((project, i) => (
                  <m.article
                    key={project.title}
                    layout={!reduceMotion}
                    {...cardMotion(i, reduceMotion)}
                    whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.2, ease: EASE } }}
                    // card-brutal transitions "all" on an overshooting curve; scoped here so CSS
                    // doesn't fight the per-frame transform and opacity motion writes
                    style={{ transitionProperty: 'box-shadow, border-color, background-color, color' }}
                    className="card-brutal p-5 flex flex-col group"
                  >
                    <figure className="relative overflow-hidden rounded-lg border-2 border-espresso dark:border-slate-600">
                      {/* See Portfolio.tsx for why this is a hand-rolled <picture>
                          instead of <OptimizedImage>: m.img carries motion props. */}
                      <picture className="block">
                        {hasWebP(project.image) && (
                          <source srcSet={getWebPPath(project.image)} type="image/webp" />
                        )}
                        <m.img
                          src={project.image}
                          alt={project.imageAlt || project.title}
                          className={`${getImageClasses(project.imageStyle)}`}
                          loading="lazy"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                      </picture>
                      <span className="absolute top-3 right-3 px-3 py-1 bg-tennis dark:bg-slate-800 text-espresso dark:text-slate-100 font-mono text-xs font-bold border-2 border-espresso dark:border-slate-600 rounded-full shadow-brutal-sm">
                        {project.category}
                      </span>
                    </figure>

                    <h2 className="mt-4 text-xl font-heading font-semibold text-espresso dark:text-slate-100 group-hover:text-court-dark dark:group-hover:text-[#60A5FA] transition-colors">
                      {project.title}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-espresso/5 dark:bg-slate-700/80 text-espresso/70 dark:text-slate-200 border border-espresso/20 dark:border-slate-500/50 rounded-full text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-0.5 bg-espresso/5 dark:bg-slate-700/80 text-espresso/70 dark:text-slate-300 border border-espresso/20 dark:border-slate-500/50 rounded-full text-xs font-mono">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    <p className="text-espresso/70 dark:text-slate-300 mt-4 mb-5 leading-relaxed text-sm flex-grow">
                      {project.description}
                    </p>

                    {(project.github || project.demo || project.medium || project.video) && (
                      <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t-2 border-espresso/10 dark:border-slate-700">
                        {project.video && (
                          <button
                            type="button"
                            onClick={() => setVideo(project.video)}
                            className="btn-brutal inline-flex items-center gap-2 px-4 py-2 text-sm"
                          >
                            <Play className="h-4 w-4" />
                            {project.video.label}
                          </button>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            className="btn-brutal inline-flex items-center gap-2 px-4 py-2 text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            className="btn-brutal-outline inline-flex items-center gap-2 px-4 py-2 text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            {project.demoLabel || "Demo"}
                          </a>
                        )}
                        {project.demo2 && (
                          <a
                            href={project.demo2}
                            className="btn-brutal-outline inline-flex items-center gap-2 px-4 py-2 text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            {project.demo2Label || "Demo"}
                          </a>
                        )}
                        {project.demo3 && (
                          <a
                            href={project.demo3}
                            className="btn-brutal-outline inline-flex items-center gap-2 px-4 py-2 text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            {project.demo3Label || "Demo"}
                          </a>
                        )}
                        {project.caseStudy && (
                          <a
                            href={project.caseStudy}
                            className="btn-brutal-outline inline-flex items-center gap-2 px-4 py-2 text-sm"
                            {...(project.caseStudy.startsWith('http') && { target: "_blank", rel: "noopener noreferrer" })}
                          >
                            <FileText className="h-4 w-4" />
                            Case Study
                          </a>
                        )}
                        {project.medium && (
                          <a
                            href={project.medium}
                            className="btn-brutal-outline inline-flex items-center gap-2 px-4 py-2 text-sm"
                            {...(project.medium.startsWith('http') && { target: "_blank", rel: "noopener noreferrer" })}
                          >
                            <BookOpen className="h-4 w-4" />
                            {project.mediumLabel || "Article"}
                          </a>
                        )}
                      </div>
                    )}
                  </m.article>
                ))}
              </AnimatePresence>
            </section>
            </LazyMotion>

            {video && (
              <Lightbox
                src=""
                video={{
                  src: `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`,
                  title: video.title,
                }}
                onClose={() => setVideo(null)}
              />
            )}

            {filteredProjects.length === 0 && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-espresso/60 dark:text-slate-400 text-lg font-mono">No projects found in this category.</p>
              </m.div>
            )}

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <Link
                to="/"
                state={{ scrollTo: 'portfolio' }}
                className="btn-brutal-outline inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Home
              </Link>
              <m.a
                href="https://github.com/JosephDavisC"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal inline-flex items-center gap-2"
                whileHover={{ scale: 1.02, x: -2, y: -2 }}
                whileTap={{ scale: 0.98, x: 2, y: 2 }}
              >
                <Github className="h-5 w-5" />
                More on GitHub
              </m.a>
            </m.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProjectsPage;
