import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Linkedin, Building2 } from 'lucide-react';

type Rec = {
  quote: string;
  author: string;
  role: string;
  date: string;
  image: string;
  linkedin: string;
  company: string;
};

// Verbatim LinkedIn recommendations (received).
const recommendations: Rec[] = [
  {
    quote:
      "Despite the different time zone, Jo consistently delivers exceptional work and adds great value to the team. Not only did he contribute to building an automated vulnerability detection system, but he also produced an outstanding research paper. His insights and expertise play a crucial role in shaping the direction of our ongoing projects. Jo's ability to analyze complex problems and propose effective solutions significantly enhances our team's performance.",
    author: 'Arfiki Kenan',
    role: 'Entrepreneur · Trader · Athlete',
    date: 'Feb 2026',
    image: '/images/testimonials/arfiki-kenan.webp',
    linkedin: 'https://www.linkedin.com/in/arfikikenan/',
    company: 'Sector',
  },
  {
    quote:
      "I've had the pleasure of working closely with Joseph since our time at Bellevue College, where we collaborated through the Bellevue College Tech Club, BC Hacks, and several hackathons including UW Bothell Hacks. What makes Joseph exceptional is how quickly he picks up new concepts and turns them into working solutions, often learning entire frameworks mid-hackathon and shipping features by the deadline. He thrives in fast-paced environments and has this rare ability to stay calm and focused when things get chaotic. But what really makes working with Joseph rewarding is his reliability and positive energy.",
    author: 'Abraham Guan',
    role: 'Data Science @ UC Berkeley',
    date: 'Nov 2025',
    image: '/images/testimonials/abraham-guan.webp',
    linkedin: 'https://www.linkedin.com/in/abraham-guan/',
    company: 'Bellevue College',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-espresso">
            What People{' '}
            <span className="relative inline-block">
              Say
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
            Recommendations from people I have worked with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {recommendations.map((r, i) => (
            <motion.figure
              key={r.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 200 }}
              viewport={{ once: true }}
              className="card-brutal p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <Quote className="h-8 w-8 text-court dark:text-[#60A5FA] shrink-0" />
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-court/20 dark:bg-[#60A5FA]/20 text-court-dark dark:text-[#60A5FA] rounded-full border-2 border-court dark:border-[#60A5FA]/50 font-mono">
                  <Building2 className="h-3.5 w-3.5" />
                  {r.company}
                </span>
              </div>

              <blockquote className="text-base md:text-lg text-espresso dark:text-slate-100 leading-relaxed flex-1">
                {r.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-4">
                <a
                  href={r.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${r.author} on LinkedIn`}
                  className="shrink-0"
                >
                  <img
                    src={r.image}
                    alt={r.author}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border-2 border-court dark:border-[#60A5FA] hover:border-court-dark dark:hover:border-white transition-colors"
                  />
                </a>
                <div>
                  <a
                    href={r.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-heading font-semibold text-espresso dark:text-slate-100 hover:text-court-dark dark:hover:text-[#60A5FA] transition-colors"
                  >
                    {r.author}
                    <Linkedin className="h-4 w-4 text-court-dark dark:text-[#60A5FA]" />
                  </a>
                  <p className="text-sm text-espresso/60 dark:text-slate-400 font-mono">
                    {r.role} · {r.date}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
