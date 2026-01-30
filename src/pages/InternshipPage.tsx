import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Briefcase,
  Code2,
  Users,
  Rocket,
  CheckCircle2,
  ExternalLink,
  Package,
  FileText,
  ArrowUpRight,
  Play,
  Clock,
  Share2
} from "lucide-react";
import experiencesData from "@/data/experiences.json";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Type definitions
type LinkedinPost = {
  title: string;
  image: string;
  link: string;
};

type ResearchPaper = {
  title: string;
  description: string;
  date: string;
  link: string | null;
  status: string;
  linkedinPosts: LinkedinPost[];
};

type Product = {
  name: string;
  description: string;
  tech: string[];
  status: string;
  link: string | null;
};

type VideoDemo = {
  title: string;
  description: string;
  videoUrl: string | null;
  thumbnail: string;
} | null;

type Testimonial = {
  quote: string;
  author: string;
  company: string;
} | null;

type Theme = {
  primary: string;
  primaryHover: string;
  primaryDark: string;
  gradient: string;
  bgTint: string;
  borderTint: string;
  textColor: string;
};

type SEO = {
  title: string;
  description: string;
  keywords: string[];
};

type Experience = {
  slug: string;
  company: string;
  logo: string;
  role: string;
  type: string;
  duration: string;
  location: string;
  website: string | null;
  description: string;
  theme: Theme;
  seo: SEO;
  highlights: string[];
  technologies: string[];
  impact: { metric: string; value: string }[];
  testimonial: Testimonial;
  products: Product[];
  researchPapers: ResearchPaper[];
  videoDemo: VideoDemo;
};

type ExperiencesData = {
  [key: string]: Experience;
};

export default function InternshipPage() {
  const { slug } = useParams<{ slug: string }>();

  // Get the internship data based on slug
  const experiences = experiencesData as ExperiencesData;
  const internship = slug ? experiences[slug] : null;

  // If no matching internship found, redirect to 404
  if (!internship) {
    return <Navigate to="/404" replace />;
  }

  // Get theme colors (with fallback to orange)
  const theme = internship.theme || {
    primary: "#F97316",
    primaryHover: "#FB923C",
    primaryDark: "#EA580C",
    gradient: "from-orange-500 to-red-600",
    bgTint: "bg-orange-500/20",
    borderTint: "border-orange-500/30",
    textColor: "text-[#F97316]"
  };

  // Get SEO data (with fallback)
  const seo = internship.seo || {
    title: `${internship.company} Internship`,
    description: `${internship.role} at ${internship.company}`,
    keywords: []
  };

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": internship.company,
    "url": internship.website || `https://joechamdani.com/experience/${internship.slug}`,
    "logo": `https://joechamdani.com${internship.logo}`,
    "employee": {
      "@type": "Person",
      "name": "Joseph Davis Chamdani",
      "jobTitle": internship.role,
      "worksFor": {
        "@type": "Organization",
        "name": internship.company
      }
    }
  };

  // CSS custom properties for dynamic theming
  const themeStyles = {
    "--accent-primary": theme.primary,
    "--accent-hover": theme.primaryHover,
    "--accent-dark": theme.primaryDark,
  } as React.CSSProperties;

  return (
    <>
      <Helmet>
        <title>{seo.title} | Joseph Chamdani</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(", ")} />
        <link rel="canonical" href={`https://joechamdani.com/experience/${internship.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${seo.title} | Joseph Chamdani`} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://joechamdani.com/experience/${internship.slug}`} />
        <meta property="og:image" content={`https://joechamdani.com${internship.logo}`} />
        <meta property="og:site_name" content="Joseph Chamdani Portfolio" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${seo.title} | Joseph Chamdani`} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`https://joechamdani.com${internship.logo}`} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <Navbar />

      <section
        className="min-h-screen pt-28 pb-24 px-4 sm:px-6 bg-paper dark:bg-[#141B2D]"
        style={themeStyles}
      >
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              state={{ scrollTo: "milestones" }}
              className="inline-flex items-center gap-2 text-espresso/60 dark:text-slate-400 hover:text-espresso dark:hover:text-slate-200 font-mono mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Milestones
            </Link>
          </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card-brutal p-8 md:p-12 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            {/* Company Logo */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-paper dark:bg-slate-800 border-2 border-espresso dark:border-slate-600 shadow-brutal-sm dark:shadow-none flex items-center justify-center overflow-hidden">
              {internship.logo ? (
                <img
                  src={internship.logo}
                  alt={internship.company}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `<span class="text-3xl font-bold text-espresso dark:text-slate-100">${internship.company[0]}</span>`;
                  }}
                />
              ) : (
                <span className="text-3xl font-bold text-espresso dark:text-slate-100">
                  {internship.company[0]}
                </span>
              )}
            </div>

            {/* Title & Meta */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-3 py-1 text-xs font-mono font-semibold rounded-full border"
                  style={{
                    backgroundColor: `${theme.primary}20`,
                    borderColor: `${theme.primary}50`,
                    color: theme.primary
                  }}
                >
                  {internship.type}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-espresso dark:text-slate-100 mb-2">
                {internship.role}
              </h1>
              <p
                className="text-xl font-semibold"
                style={{ color: theme.primary }}
              >
                {internship.company}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-espresso/70 dark:text-slate-300 font-mono text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" style={{ color: theme.primary }} />
              {internship.duration}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" style={{ color: theme.primary }} />
              {internship.location}
            </div>
            {internship.website && (
              <a
                href={internship.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:opacity-80"
                style={{ color: theme.primary }}
              >
                <ExternalLink className="h-4 w-4" />
                Company Website
              </a>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-espresso/80 dark:text-slate-300 leading-relaxed text-lg">
            {internship.description}
          </p>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {internship.impact.map((item, i) => (
            <div
              key={i}
              className="card-brutal p-4 md:p-6 text-center"
            >
              <div
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: theme.primary }}
              >
                {item.value}
              </div>
              <div className="text-xs md:text-sm text-espresso/60 dark:text-slate-400 font-mono">
                {item.metric}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Key Accomplishments */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="md:col-span-2 card-brutal p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg border-2 flex items-center justify-center"
                style={{
                  backgroundColor: `${theme.primary}20`,
                  borderColor: `${theme.primary}50`
                }}
              >
                <Rocket className="h-5 w-5" style={{ color: theme.primary }} />
              </div>
              <h2 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100">
                Key Accomplishments
              </h2>
            </div>

            <motion.ul
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              {internship.highlights.map((highlight, i) => (
                <motion.li
                  key={i}
                  variants={fadeInUp}
                  className="flex gap-3"
                >
                  <CheckCircle2
                    className="h-5 w-5 mt-0.5 flex-shrink-0"
                    style={{ color: theme.primary }}
                  />
                  <span className="text-espresso/80 dark:text-slate-300 leading-relaxed">
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Technologies */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="card-brutal p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-espresso/10 dark:bg-slate-700 border-2 border-espresso/20 dark:border-slate-600 flex items-center justify-center">
                <Code2 className="h-5 w-5 text-espresso dark:text-slate-300" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100">
                Tech Stack
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {internship.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-espresso/5 dark:bg-slate-700/80 text-espresso/80 dark:text-slate-200 border-2 border-espresso/20 dark:border-slate-600 rounded-lg text-sm font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Products Section */}
        {internship.products?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg border-2 flex items-center justify-center"
                style={{
                  backgroundColor: `${theme.primary}20`,
                  borderColor: `${theme.primary}50`
                }}
              >
                <Package className="h-5 w-5" style={{ color: theme.primary }} />
              </div>
              <h2 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100">
                Products Built
              </h2>
            </div>

            <div className="grid gap-4">
              {internship.products.map((product, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="card-brutal p-6 md:p-8 group"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Product Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theme.gradient} border-2 border-espresso dark:border-transparent shadow-brutal-sm dark:shadow-none flex items-center justify-center flex-shrink-0`}
                    >
                      <Code2 className="h-7 w-7 text-paper" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3
                          className="text-xl font-heading font-semibold text-espresso dark:text-slate-100 group-hover:opacity-80 transition-colors"
                          style={{ "--hover-color": theme.primary } as React.CSSProperties}
                        >
                          {product.name}
                        </h3>
                        <span className="px-2.5 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-mono font-semibold rounded-full border border-green-500/30">
                          {product.status}
                        </span>
                      </div>
                      <p className="text-espresso/70 dark:text-slate-300 leading-relaxed mb-4">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.tech.map((t, ti) => (
                          <span
                            key={ti}
                            className="px-2.5 py-1 bg-espresso/5 dark:bg-slate-700/80 text-espresso/70 dark:text-slate-300 border border-espresso/20 dark:border-slate-600 rounded-md text-xs font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Link Button */}
                    {product.link && (
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-paper font-semibold rounded-lg border-2 border-espresso dark:border-slate-600 shadow-brutal-sm dark:shadow-none hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all text-sm"
                        style={{ backgroundColor: theme.primary }}
                      >
                        View
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Video Demo Section */}
        {internship.videoDemo && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 dark:bg-red-500/20 border-2 border-red-500/30 dark:border-red-500/30 flex items-center justify-center">
                <Play className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100">
                Video Demo
              </h2>
            </div>

            <div className="card-brutal overflow-hidden">
              {internship.videoDemo.videoUrl ? (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={internship.videoDemo.videoUrl}
                    title={internship.videoDemo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-espresso/5 to-espresso/10 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-red-500 rounded-full blur-3xl" />
                  </div>

                  {/* Placeholder content */}
                  <div className="relative z-10 text-center px-6">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-espresso/10 dark:bg-white/10 border-2 border-espresso/20 dark:border-white/20 flex items-center justify-center">
                      <Play className="h-10 w-10 text-espresso/40 dark:text-white/40 ml-1" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100 mb-2">
                      {internship.videoDemo.title}
                    </h3>
                    <p className="text-espresso/60 dark:text-slate-400 mb-4 max-w-md">
                      {internship.videoDemo.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-espresso/10 dark:bg-white/10 text-espresso/60 dark:text-slate-400 text-sm font-mono rounded-lg border border-espresso/20 dark:border-white/20">
                      <Clock className="h-4 w-4" />
                      Video Coming Soon
                    </div>
                  </div>
                </div>
              )}

              {/* Video info bar */}
              <div className="px-6 py-4 border-t-2 border-espresso/10 dark:border-slate-700 bg-paper dark:bg-slate-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-espresso dark:text-slate-100">
                      {internship.videoDemo.title}
                    </p>
                    <p className="text-xs text-espresso/60 dark:text-slate-400 font-mono">
                      Product Walkthrough
                    </p>
                  </div>
                  {internship.videoDemo.videoUrl && (
                    <a
                      href={internship.videoDemo.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-sm hover:underline"
                      style={{ color: theme.primary }}
                    >
                      Watch on YouTube
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Research Papers Section */}
        {internship.researchPapers?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-espresso/10 dark:bg-slate-700 border-2 border-espresso/20 dark:border-slate-600 flex items-center justify-center">
                <FileText className="h-5 w-5 text-espresso dark:text-slate-300" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100">
                Research Papers
              </h2>
            </div>

            <div className="space-y-6">
              {internship.researchPapers.map((paper, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="card-brutal p-6 md:p-8 relative overflow-hidden"
                >
                  {/* Decorative gradient */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10"
                    style={{ background: `linear-gradient(to bottom left, ${theme.primary}, transparent)` }}
                  />

                  <div className="relative">
                    {/* Paper header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-espresso dark:bg-slate-600 text-paper dark:text-slate-100 flex items-center justify-center text-lg font-bold font-mono">
                            {i + 1}
                          </div>
                          <div>
                            <span className="text-xs text-espresso/50 dark:text-slate-500 font-mono block">
                              {paper.date}
                            </span>
                            <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                              paper.status === "Published"
                                ? "bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30"
                            }`}>
                              {paper.status}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100 mb-3">
                          {paper.title}
                        </h3>

                        <p className="text-espresso/70 dark:text-slate-400 leading-relaxed mb-4">
                          {paper.description}
                        </p>

                        {paper.link ? (
                          <a
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm px-5 py-2.5 text-paper font-semibold rounded-xl border-2 border-espresso dark:border-slate-600 shadow-brutal-sm dark:shadow-none hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            style={{ backgroundColor: theme.primary }}
                          >
                            <FileText className="h-4 w-4" />
                            Read Full Report
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-espresso/10 dark:bg-slate-700 text-espresso/60 dark:text-slate-400 text-sm font-mono rounded-lg border border-espresso/20 dark:border-slate-600">
                            <Clock className="h-4 w-4" />
                            Coming Soon
                          </div>
                        )}
                      </div>
                    </div>

                    {/* LinkedIn Posts Grid */}
                    {paper.linkedinPosts && paper.linkedinPosts.length > 0 && (
                      <div className="mt-6 pt-6 border-t-2 border-espresso/10 dark:border-slate-700">
                        <p className="text-sm font-mono text-espresso/60 dark:text-slate-400 mb-4 flex items-center gap-2">
                          <Share2 className="h-4 w-4 text-[#0A66C2]" />
                          LinkedIn Posts
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {paper.linkedinPosts.map((post, pi) => (
                            <a
                              key={pi}
                              href={post.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative rounded-lg overflow-hidden border-2 border-espresso/20 dark:border-slate-600 hover:border-[#0A66C2] dark:hover:border-[#0A66C2] transition-colors"
                            >
                              <div className="aspect-square relative">
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent dark:from-slate-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#0A66C2] text-white text-xs font-semibold rounded-full">
                                    <ArrowUpRight className="h-3 w-3" />
                                    View
                                  </span>
                                </div>
                              </div>
                              <div className="p-2 bg-paper dark:bg-slate-800">
                                <p className="text-xs font-mono text-espresso/70 dark:text-slate-400 truncate">
                                  {post.title}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Testimonial */}
        {internship.testimonial && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 card-brutal p-6 md:p-8"
            style={{
              backgroundColor: `${theme.primary}08`,
              borderColor: `${theme.primary}30`
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg border-2 flex items-center justify-center"
                style={{
                  backgroundColor: `${theme.primary}20`,
                  borderColor: `${theme.primary}50`
                }}
              >
                <Users className="h-5 w-5" style={{ color: theme.primary }} />
              </div>
              <h2 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100">
                Reference
              </h2>
            </div>

            <blockquote className="text-lg text-espresso/80 dark:text-slate-300 italic leading-relaxed mb-4">
              "{internship.testimonial.quote}"
            </blockquote>
            <div className="text-sm text-espresso/60 dark:text-slate-400 font-mono">
              — {internship.testimonial.author}, {internship.testimonial.company}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-espresso/60 dark:text-slate-400 mb-4 font-mono">
            Interested in working together?
          </p>
          <Link
            to="/"
            state={{ scrollTo: "contact" }}
            className="btn-brutal inline-flex items-center gap-2"
          >
            <Briefcase className="h-5 w-5" />
            Get in Touch
          </Link>
        </motion.div>
        </div>
      </section>
    </>
  );
}
