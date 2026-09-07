# पलाश वाणी (PALASH Vani)
## AI-Assisted Multilingual MTB-MLE Primary Education Suite for Jharkhand
### Supporting Ho, Mundari, and Santhali Primary Classrooms

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
[![Tests: 100% Passed](https://img.shields.io/badge/Tests-85%2F85%20Passed-brightgreen.svg)]()
[![Desktop: Electron Standalone](https://img.shields.io/badge/Desktop-Standalone%20EXE%20(Zero%20Localhost)-blue.svg)]()
[![Offline: 100% Edge](https://img.shields.io/badge/Network-100%25%20Offline%20(0%20KB%2Fs)-emerald.svg)]()
[![Database: XAMPP MySQL](https://img.shields.io/badge/Database-XAMPP%20MySQL%20%2B%20Offline%20Fallback-amber.svg)]()

---

## 🌟 Primary Objective & Architecture

**PALASH Vani (पलाश वाणी)** is a production-ready, **100% offline standalone application** engineered for Mother Tongue-Based Multilingual Education (MTB-MLE) in Jharkhand's primary classrooms (Grades 1–3). It bridges communication between Hindi-trained teachers and young children speaking **Ho**, **Mundari**, and **Santhali**.

### 🏛️ Complete System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       PALASH Vani                           │
├─────────────────────────────────────────────────────────────┤
│  React + Vite Frontend (Renderer Process)                   │
│    ├── Universal Custom Input Console & Live Output Card    │
│    ├── 14 Classroom Modules (Slate, Flashcards, Games, etc.)│
│    ├── Tailwind CSS (Compiled locally, zero CDN)            │
│    ├── Offline Fonts (Noto Sans Ol Chiki, Nirmala UI)       │
│    ├── Kaggle Datasets (Local JSON bundles in datasets/)    │
│    ├── In-Memory Pure TypeScript NLP Engine                 │
│    └── Dual Local Audio (Web Audio DSP Formants + OS SAPI)  │
├─────────────────────────────────────────────────────────────┤
│  Runtime Bridge                                             │
│    ├── electron/preload.cjs (Strict contextIsolation)       │
│    └── window.electronAPI (Safe bridge, no direct Node in UI│
├─────────────────────────────────────────────────────────────┤
│  Desktop Host (Main Process)                                │
│    ├── electron/main.cjs (BrowserWindow, file:// protocol)  │
│    ├── Zero Localhost / Zero Port Dependency                │
│    └── Strict Offline Content Security Policy (CSP)         │
├─────────────────────────────────────────────────────────────┤
│  Local Application Services                                 │
│    ├── server.js (Zero-dependency local Node.js HTTP server) │
│    └── Embedded REST APIs: /api/translate, /api/health      │
├─────────────────────────────────────────────────────────────┤
│  Multi-Platform Packaging                                   │
│    ├── Standalone Windows Executable (PALASH Vani.exe)      │
│    ├── 1-Click Launchers (PALASH-App.bat, Portable.bat)     │
│    └── Android Wrapper Ready (Capacitor webDir: 'dist')     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start (For SIH Demonstration)

### Option 1: 1-Click Desktop Launcher (No Installation Required)
Double-click:
```cmd
PALASH-App.bat
```
- **What it does**: Launches the standalone desktop application window directly via Electron (`file:///dist/index.html`).
- **Zero Localhost**: Shows **no browser URL bar, no tabs, and no `localhost` text**. It runs as a native desktop application.
- **100% Offline**: Works immediately with Wi-Fi and mobile data switched completely off.

### Option 2: Pre-Packaged Standalone Executable
You can run the packaged Windows application directly without needing Node.js or npm installed:
```cmd
release\win-unpacked\PALASH Vani.exe
```
Or double-click:
```cmd
release\PALASH-Vani-Portable.bat
```

---

## 🛠️ Development & Build Commands

| Command | Description |
| :--- | :--- |
| `npm install` | Installs dependencies (React, Vite, Electron, Tailwind). |
| `npm run dev` | Launches Vite local development server (`http://localhost:3000`). |
| `npm run build` | Compiles TypeScript, bundles Vite production assets into `dist/`, and generates `server-nlp.js`. |
| `npm run app` | Launches the standalone Electron desktop window loading directly from `dist/index.html`. |
| `npm run package` | Packages the standalone Windows desktop application into `release/win-unpacked/PALASH Vani.exe` with bundled `app.asar`. |
| `npm run server` | Starts the Node.js API server (`http://127.0.0.1:5000`) with auto-detecting XAMPP MySQL connection. |
| `npm test` | Runs the automated 85-test verification suite (44 NLP + 18 Offline STT + 23 Backend API). |

---

## 🛡️ The Two Separate Pillars of 100% Offline Architecture

> [!IMPORTANT]
> **A Critical Distinction for Hackathon Evaluators & Jury:**  
> In conventional web apps, caching HTML/CSS via a service worker does not make AI offline — any cloud translation or voice API silently breaks as soon as the internet drops.  
> **PALASH Vani does NOT call ANY external cloud APIs.**

| Pillar | Technical Mechanism | Offline Role & Independence |
| :--- | :--- | :--- |
| **Pillar 1: Desktop Shell Offline** | **Electron Runtime + `loadFile('dist/index.html')` + `file://` protocol** | Loads compiled HTML, JS bundles, local styles, and assets directly from disk with **0 KB/s internet** and zero localhost dependency. |
| **Pillar 2: NLP & Voice Translation Offline** | **In-Memory Pure TypeScript NLP Engine + Web Audio DSP + Klatt Formant Synthesizer** | Performs speech VAD, $O(1)$ morphological translation, token decomposition, and acoustic sound synthesis **entirely on the local CPU / audio hardware**. |

---

## 🗄️ Local XAMPP & MySQL Database Integration

PALASH Vani includes an optional, robust local persistence layer powered by **XAMPP / MySQL** and an Express API server (`server/server.js`).

### ⚙️ Core Architectural Guarantee
> [!IMPORTANT]
> **Zero Translation Dependency on MySQL:**  
> The core translation engine (Web Audio Acoustic STT ➔ In-Memory Pure TypeScript NLP ➔ Web Audio Formant TTS) is **100% offline and local**. Translation and classroom voice modules NEVER block or depend on MySQL.
> 
> MySQL is strictly used for relational application persistence:
> - User & Teacher accounts (`users`, `teachers`)
> - Enrolled students & grade levels (`students`)
> - MTB-MLE lessons & curriculum (`lessons`)
> - Multilingual vocabulary bank (`vocabulary`)
> - Quizzes & interactive questions (`quizzes`, `quiz_questions`)
> - Quiz submissions & student progress (`quiz_results`, `student_progress`)
> - Non-blocking translation audit history (`translation_history`)
> - Application settings & offline cache metadata (`settings`)

### 🟢 Live Database Connection Detection
The desktop navigation bar automatically detects and displays live database status:
- **`🟢 ● DATABASE CONNECTED`**: Active connection established with XAMPP MySQL (`palash` database).
- **`🟡 ● OFFLINE DATABASE MODE`**: If XAMPP/MySQL is stopped or not installed, the application continues running seamlessly without crashing, transparently utilizing local cached records.

### 📋 Step-by-Step XAMPP Setup Instructions

1. **Install & Start XAMPP**:
   - Download and install [XAMPP](https://www.apachefriends.org/) (if not already installed).
   - Open the **XAMPP Control Panel**.
   - Click **Start** for **Apache** and **MySQL**.
2. **Access phpMyAdmin**:
   - Open your web browser and navigate to: `http://localhost/phpmyadmin`
3. **Import Database Schema & Seed Data**:
   - Click **New** in the left sidebar and create a database named: `palash` with collation `utf8mb4_unicode_ci`.
   - Select the `palash` database, click the **Import** tab:
     - Import [database/schema.sql](file:///c:/Users/karna/Documents/sih/database/schema.sql) (creates all 12 tables, foreign keys, and indexes).
     - Import [database/seed.sql](file:///c:/Users/karna/Documents/sih/database/seed.sql) (populates authentic Jharkhand tribal lessons, vocabulary, and quiz data).
4. **Verify `.env` Configuration**:
   - The included `.env` file is pre-configured for standard XAMPP defaults:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_PORT=3306
     DB_NAME=palash
     DB_USER=root
     DB_PASSWORD=
     ```
5. **Start the Local Node.js API Server**:
   ```bash
   npm run server
   ```
   - Console logs will confirm: `[Database] 🟢 Connected to MySQL/MariaDB database: palash`.
6. **Launch PALASH Vani Desktop App**:
   - Run `PALASH-App.bat` or `npm run app`.
   - The top banner will immediately show `● DATABASE CONNECTED`.

---

## 🧪 SIH Live Demo Protocol (With Wi-Fi & Data Switched OFF)

To demonstrate PALASH Vani to the jury, switch your laptop's **Wi-Fi completely OFF** (or turn on Airplane Mode):

1. **Launch the App**:
   - Double-click `PALASH-App.bat` or run `npm run app`.
   - The standalone desktop application opens instantly.
   - Notice that there is **no browser address bar** and **no localhost URL**.
2. **Verify Offline Indicator**:
   - At the top navigation bar, the indicator displays `🟢 100% OFFLINE READY`.
3. **Select Target Tribal Language**:
   - **संथाली (Santhali)**: Native **Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)** script with Devanagari pronunciation guide.
   - **हो (Ho)**: Native **Warang Chiti (𑢹𑣉𑣉)** + Devanagari phonetics.
   - **मुंडारी (Mundari)**: Native Devanagari phonetics.
4. **Demonstrate Arbitrary Sentence Translation**:
   - Open **द्वि-मार्गी ध्वनि अनुवाद (Voice Translator)**.
   - In the **Universal Custom Input Bar**, enter any sentence (or select a scenario chip):
     - *"बच्चे मैदान में खेल रहे हैं"*
     - *"मुझे पानी चाहिए"*
     - *"आज छुट्टी है"*
     - *"गाय हमें दूध देती है"*
     - *"Open your books"*
   - Click **"⚡ अनुवाद करें व बोलें"**.
   - **Instant Result**:
     - Authentic native script (e.g. Santhali: `ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱴᱟᱺᱰᱤ ᱨᱮ ᱮᱱᱮᱡ ᱠᱟᱱᱟᱠᱚ`).
     - Devanagari phonetic guide (`गिदरा को टांडी रे एनेज कानाको`).
     - Latin Romanization (`Gidra ko Tandi re Enej kanako`).
     - Word-by-word token decomposition pills: `[बच्चे ➔ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ] [मैदान ➔ ᱴᱟᱺᱰᱤ] [में ➔ ᱨᱮ] [खेल ➔ ᱮᱱᱮᱡ] [रहे हैं ➔ ᱠᱟᱱᱟᱠᱚ]`.
     - Audible voice playback through laptop speakers via the local formant synthesizer.
5. **Demonstrate Student Self-Learning**:
   - Switch mode to **🧒 छात्र स्व-अध्ययन (Student Mode)**.
   - Tap any tribal vocabulary card (e.g. `ᱫᱟᱜ` - Water, `ᱫᱩᱲᱩᱵ्` - Sit, `ᱯᱳᱛᱷᱤ` - Book, `ᱫᱟᱨᱮ` - Tree).
   - The app reverse-translates and speaks standard Hindi aloud so tribal children learn Hindi independently.
6. **Demonstrate Kaggle Datasets Explorer**:
   - Navigate to **Kaggle Datasets**.
   - Browse the 30 Ol Chiki alphabet characters, 50+ trilingual parallel sentences, and folklore tales bundled locally in `datasets/`.

---

## 📱 Android Packaging Preparation (Capacitor)

The React frontend has been kept strictly decoupled from Electron internals:
- All Electron-specific APIs reside behind safe existence guards (`window.electronAPI?.isElectron`).
- `vite.config.ts` uses `base: './'`, which produces relative paths compatible with mobile web views.
- To wrap PALASH Vani into an Android APK in the future:
  ```bash
  npm install @capacitor/core @capacitor/cli @capacitor/android
  npx cap init "PALASH Vani" org.palash.vani --web-dir dist
  npx cap add android
  npm run build
  npx cap sync android
  npx cap open android
  ```
  A ready-to-use [capacitor.config.json](file:///c:/Users/karna/Documents/sih/capacitor.config.json) is already included in the root directory.

---

## 📊 Automated Verification Results

All 85 tests pass with **100% success rate** via `npm test`:
- **44 Pure NLP Tests** (`tests/verifyNLP.ts`):
  - 8/8 Classroom Commands (Santhali Ol Chiki, Ho, Mundari)
  - 5/5 NIPUN Bharat Numeracy & Grammar Sentences
  - 8/8 Reverse Tribal-to-Hindi Translations
  - 7/7 Bilingual English Classroom Instructions
  - 12/12 Lesson Story Explanations & Daily Sentences
  - 4/4 Arbitrary Sentence Translations & Tokenizations
- **18 Offline Acoustic Speech Recognition Tests** (`tests/verifyOfflineSTT.ts`):
  - Normalized envelope extraction and 40-point spectrogram matrix matching
  - Syllable segmentation and acoustic duration profiling
  - Real-time offline acoustic matching for Hindi, Tribal, and English classroom utterances
- **23 Backend API & Database Independence Tests** (`tests/verifyAPI.ts`):
  - Health endpoint reporting and dynamic database status detection
  - Lessons, vocabulary, quizzes, and student progress retrieval
  - Non-blocking translation history auditing
  - Proof that Santhali, Ho, and Mundari core translation works 100% offline with zero database dependency

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](file:///c:/Users/karna/Documents/sih/LICENSE) file for details.
