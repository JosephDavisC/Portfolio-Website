import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };

type Cert = { name: string; issuer: string; year: string; href?: string };

const certifications: Cert[] = [
  { name: "Google Data Analytics", issuer: "Google", year: "In Progress" },
  { name: "Unity 3D Programming", issuer: "StarCamp Asia", year: "Issued Jul 2022", href: "/credential/starcamp-unity" },
  { name: "UX Research & UX Design", issuer: "StarCamp Asia", year: "Issued Sep 2022", href: "/credential/starcamp-ux" }
];

export default function Certifications() {
  const navigate = useNavigate();

  // Ensure Back comes back to /#certifications
  const openCredential = (href: string) => {
    const base = window.location.pathname || "/";
    // rewrite current entry so Back lands at the section
    window.history.replaceState(null, "", `${base}#certifications`);
    // carry the info to CredentialPage too
    navigate(href, { state: { from: `${base}#certifications` } });
  };

  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            Certifications
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {certifications.map((cert, i) => {
            const isLastOdd = i === certifications.length - 1 && certifications.length % 2 === 1;

            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={[
                  "bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300",
                  isLastOdd ? "md:col-span-2 md:max-w-3xl md:mx-auto" : ""
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center">
                    <Award className="h-7 w-7 text-yellow-400 mr-4" />
                    {cert.href ? (
                      <Link
                        to={cert.href}
                        onClick={(e) => {
                          e.preventDefault();
                          openCredential(cert.href!);
                        }}
                        className="text-xl font-semibold hover:underline"
                      >
                        {cert.name}
                      </Link>
                    ) : (
                      <h3 className="text-xl font-semibold">{cert.name}</h3>
                    )}
                  </div>

                  {cert.href && (
                    <button
                      onClick={() => openCredential(cert.href!)}
                      className="hidden md:inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1 text-sm text-slate-200 hover:bg-white/10"
                      aria-label="Show credential"
                    >
                      Show credential ↗
                    </button>
                  )}
                </div>

                <p className="text-slate-400 text-lg">{cert.issuer}</p>
                <p className="text-slate-500">{cert.year}</p>

                {cert.href && (
                  <button
                    onClick={() => openCredential(cert.href!)}
                    className="mt-4 md:hidden inline-flex w-full items-center justify-center rounded-xl border border-white/20 px-4 py-2 text-slate-200 hover:bg-white/10"
                  >
                    View credential
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
