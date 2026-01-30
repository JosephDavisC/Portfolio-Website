/**
 * Image Optimization Script
 * Resizes and compresses images for web performance
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');

// Configuration
const CONFIG = {
  // Hero image - critical for LCP
  hero: {
    path: 'Joseph_Chamdani',
    maxWidth: 800,
    quality: 80
  },
  // Logo - small icon
  logo: {
    path: 'Logo_Joseph',
    maxWidth: 100,
    quality: 85
  },
  // Default for all other images
  default: {
    maxWidth: 1200,
    quality: 75
  },
  // Thumbnails and small images
  thumbnails: {
    maxWidth: 600,
    quality: 75
  }
};

async function getImageInfo(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    const stats = fs.statSync(filePath);
    return {
      width: metadata.width,
      height: metadata.height,
      size: stats.size,
      sizeKB: (stats.size / 1024).toFixed(1)
    };
  } catch (e) {
    return null;
  }
}

async function optimizeImage(inputPath, maxWidth, quality) {
  const ext = path.extname(inputPath).toLowerCase();
  const webpPath = inputPath.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '.webp');

  const metadata = await sharp(inputPath).metadata();
  const needsResize = metadata.width > maxWidth;

  let pipeline = sharp(inputPath);

  if (needsResize) {
    pipeline = pipeline.resize(maxWidth, null, {
      withoutEnlargement: true,
      fit: 'inside'
    });
  }

  await pipeline
    .webp({ quality, effort: 6 })
    .toFile(webpPath + '.tmp');

  // Replace original webp
  fs.renameSync(webpPath + '.tmp', webpPath);

  return {
    resized: needsResize,
    originalWidth: metadata.width,
    newWidth: needsResize ? maxWidth : metadata.width
  };
}

async function main() {
  console.log('🚀 Image Optimization for Web Performance\n');
  console.log('═'.repeat(60));

  // 1. Optimize Hero Image (CRITICAL)
  console.log('\n📸 HERO IMAGE (Critical for LCP)');
  console.log('─'.repeat(40));

  const heroJpeg = path.join(PUBLIC_DIR, 'Joseph_Chamdani.JPEG');
  const heroWebp = path.join(PUBLIC_DIR, 'Joseph_Chamdani.webp');

  const heroBefore = await getImageInfo(heroWebp);
  console.log(`Before: ${heroBefore.width}x${heroBefore.height}, ${heroBefore.sizeKB}KB`);

  await optimizeImage(heroJpeg, CONFIG.hero.maxWidth, CONFIG.hero.quality);

  const heroAfter = await getImageInfo(heroWebp);
  console.log(`After:  ${heroAfter.width}x${heroAfter.height}, ${heroAfter.sizeKB}KB`);
  console.log(`✅ Saved ${((heroBefore.size - heroAfter.size) / 1024).toFixed(0)}KB (${((1 - heroAfter.size/heroBefore.size) * 100).toFixed(0)}% reduction)`);

  // 2. Optimize Logo
  console.log('\n🎨 LOGO');
  console.log('─'.repeat(40));

  const logoPng = path.join(PUBLIC_DIR, 'Logo_Joseph.PNG');
  const logoWebp = path.join(PUBLIC_DIR, 'Logo_Joseph.webp');

  const logoBefore = await getImageInfo(logoWebp);
  console.log(`Before: ${logoBefore.width}x${logoBefore.height}, ${logoBefore.sizeKB}KB`);

  await optimizeImage(logoPng, CONFIG.logo.maxWidth, CONFIG.logo.quality);

  const logoAfter = await getImageInfo(logoWebp);
  console.log(`After:  ${logoAfter.width}x${logoAfter.height}, ${logoAfter.sizeKB}KB`);
  console.log(`✅ Saved ${((logoBefore.size - logoAfter.size) / 1024).toFixed(0)}KB`);

  // 3. Optimize all other images
  console.log('\n🖼️  ALL OTHER IMAGES');
  console.log('─'.repeat(40));

  const directories = [
    'media',
    'logos',
    'images/portfolio',
    'images/moments',
    'images/chibis',
    'images/rackets',
    'images/404',
    'article_media/bc-hacks-2024',
    'article_media/journey',
    'Milestones/Sector',
    'cursors',
    'docs'
  ];

  let totalSaved = 0;
  let processedCount = 0;

  for (const dir of directories) {
    const dirPath = path.join(PUBLIC_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

      const filePath = path.join(dirPath, file);
      const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

      if (!fs.existsSync(webpPath)) continue;

      try {
        const before = await getImageInfo(webpPath);

        // Determine max width based on directory
        let maxWidth = CONFIG.default.maxWidth;
        if (dir.includes('logo') || dir.includes('cursor')) {
          maxWidth = 200;
        } else if (dir.includes('chibi')) {
          maxWidth = 300;
        }

        // Only re-optimize if image is too large
        if (before.width > maxWidth) {
          await optimizeImage(filePath, maxWidth, CONFIG.default.quality);
          const after = await getImageInfo(webpPath);
          const saved = before.size - after.size;
          totalSaved += saved;
          processedCount++;
          console.log(`✓ ${dir}/${file}: ${before.width}→${after.width}px, saved ${(saved/1024).toFixed(0)}KB`);
        }
      } catch (e) {
        // Skip problematic files
      }
    }
  }

  console.log(`\nOptimized ${processedCount} additional images, saved ${(totalSaved/1024).toFixed(0)}KB total`);

  // Final summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 FINAL VERIFICATION');
  console.log('═'.repeat(60));

  const finalHero = await getImageInfo(heroWebp);
  const finalLogo = await getImageInfo(logoWebp);

  console.log(`\nHero Image: ${finalHero.sizeKB}KB (target: <100KB) ${parseFloat(finalHero.sizeKB) < 100 ? '✅' : '⚠️'}`);
  console.log(`Logo:       ${finalLogo.sizeKB}KB (target: <10KB) ${parseFloat(finalLogo.sizeKB) < 10 ? '✅' : '⚠️'}`);
  console.log(`\nDimensions:`);
  console.log(`Hero: ${finalHero.width}x${finalHero.height}px (target: ≤800px) ${finalHero.width <= 800 ? '✅' : '⚠️'}`);
  console.log(`Logo: ${finalLogo.width}x${finalLogo.height}px (target: ≤100px) ${finalLogo.width <= 100 ? '✅' : '⚠️'}`);
}

main().catch(console.error);
