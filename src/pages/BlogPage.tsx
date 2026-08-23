import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { m } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight, ExternalLink, Linkedin } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { articles, shortDate, type Article } from '@/components/sections/Blog';

const pageUrl = 'https://joechamdani.com/blog/';

const meta = (article: Article) =>
  `${shortDate(article.date)}${article.readTime ? ` · ${article.readTime}` : ''}`;

const BlogPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const openArticle = (article: Article) => {
    navigate(`/blog/${article.id}`, { state: { from: '/blog' } });
  };

  // Filtering has to earn its place twice over. A tag needs enough posts to be
  // worth a pill, AND the archive needs enough posts that filtering narrows
  // anything: on a four-post blog, a tag with three posts still shows you
  // almost everything. Both gates are met around seven posts, at which point
  // this row appears on its own. No code change needed when it does.
  const MIN_POSTS_PER_TAG = 3;
  const MIN_POSTS_FOR_FILTERS = 6;

  const filterTags = useMemo(() => {
    if (articles.length < MIN_POSTS_FOR_FILTERS) return [];
    const counts = new Map<string, number>();
    articles.forEach((a) => a.tags?.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
    return [...counts.entries()]
      .filter(([, n]) => n >= MIN_POSTS_PER_TAG)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag, count]) => ({ tag, count }));
  }, []);

  const [activeTag, setActiveTag] = useState('All');
  const isFiltered = activeTag !== 'All';

  const visible = useMemo(
    () => (isFiltered ? articles.filter((a) => a.tags?.includes(activeTag)) : articles),
    [activeTag, isFiltered]
  );

  // The LATEST card means latest overall, so it only leads an unfiltered list.
  // Inside a filter every match reads as an equal row.
  const [featured, ...rest] = isFiltered ? [undefined, ...visible] : visible;
  const featuredExternal = featured && !featured.hasFullArticle
    ? featured.externalLinks?.[0]?.url || featured.externalLink
    : undefined;

  return (
    <div className="min-h-screen bg-paper">
      <Helmet>
        <title>Blog & Articles · Joseph Davis Chamdani</title>
        <meta name="description" content="Stories, experiences, and lessons learned along the way. Articles by Joseph Davis Chamdani on tennis, AI, and the road from Jakarta to Seattle." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Blog & Articles | Joseph Davis Chamdani" />
        <meta property="og:description" content="Stories, experiences, and lessons learned along the way." />
        <meta property="og:image" content="https://joechamdani.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://joechamdani.com/preview.png" />
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            to="/"
            state={{ scrollTo: 'blog' }}
            className="inline-flex items-center text-espresso/60 hover:text-espresso dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-10 group font-mono text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-espresso">
              Blog &{' '}
              <span className="relative inline-block">
                Articles
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
            </h1>
            <p className="text-espresso/60 text-xl max-w-3xl mx-auto leading-relaxed font-mono">
              Stories, experiences, and lessons learned along the way
            </p>
          </m.div>

          {/* Tag filter: appears only once a tag has enough posts to be worth it */}
          {filterTags.length > 0 && (
            <m.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-2 mb-10"
              aria-label="Filter articles by topic"
            >
              {[{ tag: 'All', count: articles.length }, ...filterTags].map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={activeTag === tag}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-sm font-medium border-2 transition-all ${
                    activeTag === tag
                      ? 'bg-court dark:bg-[#60A5FA]/15 text-paper dark:text-[#60A5FA] border-espresso dark:border-[#60A5FA]/40 shadow-brutal-sm dark:shadow-none'
                      : 'bg-paper dark:bg-slate-800/50 text-espresso dark:text-slate-300 border-espresso/25 dark:border-slate-600 hover:border-espresso dark:hover:border-slate-500'
                  }`}
                >
                  {tag}
                  <span className="text-xs opacity-70">({count})</span>
                </button>
              ))}
            </m.nav>
          )}

          {/* Featured (latest), unfiltered view only */}
          {featured && (
          <m.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            whileHover={{ y: -4 }}
            className="relative mb-12"
          >
            <span className="absolute top-3 right-3 z-10 px-3 py-1 bg-tennis dark:bg-slate-800 text-espresso dark:text-[#60A5FA] font-mono text-xs font-bold border-2 border-espresso dark:border-[#60A5FA]/50 rounded-full shadow-brutal-sm dark:shadow-none">
              LATEST
            </span>
            <div
              role="link"
              tabIndex={0}
              onClick={() =>
                featuredExternal ? window.open(featuredExternal, '_blank', 'noopener') : openArticle(featured)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  featuredExternal ? window.open(featuredExternal, '_blank', 'noopener') : openArticle(featured);
                }
              }}
              className="grid md:grid-cols-2 gap-8 items-center card-brutal p-6 md:p-8 group"
              aria-label={`Read ${featured.title}`}
            >
              {featured.thumbnail && (
                <div
                  className="overflow-hidden rounded-lg border-2 border-espresso"
                  style={featured.thumbnailBg ? { backgroundColor: featured.thumbnailBg } : undefined}
                >
                  <img
                    src={`/${featured.thumbnail}`}
                    alt={featured.title}
                    className={`w-full h-56 md:h-72 transition-transform duration-500 group-hover:scale-105 ${
                      featured.thumbnailFit === 'contain' ? 'object-contain p-4' : 'object-cover'
                    }`}
                  />
                </div>
              )}
              <div>
                <p className="text-espresso/60 font-mono text-sm mb-3">{meta(featured)}</p>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-espresso dark:text-slate-100 mb-4 group-hover:text-court-dark dark:group-hover:text-[#60A5FA] transition-colors">
                  {featured.title}
                  {featuredExternal && (
                    <ExternalLink className="inline-block h-5 w-5 ml-2.5 align-baseline text-espresso/40 dark:text-slate-500" aria-label="External article" />
                  )}
                </h2>
                <p className="text-espresso/70 text-base md:text-lg leading-relaxed mb-5">
                  {featured.preview}
                </p>
                {featured.tags && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-court/20 dark:bg-[#60A5FA]/20 text-court-dark dark:text-[#60A5FA] rounded-full border-2 border-court dark:border-[#60A5FA]/50 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-court-dark dark:text-[#60A5FA]">
                  Read the story
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </m.article>
          )}

          {/* List rows */}
          <div className="flex flex-col gap-5">
            {rest.map((article, index) => {
              const externalUrl = !article.hasFullArticle
                ? article.externalLinks?.[0]?.url || article.externalLink
                : undefined;
              const inner = (
                <>
                  {article.thumbnail && (
                    <img
                      src={`/${article.thumbnail}`}
                      alt={article.title}
                      loading="lazy"
                      className="w-20 h-20 md:w-24 md:h-24 shrink-0 object-cover rounded-lg border-2 border-espresso"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg md:text-xl font-heading font-semibold text-espresso dark:text-slate-100 group-hover:text-court-dark dark:group-hover:text-[#60A5FA] transition-colors inline-flex items-center gap-2">
                      {article.title}
                      {externalUrl && (
                        <ExternalLink className="h-4 w-4 shrink-0 text-espresso/40 dark:text-slate-500" aria-label="External article" />
                      )}
                    </h2>
                    <p className="text-espresso/70 text-sm md:text-base leading-relaxed truncate mt-1">
                      {article.preview}
                    </p>
                    <p className="text-espresso/50 font-mono text-xs md:text-sm mt-2">{meta(article)}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-espresso/30 dark:text-slate-600 group-hover:text-court-dark dark:group-hover:text-[#60A5FA] group-hover:translate-x-1 transition-all" />
                </>
              );
              const rowClass = 'card-brutal p-4 md:p-5 flex items-center gap-5 group w-full text-left';
              return (
                <m.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                >
                  {externalUrl ? (
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={rowClass}
                      aria-label={`Read ${article.title}`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link to={`/blog/${article.id}`} state={{ from: '/blog' }} className={rowClass} aria-label={`Read ${article.title}`}>
                      {inner}
                    </Link>
                  )}
                </m.article>
              );
            })}
          </div>

          {isFiltered && rest.length === 0 && (
            <p className="text-center py-12 font-mono text-espresso/50 dark:text-slate-500">
              No articles tagged {activeTag} yet.
            </p>
          )}

          {/* Follow strip */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-brutal mt-12 p-6 md:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <p className="font-heading font-semibold text-lg text-espresso dark:text-slate-100">
                New stories land here first
              </p>
              <p className="text-espresso/60 dark:text-slate-400 font-mono text-sm mt-1">
                Tennis, AI, and the road from Jakarta to Seattle.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/joseph-chamdani/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-court-dark dark:text-[#60A5FA] hover:text-court dark:hover:text-[#93C5FD] transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              Follow on LinkedIn
            </a>
          </m.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
