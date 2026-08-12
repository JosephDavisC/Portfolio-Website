import React from "react";
import { m } from "framer-motion";
import { Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, type: "spring", stiffness: 200 },
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
    name: "Google Project Management",
    issuer: "Google",
    year: "Issued Aug 2026",
    href: "/credential/google-project-management",
    logo: "/logos/google.webp",
    logoAlt: "Google",
  },
  {
    name: "Google Data Analytics",
    issuer: "Google",
    year: "Issued Aug 2025",
    href: "/credential/google-data-analytics",
    logo: "/logos/google.webp",
    logoAlt: "Google",
  },
  {
    name: "Unity 3D Programming",
    issuer: "Ideosource Venture Building",
    year: "Issued Jul 2022",
    href: "/credential/starcamp-unity",
    logo: "/logos/ideosource.webp",
    logoAlt: "Ideosource",
  },
  {
    name: "UX Research & UX Design",
    issuer: "Ideosource Venture Building",
    year: "Issued Sep 2022",
    href: "/credential/starcamp-ux",
    logo: "/logos/ideosource.webp",
    logoAlt: "Ideosource",
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
    <section id="certifications" className="py-16 px-6 pb-20 bg-paper">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-espresso">
            <span className="relative inline-block">
              Credentials
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
          <p className="text-espresso/60 text-xl max-w-3xl mx-auto leading-relaxed font-mono">
            Courses and certifications I've completed along the way
          </p>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {certifications.map((cert, i) => (
            <m.article
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card-brutal p-6 flex flex-col items-center text-center group"
            >
              {/* Award icon */}
              <div className="w-full flex justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-tennis/30 dark:bg-[#60A5FA]/20 border-2 border-espresso dark:border-[#60A5FA]/50 flex items-center justify-center">
                  <Award className="h-5 w-5 text-espresso dark:text-[#60A5FA]" />
                </div>
              </div>

              {/* Logo */}
              {cert.logo && (
                <div className="h-24 w-24 rounded-xl overflow-hidden bg-paper border-2 border-espresso/20 flex items-center justify-center mb-6 shadow-brutal-sm">
                  <img
                    src={cert.logo}
                    alt={cert.logoAlt || cert.issuer}
                    className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 w-full">
                <h3 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100 mb-3 group-hover:text-court-dark dark:group-hover:text-[#60A5FA] transition-colors min-h-[3.5rem] flex items-center justify-center">
                  {cert.name}
                </h3>
                <div className="flex items-center justify-center gap-2 text-espresso/70 dark:text-slate-300 mb-2 min-h-[2.5rem]">
                  {cert.logo && (
                    <div className="h-4 w-4 rounded overflow-hidden bg-paper border border-espresso/20 dark:border-slate-600 flex items-center justify-center">
                      <img
                        src={cert.logo}
                        alt=""
                        className="h-3 w-3 object-contain"
                      />
                    </div>
                  )}
                  <p className="text-sm font-mono">{cert.issuer}</p>
                </div>
                <p className="text-espresso/50 dark:text-slate-400 text-xs mb-6 font-mono">{cert.year}</p>
              </div>

              {/* Button */}
              {cert.href && (
                <button
                  onClick={() => openCredential(cert.href!)}
                  className="btn-brutal w-full inline-flex items-center justify-center text-sm"
                >
                  Show credential ↗
                </button>
              )}
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
