import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Trophy, Users, Target, Lightbulb, AlertCircle } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import OptimizedImage from "@/components/shared/OptimizedImage";
import NotFound from "@/pages/NotFound";
import Lightbox from "@/components/sections/Lightbox";
import SeriesPage, { type SeriesData } from "@/pages/SeriesPage";
import pages from "@/data/projectPages.json";

type Competitor = { name: string; good: string; gap: string; source: string };
type Img = { src: string; alt: string; caption: string };
type Person = { name: string; url: string; note?: string; box: [number, number, number, number] };

// "Who's who" on the team photo. Desktop: hover or keyboard focus shows a name tag and a
// click opens the profile. Touch: the first tap shows the tag (with the profile link inside
// it), so a tap never jumps away before you can read the name.
function PeoplePhoto({ photo, people }: { photo: Img; people: Person[] }) {
  const [active, setActive] = React.useState<number | null>(null);
  // How the last press started: a finger gets "show the name first", a mouse goes straight to the profile
  const pointer = React.useRef<string>("mouse");
  return (
    <figure className="mb-6">
      <div className="card-brutal overflow-hidden relative" onPointerLeave={(e) => { if (e.pointerType === "mouse") setActive(null); }}>
        <OptimizedImage src={photo.src} alt={photo.alt} width={1600} height={900} className="w-full h-auto block" />
        {people.map((p, i) => {
          const [left, top, width, height] = p.box;
          const on = active === i;
          return (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name}${p.note ? `, ${p.note}` : ""}: open profile`}
              onPointerDown={(e) => { pointer.current = e.pointerType; }}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") setActive(i); }}
              onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) setActive(i); }}
              onBlur={() => setActive(null)}
              onClick={(e) => { if (pointer.current !== "mouse" && pointer.current !== "pen" && !on) { e.preventDefault(); setActive(i); } }}
              className={`absolute rounded-xl transition-all duration-200 ${on ? "ring-2 ring-tennis dark:ring-[#60A5FA] bg-white/10" : "ring-0"} ${i === people.length - 1 ? "z-20" : "z-10"}`}
              style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
            >
              <span
                className={`pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border-2 border-espresso bg-paper px-2.5 py-1 text-xs sm:text-sm font-semibold text-espresso shadow-brutal-sm dark:border-[#60A5FA]/50 dark:bg-[#141B2D] dark:text-slate-100 transition-all duration-200 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
              >
                {p.name}
                {p.note && <span className="font-normal text-espresso/70 dark:text-slate-400"> · {p.note}</span>}
                <span className="sm:hidden font-normal text-court-dark dark:text-[#60A5FA]"> · tap again ↗</span>
              </span>
            </a>
          );
        })}
      </div>
      <figcaption className="mt-3 text-sm text-center font-mono italic text-espresso/60 dark:text-slate-400">
        {photo.caption}
        <span className="not-italic"> · </span>
        <span className="hidden [@media(hover:hover)]:inline">Hover to see who's who</span>
        <span className="[@media(hover:hover)]:hidden">Tap a person to see who's who</span>
      </figcaption>
    </figure>
  );
}
type Page = {
  slug: string; name: string; oneLiner: string; badge: string; meta: string;
  links: { label: string; href: string; primary?: boolean }[];
  video: { youtubeId: string; title: string };
  seo: { title: string; description: string };
  problem: { body: string[] };
  audience: { who: string; why: string };
  competitors: Competitor[];
  solution: { insight: string; feature: string; steps: { title: string; body: string }[]; images: Img[] };
  outputs?: { title: string; body: string; src: string; alt: string; w: number; h: number }[];
  scopeNote: string;
  team: { role: string; members: { name: string; url: string }[]; result: string; photo?: Img & { people?: Person[] } };
  next?: { body: string };
  ogImage?: string;
};

const SectionTitle = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-heading font-bold text-espresso dark:text-slate-100 mb-5">
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-espresso bg-court/20 dark:border-[#60A5FA]/40 dark:bg-[#60A5FA]/10">
      <Icon className="h-5 w-5 text-court-dark dark:text-[#60A5FA]" />
    </span>
    {children}
  </h2>
);

const ProjectPage = () => {
  const { slug } = useParams();
  const page = (pages as unknown as Record<string, Page>)[slug || ""];

  // Images open full size in the shared Lightbox, the same way blog articles do: one
  // delegated listener on the content wrapper. Images inside a link (the who's-who
  // hotspots sit beside the photo, not around it) keep their own behaviour.
  // Declared above the early return, because hooks cannot be conditional.
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = React.useState<{ src: string; alt: string } | null>(null);
  React.useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const onClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement)?.closest?.("img") as HTMLImageElement | null;
      if (!img || !root.contains(img) || img.closest("a")) return;
      e.preventDefault();
      setLightbox({ src: img.currentSrc || img.src, alt: img.alt });
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [slug, page]);

  if (!page) return <NotFound />;
  // A series (episodes) page shares the route and data file, not the case-study layout
  if ((page as unknown as { kind?: string }).kind === "series") return <SeriesPage page={page as unknown as SeriesData} />;
  const url = `https://joechamdani.com/projects/${page.slug}/`;

  return (
    <div className="min-h-screen bg-paper dark:bg-[#141B2D]">
      <Helmet>
        <title>{page.seo.title}</title>
        <meta name="description" content={page.seo.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={page.seo.title} />
        <meta property="og:description" content={page.seo.description} />
        <meta property="og:url" content={url} />
        {page.ogImage && <meta property="og:image" content={`https://joechamdani.com${page.ogImage}`} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-24 px-6">
        <div ref={contentRef} className="article-body max-w-4xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-2 text-espresso/60 dark:text-slate-400 hover:text-espresso dark:hover:text-slate-200 font-mono text-sm">
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>

          {/* Hero */}
          <header className="mt-8 mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold rounded-full border-2 border-espresso bg-tennis text-espresso dark:bg-[#60A5FA]/15 dark:text-[#60A5FA] dark:border-[#60A5FA]/50">
              <Trophy className="h-3.5 w-3.5" /> {page.badge}
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-heading font-bold tracking-tight text-espresso dark:text-slate-100">{page.name}</h1>
            <p className="mt-4 text-xl md:text-2xl text-espresso/80 dark:text-slate-300 leading-snug max-w-3xl">{page.oneLiner}</p>
            <p className="mt-3 font-mono text-sm text-espresso/60 dark:text-slate-400">{page.meta}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {page.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`${l.primary ? "btn-brutal" : "btn-brutal-outline"} inline-flex items-center gap-2 text-sm`}>
                  {l.label} <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          </header>

          {/* Demo video near the top */}
          <section className="card-brutal overflow-hidden mb-14" aria-label="Demo video">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${page.video.youtubeId}?rel=0`}
                title={page.video.title}
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          {/* The problem */}
          <section className="mb-14">
            <SectionTitle icon={AlertCircle}>The problem</SectionTitle>
            {page.problem.body.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-espresso/80 dark:text-slate-300 mb-4">{p}</p>
            ))}
          </section>

          {/* Who it's for */}
          <section className="mb-14">
            <SectionTitle icon={Users}>Who it's for</SectionTitle>
            <div className="card-brutal p-6">
              <p className="text-lg font-semibold text-espresso dark:text-slate-100">{page.audience.who}</p>
              <p className="mt-3 text-lg leading-relaxed text-espresso/80 dark:text-slate-300">{page.audience.why}</p>
            </div>
          </section>

          {/* Competitors */}
          <section className="mb-14">
            <SectionTitle icon={Target}>What students use today</SectionTitle>
            <div className="grid gap-4 md:grid-cols-3">
              {page.competitors.map((c) => (
                <article key={c.name} className="card-brutal p-5 flex flex-col">
                  <h3 className="font-heading font-bold text-lg text-espresso dark:text-slate-100">{c.name}</h3>
                  <p className="mt-3 text-xs font-mono uppercase tracking-wider text-court-dark dark:text-[#60A5FA]">Does well</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-espresso/80 dark:text-slate-300">{c.good}</p>
                  <p className="mt-4 text-xs font-mono uppercase tracking-wider text-red-700 dark:text-red-400">The gap</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-espresso/80 dark:text-slate-300 flex-1">{c.gap}</p>
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-espresso/60 dark:text-slate-400 hover:text-court-dark dark:hover:text-[#60A5FA]">
                    Source <ExternalLink className="h-3 w-3" />
                  </a>
                </article>
              ))}
            </div>
          </section>

          {/* The solution */}
          <section className="mb-14">
            <SectionTitle icon={Lightbulb}>The solution</SectionTitle>
            <blockquote className="border-l-4 border-court dark:border-[#60A5FA] pl-5 text-xl md:text-2xl font-heading font-semibold leading-snug text-espresso dark:text-slate-100">
              {page.solution.insight}
            </blockquote>
            <p className="mt-6 text-lg leading-relaxed text-espresso/80 dark:text-slate-300">{page.solution.feature}</p>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {page.solution.steps.map((s, i) => (
                <li key={s.title} className="card-brutal p-5">
                  <span className="font-mono text-sm text-court-dark dark:text-[#60A5FA]">0{i + 1}</span>
                  <h3 className="mt-1 font-heading font-bold text-lg text-espresso dark:text-slate-100">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-espresso/80 dark:text-slate-300">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 space-y-8">
              {page.solution.images.map((im) => (
                <figure key={im.src}>
                  <div className="card-brutal overflow-hidden">
                    <OptimizedImage src={im.src} alt={im.alt} width={1600} height={1000} className="w-full h-auto block" />
                  </div>
                  <figcaption className="mt-3 text-sm text-center font-mono italic text-espresso/60 dark:text-slate-400">{im.caption}</figcaption>
                </figure>
              ))}
            </div>
            {page.outputs?.length ? (
              <div className="mt-12">
                <h3 className="font-heading font-bold text-xl md:text-2xl text-espresso dark:text-slate-100 mb-5">What you walk away with</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {page.outputs.map((o) => (
                    <figure key={o.src} className="card-brutal p-5 flex flex-col">
                      <h4 className="font-heading font-bold text-lg text-espresso dark:text-slate-100">{o.title}</h4>
                      <p className="mt-2 text-[15px] leading-relaxed text-espresso/80 dark:text-slate-300">{o.body}</p>
                      <div className="mt-4 rounded-lg overflow-hidden border-2 border-espresso/20 dark:border-white/10">
                        <OptimizedImage src={o.src} alt={o.alt} width={o.w} height={o.h} className="w-full h-auto block" />
                      </div>
                    </figure>
                  ))}
                </div>
              </div>
            ) : null}
            <p className="mt-6 text-sm font-mono text-espresso/60 dark:text-slate-400">{page.scopeNote}</p>
          </section>

          {/* Team and result */}
          <section className="mb-14">
            <SectionTitle icon={Trophy}>Team and result</SectionTitle>
            {page.team.photo && (page.team.photo.people?.length ? (
              <PeoplePhoto photo={page.team.photo} people={page.team.photo.people} />
            ) : (
              <figure className="mb-6">
                <div className="card-brutal overflow-hidden">
                  <OptimizedImage src={page.team.photo.src} alt={page.team.photo.alt} width={1600} height={900} className="w-full h-auto block" />
                </div>
                <figcaption className="mt-3 text-sm text-center font-mono italic text-espresso/60 dark:text-slate-400">{page.team.photo.caption}</figcaption>
              </figure>
            ))}
            <div className="card-brutal p-6">
              <p className="text-lg text-espresso dark:text-slate-100"><span className="font-semibold">Joseph's role:</span> {page.team.role}</p>
              <p className="mt-3 text-lg leading-relaxed text-espresso/80 dark:text-slate-300">{page.team.result}</p>
              <p className="mt-3 font-mono text-sm text-espresso/60 dark:text-slate-400">
                With{" "}
                {page.team.members.slice(1).map((m, i, all) => (
                  <React.Fragment key={m.name}>
                    <a href={m.url} target="_blank" rel="noopener noreferrer" className="underline decoration-court/60 dark:decoration-[#60A5FA]/60 underline-offset-2 hover:text-court-dark dark:hover:text-[#60A5FA]">{m.name}</a>
                    {i < all.length - 2 ? ", " : i === all.length - 2 ? " and " : ""}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </section>

          {/* What's next: only when there is real copy for it */}
          {page.next?.body && (
            <section>
              <SectionTitle icon={Lightbulb}>What's next</SectionTitle>
              <p className="text-lg leading-relaxed text-espresso/80 dark:text-slate-300">{page.next.body}</p>
            </section>
          )}
        </div>
      </main>
      <Footer />
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </div>
  );
};

export default ProjectPage;
