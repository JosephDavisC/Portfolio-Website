import React from 'react';
import { m } from 'framer-motion';
import { ExternalLink, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import articlesData from '@/data/articles.json';

export interface Article {
  id: string;
  title: string;
  date: string;
  location?: string;
  preview: string;
  thumbnail?: string;
  thumbnailFit?: string;
  thumbnailBg?: string;
  thumbnailHref?: string;
  author?: string;
  readTime?: string;
  externalLink?: string;
  externalLinkText?: string;
  externalLinks?: { url: string; text: string }[];
  tags?: string[];
  hasFullArticle?: boolean;
}

export const articles: Article[] = articlesData;

// "November 2025" -> "Nov 2025" for the unified meta line
export const shortDate = (date: string) =>
  date.replace(
    /^(January|February|March|April|May|June|July|August|September|October|November|December)/,
    (mo) => mo.slice(0, 3)
  );

const HOMEPAGE_ARTICLE_COUNT = 3;

const ArticleCard: React.FC<{ article: Article; index: number; onOpenArticle: (id: string) => void }> = ({ article, index, onOpenArticle }) => {
  const hasImage = !!article.thumbnail;
  const externalUrl = article.externalLinks?.[0]?.url || article.externalLink;
  const isExternal = !article.hasFullArticle && !!externalUrl;

  const cardInner = (
    <>
      {hasImage && (
        <div
          className="block overflow-hidden rounded-lg border-2 border-espresso relative"
          style={article.thumbnailBg ? { backgroundColor: article.thumbnailBg } : undefined}
        >
          <m.img
            src={article.thumbnail}
            alt={article.title}
            className={`w-full h-56 md:h-64 ${article.thumbnailFit === 'contain' ? 'object-contain p-4' : 'object-cover'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <div className={hasImage ? '' : 'max-w-4xl mx-auto'}>
        <div className="flex items-center gap-2 text-espresso/60 mb-3 font-mono text-sm">
          <Calendar className="h-4 w-4" />
          <span>
            {shortDate(article.date)}
            {article.readTime ? ` · ${article.readTime}` : ''}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-heading font-semibold text-espresso dark:text-slate-100 mb-4 group-hover:text-court-dark dark:group-hover:text-[#60A5FA] transition-colors inline-flex items-center gap-2.5">
          {article.title}
          {isExternal && (
            <ExternalLink className="h-5 w-5 shrink-0 text-espresso/40 dark:text-slate-500" aria-label="External article" />
          )}
        </h3>

        <p className="text-espresso/70 text-base md:text-lg leading-relaxed mb-6">
          {article.preview}
        </p>

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
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
          {isExternal ? article.externalLinks?.[0]?.text || 'Read the story' : 'Read the story'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </>
  );

  const cardClass = `grid ${hasImage ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8 items-center card-brutal p-6 md:p-8 group`;
  const motionProps = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    whileHover: { y: -4 },
    transition: { duration: 0.5, delay: index * 0.1, type: 'spring' as const, stiffness: 200 },
    viewport: { once: true },
  };

  if (isExternal) {
    return (
      <m.article {...motionProps}>
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
          aria-label={`Read ${article.title}`}
        >
          {cardInner}
        </a>
      </m.article>
    );
  }

  return (
    <m.article {...motionProps}>
      <div
        role="link"
        tabIndex={0}
        onClick={() => onOpenArticle(article.id)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenArticle(article.id); } }}
        className={cardClass}
        aria-label={`Read ${article.title}`}
      >
        {cardInner}
      </div>
    </m.article>
  );
};

const Blog = () => {
  const navigate = useNavigate();

  const openArticle = (articleId: string) => {
    const base = window.location.pathname || "/";
    window.history.replaceState(null, "", `${base}#blog`);
    navigate(`/blog/${articleId}`, { state: { from: `${base}#blog` } });
  };

  const visibleArticles = articles.slice(0, HOMEPAGE_ARTICLE_COUNT);

  return (
    <section id="blog" className="py-16 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-espresso">
            Blog &{" "}
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
          </h2>
          <p className="text-espresso/60 text-xl max-w-3xl mx-auto leading-relaxed font-mono">
            Stories, experiences, and lessons learned along the way
          </p>
        </m.div>

        <div className="space-y-8">
          {visibleArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} onOpenArticle={openArticle} />
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 mt-12"
        >
          <Link to="/blog" className="btn-brutal-outline inline-flex items-center gap-2">
            {articles.length > HOMEPAGE_ARTICLE_COUNT ? 'Show More Articles' : 'View All Articles'}
            <ChevronRight className="h-5 w-5" />
          </Link>
          {articles.length > HOMEPAGE_ARTICLE_COUNT && (
            <p className="text-espresso/50 font-mono text-sm">
              Showing {visibleArticles.length} of {articles.length} articles
            </p>
          )}
        </m.div>
      </div>
    </section>
  );
};

export default Blog;
