import React from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router';
import { ArrowUpRight, ArrowRight, Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';

const UW_PROFILE = 'https://mge.scholarships.uw.edu/students/joseph-chamdani/';

type Honor = {
  rank: string;
  title: string;
  org: string;
  year: string;
  detail?: string;
  href?: string;
  linkLabel?: string;
  internal?: boolean;
  image?: boolean;
  logo: string;
  logoAlt: string;
};

const honors: Honor[] = [
  {
    rank: '1st place',
    title: 'UW Claude Hackathon',
    org: 'Anthropic Claude Builder Club @ UW',
    year: '2025',
    detail: 'AI Transfer Evaluation Tool',
    href: '/projects/transfer-tool',
    linkLabel: 'Case study',
    internal: true,
    logo: '/logos/claude.svg',
    logoAlt: 'Anthropic logo',
  },
  {
    rank: 'Scholarship',
    title: 'Alan R. Spence Transfer Support Fund',
    org: 'University of Washington',
    year: '2026',
    href: UW_PROFILE,
    linkLabel: 'UW profile',
    logo: '/logos/UW_Logo.webp',
    logoAlt: 'University of Washington logo',
  },
  {
    rank: 'Scholarship',
    title: 'Norman and Camille Stromer Scholarship',
    org: 'Bellevue College Foundation',
    year: '2024/25',
    href: '/docs/awards/bc-stromer-scholarship-2024.webp',
    linkLabel: 'Award letter',
    image: true,
    logo: '/logos/bellevue-college.webp',
    logoAlt: 'Bellevue College logo',
  },
  {
    rank: '3rd place',
    title: 'Best Action Plan',
    org: 'Student Summit on Global Citizenship, BINUS School Bekasi',
    year: '2023',
    href: '/docs/awards/binus-gced-certificate-2023.webp',
    linkLabel: 'Certificate',
    image: true,
    logo: '/logos/binus-school.webp',
    logoAlt: 'BINUS School logo',
  },
];

const Awards = () => {
  const [viewer, setViewer] = React.useState<{ src: string; alt: string } | null>(null);
  return (
    <section id="awards" className="py-10 sm:py-16 px-6 bg-paper-dark">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 text-espresso">
            Awards &{' '}
            <span className="relative inline-block">
              Honors
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
          <p className="text-espresso/60 text-base sm:text-xl max-w-2xl mx-auto font-mono">
            Recognition from hackathons, summits, and scholarships.
          </p>
        </m.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {honors.map((h, i) => {
            return (
              <m.div
                key={h.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.15), type: 'spring', stiffness: 200 }}
                viewport={{ once: true }}
                className="card-brutal p-3 sm:p-6 flex flex-col"
              >
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-5">
                  <span className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white border border-espresso/15 dark:border-white/10 flex items-center justify-center p-1">
                    <img src={h.logo} alt={h.logoAlt} loading="lazy" className="max-w-full max-h-full object-contain" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-espresso/60 dark:text-slate-400 text-right">
                    {h.rank}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-heading font-semibold text-espresso dark:text-slate-100">
                  {h.title}
                </h3>
                {h.detail && (
                  <p className="text-xs sm:text-sm text-court-dark dark:text-[#60A5FA] font-mono mt-1">{h.detail}</p>
                )}
                <p className="text-espresso/70 dark:text-slate-400 text-sm mt-2 leading-relaxed flex-1">
                  {h.org}
                </p>
                <p className="text-espresso/50 dark:text-slate-500 text-xs sm:text-sm font-mono mt-2 sm:mt-4">{h.year}</p>
                {h.href && h.image ? (
                  <button
                    type="button"
                    onClick={() => setViewer({ src: h.href!, alt: `${h.title}, ${h.linkLabel?.toLowerCase()}` })}
                    className="mt-2 self-start inline-flex items-center gap-1 text-xs sm:text-sm font-mono font-semibold text-court-dark dark:text-[#60A5FA] hover:underline underline-offset-4"
                  >
                    {h.linkLabel} <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                ) : h.href && (h.internal ? (
                  <Link
                    to={h.href}
                    className="mt-2 inline-flex items-center gap-1 text-xs sm:text-sm font-mono font-semibold text-court-dark dark:text-[#60A5FA] hover:underline underline-offset-4"
                  >
                    {h.linkLabel} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <a
                    href={h.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs sm:text-sm font-mono font-semibold text-court-dark dark:text-[#60A5FA] hover:underline underline-offset-4"
                  >
                    {h.linkLabel} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </m.div>
            );
          })}
        </div>

        <m.a
          href={UW_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="card-brutal group mt-6 sm:mt-10 flex flex-col sm:flex-row items-stretch gap-5 sm:gap-8 p-5 sm:p-8 bg-[#4B2E83]/[0.04] dark:bg-[#8B6FD1]/[0.08]"
          aria-label="Read Joseph's scholar profile on the University of Washington OMSFA site"
        >
          <div className="shrink-0 self-center sm:self-auto w-32 sm:w-40 rounded-xl border-4 border-[#B7A57A] overflow-hidden bg-[#B7A57A]">
            <picture>
              <source srcSet="/images/uw-scholar-photo.webp" type="image/webp" />
              <img
                src="/images/uw-scholar-photo.jpg"
                alt="Joseph Chamdani, UW scholar profile photo"
                loading="lazy"
                width={400}
                height={533}
                className="w-full h-full object-cover aspect-[3/4]"
              />
            </picture>
          </div>
          <div className="flex-1 flex flex-col justify-center min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-widest text-[#4B2E83] dark:text-[#B9A3E3]">
                University of Washington · Scholar profile
              </p>
              <span className="text-xs font-mono text-espresso/50 dark:text-slate-500">uw.edu</span>
            </div>
            <p className="mt-3 text-2xl sm:text-3xl font-heading font-bold text-[#4B2E83] dark:text-[#CDBFF0]">Joseph Chamdani</p>
            <div className="mt-2 h-1.5 w-28 sm:w-40 bg-[#B7A57A] -skew-x-12" aria-hidden="true" />
            <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#85754D] dark:text-[#D6C9A0]">
              Alan R. Spence Transfer Support Fund · 2026
            </p>
            <blockquote className="mt-4 text-base sm:text-xl font-heading font-semibold text-espresso dark:text-slate-100 leading-snug">
              “I try to treat school less as a checklist to finish and more as a set of tools to build with.”
            </blockquote>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-mono font-semibold text-[#4B2E83] dark:text-[#B9A3E3] group-hover:underline underline-offset-4">
              Read the full profile on UW <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </m.a>
      </div>
      {viewer && <Lightbox src={viewer.src} alt={viewer.alt} onClose={() => setViewer(null)} />}
    </section>
  );
};

export default Awards;
