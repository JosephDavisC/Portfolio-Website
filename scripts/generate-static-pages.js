import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define pages with their meta tags
const pages = [
  {
    path: 'projects',
    title: "Projects | Joseph's Portfolio",
    description: "Explore Joseph Chamdani's portfolio of AI, web development, and game projects.",
    image: 'https://joechamdani.com/Logo_Joseph.PNG',
    url: 'https://joechamdani.com/projects'
  }
];

// Read the base index.html from dist
const distPath = path.join(__dirname, '..', 'dist');
const baseHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');

for (const page of pages) {
  // Create directory if it doesn't exist
  const pageDir = path.join(distPath, page.path);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  // Replace meta tags in the HTML
  let html = baseHtml;

  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${page.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${page.description}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${page.url}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${page.url}" />`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${page.description}" />`
  );
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/,
    `<meta property="og:image" content="${page.image}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:url" content=".*?" \/>/,
    `<meta name="twitter:url" content="${page.url}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${page.description}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?" \/>/,
    `<meta name="twitter:image" content="${page.image}" />`
  );

  // Write the modified HTML
  fs.writeFileSync(path.join(pageDir, 'index.html'), html);
  console.log(`[+] Generated: ${page.path}/index.html`);
}

console.log('[+] Static pages generated successfully!');
