import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');

// Extract the real article body (h2/h3 + body paragraphs) for a slug from
// ArticlePage.tsx at build time, so the crawler-visible static fallback stays
// in sync with the rendered article. Caption paragraphs (text-sm/italic) are
// skipped; body paragraphs use the text-lg class.
function extractArticleBody(slug) {
  const src = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'pages', 'ArticlePage.tsx'),
    'utf8'
  );
  const marker = `case '${slug}':`;
  const start = src.indexOf(marker);
  if (start === -1) return '';
  const rest = src.slice(start + marker.length);
  const nextCase = rest.search(/case '|default:/);
  const section = nextCase === -1 ? rest : rest.slice(0, nextCase);
  const out = [];
  const re = /<(h2|h3|p)([^>]*)>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(section))) {
    const [, tag, attrs, inner] = m;
    if (tag === 'p' && !attrs.includes('text-lg')) continue;
    const text = inner
      .replace(/\{\s*(['"`])([\s\S]*?)\1\s*\}/g, '$2')
      .replace(/\{[^}]*\}/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (text) out.push(`<${tag}>${text}</${tag}>`);
  }
  return out.join('');
}

const blogMeta = {
  'my-journey': {
    title: 'My Journey: From Jakarta to UW | Joseph Davis Chamdani',
    description: 'How I moved from Indonesia to Seattle at 15, skipped two years of high school, and made it to the University of Washington as a junior in Informatics.',
    image: 'https://joechamdani.com/article_media/journey/Graduation_Peace.png',
    url: 'https://joechamdani.com/blog/my-journey/',
    datePublished: '2025-11-01',
    dateDisplay: 'November 2025',
    images: [
      {
        src: '/article_media/journey/Graduation_Peace.png',
        alt: 'Joseph Chamdani at graduation — from Jakarta, Indonesia to the University of Washington'
      }
    ]
  },
  'bc-hacks-2024': {
    title: 'BC Hacks 2024 Lecture | Joseph Davis Chamdani',
    description: 'After helping organize and launch BC Hacks 2024, I was invited to give a lecture at Bellevue College about how to run a successful hackathon. This session was specially arranged for a group of 20+ Korean exchange students visiting from Korea.',
    image: 'https://joechamdani.com/article_media/bc-hacks-2024/Group_Photo.png',
    url: 'https://joechamdani.com/blog/bc-hacks-2024/',
    datePublished: '2024-07-01',
    dateDisplay: 'July 2024',
    images: [
      {
        src: '/article_media/bc-hacks-2024/Group_Photo.png',
        alt: 'Group photo from BC Hacks 2024 hackathon lecture at Bellevue College with Korean exchange students'
      }
    ]
  }
};

function buildSeoImagesBlock(images) {
  if (!images?.length) return '';
  const tags = images
    .map(
      (img) =>
        `    <img src="${img.src}" alt="${(img.alt || '').replace(/"/g, '&quot;')}" loading="lazy">`
    )
    .join('\n');
  return `  <div id="seo-images" hidden aria-hidden="true">\n${tags}\n  </div>\n`;
}

// Read the main index.html to get the asset file names
function getAssetReferences() {
  const indexPath = path.join(distPath, 'index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf-8');

  // Extract CSS and JS references
  const cssMatch = indexHtml.match(/href="(\/assets\/index-[^"]+\.css)"/);
  const jsMatch = indexHtml.match(/src="(\/assets\/index-[^"]+\.js)"/);

  return {
    css: cssMatch ? cssMatch[1] : '',
    js: jsMatch ? jsMatch[1] : ''
  };
}

function generateHTML(slug, meta, assets) {
  const seoBlock = buildSeoImagesBlock(meta.images);
  const blogPostingLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title.split(' | ')[0],
    description: meta.description,
    image: meta.image,
    datePublished: meta.datePublished,
    dateModified: meta.datePublished,
    author: { '@type': 'Person', name: 'Joseph Davis Chamdani', url: 'https://joechamdani.com/' },
    publisher: { '@type': 'Person', name: 'Joseph Davis Chamdani', url: 'https://joechamdani.com/' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': meta.url },
    url: meta.url,
  });
  const breadcrumbLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://joechamdani.com/' },
      { '@type': 'ListItem', position: 2, name: meta.title.split(' | ')[0], item: meta.url },
    ],
  });
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <link rel="canonical" href="${meta.url}" />
    <meta name="robots" content="index, follow" />
    <script type="application/ld+json">${blogPostingLd}</script>
    <script type="application/ld+json">${breadcrumbLd}</script>

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="${meta.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${meta.url}" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${meta.image}" />

    <!-- Load the main app's CSS and JS -->
    <script type="module" crossorigin src="${assets.js}"></script>
    <link rel="stylesheet" crossorigin href="${assets.css}">
  </head>
  <body>
    <!-- Crawler-visible fallback: replaced by React the moment it mounts.
         AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not execute JS,
         so this block is the only page content they see. The full article
         body is extracted from ArticlePage.tsx at build time. -->
    <div id="root"><main style="max-width:48rem;margin:0 auto;padding:3rem 1.5rem;font-family:system-ui,sans-serif"><h1>${meta.h1 || meta.title.split(' | ')[0]}</h1><p>By Joseph Davis Chamdani · ${meta.dateDisplay || ''}</p><p>${meta.description}</p>${meta.body || ''}<p><a href="/">Joseph Davis Chamdani — Portfolio</a></p></main></div>
${seoBlock}  </body>
</html>`;
}

// Get asset references from main index.html
const assets = getAssetReferences();

// Create blog directory structure
const blogPath = path.join(distPath, 'blog');

if (!fs.existsSync(blogPath)) {
  fs.mkdirSync(blogPath, { recursive: true });
}

// Generate HTML for each blog post
Object.entries(blogMeta).forEach(([slug, meta]) => {
  meta.body = extractArticleBody(slug);
  const words = meta.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`  [blog] ${slug}: extracted ${words} words of article body`);
  const postPath = path.join(blogPath, slug);
  if (!fs.existsSync(postPath)) {
    fs.mkdirSync(postPath, { recursive: true });
  }

  const htmlPath = path.join(postPath, 'index.html');
  const html = generateHTML(slug, meta, assets);
  fs.writeFileSync(htmlPath, html);
  console.log(`✓ Generated ${htmlPath}`);
});

console.log('Blog meta pages generated successfully!');
