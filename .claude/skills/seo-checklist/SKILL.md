---
name: seo-checklist
description: The SEO/GEO checklist for joechamdani.com. Run whenever you add a page, add or edit a blog article, change routes, titles, or meta, or before any deploy that touches public content. Adapted from the Freelance seo-ready runbook for this repo's build mechanics.
---

# joechamdani.com SEO checklist

This site is a React SPA. Humans get the client render; crawlers and AI readers get
static HTML via build-time prerender + `.htaccess`. Every content change must keep BOTH
paths true. When in doubt, the deeper runbook is `Freelance/.claude/skills/seo-ready/`
in the ecosystem folder; this file is the repo-specific short form.

## Publishing policy (Joseph's rule, 2026-08-22)

New posts are written and published ON THIS SITE, never Medium-first. Medium is
distribution only: optionally syndicate a published post via Medium's import tool,
which sets the canonical back to joechamdani.com. The two existing Medium pieces
(IShowStream by Jessica, the Transfer Tool design article) stay on Medium as external
index entries with the "Read on Medium" treatment; never republish their text here.

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
   OG + Twitter tags (see "Share previews" below, and check the image resolves),
   JSON-LD that fits the page type. Person schema always uses
   `@id: "https://joechamdani.com/#joseph"`.
5. Internal links: at least one existing page must link to the new page. Orphan pages
   rank for nothing.

## Share previews (og:image) - every public page, no exceptions

A link with no preview image looks broken when shared. Every indexable page needs a
share image, and the image has to actually exist.

1. Required tags, absolute URLs (never relative): `og:image`, `twitter:card` =
   summary_large_image, `twitter:image`.
   `og:image:width` / `og:image:height` are OPTIONAL and must be TRUE if present.
   `generate-static-pages.js` strips them on interior pages on purpose, because
   those pages use logos and certificates that are not 1200x630, and wrong
   dimensions render worse than none. Only the homepage declares them (preview.png
   is square, declared 2048x2048). Do not "fix" a page by adding invented sizes.
2. **Verify the file resolves.** A 404 og:image renders as a blank card and nothing
   warns you. This has shipped before: the blog index pointed at `/og-image.png`,
   which does not exist. The real site-wide default is `/preview.png`.
3. **Two code paths, both must carry it.** The build-time static page
   (`generate-static-pages.js` or `generate-blog-meta.js`) is what crawlers and
   social scrapers read; the `react-helmet-async` block in the page component is
   what a client-side navigation produces. Setting only one leaves the other blank.
4. Which image: page-specific when one exists (article thumbnail, company logo,
   certificate). Otherwise `https://joechamdani.com/preview.png`. 1200x630 is the
   target ratio for a large card.
5. After changing OG tags on a URL that has already been shared, bust the caches:
   LinkedIn Post Inspector and the X card validator. They cache the old blank card
   for a long time otherwise.

Verify in the DIST, per page:

```bash
grep -o 'og:image" content="[^"]*"' dist/<page>/index.html
# then confirm the file exists in dist (mind URL-encoded spaces)
```

## Hard rules (apply to every word you write)

- No em dashes or en dashes in PROSE: blog and article body copy, and the written
  content of the site (section text, descriptions a visitor reads as sentences).
  Period, comma, or colon instead.
  This is NOT a site-wide typography ban. Joseph confirmed on 23 Aug 2026 that dashes
  are fine in titles, sitemap entries, alt text, captions, and separators. Do not
  sweep them out of chrome, and do not "fix" the en dashes in date ranges like
  "Aug 2025 – Feb 2026" in milestones.json and experiences.json. Those are settled:
  no change. Two sessions over-applied the old wording of this rule and had to revert.
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

## When a local HTTP check returns 403 (probably not your bug)

Hostinger's CDN (`server: hcdn`) serves a JavaScript browser-challenge page to IPs on its
blocklist. Symptom: the site loads fine in Joseph's browser, but `curl` from his Mac returns
403 for every page, browser user agent or not. That is his IP being flagged, not a site fault,
and it makes every local post-deploy verification lie.

Verify from an unblocked IP instead:

```sh
ssh vps 'curl -s -o /dev/null -w "%{http_code}\n" https://<domain>/'
```

Confirmed 2026-08-23: the same URLs returned 403 from Joseph's connection and 200 from the VPS
in the same minute. FTP deploys are unaffected (different protocol), only HTTP verification is
misleading. If it persists more than a couple of hours, Joseph asks Hostinger support to remove
his IP from the CDN blocklist specifically, which is a separate system from the VPS blocklist.
