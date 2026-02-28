import { Client } from 'basic-ftp';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { fileURLToPath } from 'url';
import cliProgress from 'cli-progress';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load FTP configuration
let config;
try {
  const configPath = path.join(__dirname, 'ftp-config.json');
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error('[-] Error: ftp-config.json not found!');
  console.log('\n[*] Please create scripts/ftp-config.json with your FTP credentials');
  process.exit(1);
}

const MANIFEST_PATH = path.join(__dirname, '..', '.deploy-manifest.json');

// Directories on the server that are NOT part of the build output.
// These contain uploaded media, backend code, or legacy files and must never be deleted.
const PROTECTED_DIRS = new Set([
  'api',        // PHP contact form backend + config.php
  'v1',         // old portfolio
  'media',      // certificates, videos
  'cursors',    // custom cursor images
  'Milestones', // milestone images
  'images',     // portfolio images
  'logos',      // company logos
]);

// Hash a file with MD5
function hashFile(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

// Get all files recursively with hashes
function getAllFiles(dir, baseDir = dir) {
  let files = [];
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push({ type: 'dir', relativePath, fullPath });
      files = files.concat(getAllFiles(fullPath, baseDir));
    } else {
      files.push({
        type: 'file',
        relativePath,
        fullPath,
        size: stat.size,
        hash: hashFile(fullPath),
      });
    }
  }
  return files;
}

// Load previous deploy manifest
function loadManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch {
    return null;
  }
}

// Save manifest after successful deploy
function saveManifest(files) {
  const manifest = {};
  for (const f of files) {
    if (f.type === 'file') {
      manifest[f.relativePath] = f.hash;
    }
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

// Check if a remote path is inside a protected directory
function isProtected(relativePath) {
  const topDir = relativePath.split('/')[0];
  return PROTECTED_DIRS.has(topDir);
}

async function createClient() {
  const client = new Client(120000); // 2 minute timeout
  client.ftp.verbose = false;

  await client.access({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port || 21,
    secure: config.secure || false,
    secureOptions: { rejectUnauthorized: false }
  });

  client.ftp.socket.setKeepAlive(true);
  await client.cd(config.remoteRoot);

  return client;
}

async function deploy() {
  const fullDeploy = process.argv.includes('--full');

  const progressBar = new cliProgress.SingleBar({
    format: '[*] Uploading |{bar}| {percentage}% | {value}/{total} | {filename}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  });

  let client;

  try {
    console.log('[*] Starting FTP deployment...\n');

    // Build file list with hashes
    const localDistPath = path.join(__dirname, '..', 'dist');
    const allFiles = getAllFiles(localDistPath);
    const files = allFiles.filter(f => f.type === 'file');

    // Determine what changed
    const prevManifest = loadManifest();
    let filesToUpload;
    let filesToDelete = [];

    if (!prevManifest || fullDeploy) {
      console.log(fullDeploy ? '[*] Full deploy requested\n' : '[*] No previous manifest, uploading everything\n');
      filesToUpload = files;
    } else {
      // Build current manifest for comparison
      const currentManifest = {};
      for (const f of files) {
        currentManifest[f.relativePath] = f.hash;
      }

      // Changed or new files
      filesToUpload = files.filter(f => prevManifest[f.relativePath] !== f.hash);

      // Files removed from build (skip protected dirs)
      for (const oldPath of Object.keys(prevManifest)) {
        if (!currentManifest[oldPath] && !isProtected(oldPath)) {
          filesToDelete.push(oldPath);
        }
      }

      console.log(`[*] Changed/new:  ${filesToUpload.length}`);
      console.log(`[*] To delete:    ${filesToDelete.length}`);
      console.log(`[*] Unchanged:    ${files.length - filesToUpload.length}`);
      console.log(`[*] Total build:  ${files.length}\n`);
    }

    if (filesToUpload.length === 0 && filesToDelete.length === 0) {
      console.log('[+] Nothing changed, skipping deploy!\n');
      saveManifest(files);
      return;
    }

    // Connect to FTP server
    console.log('[*] Connecting to FTP server...');
    client = await createClient();
    console.log('[+] Connected!\n');

    // Delete removed files from server
    if (filesToDelete.length > 0) {
      console.log(`[*] Deleting ${filesToDelete.length} old files...`);
      for (const remotePath of filesToDelete) {
        try {
          await client.remove(remotePath);
          console.log(`    [-] ${remotePath}`);
        } catch (e) {
          // File might not exist on server
        }
      }
      console.log('[+] Cleanup done!\n');
    }

    // Ensure directories exist for files we're uploading
    const dirsNeeded = new Set();
    for (const f of filesToUpload) {
      const dir = path.posix.dirname(f.relativePath);
      if (dir !== '.') {
        const parts = dir.split('/');
        for (let i = 1; i <= parts.length; i++) {
          dirsNeeded.add(parts.slice(0, i).join('/'));
        }
      }
    }
    const sortedDirs = [...dirsNeeded].sort();
    if (sortedDirs.length > 0) {
      console.log(`[*] Creating ${sortedDirs.length} directories...`);
      for (const dir of sortedDirs) {
        try {
          await client.send(`MKD ${dir}`);
        } catch (e) {
          // 550 = directory already exists, that's fine
        }
      }
      console.log('[+] Directories ready!\n');
    }

    // Upload changed files
    progressBar.start(filesToUpload.length, 0, { filename: 'Starting...' });

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const filename = path.basename(file.relativePath);
      progressBar.update(i, { filename: filename.substring(0, 25) });

      let retries = 3;
      while (retries > 0) {
        try {
          await client.uploadFrom(file.fullPath, file.relativePath);
          break;
        } catch (error) {
          retries--;
          if (retries === 0) {
            throw new Error(`Failed to upload ${filename}: ${error.message}`);
          }
          // Reconnect and retry
          console.log(`\n[!] Retrying ${filename}...`);
          try { client.close(); } catch (e) {}
          client = await createClient();

          // Try to remove the temp file that Hostinger leaves behind
          const dir = path.dirname(file.relativePath);
          const tempFile = dir === '.'
            ? `.in.${filename}.`
            : `${dir}/.in.${filename}.`;
          try { await client.remove(tempFile); } catch (e) {}
        }
      }
    }

    progressBar.update(filesToUpload.length, { filename: 'Done!' });
    progressBar.stop();

    // Save manifest after successful deploy
    saveManifest(files);

    console.log('\n[+] All files uploaded successfully!');
    console.log('[+] Deployment complete!\n');

  } catch (error) {
    progressBar.stop();
    console.error('\n[-] Deployment failed:', error.message);
    process.exit(1);
  } finally {
    if (client) client.close();
  }
}

// Run deployment
deploy();
