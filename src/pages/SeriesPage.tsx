import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Play, Clapperboard, Sparkles } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import OptimizedImage from "@/components/shared/OptimizedImage";
import Lightbox from "@/components/sections/Lightbox";
import { track } from "@/lib/track";
import { type Episode, newestFirst, formatPosted, shortEmbed } from "@/lib/episodes";
import episodesBySeries from "@/data/episodes.json";

// A series page under /projects/:slug (projectPages.json entries with kind "series").
// Every episode opens in the shared Lightbox video mode, so nothing loads from
// YouTube until someone presses play.
export type SeriesData = {
  slug: string;
  kind: "series";
  name: string;
  oneLiner: string;
  meta: string;
  art: { src: string; alt: string; w: number; h: number };
  accounts: { label: string; handle: string; href: string }[];
  ogImage: string;
  seo: { title: string; description: string };
  howItsMade: { intro: string; steps: { title: string; body: string }[] };
};

const linkSmall =
  "inline-flex items-center gap-1 font-mono text-xs text-espresso/70 dark:text-slate-300 underline decoration-espresso/30 dark:decoration-slate-500 underline-offset-2 hover:text-court-dark dark:hover:text-[#60A5FA] hover:decoration-current transition-colors";

const SectionTitle = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-heading font-bold text-espresso dark:text-slate-100 mb-5">
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-espresso bg-court/20 dark:border-[#60A5FA]/40 dark:bg-[#60A5FA]/10">
      <Icon className="h-5 w-5 text-court-dark dark:text-[#60A5FA]" />
    </span>
    {children}
  </h2>
);

// The 9:16 cover, clickable with a mouse or finger. It is out of the tab order and
// hidden from screen readers: each episode already has one labelled play control
// (its title, or the Watch button on the featured card), so the cover would only be
// a duplicate stop. Hover lifts the play badge and nudges the image; motion-reduce
// keeps both still.
function CoverButton({ ep, onPlay, sizes, eager }: { ep: Episode; onPlay: () => void; sizes: string; eager?: boolean }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      tabIndex={-1}
      aria-hidden="true"
      className={`group/cover relative block ${sizes} shrink-0 overflow-hidden rounded-lg border-2 border-espresso dark:border-slate-600 bg-espresso`}
    >
      <OptimizedImage
        src={ep.cover}
        alt={ep.coverAlt}
        width={540}
        height={960}
        loading={eager ? "eager" : "lazy"}
        pictureClassName="block"
        className="block w-full h-auto aspect-[9/16] object-cover transition-transform duration-500 ease-out group-hover/cover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/cover:scale-100"
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 group-hover/cover:bg-black/20 transition-colors">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-espresso bg-paper text-espresso shadow-brutal-sm dark:border-white/20 dark:bg-[#141B2D]/80 dark:text-slate-100 dark:shadow-none dark:backdrop-blur-sm transition-transform duration-200 group-hover/cover:scale-110 motion-reduce:transition-none motion-reduce:group-hover/cover:scale-100">
          <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}

const NewTab = () => <span className="sr-only"> (opens in a new tab)</span>;

// Same three links, in the same order, as the crawler fallback in generate-static-pages.js
const EpisodeLinks = ({ ep }: { ep: Episode }) => (
  <p className="flex flex-wrap gap-x-3 gap-y-1">
    {[
      ["YouTube", `https://www.youtube.com/shorts/${ep.youtubeId}`],
      ["TikTok", ep.tiktok],
      ["Instagram", ep.instagram],
    ].map(([label, href]) => (
      <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={linkSmall}>
        <span className="sr-only">Ep {ep.n} on </span>
        {label}
        <NewTab />
        <ExternalLink className="h-3 w-3" aria-hidden="true" />
      </a>
    ))}
  </p>
);

export default function SeriesPage({ page }: { page: SeriesData }) {
  const episodes = newestFirst((episodesBySeries as Record<string, Episode[]>)[page.slug] ?? []);
  const latest = episodes[0];
  const [playing, setPlaying] = React.useState<Episode | null>(null);
  const play = (ep: Episode) => {
    setPlaying(ep);
    track("episode-play", { series: page.slug, episode: String(ep.n) });
  };
  const url = `https://joechamdani.com/projects/${page.slug}/`;
  const og = `https://joechamdani.com${page.ogImage}`;

  return (
    <div className="min-h-screen bg-paper dark:bg-[#141B2D]">
      <Helmet>
        <title>{page.seo.title}</title>
        <meta name="description" content={page.seo.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={page.seo.title} />
        <meta property="og:description" content={page.seo.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={og} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={og} />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-2 text-espresso/70 dark:text-slate-400 hover:text-espresso dark:hover:text-slate-200 font-mono text-sm group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none" /> All projects
          </Link>

          {/* Hero */}
          <header className="mt-8 mb-14 grid gap-8 md:grid-cols-[1fr_18rem] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold rounded-full border-2 border-espresso bg-tennis text-espresso dark:bg-[#60A5FA]/15 dark:text-[#60A5FA] dark:border-[#60A5FA]/50">
                <Clapperboard className="h-3.5 w-3.5" /> {page.meta}
              </span>
              <h1 className="mt-5 text-4xl md:text-6xl font-heading font-bold tracking-tight text-espresso dark:text-slate-100">{page.name}</h1>
              <p className="mt-4 text-xl md:text-2xl text-espresso/80 dark:text-slate-300 leading-snug max-w-2xl">{page.oneLiner}</p>
              <ul className="mt-6 flex flex-wrap gap-3" aria-label="Where to watch">
                {page.accounts.map((a) => (
                  <li key={a.href}>
                    <a href={a.href} target="_blank" rel="noopener noreferrer" className="btn-brutal-outline inline-flex items-center gap-2 px-4 py-2 text-sm">
                      {a.label} <span className="font-mono text-xs opacity-80">{a.handle}</span>
                      <NewTab />
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-brutal overflow-hidden max-w-[18rem] w-full mx-auto md:mx-0 md:rotate-2 md:hover:rotate-0 motion-reduce:md:hover:rotate-2">
              <OptimizedImage src={page.art.src} alt={page.art.alt} width={page.art.w} height={page.art.h} loading="eager" fetchPriority="high" pictureClassName="block" className="block w-full h-auto" />
            </div>
          </header>

          {/* Latest episode, always computed from the data */}
          {latest && (
            <section className="mb-16" aria-labelledby="latest-heading">
              <div className="card-brutal p-4 sm:p-6 flex gap-4 sm:gap-8 items-center">
                <CoverButton ep={latest} onPlay={() => play(latest)} sizes="w-28 sm:w-44 md:w-52" eager />
                <div className="min-w-0">
                  <p className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-court-dark dark:text-[#60A5FA]">
                    <Sparkles className="h-3.5 w-3.5" /> Latest · Ep {latest.n}
                  </p>
                  <h2 id="latest-heading" className="mt-2 text-2xl md:text-4xl font-heading font-bold tracking-tight text-espresso dark:text-slate-100">
                    <span className="sr-only">Latest episode: </span>{latest.title}
                  </h2>
                  <p className="mt-1 font-mono text-xs sm:text-sm text-espresso/70 dark:text-slate-400">Posted {formatPosted(latest.posted)}</p>
                  <p className="mt-3 text-base md:text-lg leading-relaxed text-espresso/80 dark:text-slate-300">{latest.line}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <button type="button" onClick={() => play(latest)} className="btn-brutal inline-flex items-center gap-2 text-base">
                      <Play className="h-5 w-5" fill="currentColor" /> Watch Ep {latest.n}
                    </button>
                    <EpisodeLinks ep={latest} />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Every episode, newest first */}
          <section className="mb-16" aria-labelledby="episodes-heading">
            <SectionTitle icon={Play}><span id="episodes-heading">Episodes</span></SectionTitle>
            <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {episodes.map((ep) => (
                <li key={ep.n} className="card-brutal p-3 flex flex-col">
                  <CoverButton ep={ep} onPlay={() => play(ep)} sizes="w-full" />
                  <p className="mt-3 font-mono text-xs text-espresso/70 dark:text-slate-400">
                    <span className="font-bold text-court-dark dark:text-[#60A5FA]">Ep {ep.n}</span> · {formatPosted(ep.posted)}
                  </p>
                  <h3 className="mt-1 font-heading font-bold text-lg leading-tight text-espresso dark:text-slate-100">
                    <button type="button" onClick={() => play(ep)} className="text-left hover:text-court-dark dark:hover:text-[#60A5FA] transition-colors">
                      <span className="sr-only">Play Ep {ep.n}: </span>
                      {ep.title}
                    </button>
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-espresso/80 dark:text-slate-300 flex-1">{ep.line}</p>
                  <div className="mt-3">
                    <EpisodeLinks ep={ep} />
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* How it's made */}
          <section aria-labelledby="made-heading">
            <SectionTitle icon={Clapperboard}><span id="made-heading">How it's made</span></SectionTitle>
            <p className="text-lg leading-relaxed text-espresso/80 dark:text-slate-300 max-w-3xl">{page.howItsMade.intro}</p>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.howItsMade.steps.map((s, i) => (
                <li key={s.title} className="card-brutal p-5">
                  <span className="font-mono text-sm text-court-dark dark:text-[#60A5FA]">0{i + 1}</span>
                  <h3 className="mt-1 font-heading font-bold text-lg text-espresso dark:text-slate-100">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-espresso/80 dark:text-slate-300">{s.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
      <Footer />
      {playing && (
        <Lightbox
          src=""
          video={{ src: shortEmbed(playing.youtubeId), title: `${page.name}, Episode ${playing.n}: ${playing.title}` }}
          onClose={() => setPlaying(null)}
        />
      )}
    </div>
  );
}
