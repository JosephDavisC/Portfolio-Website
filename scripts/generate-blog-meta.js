import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const blogMeta = {
  'bc-hacks-2024': {
    title: 'BC Hacks 2024 Lecture | Joseph Davis Chamdani',
    description: 'After helping organize and launch BC Hacks 2024, I was invited to give a lecture at Bellevue College about how to run a successful hackathon. This session was specially arranged for a group of 20+ Korean exchange students visiting from Korea.',
    image: 'https://joechamdani.com/media/BCHACKS_Thumbnail.png',
    url: 'https://joechamdani.com/blog/bc-hacks-2024'
  }
};

function generateHTML(slug, meta) {
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

    <meta http-equiv="refresh" content="0;url=/" />
    <script>
      window.location.href = '/';
      sessionStorage.setItem('navigateTo', '/blog/${slug}');
    </script>
  </head>
  <body>
    <p>Redirecting...</p>
  </body>
</html>`;
}

// Create blog directory structure
const distPath = path.join(__dirname, '..', 'dist');
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
  const html = generateHTML(slug, meta);
  fs.writeFileSync(htmlPath, html);
  console.log(`✓ Generated ${htmlPath}`);
});

console.log('Blog meta pages generated successfully!');
