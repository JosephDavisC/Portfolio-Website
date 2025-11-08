import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');

const blogMeta = {
  'my-journey': {
    title: 'My Journey: From Jakarta to UW | Joseph Davis Chamdani',
    description: 'How I moved from Indonesia to Seattle at 15, skipped two years of high school, and made it to the University of Washington as a junior in Informatics.',
    image: 'https://joechamdani.com/article_media/journey/Graduation_Peace.png',
    url: 'https://joechamdani.com/blog/my-journey'
  },
  'bc-hacks-2024': {
    title: 'BC Hacks 2024 Lecture | Joseph Davis Chamdani',
    description: 'After helping organize and launch BC Hacks 2024, I was invited to give a lecture at Bellevue College about how to run a successful hackathon. This session was specially arranged for a group of 20+ Korean exchange students visiting from Korea.',
    image: 'https://joechamdani.com/article_media/bc-hacks-2024/Group_Photo.png',
    url: 'https://joechamdani.com/blog/bc-hacks-2024'
  }
};

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
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="${meta.image}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${meta.url}" />
    <meta property="twitter:title" content="${meta.title}" />
    <meta property="twitter:description" content="${meta.description}" />
    <meta property="twitter:image" content="${meta.image}" />

    <!-- Load the main app's CSS and JS -->
    <script type="module" crossorigin src="${assets.js}"></script>
    <link rel="stylesheet" crossorigin href="${assets.css}">
  </head>
  <body>
    <div id="root"></div>
  </body>
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
