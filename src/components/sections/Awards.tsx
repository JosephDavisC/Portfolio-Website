import React from 'react';
import { m } from 'framer-motion';
import { Trophy, Medal, Award as AwardIcon, GraduationCap } from 'lucide-react';

type Honor = {
  rank: string;
  title: string;
  org: string;
  year: string;
  detail?: string;
  icon: React.ComponentType<{ className?: string }>;
};

const honors: Honor[] = [
  {
    rank: '1st',
    title: 'UW Claude Hackathon',
    org: 'Anthropic Claude Builder Club @ UW',
    year: '2025',
    detail: 'AI Transfer Evaluation Tool',
    icon: Trophy,
  },
  {
    rank: 'Scholar',
    title: 'UW Spence Transfer Fund Scholar',
    org: 'University of Washington',
    year: '2026',
    icon: GraduationCap,
  },
  {
    rank: 'Scholar',
    title: 'BC Foundation Scholarship',
    org: 'Bellevue College',
    year: '2024/25',
    icon: AwardIcon,
  },
  {
    rank: '3rd',
    title: 'Best Action Plan',
    org: 'Student Summit on Global Citizenship, BINUS School Bekasi',
    year: '2023',
    icon: Medal,
  },
];

const Awards = () => {
  return (
    <section id="awards" className="py-16 px-6 bg-paper-dark">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-espresso">
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
          <p className="text-espresso/60 text-xl max-w-2xl mx-auto font-mono">
            Recognition from hackathons, summits, and scholarships.
          </p>
        </m.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {honors.map((h, i) => {
            const Icon = h.icon;
            return (
              <m.div
                key={h.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 200 }}
                viewport={{ once: true }}
                className="card-brutal p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-court/20 dark:bg-[#60A5FA]/20 border-2 border-court dark:border-[#60A5FA] flex items-center justify-center">
                    <Icon className="h-6 w-6 text-court-dark dark:text-[#60A5FA]" />
                  </div>
                  <span className="px-3 py-1 text-sm font-bold font-mono rounded-full bg-court/20 dark:bg-[#60A5FA]/20 text-court-dark dark:text-[#60A5FA] border-2 border-court dark:border-[#60A5FA]/50">
                    {h.rank}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-semibold text-espresso dark:text-slate-100">
                  {h.title}
                </h3>
                {h.detail && (
                  <p className="text-sm text-court-dark dark:text-[#60A5FA] font-mono mt-1">{h.detail}</p>
                )}
                <p className="text-espresso/70 dark:text-slate-400 text-sm mt-2 leading-relaxed flex-1">
                  {h.org}
                </p>
                <p className="text-espresso/50 dark:text-slate-500 text-sm font-mono mt-4">{h.year}</p>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Awards;
