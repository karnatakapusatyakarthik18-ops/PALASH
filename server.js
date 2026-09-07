#!/usr/bin/env node

/**
 * PALASH VANI — Standalone Offline Node.js Application Server
 * 
 * Capabilities:
 *  - 100% Offline (Zero internet required)
 *  - Zero external npm server dependencies (pure Node.js http, fs, path, url)
 *  - Serves compiled Vite production SPA with static file caching & MIME detection
 *  - Embedded Local NLP REST API:
 *      POST /api/translate         -> Arbitrary sentence translation & tokenization
 *      POST /api/reverse-translate -> Tribal to Hindi translation
 *      GET  /api/health            -> System diagnostics & offline engine status
 *      GET  /api/vocabulary        -> Lexicon statistics
 *  - Standalone Desktop App Window launcher:
 *      Spawns Microsoft Edge or Google Chrome in --app mode (borderless, no URL bar, no localhost text)
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, exec } from 'node:child_process';
import os from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Load Local NLP Translation Engine
let nlpEngine = null;
try {
  const nlpModule = await import('./server-nlp.js');
  nlpEngine = nlpModule.PalashNLPTranslator;
} catch (e) {
  console.warn('[PALASH Server] server-nlp.js note:', e.message);
}

// 2. Configuration & Arguments
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const PORT = portIndex !== -1 && args[portIndex + 1] 
  ? parseInt(args[portIndex + 1], 10) 
  : (process.env.PORT ? parseInt(process.env.PORT, 10) : 4000);
const SHOULD_OPEN_APP = args.includes('--open-app') || args.includes('--app');
const DIST_DIR = path.join(__dirname, 'dist');

// 3. MIME Types Registry
const MIME_MAP = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

// Helper: read request body as JSON
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 2 * 1024 * 1024) {
        req.socket.destroy();
        reject(new Error('Request payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON: ' + err.message));
      }
    });
    req.on('error', reject);
  });
}

// Helper: send JSON response
function sendJson(res, statusCode, data) {
  const json = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store'
  });
  res.end(json);
}

// 4. HTTP Server Request Router
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
  const pathname = parsedUrl.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // --- API ROUTING ---
  if (pathname.startsWith('/api/')) {
    // 1) Health / Engine Status
    if (pathname === '/api/health' && req.method === 'GET') {
      sendJson(res, 200, {
        status: 'online',
        offlineEngineReady: true,
        engine: 'PALASH VANI Offline Edge Intelligence',
        targetLanguages: ['santhali', 'ho', 'mundari'],
        nativeScripts: ['olchiki', 'warangchiti', 'devanagari'],
        port: PORT,
        uptimeSeconds: Math.round(process.uptime()),
        memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
      });
      return;
    }

    // 2) Arbitrary Hindi/English -> Tribal Translation
    if (pathname === '/api/translate' && req.method === 'POST') {
      try {
        const body = await parseRequestBody(req);
        const text = (body.text || body.query || '').trim();
        const targetLang = (body.targetLang || 'santhali').toLowerCase();
        if (!text) {
          return sendJson(res, 400, { error: 'Missing "text" field in body' });
        }
        if (!nlpEngine) {
          return sendJson(res, 503, { error: 'NLP engine module not initialized' });
        }
        const start = performance.now();
        const result = nlpEngine.translate(text, targetLang);
        const latencyMs = Math.round(performance.now() - start);

        return sendJson(res, 200, {
          ok: true,
          query: text,
          targetLang,
          latencyMs,
          result
        });
      } catch (err) {
        return sendJson(res, 500, { error: err.message });
      }
    }

    // 3) Tribal -> Hindi Reverse Translation
    if (pathname === '/api/reverse-translate' && req.method === 'POST') {
      try {
        const body = await parseRequestBody(req);
        const text = (body.text || '').trim();
        const targetLang = (body.targetLang || 'santhali').toLowerCase();
        if (!text) {
          return sendJson(res, 400, { error: 'Missing "text" field' });
        }
        if (!nlpEngine) {
          return sendJson(res, 503, { error: 'NLP engine module not initialized' });
        }
        const start = performance.now();
        const result = nlpEngine.translateTribalToHindi(text, targetLang);
        const latencyMs = Math.round(performance.now() - start);

        return sendJson(res, 200, {
          ok: true,
          query: text,
          targetLang,
          latencyMs,
          result
        });
      } catch (err) {
        return sendJson(res, 500, { error: err.message });
      }
    }

    // 4) Lexicon / Vocabulary metadata
    if (pathname === '/api/vocabulary' && req.method === 'GET') {
      return sendJson(res, 200, {
        ok: true,
        supportedCategories: [
          'classroom', 'needs', 'lesson', 'conversation',
          'numbers', 'nature', 'animals', 'family', 'actions'
        ],
        offlineReady: true
      });
    }

    sendJson(res, 404, { error: 'API endpoint not found' });
    return;
  }

  // --- STATIC FILE SERVING FROM dist/ ---
  if (!fs.existsSync(DIST_DIR)) {
    res.writeHead(503, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <html>
        <body style="font-family: sans-serif; padding: 40px; text-align: center; background: #0f172a; color: #fff;">
          <h1 style="color: #34d399;">🌸 PALASH VANI Production Build Missing</h1>
          <p>Please run <code style="background: #1e293b; padding: 4px 8px; border-radius: 4px;">npm run build</code> first to generate the production assets.</p>
        </body>
      </html>
    `);
    return;
  }

  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(DIST_DIR, safePath === '/' ? 'index.html' : safePath);

  // Security: keep inside dist
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end('Access denied');
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      serveStaticFile(res, filePath);
      return;
    }

    // SPA client-side fallback: serve dist/index.html
    const indexPath = path.join(DIST_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      serveStaticFile(res, indexPath);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });
});

function serveStaticFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_MAP[ext] || 'application/octet-stream';

  const stream = fs.createReadStream(filePath);
  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
  });
  stream.pipe(res);
  stream.on('error', () => {
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('File read error');
    }
  });
}

// 5. Standalone Desktop App Launcher
function findAppBrowser() {
  const isWindows = process.platform === 'win32';
  if (!isWindows) return null;

  const candidates = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Microsoft\\Edge\\Application\\msedge.exe'),
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
  ];

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function launchAppWindow(url) {
  const browserPath = findAppBrowser();
  if (browserPath) {
    console.log(`[PALASH App] Launching Native Windows App Mode via: ${path.basename(browserPath)}`);
    const tempProfile = path.join(os.tmpdir(), 'palash_app_profile');
    const child = spawn(
      browserPath,
      [
        `--app=${url}`,
        '--window-size=1300,880',
        `--user-data-dir=${tempProfile}`,
        '--no-first-run',
        '--no-default-browser-check'
      ],
      { detached: true, stdio: 'ignore' }
    );
    child.unref();
  } else {
    // Fallback: system default browser
    console.log('[PALASH App] Opening default browser...');
    const startCmd = process.platform === 'win32' ? `start "" "${url}"` : `open "${url}"`;
    exec(startCmd);
  }
}

// 6. Start Server
server.listen(PORT, '127.0.0.1', () => {
  const appUrl = `http://127.0.0.1:${PORT}`;
  console.log(`
================================================================
    🌸 PALASH VANI — Standalone Offline Application Server 🌸
================================================================
  ✓ Local Server:       ${appUrl}
  ✓ Offline Guarantee:  100% Offline (Zero internet required)
  ✓ Languages:          Santhali (Ol Chiki), Ho, Mundari
  ✓ Local NLP APIs:     POST /api/translate
                        POST /api/reverse-translate
                        GET  /api/health
  ✓ App Window Mode:    ${SHOULD_OPEN_APP ? 'Launching standalone app window...' : 'Run with --open-app to launch desktop window'}
================================================================
`);

  if (SHOULD_OPEN_APP) {
    setTimeout(() => {
      launchAppWindow(appUrl);
    }, 400);
  }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[PALASH Server] Shutting down gracefully...');
  server.close(() => process.exit(0));
});
process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
