/**
 * PALASH VANI — Secure Electron Preload Script
 * 
 * Features:
 *  - Strict context isolation
 *  - Node integration disabled
 *  - Minimal safe surface for offline desktop bridge
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  platform: process.platform,
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  getOfflineDiagnostics: () => ipcRenderer.invoke('get-offline-diagnostics')
});
