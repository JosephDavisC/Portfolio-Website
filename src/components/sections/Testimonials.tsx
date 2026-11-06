import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Quote, Linkedin, Building2 } from 'lucide-react';
import OptimizedImage from '@/components/shared/OptimizedImage';
import experiences from '@/data/experiences.json';

type Rec = {
  quote: string;
  author: string;
  role: string;
  date?: string;
  image: string;
  linkedin: string;
  company: string;
};

// Verbatim LinkedIn recommendations (received). Work recommendations come from
// experiences.json so the homepage and each experience page always agree; the
// homepage shows a chosen few, the experience pages show them all.
const HOMEPAGE = ['Stevien Washington', 'Muhammad Sirajudin Abbas', 'Arfiki Kenan'];
const fromExperiences = (['whitespace', 'sector'] as const)
  .flatMap((slug) => (experiences[slug].testimonials ?? []) as Rec[])
  .filter((r) => HOMEPAGE.includes(r.author));

const recommendations: Rec[] = [
  ...fromExperiences,
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

// The quote text is verbatim, so long ones are clipped on screen, never edited.
const LONG_QUOTE_WORDS = 45;
const QuoteText = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  const isLong = text.split(/\s+/).length > LONG_QUOTE_WORDS;
  return (
    <div className="flex-1">
      <blockquote
        className={`text-base md:text-lg text-espresso dark:text-slate-100 leading-relaxed ${
          isLong && !open ? 'line-clamp-4' : ''
        }`}
      >
        {text}
      </blockquote>
      {isLong && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-2 font-mono text-sm text-court-dark dark:text-[#60A5FA] underline underline-offset-2"
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {recommendations.map((r, i) => (
            <m.figure
              key={r.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.15), type: 'spring', stiffness: 200 }}
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

              <QuoteText text={r.quote} />

              <figcaption className="mt-6 flex items-center gap-4">
                <a
                  href={r.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${r.author} on LinkedIn`}
                  className="shrink-0"
                >
                  <OptimizedImage
                    src={r.image}
                    alt={r.author}
                    pictureClassName="block"
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
                    {r.date ? `${r.role} · ${r.date}` : r.role}
                  </p>
                </div>
              </figcaption>
            </m.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
