/**
 * Build guard: every raster image that a <picture><source type="image/webp">
 * points at MUST have a .webp twin on disk.
 *
 * Why this fails the build rather than warning:
 * a <source> is chosen by its `type`, not by whether the file exists. If the
 * .webp is missing the browser still picks that source and the image renders
 * BROKEN. It does not fall back to the <img>. That makes a missing twin a
 * silent bug: invisible in dev, visible in production. Cheaper to fail here.
 *
 * Scope: files under src/ that render images through the webp path helpers
 * (OptimizedImage, or a hand-rolled <picture> using getWebPPath). Data files are
 * included because that is where the paths actually live.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

// ThePathGrowth* pages are deliberately excluded: they are unpublished work kept
// permanently uncommitted, and they do not use the webp <picture> path.
const EXCLUDE = [/\.backup\./, /ThePathGrowth/];

const RASTER = /"(\/[^"]+\.(?:jpg|JPG|jpeg|JPEG|png|PNG))"/g;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts|json)$/.test(entry.name)) out.push(p);
  }
  return out;
}

export function checkWebpTwins() {
  const all = walk(path.join(ROOT, 'src')).filter(
    (f) => !EXCLUDE.some((re) => re.test(f))
  );

  // Only guard what actually reaches a <picture><source type="image/webp">:
  //   - src/data/*.json, whose paths are rendered by those components
  //   - .tsx files that import the webp helpers or OptimizedImage
  // Everything else legitimately uses a raster path with no twin. askJosephPdf.ts
  // is the standing example: it embeds a PNG into a generated PDF via jsPDF,
  // where a .webp would be wrong, not missing.
  const files = all.filter((f) => {
    if (/src\/data\/.*\.json$/.test(f)) return true;
    if (!/\.tsx$/.test(f)) return false;
    const s = fs.readFileSync(f, 'utf8');
    return s.includes('OptimizedImage') || s.includes('getWebPPath');
  });

  const missing = [];
  let checked = 0;

  for (const file of files) {
    const src = fs.readFileSync(file, 'utf8');
    for (const m of src.matchAll(RASTER)) {
      const ref = m[1];
      const original = path.join(PUBLIC, ref);
      // Only images that actually ship are our problem. A path that does not
      // resolve at all is a different bug and not what this guard is for.
      if (!fs.existsSync(original)) continue;
      checked++;
      const twin = path.join(
        PUBLIC,
        ref.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      );
      if (!fs.existsSync(twin)) {
        missing.push({
          ref,
          file: path.relative(ROOT, file),
          line: src.slice(0, m.index).split('\n').length,
        });
      }
    }
  }

  if (missing.length) {
    console.error('\n[webp-guard] FAILED: raster images with no .webp twin\n');
    for (const { ref, file, line } of missing) {
      console.error(`  ${ref}`);
      console.error(`    referenced at ${file}:${line}`);
      console.error(
        `    fix: cwebp -q 82 public${ref} -o public${ref.replace(
          /\.(jpg|jpeg|png)$/i,
          '.webp'
        )}`
      );
      console.error('    (logos with transparency: add -alpha_q 100 -q 90)\n');
    }
    console.error(
      `[webp-guard] ${missing.length} missing. A <source> with a missing file\n` +
        '            renders BROKEN, it does not fall back to the <img>.\n'
    );
    process.exit(1);
  }

  console.log(`[webp-guard] OK: ${checked} raster refs all have .webp twins`);
}

// Run directly (node scripts/check-webp-twins.js) as well as via import.
if (process.argv[1] === __filename) checkWebpTwins();
