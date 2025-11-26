import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import articlesData from '@/data/articles.json';

// Article data structure
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

// Import articles from JSON
export const articles: Article[] = articlesData;

// Single article card component
const ArticleCard: React.FC<{ article: Article; index: number }> = ({ article, index }) => {
  const hasImage = !!article.thumbnail;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`grid ${hasImage ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8 items-center bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 hover:border-red-400/50 transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2`}
    >
      {/* Thumbnail Image (if exists) */}
      {hasImage && (
        <a
          href={article.externalLinks?.[0]?.url || article.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-2xl relative"
          aria-label={`View ${article.title} article`}
        >
          <img
            src={article.thumbnail}
            alt={article.title}
            className="rounded-2xl shadow-xl w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Red overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-500/40 via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        </a>
      )}

      {/* Text Content */}
      <div className={hasImage ? '' : 'max-w-4xl mx-auto'}>
        {/* Date and Location */}
        <div className="flex items-center gap-2 text-slate-400 mb-3">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">
            {article.location ? `${article.location} — ${article.date}` : article.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-semibold text-red-400 mb-4">
          {article.title}
        </h3>

        {/* Preview Description */}
        <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
          {article.preview}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {/* Read More Button - links to dedicated article page */}
          {article.hasFullArticle && (
            <Link
              to={`/blog/${article.id}`}
              className="inline-flex items-center px-4 py-2 bg-red-500/20 text-red-400 rounded-lg border border-red-400/30 hover:bg-red-500/30 hover:border-red-400/50 transition-all group-hover:translate-x-1 transform duration-200"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Read Full Article
            </Link>
          )}

          {/* External Link Button (e.g., YouTube) */}
          {article.externalLink && (
            <a
              href={article.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              {article.externalLinkText || 'External Link'}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  return (
    <section id="blog" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent pb-2">
            Blog & Articles
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Stories, experiences, and lessons learned along the way
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="space-y-12">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* Coming Soon Message (optional, remove if not needed) */}
        {articles.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12 text-slate-400"
          >
            <p>More articles coming soon...</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
