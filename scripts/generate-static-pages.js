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

// Helper: escape text for safe HTML embedding
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Helper: "Aug 2025" -> "2025-08-01" (best-effort ISO date for schema)
function toIsoDate(s) {
  if (!s) return null;
  const months = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
  const m = String(s).toLowerCase().match(/([a-z]{3})[a-z]*\s+(\d{4})/);
  return m && months[m[1]] ? `${m[2]}-${months[m[1]]}-01` : null;
}

// Helper: inject extra tags (JSON-LD, preloads) just before </head>
function injectHeadExtras(html, tags) {
  if (!tags) return html;
  return html.replace('</head>', `${tags}\n  </head>`);
}

// Helper: BreadcrumbList JSON-LD for a two-level page
function breadcrumbLd(name, url) {
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://joechamdani.com/' },
      { '@type': 'ListItem', position: 2, name, item: url },
    ],
  })}</script>`;
}

// Helper: strip the site-wide semantic <noscript> fallback (the homepage
// resume block) from interior pages. Content-extraction libraries used by AI
// crawlers pick the LARGER generic block over the page-specific prerender,
// so on interior pages the duplicate actively hurts citability. The GTM
// <noscript> iframe is untouched (this only matches the <main> variant).
function stripSemanticNoscript(html) {
  return html.replace(/<noscript>\s*<main[\s\S]*?<\/noscript>/, '');
}

// Helper: crawler-visible fallback content, injected inside #root so AI
// crawlers (GPTBot, ClaudeBot, PerplexityBot — none execute JS) see real
// page content, not an empty div. React replaces it the moment it mounts.
// Inline-styled minimally so the brief pre-hydration paint looks clean in
// both themes (colors inherit from the app CSS on <body>).
function buildFallbackMain(inner) {
  return `<main data-prerender style="max-width:64rem;margin:0 auto;padding:3rem 1.5rem">${inner}</main>`;
}

// Helper: inject fallback content into the empty #root of the base HTML
function injectRootFallback(html, fallbackMain) {
  if (!fallbackMain) return html;
  return html.replace('<div id="root"></div>', `<div id="root">${fallbackMain}</div>`);
}

// Build fallback content per route (keyed by page.path)
const fallbackByPath = {
  projects: buildFallbackMain(
    `<h1>Projects</h1><p>AI, web development, and game projects by Joseph Davis Chamdani.</p>` +
      projects
        .map(
          (p) =>
            `<section><h2>${esc(p.title)}</h2><p>${esc(p.description)}</p><p>Tech: ${esc((p.tech || []).join(', '))}</p></section>`
        )
        .join('') +
      `<p><a href="/">Joseph Davis Chamdani — Portfolio</a></p>`
  ),
};

for (const [slug, exp] of Object.entries(experiences)) {
  const highlights = (exp.highlights || [])
    .map((h) => `<li>${esc(h)}</li>`)
    .join('');
  const logoImg = exp.logo
    ? `<img src="${esc(exp.logo)}" alt="${esc(exp.company)} logo" width="96" height="96" fetchpriority="high" style="object-fit:contain">`
    : '';
  fallbackByPath[`experience/${slug}`] = buildFallbackMain(
    logoImg +
      `<h1>${esc(exp.role)} — ${esc(exp.company)}</h1>` +
      `<p>${esc(exp.type)} · ${esc(exp.duration)} · ${esc(exp.location)}</p>` +
      `<p>${esc(exp.description)}</p>` +
      (highlights ? `<h2>Highlights</h2><ul>${highlights}</ul>` : '') +
      ((exp.technologies || []).length
        ? `<p>Technologies: ${esc(exp.technologies.join(', '))}</p>`
        : '') +
      `<p><a href="/">Joseph Davis Chamdani — Portfolio</a></p>`
  );
}

for (const cred of credentials) {
  const bullets = (cred.highlights || [])
    .map((b) => `<li>${esc(b)}</li>`)
    .join('');
  fallbackByPath[`credential/${cred.slug}`] = buildFallbackMain(
    `<h1>${esc(cred.title)}</h1>` +
      `<p>Issued by ${esc(cred.issuer)}${cred.issued ? ` · ${esc(cred.issued)}` : ''}</p>` +
      (cred.note ? `<p>${esc(cred.note)}</p>` : '') +
      (bullets ? `<ul>${bullets}</ul>` : '') +
      `<p><a href="/">Joseph Davis Chamdani — Portfolio</a></p>`
  );
}

// Static pages
const pages = [
  {
    path: 'projects',
    title: "Projects | Joseph's Portfolio",
    description: "Explore Joseph Chamdani's portfolio of AI, web development, and game projects.",
    image: 'https://joechamdani.com/Logo_Joseph.PNG',
    url: 'https://joechamdani.com/projects/'
  },
  {
    path: 'seo-docs',
    title: "SEO & Technical Documentation | Joseph Davis Chamdani",
    description: "How I solved React SPA SEO challenges with static page generation. Custom SEO optimization, Open Graph meta tags, and modern web architecture.",
    image: 'https://joechamdani.com/Logo_Joseph.PNG',
    url: 'https://joechamdani.com/seo-docs/'
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
    url: `https://joechamdani.com/experience/${slug}/`
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
    url: `https://joechamdani.com/credential/${cred.slug}/`
  });
}

// Per-page head extras: LCP preloads + page-type JSON-LD (crawler-visible,
// unlike the Helmet-injected schema which needs JS execution)
const headExtrasByPath = {
  projects: breadcrumbLd('Projects', 'https://joechamdani.com/projects/'),
};

for (const [slug, exp] of Object.entries(experiences)) {
  const extras = [];
  if (exp.logo) {
    // The company logo is the LCP element on experience pages and is
    // otherwise only discoverable after hydration + lazy-chunk load.
    extras.push(`<link rel="preload" as="image" href="${esc(exp.logo)}" fetchpriority="high">`);
  }
  extras.push(breadcrumbLd(exp.company, `https://joechamdani.com/experience/${slug}/`));
  headExtrasByPath[`experience/${slug}`] = extras.join('\n    ');
}

for (const cred of credentials) {
  const url = `https://joechamdani.com/credential/${cred.slug}/`;
  const credLd = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: cred.title,
    credentialCategory: 'certificate',
    url,
    ...(toIsoDate(cred.issued) ? { dateCreated: toIsoDate(cred.issued) } : {}),
    recognizedBy: { '@type': 'Organization', name: cred.issuer },
    about: { '@type': 'Person', name: 'Joseph Davis Chamdani', url: 'https://joechamdani.com/' },
  })}</script>`;
  headExtrasByPath[`credential/${cred.slug}`] = [
    credLd,
    breadcrumbLd(cred.title, url),
  ].join('\n    ');
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

  // Inject crawler-visible fallback content into #root
  html = injectRootFallback(html, fallbackByPath[page.path]);

  // Drop the homepage's semantic <noscript> resume block on interior pages
  // (it out-competes the page-specific content during AI/crawler extraction)
  html = stripSemanticNoscript(html);

  // Drop the homepage hero-image preload on interior pages (wasted bandwidth
  // on pages that never render it above the fold)
  html = html.replace(/\s*<link rel="preload" as="image" href="\/Joseph_Chamdani\.webp"[^>]*>/, '');

  // Inject page-type JSON-LD + LCP preloads into <head>
  html = injectHeadExtras(html, headExtrasByPath[page.path]);

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

// ---------------------------------------------------------------------------
// Homepage hero prerender
// ---------------------------------------------------------------------------
// Static copy of Hero.tsx's above-the-fold markup, injected into #root so the
// hero paints from raw HTML before React hydrates (mobile LCP fix) and so
// AI crawlers see real homepage content. Uses the exact Tailwind classes from
// Hero.tsx (they are guaranteed to exist in the built CSS). React wipes this
// on mount. KEEP IN SYNC with src/components/sections/Hero.tsx.
const heroPrerender = `<section class="min-h-screen flex items-center justify-center px-6 py-20 relative bg-paper dark:bg-[#141B2D]"><div class="max-w-7xl mx-auto relative z-10"><div class="grid lg:grid-cols-2 gap-16 items-center"><div class="text-left"><div class="mb-8"><div class="mb-6"><h1 class="text-5xl md:text-7xl font-heading font-bold text-espresso dark:text-slate-100 leading-tight tracking-tight">Joseph Davis Chamdani</h1></div><p class="text-2xl md:text-3xl text-espresso/80 dark:text-slate-300 mb-4 font-light text-balance">I build <span class="text-court-dark dark:text-[#60A5FA] font-medium">AI and data products</span>, and I ship them.</p><p class="text-sm md:text-base text-espresso/60 dark:text-slate-400 max-w-2xl leading-relaxed mb-6 font-mono text-pretty">Informatics @ UW · Anthropic hackathon winner · NVIDIA open source contributor</p><div class="flex items-center gap-3 flex-wrap"><span class="inline-flex items-center gap-2 px-4 py-2 bg-espresso/5 dark:bg-slate-800 border-2 border-espresso/20 dark:border-slate-600 rounded-full text-espresso dark:text-slate-200 font-mono text-sm shadow-brutal-sm dark:shadow-none relative">Coffee Lover</span><span class="inline-flex items-center gap-2 px-4 py-2 bg-court/10 dark:bg-[#60A5FA]/10 border-2 border-court/30 dark:border-[#60A5FA]/30 rounded-full text-court-dark dark:text-[#60A5FA] font-mono text-sm shadow-brutal-sm dark:shadow-none">Tennis player</span></div></div><div class="flex flex-col sm:flex-row gap-4"><a href="#portfolio" class="btn-brutal-outline inline-flex items-center justify-center">See my work</a><a href="#contact" class="btn-brutal inline-flex items-center justify-center">Let's Connect</a></div></div><div class="flex justify-center lg:justify-end"><div class="relative"><div class="relative flex w-80 h-80 md:w-96 md:h-96 shrink-0 overflow-hidden rounded-full border-4 border-espresso shadow-brutal-lg z-10"><picture><source srcset="/Joseph_Chamdani.webp" type="image/webp"><img src="/Joseph_Chamdani.JPEG" alt="Joseph Davis Chamdani" class="aspect-square h-full w-full object-cover object-top" fetchpriority="high"></picture></div></div></div></div></div></section>`;

const homepagePath = path.join(distPath, 'index.html');
let homepageHtml = fs.readFileSync(homepagePath, 'utf8');
homepageHtml = injectSeoBlock(homepageHtml, homepageSeoBlock);
homepageHtml = injectRootFallback(homepageHtml, heroPrerender);
fs.writeFileSync(homepagePath, homepageHtml);
console.log(`[+] Injected ${uniqueHomepageImages.length} SEO image tags + hero prerender into homepage`);

console.log('[+] Static pages generated successfully!');
