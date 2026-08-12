import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, X, ChevronDown, ChevronUp, Briefcase, Users, GraduationCap, ArrowRight } from "lucide-react";
import data from "@/data/milestones.json";

/* Cache-bust for images: appends a version so browsers/CDN fetch a fresh copy
   instead of serving a stale/corrupt cached one (images are cached immutable).
   Bump this number if a stale image ever sticks again. */
const IMG_V = "2";
const bust = (src: string) =>
  src ? `${src}${src.includes("?") ? "&" : "?"}v=${IMG_V}` : src;

/* ---------- Types matching the JSON ---------- */
type Media = { src: string; caption: string; href?: string };
type Role = {
  title: string;
  dates: string;
  meta?: string;
  location?: string;
  bullets: string[];
  detailsLink?: string;
  media?: Media[];
};
type Company = {
  name: string;
  category: string;
  logo: string;
  website?: string | null;
  meta: string;
  location: string;
  roles: Role[];
};
type MilestonesData = {
  linkedinFallback: string;
  categories: string[];
  companies: Company[];
};

/* ---------- Category Icons ---------- */
const categoryIcons: Record<string, React.ReactNode> = {
  All: null,
  Internships: <Briefcase className="h-4 w-4" />,
  Clubs: <Users className="h-4 w-4" />,
  Work: <GraduationCap className="h-4 w-4" />,
};

/* ---------- Lightbox ---------- */
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!src) return null;
  return (
    <div
      className="fixed inset-0 z-[100] bg-espresso/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="absolute top-4 right-4 p-2 rounded-lg bg-paper border-2 border-espresso shadow-brutal-sm hover:shadow-brutal text-espresso transition-all"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <img loading="lazy" decoding="async"
        src={bust(src)}
        alt={alt || "image"}
        className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl border-2 border-espresso shadow-brutal-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ---------- Dotted meta row ---------- */
const MetaRow = ({ items }: { items: React.ReactNode[] }) => {
  const filtered = items.filter(Boolean);
  return (
    <div className="text-espresso/60 dark:text-slate-400 text-sm font-mono flex flex-wrap items-center gap-x-1 gap-y-1">
      {filtered.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          {i > 0 && <span className="mx-1 text-espresso/40 dark:text-slate-500 leading-none">·</span>}
          {item}
        </span>
      ))}
    </div>
  );
};

/* ---------- Component ---------- */
export default function Milestones() {
  const { companies, linkedinFallback, categories } = data as MilestonesData;
  const [lightboxSrc, setLightboxSrc] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(
    new Set(companies.map((c) => c.name)) // Start with all expanded
  );

  // Filter companies by category
  const filteredCompanies = useMemo(() => {
    if (activeCategory === "All") return companies;
    return companies.filter((c) => c.category === activeCategory);
  }, [companies, activeCategory]);

  // Toggle individual company
  const toggleCompany = (name: string) => {
    setExpandedCompanies((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  // Expand/Collapse all (only for filtered companies)
  const expandAll = () => {
    setExpandedCompanies(new Set(filteredCompanies.map((c) => c.name)));
  };

  const collapseAll = () => {
    setExpandedCompanies(new Set());
  };

  const allExpanded = filteredCompanies.every((c) => expandedCompanies.has(c.name));
  const allCollapsed = filteredCompanies.every((c) => !expandedCompanies.has(c.name));

  return (
    <section id="milestones" className="py-16 px-6 bg-paper-dark dark:bg-[#0F1521]">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-espresso dark:text-slate-100">
            <span className="relative inline-block">
              Milestones
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
          <p className="text-espresso/60 dark:text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed font-mono">
            My professional journey and experiences along the way
          </p>
        </m.div>

        {/* Category Filter Tabs */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm border-2 transition-all ${
                activeCategory === category
                  ? "bg-court dark:bg-[#60A5FA]/15 text-paper dark:text-[#60A5FA] border-espresso dark:border-[#60A5FA]/40 shadow-brutal-sm dark:shadow-none"
                  : "bg-paper dark:bg-slate-800/50 text-espresso dark:text-slate-300 border-espresso/30 dark:border-slate-600 hover:border-espresso dark:hover:border-slate-500 hover:shadow-brutal-sm dark:hover:shadow-none"
              }`}
            >
              {categoryIcons[category]}
              {category}
              {category !== "All" && (
                <span className="text-xs opacity-70">
                  ({companies.filter((c) => c.category === category).length})
                </span>
              )}
            </button>
          ))}
        </m.div>

        {/* Expand/Collapse All Buttons */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex justify-center gap-3 mb-8"
        >
          <button
            onClick={expandAll}
            disabled={allExpanded}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              allExpanded
                ? "bg-espresso/5 dark:bg-slate-800/30 text-espresso/40 dark:text-slate-500 border-espresso/10 dark:border-slate-700 cursor-not-allowed"
                : "bg-paper dark:bg-slate-800/50 text-espresso/70 dark:text-slate-400 border-espresso/20 dark:border-slate-600 hover:border-espresso/40 dark:hover:border-slate-500 hover:text-espresso dark:hover:text-slate-300"
            }`}
          >
            <ChevronDown className="h-3.5 w-3.5" />
            Expand All
          </button>
          <button
            onClick={collapseAll}
            disabled={allCollapsed}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              allCollapsed
                ? "bg-espresso/5 dark:bg-slate-800/30 text-espresso/40 dark:text-slate-500 border-espresso/10 dark:border-slate-700 cursor-not-allowed"
                : "bg-paper dark:bg-slate-800/50 text-espresso/70 dark:text-slate-400 border-espresso/20 dark:border-slate-600 hover:border-espresso/40 dark:hover:border-slate-500 hover:text-espresso dark:hover:text-slate-300"
            }`}
          >
            <ChevronUp className="h-3.5 w-3.5" />
            Collapse All
          </button>
        </m.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-espresso/20 dark:bg-slate-600 md:left-4" />

          <div className="space-y-6">
            <AnimatePresence mode="sync">
              {filteredCompanies.map((company) => {
                const isExpanded = expandedCompanies.has(company.name);

                return (
                  <m.div
                    key={company.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative pl-10 md:pl-12"
                  >
                    {/* Timeline dot */}
                    <span className="absolute left-0 top-3 h-3 w-3 rounded-full bg-court dark:bg-[#60A5FA] border-2 border-espresso dark:border-[#60A5FA] shadow-brutal-sm dark:shadow-none" />

                    {/* Company header (clickable) */}
                    <button
                      onClick={() => toggleCompany(company.name)}
                      className="w-full text-left mb-4 flex items-center gap-3 group relative z-10"
                    >
                      <a
                        href={company.website || linkedinFallback}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0"
                        aria-label={`${company.name} website`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img loading="lazy" decoding="async"
                          src={bust(company.logo)}
                          alt={company.name}
                          className={`h-12 w-12 rounded-lg object-contain p-1 border-2 border-espresso dark:border-slate-600 shadow-brutal-sm dark:shadow-none hover:shadow-brutal dark:hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all ${company.logo.endsWith('.svg') ? 'bg-white dark:bg-white' : 'bg-paper dark:bg-slate-800'}`}
                        />
                      </a>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100 truncate">
                            {company.name}
                          </h3>
                          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-espresso/10 dark:bg-slate-700 text-espresso/60 dark:text-slate-400 border border-espresso/20 dark:border-slate-600">
                            {company.category}
                          </span>
                        </div>
                        <MetaRow
                          items={[
                            <span key="meta">{company.meta}</span>,
                            <span key="loc" className="hidden sm:inline">{company.location}</span>,
                          ]}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-espresso/50 dark:text-slate-500 group-hover:text-espresso dark:group-hover:text-slate-300 transition-colors">
                        <span className="text-xs font-mono hidden sm:block">
                          {company.roles.length} role{company.roles.length > 1 ? "s" : ""}
                        </span>
                        <m.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </m.div>
                      </div>
                    </button>

                    {/* Roles (collapsible) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <m.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          {company.roles.map((role, i) => (
                            <m.div
                              key={`${company.name}-${i}`}
                              initial={{ opacity: 0, y: 16 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              whileHover={{ y: -4 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                              className="card-brutal p-6 md:p-7 mb-4 first:mt-2"
                            >
                              <MetaRow
                                items={[
                                  <span
                                    key="dates"
                                    className="inline-flex items-center gap-2"
                                  >
                                    <Calendar className="h-4 w-4" />
                                    {role.dates}
                                  </span>,
                                  role.meta ? <span key="kind">{role.meta}</span> : null,
                                  role.location ? (
                                    <span
                                      key="rLoc"
                                      className="inline-flex items-center gap-2"
                                    >
                                      <MapPin className="h-4 w-4" />
                                      {role.location}
                                    </span>
                                  ) : null,
                                ]}
                              />

                              <h4 className="text-lg font-heading font-semibold text-espresso dark:text-slate-100 mt-2 mb-3">
                                {role.title}
                              </h4>

                              <ul className="list-disc pl-5 space-y-1.5 text-espresso/80 dark:text-slate-300 mb-4">
                                {role.bullets.map((b, bi) => (
                                  <li key={bi}>{b}</li>
                                ))}
                              </ul>

                              {/* View Details Button */}
                              {role.detailsLink && (
                                <Link
                                  to={role.detailsLink}
                                  className="btn-brutal inline-flex items-center gap-2 mb-4"
                                >
                                  View Details
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              )}

                              {role.media?.length ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                  {role.media.map((m, mi) => {
                                    const Img = (
                                      <img loading="lazy" decoding="async"
                                        src={bust(m.src)}
                                        alt={m.caption}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                      />
                                    );
                                    return (
                                      <figure
                                        key={mi}
                                        className={`group relative rounded-lg overflow-hidden border-2 border-espresso/30 dark:border-slate-600 ${m.src.endsWith('.svg') ? 'bg-white dark:bg-white' : 'bg-paper dark:bg-slate-800/50'}`}
                                      >
                                        {m.href ? (
                                          <a
                                            href={m.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full h-36 sm:h-40 md:h-44"
                                            aria-label={`Open ${m.caption} in new tab`}
                                          >
                                            {Img}
                                            <span className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 text-base font-bold rounded-lg bg-court dark:bg-[#60A5FA]/15 text-paper dark:text-[#60A5FA] border-2 border-espresso dark:border-[#60A5FA]/40 shadow-brutal-sm dark:shadow-none group-hover:scale-110 transition-transform">
                                              ↗
                                            </span>
                                          </a>
                                        ) : (
                                          <button
                                            className="block w-full h-36 sm:h-40 md:h-44 cursor-zoom-in"
                                            onClick={() => setLightboxSrc(m.src)}
                                            aria-label={`Open ${m.caption}`}
                                          >
                                            {Img}
                                          </button>
                                        )}
                                        <figcaption className="absolute inset-x-0 bottom-0 text-xs text-paper dark:text-slate-100 font-mono bg-gradient-to-t from-espresso/90 via-espresso/60 to-transparent dark:from-slate-900/95 dark:via-slate-900/70 dark:to-transparent px-3 py-2.5">
                                          {m.caption}
                                        </figcaption>
                                      </figure>
                                    );
                                  })}
                                </div>
                              ) : null}
                            </m.div>
                          ))}
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Empty state */}
        {filteredCompanies.length === 0 && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-espresso/50 dark:text-slate-500"
          >
            <p className="font-mono">No experiences found in this category.</p>
          </m.div>
        )}
      </div>

      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc("")} />
      )}
    </section>
  );
}
