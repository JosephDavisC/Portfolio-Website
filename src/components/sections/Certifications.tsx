import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};
const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };

type Cert = {
  name: string;
  issuer: string;
  year: string;
  href?: string;
  logo?: string;
  logoAlt?: string;
};

const certifications: Cert[] = [
  {
    name: "Google Data Analytics",
    issuer: "Google",
    year: "Issued Aug 2025",
    href: "/credential/google-data-analytics",
    logo: "/logos/google.png",
    logoAlt: "Google",
  },
  {
    name: "Unity 3D Programming",
    issuer: "StarCamp Asia",
    year: "Issued Jul 2022",
    href: "/credential/starcamp-unity",
    logo: "/logos/starcamp-logo.jpg",
    logoAlt: "StarCamp Asia",
  },
  {
    name: "UX Research & UX Design",
    issuer: "StarCamp Asia",
    year: "Issued Sep 2022",
    href: "/credential/starcamp-ux",
    logo: "/logos/starcamp-logo.jpg",
    logoAlt: "StarCamp Asia",
  },
];

export default function Certifications() {
  const navigate = useNavigate();

  const openCredential = (href: string) => {
    const base = window.location.pathname || "/";
    window.history.replaceState(null, "", `${base}#certifications`);
    navigate(href, { state: { from: `${base}#certifications` } });
  };

  return (
    <section id="certifications" className="py-12 px-6 pb-20 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent pb-2">
            Certifications
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Courses and certifications I've completed along the way
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group flex flex-col items-center text-center hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
            >
              <div className="w-full flex justify-start mb-4">
                <Award className="h-7 w-7 text-yellow-400" />
              </div>

              {cert.logo && (
                <div className="h-24 w-24 rounded-2xl overflow-hidden bg-white/10 border border-white/10 flex items-center justify-center mb-6">
                  <img
                    src={cert.logo}
                    alt={cert.logoAlt || cert.issuer}
                    className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}

              <div className="flex-1 w-full">
                <h3 className="text-xl font-semibold text-red-400 mb-3">
                  {cert.name}
                </h3>
                <div className="flex items-center justify-center gap-2 text-slate-300 mb-2">
                  {cert.logo && (
                    <div className="h-4 w-4 rounded overflow-hidden bg-white/10 border border-white/10 flex items-center justify-center">
                      <img
                        src={cert.logo}
                        alt=""
                        className="h-3 w-3 object-contain"
                      />
                    </div>
                  )}
                  <p className="text-sm">{cert.issuer}</p>
                </div>
                <p className="text-slate-400 text-xs mb-6">{cert.year}</p>
              </div>

              {cert.href && (
                <button
                  onClick={() => openCredential(cert.href!)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all group-hover:translate-y-[-2px] transform duration-200 text-sm"
                >
                  Show credential ↗
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}