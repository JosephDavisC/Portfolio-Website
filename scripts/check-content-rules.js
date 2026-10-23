/**
 * Build guards for content and config mistakes that are invisible in dev and
 * only show up in production, where they are expensive to notice.
 *
 * Each check below exists because the exact bug it describes actually shipped.
 * They run in the build, so they also block a deploy.
 *
 * Adding a check: make it fail loudly with a fix line, and prove it fires by
 * breaking the thing on purpose once. A guard nobody has watched fail is not
 * known to work.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { latestEpisode } from '../src/lib/episodes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const r = (...p) => path.join(ROOT, ...p);
const read = (p) => fs.readFileSync(r(p), 'utf8');
const readJson = (p) => JSON.parse(read(p));

const problems = [];
const fail = (check, detail, fix) => problems.push({ check, detail, fix });

/* ------------------------------------------------------------------ *
 * 1. Social preview images must be a raster format.
 *
 * LinkedIn and Facebook render neither SVG nor WebP in link previews. The
 * Whitespace page shipped with an .svg og:image and its preview was blank
 * everywhere it was shared, with nothing in the build to say so.
 * ------------------------------------------------------------------ */
function checkOgImageFormat() {
  const bad = /\.(svg|webp)$/i;
  let checked = 0;

  const experiences = readJson('src/data/experiences.json');
  for (const [slug, exp] of Object.entries(experiences)) {
    // ogImage wins, else the generator falls back to teamPhoto then logo.
    const effective = exp.ogImage || exp.teamPhoto?.image || exp.logo;
    if (!effective) continue;
    checked++;
    if (bad.test(effective)) {
      fail(
        'og-image-format',
        `experiences.json "${slug}" resolves its og:image to ${effective}`,
        'point ogImage at a .jpg or .png; the render site can still serve webp via <picture>'
      );
    }
  }

  // credentials.fallbackImage is this page's og:image in generate-static-pages.js
  for (const cred of readJson('src/data/credentials.json')) {
    if (!cred.fallbackImage) continue;
    checked++;
    if (bad.test(cred.fallbackImage)) {
      fail(
        'og-image-format',
        `credentials.json "${cred.slug}" fallbackImage is ${cred.fallbackImage}`,
        'use a .jpg or .png; it doubles as the og:image for that credential page'
      );
    }
  }

  // the hand-written tags in index.html
  const html = read('index.html');
  for (const m of html.matchAll(/(og:image|twitter:image)" content="([^"]+)"/g)) {
    checked++;
    if (bad.test(m[2])) {
      fail(
        'og-image-format',
        `index.html ${m[1]} is ${m[2]}`,
        'use a .jpg or .png'
      );
    }
  }
  return checked;
}

/* ------------------------------------------------------------------ *
 * 2. Image paths in the data files must be root relative.
 *
 * Three milestones entries were missing their leading slash. They resolved on
 * the homepage and 404'd on /experience/, because a relative path is resolved
 * against the current route. Broken for months, invisible from the homepage.
 * ------------------------------------------------------------------ */
function checkAbsoluteMediaPaths() {
  let checked = 0;
  const looksLikePath = (v) =>
    typeof v === 'string' && /\.(jpe?g|png|webp|svg|gif|avif|mp4|pdf)$/i.test(v);

  for (const file of ['milestones.json', 'experiences.json', 'projects.json', 'credentials.json']) {
    const walk = (node, trail) => {
      if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${trail}[${i}]`));
      if (node && typeof node === 'object') {
        return Object.entries(node).forEach(([k, v]) => walk(v, `${trail}.${k}`));
      }
      if (!looksLikePath(node)) return;
      if (/^https?:\/\//i.test(node)) return; // absolute URLs are fine
      checked++;
      if (!node.startsWith('/')) {
        fail(
          'absolute-media-path',
          `${file} ${trail} is "${node}"`,
          'add the leading slash; without it the path resolves against the current route and 404s on nested pages'
        );
      }
    };
    walk(readJson(`src/data/${file}`), '');
  }
  return checked;
}

/* ------------------------------------------------------------------ *
 * 3. HTML must not be served with stale-while-revalidate.
 *
 * Vite renames chunks every build and the deploy removes the old ones, so any
 * stale index.html the edge serves points at chunks that now 404. The SPA then
 * dies on "Failed to fetch dynamically imported module" and renders a white
 * page. With swr=86400 the edge was entitled to do that for 24 hours, and it
 * served a mix of fresh and stale so a single curl looked fine.
 * ------------------------------------------------------------------ */
function checkHtmlCachePolicy() {
  const htaccess = read('public/.htaccess');
  // isolate the <FilesMatch ...html...> blocks
  const blocks = htaccess.match(/<FilesMatch[^>]*\\\.html\$[^>]*>[\s\S]*?<\/FilesMatch>/gi) || [];
  if (!blocks.length) return 0;
  for (const block of blocks) {
    if (/stale-while-revalidate/i.test(block)) {
      fail(
        'html-cache-policy',
        'public/.htaccess serves .html with stale-while-revalidate',
        'remove it. Chunk names change every build, so stale HTML points at deleted chunks and white-pages the site'
      );
    }
  }
  return blocks.length;
}

/* ------------------------------------------------------------------ *
 * 4. An ended role must not still read "Present" anywhere.
 *
 * The bio and the experience entry live in more than one place: the data files,
 * the <noscript> block and the JSON-LD in index.html. Whitespace was given an
 * end date in experiences.json while index.html still said "Jul 2026 - Present",
 * and Google kept quoting the stale line as the site snippet.
 * ------------------------------------------------------------------ */
function checkEndedRolesNotPresent() {
  const experiences = readJson('src/data/experiences.json');
  const html = read('index.html');
  let checked = 0;

  for (const [slug, exp] of Object.entries(experiences)) {
    const duration = exp.duration || '';
    const ended = duration && !/present/i.test(duration);
    if (!ended) continue;
    checked++;

    const company = exp.company;
    if (!html.includes(company)) continue;

    // Look at the lines mentioning this company, plus the line after, which is
    // where the noscript block keeps its "Company | dates | location" line.
    const lines = html.split('\n');
    lines.forEach((line, i) => {
      const window = [line, lines[i + 1] || ''].join(' ');
      if (!window.includes(company)) return;
      if (/present/i.test(window)) {
        fail(
          'ended-role-still-present',
          `index.html line ${i + 1} still pairs "${company}" with "Present", but experiences.json says "${duration}"`,
          'update the <noscript> block and the JSON-LD; they are hand maintained and do not read the JSON'
        );
      }
    });
  }

  // milestones.json is the other copy of the same facts
  const milestones = readJson('src/data/milestones.json');
  for (const [slug, exp] of Object.entries(experiences)) {
    if (/present/i.test(exp.duration || '')) continue;
    for (const co of milestones.companies || []) {
      if (co.name !== exp.company) continue;
      for (const role of co.roles || []) {
        checked++;
        if (/present/i.test(role.dates || '')) {
          fail(
            'ended-role-still-present',
            `milestones.json "${co.name}" role "${role.title}" says "${role.dates}", but experiences.json says "${exp.duration}"`,
            'give the milestones role its real end date so update-durations.js stops rewriting it'
          );
        }
      }
    }
  }
  return checked;
}

/* ------------------------------------------------------------------ *
 * 5. Every image in the sitemap must exist on disk.
 *
 * Renaming a file to bust a poisoned cache is the one reliable fix for an
 * asset that was ever served as immutable, and it is easy to update the code
 * references and forget the sitemap. That leaves Google fetching a 404 for an
 * image you told it to index. Happened twice in one day on 06 Oct 2026.
 * ------------------------------------------------------------------ */
function checkSitemapImagesExist() {
  const xml = read('public/sitemap.xml');
  let checked = 0;
  for (const m of xml.matchAll(/<image:loc>\s*([^<]+?)\s*<\/image:loc>/g)) {
    // XML requires & encoded as &amp;, and a path may be percent encoded, so
    // both have to be undone before comparing against the filesystem.
    const url = m[1]
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
    let rel = url.replace(/^https?:\/\/[^/]+/, '');
    try { rel = decodeURIComponent(rel); } catch { /* leave as-is if malformed */ }
    checked++;
    if (!fs.existsSync(r('public', rel))) {
      fail(
        'sitemap-image-missing',
        `sitemap.xml lists ${rel} but no such file exists in public/`,
        'update the <image:loc> to the current filename, or drop the entry if the image is gone'
      );
    }
  }
  return checked;
}

/* ------------------------------------------------------------------ *
 * 6. The newest episode of every series is in the hand-kept copies.
 *
 * The series page, its JSON-LD and the /projects Watch button all follow
 * src/data/episodes.json on their own. Three files do not: the <noscript>
 * block in index.html, public/llms.txt and the sitemap's image entries are
 * edited by hand, so a new episode can go live while crawlers and AI readers
 * still see the previous one as the latest.
 * ------------------------------------------------------------------ */
function checkLatestEpisodeEverywhere() {
  const series = readJson('src/data/episodes.json');
  const indexHtml = read('index.html');
  const noscript = (indexHtml.match(/<noscript>\s*<main[\s\S]*?<\/noscript>/) || [''])[0];
  const llms = read('public/llms.txt');
  const sitemapImages = [...read('public/sitemap.xml').matchAll(/<image:loc>\s*([^<]+?)\s*<\/image:loc>/g)].map((m) => m[1]);
  let checked = 0;
  for (const [slug, eps] of Object.entries(series)) {
    const ep = latestEpisode(eps);
    if (!ep) continue;
    checked++;
    const short = `youtube.com/shorts/${ep.youtubeId}`;
    const name = `${slug} Ep ${ep.n} "${ep.title}"`;
    if (!noscript.includes(short))
      fail('latest-episode', `index.html <noscript> does not link the newest episode, ${name}`, `point the Projects entry's latest episode link in the <noscript> block at https://www.${short}`);
    if (!llms.includes(short))
      fail('latest-episode', `public/llms.txt does not list the newest episode, ${name}`, `add a line for it under the series in llms.txt with https://www.${short}`);
    if (!sitemapImages.some((u) => u.endsWith(ep.cover)))
      fail('latest-episode', `sitemap.xml has no <image:image> for the newest episode's cover, ${ep.cover}`, `add an <image:image> with <image:loc>https://joechamdani.com${ep.cover}</image:loc> to the /projects/${slug}/ entry`);
  }
  return checked;
}

export function checkContentRules() {
  const counts = {
    'og:image format': checkOgImageFormat(),
    'absolute media paths': checkAbsoluteMediaPaths(),
    'html cache policy': checkHtmlCachePolicy(),
    'ended roles': checkEndedRolesNotPresent(),
    'sitemap images': checkSitemapImagesExist(),
    'latest episode copies': checkLatestEpisodeEverywhere(),
  };

  if (problems.length) {
    console.error('\n[content-guard] FAILED\n');
    for (const { check, detail, fix } of problems) {
      console.error(`  [${check}] ${detail}`);
      console.error(`    fix: ${fix}\n`);
    }
    console.error(`[content-guard] ${problems.length} problem(s). Build stopped.\n`);
    process.exit(1);
  }

  const summary = Object.entries(counts)
    .map(([k, v]) => `${k} ${v}`)
    .join(', ');
  console.log(`[content-guard] OK: ${summary}`);
}

// Run directly (node scripts/check-content-rules.js) as well as via import.
if (process.argv[1] === __filename) checkContentRules();
