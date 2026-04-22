import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load experience data for dynamic page generation
const experiencesPath = path.join(__dirname, '..', 'src', 'data', 'experiences.json');
const experiences = JSON.parse(fs.readFileSync(experiencesPath, 'utf8'));

// Load credential data for dynamic page generation
const credentialsPath = path.join(__dirname, '..', 'src', 'data', 'credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

// Load milestones data for homepage SEO image injection
const milestonesPath = path.join(__dirname, '..', 'src', 'data', 'milestones.json');
const milestones = JSON.parse(fs.readFileSync(milestonesPath, 'utf8'));

// Load projects data for /projects SEO image injection
const projectsPath = path.join(__dirname, '..', 'src', 'data', 'projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

// Helper: build hidden SEO image block from an array of { src, alt }
function buildSeoImagesBlock(images) {
  if (!images.length) return '';
  const seen = new Set();
  const tags = images
    .filter((img) => {
      if (!img.src || seen.has(img.src)) return false;
      seen.add(img.src);
      return true;
    })
    .map(
      (img) =>
        `    <img src="${img.src}" alt="${(img.alt || '').replace(/"/g, '&quot;')}" loading="lazy">`
    )
    .join('\n');
  return `  <div id="seo-images" hidden aria-hidden="true">\n${tags}\n  </div>\n`;
}

// Helper: inject SEO block into an HTML string, idempotent (replaces existing block)
function injectSeoBlock(html, seoBlock) {
  if (!seoBlock) return html;
  const cleaned = html.replace(
    /\s*<div id="seo-images"[\s\S]*?<\/div>\s*(?=<\/body>)/,
    ''
  );
  return cleaned.replace('</body>', `${seoBlock}</body>`);
}

// Build SEO image lists per route (keyed by page.path)
// Docs and the-path-growth are intentionally excluded.
const seoImagesByPath = {
  projects: projects.map((p) => ({
    src: p.image,
    alt: p.imageAlt || p.title,
  })),
};

for (const [slug, exp] of Object.entries(experiences)) {
  const imgs = [];
  if (exp.ogImage) imgs.push({ src: exp.ogImage, alt: exp.seo?.title || exp.company });
  if (exp.teamPhoto?.image)
    imgs.push({ src: exp.teamPhoto.image, alt: exp.teamPhoto.caption || `${exp.company} team` });
  if (exp.videoDemo?.thumbnail)
    imgs.push({
      src: exp.videoDemo.thumbnail,
      alt: exp.videoDemo.title || `${exp.company} demo`,
    });
  if (exp.logo) imgs.push({ src: exp.logo, alt: `${exp.company} logo` });
  seoImagesByPath[`experience/${slug}`] = imgs;
}

for (const cred of credentials) {
  if (cred.fallbackImage) {
    seoImagesByPath[`credential/${cred.slug}`] = [
      {
        src: cred.fallbackImage,
        alt: `${cred.title} — ${cred.issuer} certificate`,
      },
    ];
  }
}

// Static pages
const pages = [
  {
    path: 'projects',
    title: "Projects | Joseph's Portfolio",
    description: "Explore Joseph Chamdani's portfolio of AI, web development, and game projects.",
    image: 'https://joechamdani.com/Logo_Joseph.PNG',
    url: 'https://joechamdani.com/projects'
  },
  {
    path: 'seo-docs',
    title: "SEO & Technical Documentation | Joseph Davis Chamdani",
    description: "How I solved React SPA SEO challenges with static page generation. Custom SEO optimization, Open Graph meta tags, and modern web architecture.",
    image: 'https://joechamdani.com/Logo_Joseph.PNG',
    url: 'https://joechamdani.com/seo-docs'
  }
];

// Generate experience pages from experiences.json
for (const [slug, exp] of Object.entries(experiences)) {
  const image = exp.ogImage || exp.teamPhoto?.image || exp.logo;
  pages.push({
    path: `experience/${slug}`,
    title: `${exp.seo.title} | Joseph Chamdani`,
    description: exp.seo.description,
    image: `https://joechamdani.com${image}`,
    url: `https://joechamdani.com/experience/${slug}`
  });
}

// Generate credential pages from credentials.json
for (const cred of credentials) {
  const image = cred.fallbackImage
    ? `https://joechamdani.com${cred.fallbackImage}`
    : 'https://joechamdani.com/preview.png';
  pages.push({
    path: `credential/${cred.slug}`,
    title: `${cred.title} — ${cred.issuer} | Joseph Chamdani`,
    description: `${cred.title} certification issued by ${cred.issuer}${cred.issued ? ` (${cred.issued})` : ''}. View credential details and certificate.`,
    image,
    url: `https://joechamdani.com/credential/${cred.slug}`
  });
}

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

  // Replace Twitter tags (using name= attribute)
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

  // Remove og:image dimensions since Logo_Joseph.PNG is not 1200x630
  html = html.replace(/<meta property="og:image:width" content=".*?" \/>\n?\s*/g, '');
  html = html.replace(/<meta property="og:image:height" content=".*?" \/>\n?\s*/g, '');

  // Inject SEO image block for indexable routes (docs excluded)
  const seoImages = seoImagesByPath[page.path];
  if (seoImages?.length) {
    html = injectSeoBlock(html, buildSeoImagesBlock(seoImages));
  }

  // Write the modified HTML
  fs.writeFileSync(path.join(pageDir, 'index.html'), html);
  console.log(
    `[+] Generated: ${page.path}/index.html${
      seoImages?.length ? ` (+${seoImages.length} SEO images)` : ''
    }`
  );
}

// ---------------------------------------------------------------------------
// Homepage SEO image injection
// ---------------------------------------------------------------------------
// React SPAs render images via JavaScript, so Googlebot-Image often cannot see
// them. Inject a hidden <div> of <img> tags into dist/index.html so the raw
// HTML has real image references crawlers can index. The div is hidden from
// users (hidden + aria-hidden) and sits outside #root so React ignores it on
// hydration.
//
// Only the homepage is injected — other pages are either noindex (the-path-
// growth), docs, or already have their content served through the existing
// static page generation above.

const homepageImages = [];

// Profile photo (hero)
homepageImages.push({
  src: '/Joseph_Chamdani.webp',
  alt: 'Joseph Davis Chamdani — Informatics student at the University of Washington',
});

// Images explicitly excluded from SEO indexing (still rendered by the site)
const excludedFromSeo = new Set([
  '/media/UW-Dining.png',
  '/media/bay-laurel.jpg',
]);

// Every milestone media entry
for (const company of milestones.companies || []) {
  for (const role of company.roles || []) {
    for (const media of role.media || []) {
      // Normalize src (some start with media/, some with /media/)
      const src = media.src.startsWith('/') ? media.src : `/${media.src}`;
      if (excludedFromSeo.has(src)) continue;
      homepageImages.push({
        src,
        alt: media.caption
          ? `${media.caption} — ${company.name}`
          : `${role.title} at ${company.name}`,
      });
    }
  }
}

// Tennis + coffee section (rendered by TennisCoffeeSection React component)
const tennisAndCoffeeImages = [
  {
    src: '/images/moments/Joseph_Chamdani_Diadem_Forehand.webp',
    alt: 'Joseph Chamdani forehand shot with Diadem Elevate 98 racket',
  },
  {
    src: '/images/moments/Joseph_Chamdani_Diadem_Slice.webp',
    alt: 'Joseph Chamdani slice shot with Diadem Elevate 98 racket',
  },
  {
    src: '/images/moments/Joseph_Chamdani_Diadem_Slice_Follow_Through.webp',
    alt: 'Joseph Chamdani slice follow-through with Diadem Elevate 98 racket',
  },
  {
    src: '/images/moments/Joseph_Chamdani_Tennis.jpg',
    alt: 'Joseph Chamdani playing tennis — forehand shot on the court',
  },
  {
    src: '/images/moments/Joseph_Chamdani_Tennis_4.jpg',
    alt: 'Joseph Chamdani playing tennis — one-handed backhand',
  },
  {
    src: '/images/moments/Joseph_Chamdani_Tennis_2.jpg',
    alt: 'Joseph Chamdani playing tennis — forehand during match',
  },
  {
    src: '/images/moments/Joseph_Chamdani_Tennis_3.JPG',
    alt: 'Joseph Chamdani with tennis partner on the court',
  },
  {
    src: '/images/moments/Coffee.webp',
    alt: 'Joseph Chamdani at a coffee shop — latte and iced americano are go-to orders',
  },
];
homepageImages.push(...tennisAndCoffeeImages);

// De-duplicate by src
const seenSrcs = new Set();
const uniqueHomepageImages = homepageImages.filter((img) => {
  if (seenSrcs.has(img.src)) return false;
  seenSrcs.add(img.src);
  return true;
});

const homepageSeoBlock = buildSeoImagesBlock(uniqueHomepageImages);
const homepagePath = path.join(distPath, 'index.html');
let homepageHtml = fs.readFileSync(homepagePath, 'utf8');
homepageHtml = injectSeoBlock(homepageHtml, homepageSeoBlock);
fs.writeFileSync(homepagePath, homepageHtml);
console.log(`[+] Injected ${uniqueHomepageImages.length} SEO image tags into homepage`);

console.log('[+] Static pages generated successfully!');
