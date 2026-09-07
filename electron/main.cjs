/**
 * PALASH VANI — Autonomous Offline Multilingual EdTech Suite
 * Desktop Application Main Process (Electron Runtime)
 * 
 * Guarantees:
 *  - 100% Offline (Zero internet connection required)
 *  - Zero localhost dependency (Loads directly from local dist/index.html)
 *  - Secure context isolation & sandboxed renderer
 *  - Native desktop window (No browser URL bar, no tabs)
 */

const { app, BrowserWindow, shell, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow = null;

function createWindow() {
  const iconPath = path.join(__dirname, '../dist/logo.svg');

  mainWindow = new BrowserWindow({
    width: 1300,
    height: 880,
    minWidth: 960,
    minHeight: 640,
    title: 'PALASH Vani — Autonomous Offline Multilingual EdTech Suite',
    icon: fs.existsSync(iconPath) ? iconPath : undefined,
    backgroundColor: '#064e3b', // Brand emerald theme to prevent white flash
    show: false,
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      spellcheck: false
    }
  });

  // 1. Load production build DIRECTLY from local filesystem (Zero localhost!)
  const indexPath = path.join(__dirname, '../dist/index.html');
  mainWindow.loadFile(indexPath);

  // Show window smoothly when rendered
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 2. Intercept new windows & links (Never load external content inside the app)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // 3. Prevent unauthorized navigation away from the local application
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    if (!navigationUrl.startsWith('file:')) {
      event.preventDefault();
      shell.openExternal(navigationUrl);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  createApplicationMenu();
}

function createApplicationMenu() {
  const isMac = process.platform === 'darwin';

  const template = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      label: 'फ़ाइल (File)',
      submenu: [
        {
          label: 'होम स्क्रीन (Home)',
          accelerator: 'CmdOrCtrl+H',
          click: () => {
            if (mainWindow) {
              mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
            }
          }
        },
        { type: 'separator' },
        { role: isMac ? 'close' : 'quit', label: 'बंद करें (Exit)' }
      ]
    },
    {
      label: 'व्यू (View)',
      submenu: [
        { role: 'reload', label: 'पुनः लोड करें (Reload)', accelerator: 'CmdOrCtrl+R' },
        { role: 'forceReload', label: 'पूर्ण रीलोड (Force Reload)', accelerator: 'CmdOrCtrl+Shift+R' },
        { role: 'toggleDevTools', label: 'डेवलपर टूल्स (DevTools)', accelerator: 'F12' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'वास्तविक आकार (Actual Size)' },
        { role: 'zoomIn', label: 'बड़ा करें (Zoom In)', accelerator: 'CmdOrCtrl+Plus' },
        { role: 'zoomOut', label: 'छोटा करें (Zoom Out)', accelerator: 'CmdOrCtrl+-' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'फुल स्क्रीन (Full Screen)', accelerator: 'F11' }
      ]
    },
    {
      label: 'सहायता (Help)',
      submenu: [
        {
          label: '100% ऑफ़लाइन स्थिति (Offline Diagnostics)',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.executeJavaScript(`
                const nav = document.querySelector('button[title*="ऑफ़लाइन"]');
                if (nav) nav.click();
              `).catch(() => {});
            }
          }
        },
        {
          label: 'पलाश वाणी के बारे में (About PALASH)',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'PALASH Vani',
              message: '🌸 PALASH Vani v2.0 (SIH 2024)',
              detail: 'AI-Assisted Multilingual MTB-MLE Primary Education Suite for Jharkhand (Ho, Mundari, Santhali)\\n\\nArchitecture: 100% Offline Edge Intelligence\\nZero internet or localhost server required.'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC Handlers
ipcMain.handle('get-app-version', () => app.getVersion());

ipcMain.handle('open-external', async (_event, url) => {
  if (typeof url === 'string' && (url.startsWith('https://') || url.startsWith('http://'))) {
    await shell.openExternal(url);
    return true;
  }
  return false;
});

ipcMain.handle('get-offline-diagnostics', () => {
  return {
    offlineReady: true,
    platform: process.platform,
    arch: process.arch,
    electronVersion: process.versions.electron,
    nodeVersion: process.versions.node,
    uptimeSeconds: Math.round(process.uptime()),
    memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
  };
});

// App Lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
