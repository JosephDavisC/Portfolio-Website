---
name: new-article
description: The exact mechanics for adding or editing a blog article on joechamdani.com. Read BEFORE touching articles.json, ArticlePage.tsx, or generate-blog-meta.js. Covers the data schema, where article body text lives, the build-time pieces that must be updated together, and the traps that silently break the crawler fallback.
---

# Adding an article to joechamdani.com

The blog is data-driven but split across four files. Miss one and the post either
does not render, or renders for humans while being invisible to Google and AI
readers. Companion skills: `seo-checklist` (run it after), `ai-grounding-update`
(tell the chatbot), `house-commits` (commit style).

## Publishing policy

Posts are written and published ON THIS SITE, never Medium first. Medium is
distribution only: syndicate a published post with Medium's import tool, which sets
canonical back to joechamdani.com. Two existing posts live on Medium and stay there
as external entries.

## The two kinds of post

**On-site** (`hasFullArticle: true`) needs all four steps below.
**External** (`hasFullArticle: false`, lives on Medium) needs step 1 only. It gets a
small external-link icon, one "Read on Medium" action, no article page, no sitemap
entry, and appears in RSS pointing at its real home.

## Step 1: `src/data/articles.json` (source of truth)

Newest first. The first entry is the featured LATEST card on /blog and drives the
homepage order. Edit with targeted string replacement, NEVER `json.dump`, which
reformats the whole file into a 500-line diff.

```json
{
  "id": "slug-used-in-the-url",
  "readTime": "6 min read",
  "title": "Title Case Title",
  "date": "December 2025",
  "preview": "One or two sentences. Shows on cards and feeds the meta description.",
  "thumbnail": "article_media/<slug>/cover.webp",
  "tags": ["AI", "Education"],
  "hasFullArticle": true
}
```

- `thumbnail` has NO leading slash. Components add it.
- Optional: `author` (only when someone else wrote it; defaults to Joseph and feeds
  the JSON-LD author), `location`, `thumbnailFit`/`thumbnailBg` (for logo-style
  covers that should not be cropped), `thumbnailHref` (make the header image link
  somewhere), `externalLinks` (required for external posts).

## Step 2: article body in `src/pages/ArticlePage.tsx`

Body lives in the `ArticleContent` switch, one `case '<slug>':` per post.

**THE TRAP:** `generate-blog-meta.js` extracts the crawler-visible copy by regex
from this file. It takes `h2`, `h3`, and only `p` tags carrying `text-lg`. So:

- Body paragraphs MUST keep `className="text-espresso/80 text-lg leading-relaxed ..."`.
  Drop `text-lg` and that paragraph vanishes from what Google and every AI crawler
  sees, with no warning and no build error.
- Image captions use `text-sm ... italic`, which is what keeps them OUT of the
  extracted body. Keep that shape.
- Section headings: `<h2 id="kebab-id" className="text-3xl font-heading font-bold
  text-court-dark dark:text-[#60A5FA] mb-6 mt-12">`.

Verify after building: the build prints `[blog] <slug>: extracted N words`. If N is
suspiciously small, a class is wrong.

**The second trap, which the word count will NOT catch:** the extractor takes `h2`,
`h3`, and `text-lg` paragraphs only. `pre`, `code`, and `figcaption` are deliberately
excluded, which is right for styling but means anything stated ONLY inside a code
block, a terminal block, or an image caption is invisible to Google and every AI
crawler. The word count still looks healthy because the prose around it counts.

So for technical posts: narrate the point in prose, and let the code block show it.
If a command, config value, or error message carries the argument of the post, say it
in a `text-lg` paragraph too. Never let a code block be the only place a claim exists.

**How to actually verify, because the word count lies.** A post that is silently
losing prose still prints a plausible N. In Aug 2026 a post reported 1002 words while
291 words across 21 sentences were being eaten by a regex bug, and nothing looked
wrong. The only check that works is diffing the extracted body against the source
draft:

```bash
# pull the crawler-visible text out of the built page and compare to the draft
python3 - <<'EOF'
import re
h = open('dist/blog/<slug>/index.html').read()
body = re.search(r'<div id="root">(.*?)</div>', h, re.S).group(1)
print(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', body)).strip())
EOF
```

Compare against the SOURCE COMPONENT, not the original draft. The draft is usually
revised during wiring, so a draft diff produces false alarms. The check that actually
works is: every h2/h3 and every text-lg paragraph in the `case '<slug>':` block must
appear in the extracted output. If all of them do, nothing is being eaten, and a word
count that moved just means the prose was edited.

Do this once per new post, not just when a number looks off.

## Step 3: `scripts/generate-blog-meta.js` (on-site posts only)

Add a `blogMeta` entry. This drives the prerendered page, OG tags, and BlogPosting
JSON-LD:

```js
'<slug>': {
  title: '<Title> | Joseph Davis Chamdani',
  description: '<same as preview>',
  image: 'https://joechamdani.com/article_media/<slug>/cover.png',
  url: 'https://joechamdani.com/blog/<slug>/',
  datePublished: '2025-12-01',
  dateDisplay: 'December 2025',
  images: [{ src: '/article_media/<slug>/cover.png', alt: 'Descriptive alt text' }]
}
```

`images` feeds a hidden crawler-visible block for image search. Every image worth
finding belongs there with real alt text.

## Step 4: `public/sitemap.xml` (on-site posts only)

Manually add the `<url>` block with `<lastmod>` and `<image:image>` entries. This
file is hand maintained; forgetting it is the classic miss. Bump `lastmod` when you
materially edit an existing post.

RSS at `/rss.xml` and the `/blog/` index page regenerate themselves from
articles.json. Nothing to do there.

## Code blocks, terminal output, and callouts (technical posts)

Ready-made classes live in `src/index.css` and work in both themes. Use these
instead of inventing per-post styling, and remember the surrounding body
paragraphs still need `text-lg` or they vanish from the crawler copy.

Code, with an optional caption:

```jsx
<figure className="article-code">
  <pre>{`server {
  listen 443 ssl;
}`}</pre>
  <figcaption>/etc/nginx/sites-available/default</figcaption>
</figure>
```

Shell or log output (dark in both themes, like a real terminal):

```jsx
<div className="article-terminal">
  <pre>{`$ certbot renew --dry-run
Cert not yet due for renewal`}</pre>
</div>
```

Inline code inside a sentence: `<code className="article-inline-code">pm2 restart</code>`

A note, warning, or lesson learned:

```jsx
<aside className="article-callout">
  <p>What I would do differently</p>
  <p className="text-espresso/80 text-lg leading-relaxed">Body of the note.</p>
</aside>
```

Use a JSX template literal for anything with braces, backslashes, or quotes, so
JSX does not try to parse it. Long lines scroll horizontally inside the block
rather than breaking the page.

## Images

`.webp` for the referenced file, original kept beside it, descriptive alt text, and
`width`/`height` attributes so the page does not reflow while loading. Convert with
`cwebp -q 82 in.png -o out.webp`. Put them in `public/article_media/<slug>/`.

## Hard rules

- No em dashes or en dashes in PROSE: article body copy and any sentences a visitor
  reads as writing. Period, comma, or colon instead. This is NOT a typography ban:
  Joseph confirmed on 23 Aug 2026 that dashes are fine in titles, sitemap entries,
  alt text, captions, separators, and date ranges. Do not sweep them out of chrome,
  and do not "fix" existing ones. Two sessions over-applied the older wording of
  this rule and had to revert. See the seo-checklist skill for the canonical text.
- Content is sacred. When restyling or moving an existing article, port the text
  verbatim and prove it: extract the text from the old and new builds and diff.
- Never deploy, push, or commit without Joseph saying so in the conversation.
- Article URLs never change. If one must, 301 it.

## Before handing back

1. `npx tsc --noEmit` clean, then `npm run build`.
2. Check the word count line for the new slug.
3. Run the `seo-checklist` skill against the built dist.
4. Write an `ai-grounding-update` note so the chatbot learns about the post.
