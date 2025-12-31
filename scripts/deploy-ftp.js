import { Client } from 'basic-ftp';
import * as fs from 'fs';
import * as path from 'path';
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

// Get all files recursively
function getAllFiles(dir, baseDir = dir) {
  let files = [];
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const relativePath = path.relative(baseDir, fullPath);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push({ type: 'dir', relativePath, fullPath });
      files = files.concat(getAllFiles(fullPath, baseDir));
    } else {
      files.push({ type: 'file', relativePath, fullPath, size: stat.size });
    }
  }
  return files;
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
  const progressBar = new cliProgress.SingleBar({
    format: '[*] Uploading |{bar}| {percentage}% | {value}/{total} | {filename}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  });

  let client;

  try {
    console.log('[*] Starting FTP deployment...\n');

    // Connect to FTP server
    console.log('[*] Connecting to FTP server...');
    client = await createClient();
    console.log('[+] Connected!\n');
    console.log(`[*] Remote directory: ${config.remoteRoot}\n`);

    // Delete the old assets folder to clear cache
    console.log('[*] Clearing old assets folder...');
    try {
      await client.removeDir('assets');
      console.log('[+] Old assets cleared!\n');
    } catch (error) {
      console.log('[!] No existing assets folder\n');
    }

    // Get all files
    const localDistPath = path.join(__dirname, '..', 'dist');
    const allFiles = getAllFiles(localDistPath);
    const files = allFiles.filter(f => f.type === 'file');
    const dirs = allFiles.filter(f => f.type === 'dir');

    console.log(`[*] Total files to upload: ${files.length}\n`);

    // Create directories first
    for (const dir of dirs) {
      try {
        await client.ensureDir(dir.relativePath);
        await client.cd(config.remoteRoot);
      } catch (e) {
        // Directory might already exist
      }
    }

    // Start progress bar
    progressBar.start(files.length, 0, { filename: 'Starting...' });

    // Upload files one by one with retry logic
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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
          try {
            await client.remove(tempFile);
          } catch (e) {
            // Temp file might not exist
          }
        }
      }
    }

    progressBar.update(files.length, { filename: 'Done!' });
    progressBar.stop();

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
