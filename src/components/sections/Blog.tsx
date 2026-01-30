import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import articlesData from '@/data/articles.json';

export interface Article {
  id: string;
  title: string;
  date: string;
  location?: string;
  preview: string;
  thumbnail?: string;
  externalLink?: string;
  externalLinkText?: string;
  externalLinks?: { url: string; text: string }[];
  tags?: string[];
  hasFullArticle?: boolean;
}

export const articles: Article[] = articlesData;

const ArticleCard: React.FC<{ article: Article; index: number; onOpenArticle: (id: string) => void }> = ({ article, index, onOpenArticle }) => {
  const hasImage = !!article.thumbnail;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 200 }}
      viewport={{ once: true }}
      className={`grid ${hasImage ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8 items-center card-brutal p-6 md:p-8`}
    >
      {hasImage && (
        <a
          href={article.externalLinks?.[0]?.url || article.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-lg border-2 border-espresso relative group"
          aria-label={`View ${article.title} article`}
        >
          <motion.img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-56 md:h-64 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </a>
      )}

      <div className={hasImage ? '' : 'max-w-4xl mx-auto'}>
        <div className="flex items-center gap-2 text-espresso/60 mb-3 font-mono text-sm">
          <Calendar className="h-4 w-4" />
          <span>
            {article.location ? `${article.location} — ${article.date}` : article.date}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-heading font-semibold text-espresso dark:text-slate-100 mb-4 group-hover:text-court-dark dark:group-hover:text-[#60A5FA] transition-colors">
          {article.title}
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

        <div className="flex flex-wrap gap-4">
          {article.hasFullArticle && (
            <button
              onClick={() => onOpenArticle(article.id)}
              className="inline-flex items-center px-4 py-2 bg-court dark:bg-[#60A5FA] text-paper font-semibold rounded-lg border-2 border-espresso dark:border-slate-600 shadow-brutal-sm dark:shadow-none hover:shadow-brutal dark:hover:bg-[#93C5FD] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Read Full Article
            </button>
          )}

          {article.externalLink && (
            <a
              href={article.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-espresso/5 text-espresso font-medium rounded-lg border-2 border-espresso/30 hover:bg-espresso hover:text-paper transition-all"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              {article.externalLinkText || 'External Link'}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Blog = () => {
  const navigate = useNavigate();

  const openArticle = (articleId: string) => {
    const base = window.location.pathname || "/";
    window.history.replaceState(null, "", `${base}#blog`);
    navigate(`/blog/${articleId}`, { state: { from: `${base}#blog` } });
  };

  return (
    <section id="blog" className="py-16 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        <motion.div
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
        </motion.div>

        <div className="space-y-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} onOpenArticle={openArticle} />
          ))}
        </div>

        {articles.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12 text-espresso/60 font-mono"
          >
            <p>More articles coming soon...</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
