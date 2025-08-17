import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, X } from "lucide-react";
import data from "@/data/milestones.json";

/* ---------- Types matching the JSON ---------- */
type Media = { src: string; caption: string; href?: string };
type Role = {
  title: string;
  dates: string;
  meta?: string;
  location?: string;
  bullets: string[];
  media?: Media[];
};
type Company = {
  name: string;
  logo: string;
  website?: string | null;
  meta: string;
  location: string;
  roles: Role[];
};
type MilestonesData = { linkedinFallback: string; companies: Company[] };

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
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="absolute top-4 right-4 p-2 rounded-md bg-white/10 hover:bg-white/15 text-white"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <img
        src={src}
        alt={alt || "image"}
        className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ---------- Dotted meta row (like LinkedIn) ---------- */
const MetaRow = ({ items }: { items: React.ReactNode[] }) => {
  const filtered = items.filter(Boolean);
  return (
    <div className="text-slate-400 text-sm flex flex-wrap items-center gap-x-1 gap-y-1">
      {filtered.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          {i > 0 && <span className="mx-1 text-slate-500/80 leading-none">·</span>}
          {item}
        </span>
      ))}
    </div>
  );
};

/* ---------- Component ---------- */
export default function Milestones() {
  const { companies, linkedinFallback } = data as MilestonesData;
  const [lightboxSrc, setLightboxSrc] = useState<string>("");

  return (
    <section id="milestones" className="py-24 px-6 bg-black/20">
      <div className="max-w-5xl mx-auto">
        {/* keep your original title style */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            Milestones
          </h2>
        </motion.div>

        <div className="relative">
          {/* timeline line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10 md:left-4" />

          <div className="space-y-10">
            {companies.map((company) => (
              <div key={company.name} className="relative pl-10 md:pl-12">
                {/* dot */}
                <span className="absolute left-0 top-3 h-2.5 w-2.5 rounded-full bg-pink-400 shadow-[0_0_18px] shadow-pink-500/40" />

                {/* company header with linked logo */}
                <div className="mb-4 flex items-center gap-3">
                  <a
                    href={company.website || linkedinFallback}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                    aria-label={`${company.name} website`}
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-12 w-12 rounded-md object-contain bg-white p-1 border border-white/10 hover:scale-105 transition-transform"
                    />
                  </a>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {company.name}
                    </h3>
                    <MetaRow
                      items={[
                        <span key="meta">{company.meta}</span>,
                        <span key="loc">{company.location}</span>,
                      ]}
                    />
                  </div>
                </div>

                {/* roles */}
                {company.roles.map((role, i) => (
                  <motion.div
                    key={`${company.name}-${i}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7 mb-6"
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

                    <h4 className="text-lg font-semibold text-white mt-2 mb-3">
                      {role.title}
                    </h4>

                    <ul className="list-disc pl-5 space-y-1.5 text-slate-300 mb-4">
                      {role.bullets.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>

                    {/* media grid: anchor if href exists, else lightbox button */}
                    {role.media?.length ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {role.media.map((m, mi) => {
                          const Img = (
                            <img
                              src={m.src}
                              alt={m.caption}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                          );
                          return (
                            <figure
                              key={mi}
                              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5"
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
                                  <span className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded bg-black/50 text-white">
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
                              <figcaption className="absolute inset-x-0 bottom-0 text-xs text-slate-200/90 bg-gradient-to-t from-black/40 to-transparent px-3 py-2">
                                {m.caption}
                              </figcaption>
                            </figure>
                          );
                        })}
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc("")} />
      )}
    </section>
  );
}
