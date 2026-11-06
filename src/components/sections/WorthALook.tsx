import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import articles from '@/data/articles.json';

const latest = articles[0];

const cardClass =
  'card-brutal p-5 flex items-start justify-between gap-3 h-full';

const Body = ({ label, title }: { label: string; title: string }) => (
  <>
    <span>
      <span className="block font-mono text-xs uppercase tracking-widest text-espresso/60 dark:text-slate-400 mb-1.5">
        {label}
      </span>
      <span className="block font-heading font-semibold text-espresso dark:text-slate-100 leading-snug">
        {title}
      </span>
    </span>
    <ArrowUpRight className="h-5 w-5 shrink-0 text-court-dark dark:text-[#60A5FA]" />
  </>
);

// A short set of pointers, so the shorter homepage still leads people to the best stuff.
export default function WorthALook() {
  return (
    <section aria-labelledby="worth-a-look" className="px-6 py-12 bg-paper">
      <div className="max-w-6xl mx-auto">
        <h2 id="worth-a-look" className="text-2xl font-heading font-bold text-espresso dark:text-slate-100 mb-5">
          Worth a look
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <a href="https://cateroute.com" target="_blank" rel="noopener noreferrer" className={cardClass}>
            <Body label="Building now" title="Cateroute" />
          </a>
          <Link to="/projects/transfer-tool" className={cardClass}>
            <Body label="1st place, UW Claude Hackathon" title="AI Transfer Evaluation Tool" />
          </Link>
          <Link to={`/blog/${latest.id}`} className={cardClass}>
            <Body label="Latest post" title={latest.title} />
          </Link>
        </div>
      </div>
    </section>
  );
}
