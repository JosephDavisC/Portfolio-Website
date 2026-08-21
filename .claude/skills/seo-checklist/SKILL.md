---
name: seo-checklist
description: The SEO/GEO checklist for joechamdani.com. Run whenever you add a page, add or edit a blog article, change routes, titles, or meta, or before any deploy that touches public content. Adapted from the Freelance seo-ready runbook for this repo's build mechanics.
---

# joechamdani.com SEO checklist

This site is a React SPA. Humans get the client render; crawlers and AI readers get
static HTML via build-time prerender + `.htaccess`. Every content change must keep BOTH
paths true. When in doubt, the deeper runbook is `Freelance/.claude/skills/seo-ready/`
in the ecosystem folder; this file is the repo-specific short form.

## When you ADD OR EDIT a blog article

1. `src/data/articles.json` is the source of truth (id, title, date, readTime, preview,
   thumbnail, tags, hasFullArticle). The article page reads from it.
2. `scripts/generate-blog-meta.js` must emit for the post: prerendered HTML with the
   article content, per-post `<title>` + meta description + OG tags + og:image,
   Article/BlogPosting JSON-LD, an `rss.xml` entry, and the sitemap entry.
   After building, VERIFY in `dist/`: `grep -l "<h1>" dist/blog/<slug>/index.html`,
   `grep <slug> dist/rss.xml dist/sitemap.xml`.
3. **Content is sacred**: when restyling or migrating an article, port the published text
   verbatim. Verify by extracting text from old and new builds and diffing. Rewrites
   happen only when Joseph explicitly asks for them.
4. Thumbnails: `.webp` with the original kept beside it, referenced via `<picture>`.
   Every img needs real alt text and must not fight CSS sizing (width in CSS needs
   `height: auto`).

## When you ADD A PAGE (project, experience, credential, anything routable)

1. Route in the SPA AND in whatever prerender/bot path `.htaccess` drives. A page that
   only exists client-side does not exist for Google.
2. `public/sitemap.xml`: add the `<url>` with `<lastmod>`. This file is manually
   maintained; forgetting it is the classic miss.
3. `public/llms.txt`: add the page if it is content an AI reader should know about.
4. Head: `<title>` 50-60 chars joined with "·", meta description ~155 chars, canonical,
   OG + Twitter tags, JSON-LD that fits the page type. Person schema always uses
   `@id: "https://joechamdani.com/#joseph"`.
5. Internal links: at least one existing page must link to the new page. Orphan pages
   rank for nothing.

## Hard rules (apply to every word you write)

- NO em dashes or en dashes anywhere: copy, titles, meta, alt text, llms.txt. Period,
  comma, or colon instead. Titles join with "·". Hyphens inside compound words are fine.
- No invented metrics, no testimonial paraphrasing, plain direct voice.
- No `#hash` fragments visible in URLs from navigation.

## Before every deploy that touches public content

1. Build, then verify the DIST, not the source: sitemap has the new URLs, rss.xml is
   valid XML, prerendered pages contain their content, `curl` the local preview
   (`npx vite preview`) as a bot would.
2. Security headers in `public/.htaccess` stay intact (HSTS, nosniff, CSP,
   Permissions-Policy). If you add an external origin (analytics, fonts, API), the CSP
   must name it or the feature silently dies in production.
3. The Umami snippet (`analytics.joechamdani.com/script.js`) stays on every public page;
   custom events use the `src/lib/track.ts` helper, kebab-case names, function form.

## After deploy

1. Verify live: `curl -s https://joechamdani.com/<new-page>/ | grep "<h1>"` and check
   sitemap/rss serve 200.
2. Ask Joseph to request indexing in Google Search Console for new or materially
   changed URLs (he owns the GSC property).
3. If OG tags changed on an existing URL, LinkedIn Post Inspector to bust its cache.
