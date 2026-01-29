import React from "react";
import { Link } from "react-router-dom";
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
  Presentation,
  ArrowUpRight,
  Play,
  Clock
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Internship data
const internship = {
  company: "Sector",
  logo: "/logos/Sector_Icon_logo.png",
  role: "AI Research & Development Intern",
  type: "Internship",
  duration: "Aug 2025 – Present · 6 mos",
  location: "Jakarta, Indonesia · Hybrid",
  website: "https://sector.co.id",
  description: "Sector is a cybersecurity company specializing in penetration testing and security operations. As an AI R&D intern, I developed AI-powered tools to enhance their security workflows, built internal products, and contributed to the team's knowledge through research papers and presentations.",

  highlights: [
    "Built an AI Labeling System for the XOps internal platform, automating data classification and improving workflow efficiency",
    "Authored 2 research papers on AI applications in cybersecurity and threat detection methodologies",
    "Delivered research presentations to the Sector team, sharing insights on AI/ML techniques and best practices",
    "Developed AI tools to accelerate penetration testing and cybersecurity operations",
    "Built automated threat detection systems that identify and flag security vulnerabilities",
    "Trained AI models on XOps data to automate data processing, improving efficiency by 20% over manual regex-based methods"
  ],

  technologies: [
    "Python", "Machine Learning", "NLP", "LLMs",
    "Data Labeling", "Cybersecurity", "Git", "Research"
  ],

  impact: [
    { metric: "Product Shipped", value: "1" },
    { metric: "Research Papers", value: "2" },
    { metric: "Team Size", value: "20+" },
  ],

  testimonial: {
    quote: "Joseph demonstrated exceptional initiative in both development and research. His AI Labeling System became a core part of our XOps workflow, and his research presentations helped elevate the team's understanding of AI applications in security.",
    author: "Engineering Lead",
    company: "Sector"
  },

  // Products built during internship
  products: [
    {
      name: "AI Labeling System",
      description: "An intelligent data labeling platform for the XOps internal system that automates classification of security data, reducing manual work and improving workflow efficiency.",
      tech: ["Python", "Machine Learning", "NLP", "FastAPI"],
      status: "In Production",
      link: null // Add link if available
    }
  ],

  // Research papers authored
  researchPapers: [
    {
      title: "AI vs Human Hacker: Who Wins?",
      description: "Discover how AI is transforming the cyber threat landscape. This research report compares AI speed vs. human creativity in hacking and penetration testing.",
      date: "2025",
      link: "https://sector.co.id/AIvsHumanResearch",
      status: "Published"
    },
    {
      title: "AI-Powered Threat Detection Systems",
      description: "A comprehensive study on utilizing AI and machine learning for identifying and classifying security threats in real-time data streams.",
      date: "2025",
      link: null,
      status: "Coming Soon"
    }
  ],

  // Video demo (placeholder for now)
  videoDemo: {
    title: "AI Labeling System Demo",
    description: "Watch a walkthrough of the AI Labeling System in action",
    videoUrl: null, // Add video URL when available
    thumbnail: "/logos/Sector_Icon_logo.png"
  }
};

export default function InternshipPage() {
  return (
    <>
      <Helmet>
        <title>Sector Internship | Joseph Chamdani</title>
        <meta name="description" content="AI Research & Development internship at Sector - Building AI tools for cybersecurity and penetration testing." />
        <link rel="canonical" href="https://joechamdani.com/experience/sector" />

        {/* Open Graph */}
        <meta property="og:title" content="Sector Internship | Joseph Chamdani" />
        <meta property="og:description" content="AI Research & Development internship at Sector - Building AI tools for cybersecurity and penetration testing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://joechamdani.com/experience/sector" />
        <meta property="og:image" content="https://joechamdani.com/logos/Sector_Icon_logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sector Internship | Joseph Chamdani" />
        <meta name="twitter:description" content="AI Research & Development internship at Sector - Building AI tools for cybersecurity and penetration testing." />
      </Helmet>

      <Navbar />

      <section className="min-h-screen pt-28 pb-24 px-4 sm:px-6 bg-paper dark:bg-[#141B2D]">
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
                <span className="px-3 py-1 bg-court/20 dark:bg-[#F97316]/20 text-court-dark dark:text-[#F97316] text-xs font-mono font-semibold rounded-full border border-court/30 dark:border-[#F97316]/30">
                  {internship.type}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-espresso dark:text-slate-100 mb-2">
                {internship.role}
              </h1>
              <p className="text-xl text-court-dark dark:text-[#F97316] font-semibold">
                {internship.company}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-espresso/70 dark:text-slate-300 font-mono text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-court-dark dark:text-[#F97316]" />
              {internship.duration}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-court-dark dark:text-[#F97316]" />
              {internship.location}
            </div>
            {internship.website && (
              <a
                href={internship.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-court-dark dark:hover:text-[#F97316] transition-colors"
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
              <div className="text-2xl md:text-3xl font-bold text-court-dark dark:text-[#F97316] mb-1">
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
              <div className="w-10 h-10 rounded-lg bg-court/20 dark:bg-[#F97316]/20 border-2 border-court/30 dark:border-[#F97316]/30 flex items-center justify-center">
                <Rocket className="h-5 w-5 text-court-dark dark:text-[#F97316]" />
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
                  <CheckCircle2 className="h-5 w-5 text-court dark:text-[#F97316] mt-0.5 flex-shrink-0" />
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
              <div className="w-10 h-10 rounded-lg bg-court/20 dark:bg-[#F97316]/20 border-2 border-court/30 dark:border-[#F97316]/30 flex items-center justify-center">
                <Package className="h-5 w-5 text-court-dark dark:text-[#F97316]" />
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
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-court to-court-dark dark:from-orange-500 dark:to-red-600 border-2 border-espresso dark:border-transparent shadow-brutal-sm dark:shadow-none flex items-center justify-center flex-shrink-0">
                      <Code2 className="h-7 w-7 text-paper" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100 group-hover:text-court-dark dark:group-hover:text-[#F97316] transition-colors">
                          {product.name}
                        </h3>
                        <span className="px-2.5 py-0.5 bg-court/20 dark:bg-green-500/20 text-court-dark dark:text-green-400 text-xs font-mono font-semibold rounded-full border border-court/30 dark:border-green-500/30">
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
                        className="inline-flex items-center gap-2 px-4 py-2 bg-court dark:bg-[#F97316] text-paper font-semibold rounded-lg border-2 border-espresso dark:border-slate-600 shadow-brutal-sm dark:shadow-none hover:shadow-brutal dark:hover:bg-[#FB923C] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all text-sm"
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
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-court dark:bg-[#F97316] rounded-full blur-3xl" />
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
                      className="inline-flex items-center gap-2 text-court-dark dark:text-[#F97316] font-medium text-sm hover:underline"
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

            <div className="grid md:grid-cols-2 gap-4">
              {internship.researchPapers.map((paper, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="card-brutal p-6 group relative overflow-hidden"
                >
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-court/10 dark:from-[#F97316]/10 to-transparent rounded-bl-full" />

                  <div className="relative">
                    {/* Paper number badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-espresso dark:bg-slate-600 text-paper dark:text-slate-100 flex items-center justify-center text-sm font-bold font-mono">
                        {i + 1}
                      </div>
                      <span className="text-xs text-espresso/50 dark:text-slate-500 font-mono">
                        {paper.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-semibold text-espresso dark:text-slate-100 mb-3 group-hover:text-court-dark dark:group-hover:text-[#F97316] transition-colors leading-tight">
                      {paper.title}
                    </h3>

                    <p className="text-espresso/70 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      {paper.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {paper.link ? (
                        <a
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-court dark:bg-[#F97316] text-paper font-semibold rounded-lg border-2 border-espresso dark:border-slate-600 shadow-brutal-sm dark:shadow-none hover:shadow-brutal dark:hover:bg-[#FB923C] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all text-sm"
                        >
                          <FileText className="h-4 w-4" />
                          Read Report
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-espresso/10 dark:bg-slate-700 text-espresso/60 dark:text-slate-400 text-sm font-mono rounded-lg border border-espresso/20 dark:border-slate-600">
                          <Clock className="h-4 w-4" />
                          Coming Soon
                        </div>
                      )}
                    </div>
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
            className="mt-8 card-brutal p-6 md:p-8 bg-court/5 dark:bg-[#F97316]/5 border-court/30 dark:border-[#F97316]/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-court/20 dark:bg-[#F97316]/20 border-2 border-court/30 dark:border-[#F97316]/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-court-dark dark:text-[#F97316]" />
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
