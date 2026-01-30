/**
 * WebP Conversion Script
 * Converts all JPEG/PNG images in /public to WebP format
 * Keeps original files for SEO fallback
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// Track conversion stats
let converted = 0;
let skipped = 0;
let failed = 0;

async function convertToWebP(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  // Skip if WebP already exists
  if (fs.existsSync(webpPath)) {
    skipped++;
    return;
  }

  try {
    await sharp(filePath)
      .webp({
        quality: 85,  // Good balance of quality and size
        effort: 6     // Higher = smaller file, slower conversion
      })
      .toFile(webpPath);

    const originalSize = fs.statSync(filePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${path.relative(PUBLIC_DIR, filePath)}`);
    console.log(`  → ${path.basename(webpPath)} (${savings}% smaller)`);
    converted++;
  } catch (err) {
    console.error(`✗ Failed: ${filePath}`);
    console.error(`  Error: ${err.message}`);
    failed++;
  }
}

function findImages(dir) {
  const images = [];

  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walk(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          images.push(filePath);
        }
      }
    }
  }

  walk(dir);
  return images;
}

async function main() {
  console.log('🖼️  WebP Conversion Script\n');
  console.log(`Scanning: ${PUBLIC_DIR}\n`);

  const images = findImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to process\n`);
  console.log('─'.repeat(50));

  for (const imagePath of images) {
    await convertToWebP(imagePath);
  }

  console.log('─'.repeat(50));
  console.log(`\n📊 Summary:`);
  console.log(`   Converted: ${converted}`);
  console.log(`   Skipped (already exists): ${skipped}`);
  console.log(`   Failed: ${failed}`);
  console.log(`\n✅ Done! Original files preserved for SEO fallback.`);
}

main().catch(console.error);
