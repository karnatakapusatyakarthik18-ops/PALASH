#!/usr/bin/env node

/**
 * PALASH VANI — Autonomous Desktop Packaging Engine
 * 
 * Creates standalone, production-ready Windows Desktop package:
 *   - release/win-unpacked/PALASH Vani.exe
 *   - release/win-unpacked/resources/app.asar
 *   - release/PALASH-Vani-Portable.bat
 * 
 * Guarantees:
 *   - 100% Offline (Requires zero internet connection)
 *   - No Node.js or npm required on target presentation machine
 *   - Zero localhost requirement (Loads direct file:// protocol)
 */

const fs = require('fs');
const path = require('path');
const asar = require('@electron/asar');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const ELECTRON_DIR = path.join(ROOT_DIR, 'electron');
const RELEASE_DIR = path.join(ROOT_DIR, 'release');
const UNPACKED_DIR = path.join(RELEASE_DIR, 'win-unpacked');
const RESOURCES_DIR = path.join(UNPACKED_DIR, 'resources');
const STAGE_APP_DIR = path.join(RESOURCES_DIR, 'app');
const APP_ASAR_FILE = path.join(RESOURCES_DIR, 'app.asar');
const ELECTRON_DIST = path.join(ROOT_DIR, 'node_modules', 'electron', 'dist');

async function buildDesktopPackage() {
  console.log('================================================================');
  console.log('   🌸 Packaging PALASH Vani Standalone Desktop Application 🌸   ');
  console.log('================================================================\n');

  // 1. Verify build prerequisites
  if (!fs.existsSync(DIST_DIR) || !fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    console.error('[ERROR] dist/index.html not found! Run "npm run build" first.');
    process.exit(1);
  }

  if (!fs.existsSync(ELECTRON_DIST)) {
    console.error('[ERROR] Electron runtime not found in node_modules/electron/dist!');
    process.exit(1);
  }

  // 2. Prepare release directory
  fs.mkdirSync(UNPACKED_DIR, { recursive: true });
  fs.mkdirSync(RESOURCES_DIR, { recursive: true });

  // 3. Stage Electron runtime binaries
  console.log('[1/4] Staging standalone Electron runtime binaries...');
  const distFiles = fs.readdirSync(ELECTRON_DIST);
  for (const file of distFiles) {
    if (file === 'resources') continue; // Don't overwrite our custom resources
    const src = path.join(ELECTRON_DIST, file);
    const dest = path.join(UNPACKED_DIR, file);
    if (!fs.existsSync(dest)) {
      if (fs.statSync(src).isDirectory()) {
        fs.cpSync(src, dest, { recursive: true });
      } else {
        fs.copyFileSync(src, dest);
      }
    }
  }

  // Rename electron.exe to "PALASH Vani.exe"
  const defaultExe = path.join(UNPACKED_DIR, 'electron.exe');
  const targetExe = path.join(UNPACKED_DIR, 'PALASH Vani.exe');
  if (fs.existsSync(defaultExe)) {
    fs.copyFileSync(defaultExe, targetExe);
    fs.unlinkSync(defaultExe); // Keep only PALASH Vani.exe
  } else if (!fs.existsSync(targetExe)) {
    fs.copyFileSync(path.join(ELECTRON_DIST, 'electron.exe'), targetExe);
  }

  // Ensure default_app.asar is removed so Electron uses our app.asar exclusively
  const staleDefaultApp = path.join(RESOURCES_DIR, 'default_app.asar');
  if (fs.existsSync(staleDefaultApp)) {
    fs.unlinkSync(staleDefaultApp);
  }

  // 4. Stage application code for packaging
  console.log('[2/4] Assembling production assets, NLP engine, and offline datasets...');
  if (fs.existsSync(STAGE_APP_DIR)) {
    fs.rmSync(STAGE_APP_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(STAGE_APP_DIR, { recursive: true });

  // Copy dist/
  fs.cpSync(DIST_DIR, path.join(STAGE_APP_DIR, 'dist'), { recursive: true });

  // Copy electron/
  fs.cpSync(ELECTRON_DIR, path.join(STAGE_APP_DIR, 'electron'), { recursive: true });

  // Copy package.json
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
  const minimalPkg = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    main: pkg.main
  };
  fs.writeFileSync(
    path.join(STAGE_APP_DIR, 'package.json'),
    JSON.stringify(minimalPkg, null, 2),
    'utf8'
  );

  // 5. Pack into app.asar
  console.log('[3/4] Packing secure app.asar archive...');
  if (fs.existsSync(APP_ASAR_FILE)) {
    fs.unlinkSync(APP_ASAR_FILE);
  }
  await asar.createPackage(STAGE_APP_DIR, APP_ASAR_FILE);
  fs.rmSync(STAGE_APP_DIR, { recursive: true, force: true });

  // 6. Generate 1-Click Launchers
  console.log('[4/4] Creating 1-Click Windows demonstration launcher...');
  const launcherBat = `@echo off
title PALASH Vani - Offline Native Desktop App
color 0A
cls
echo ==============================================================================
echo       PALASH VANI - Autonomous Offline Multilingual EdTech Suite
echo ==============================================================================
echo   Architecture: 100%% Standalone Native Desktop App (Zero Internet / 0 KB/s)
echo   Local NLP: Ol Chiki (Santhali), Warang Chiti / Devanagari (Ho, Mundari)
echo   Status: 100%% Offline Ready (Zero localhost / Zero external server)
echo ==============================================================================
echo.
start "" "%~dp0win-unpacked\\PALASH Vani.exe"
`;
  fs.writeFileSync(path.join(RELEASE_DIR, 'PALASH-Vani-Portable.bat'), launcherBat, 'utf8');

  console.log('\n================================================================');
  console.log('   🎉 PALASH Vani Standalone Desktop App Built Successfully!    ');
  console.log('================================================================');
  console.log(`  ✓ Standalone Executable: ${path.relative(ROOT_DIR, targetExe)}`);
  console.log(`  ✓ App Archive:           ${path.relative(ROOT_DIR, APP_ASAR_FILE)}`);
  console.log(`  ✓ 1-Click Launcher:      ${path.relative(ROOT_DIR, path.join(RELEASE_DIR, 'PALASH-Vani-Portable.bat'))}`);
  console.log('  ✓ Requirements:          0 KB Internet, NO Node.js required');
  console.log('  ✓ Presentation:          No localhost, No URL bar, Native Desktop App');
  console.log('================================================================\n');
}

buildDesktopPackage().catch((err) => {
  console.error('[BUILD ERROR]', err);
  process.exit(1);
});
