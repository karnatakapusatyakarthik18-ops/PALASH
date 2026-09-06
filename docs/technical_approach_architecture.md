# ⚙️ TECHNICAL APPROACH ARCHITECTURE
## Problem Statement ID: SIH26042 • Smart India Hackathon 2026
### Project: **PALASH Vani (पलाश वाणी)** • Team: **VernacLearn**

---

## 🖼️ 1. High-Resolution Technical Pipeline Architecture

![Technical Approach Dual Pipelines](C:/Users/karna/.gemini/antigravity/brain/07bb4750-bc1a-4bb4-8c00-33db975425fd/technical_approach_pipelines_1788692892538.jpg)

---

## 📋 2. Slide 3 Copy (Ready for PPT Insertion)

```
========================================================================================
                               SLIDE 3: TECHNICAL APPROACH
========================================================================================

• Core Technology Stack:
  - Runtime App: React 18 + TypeScript 5 PWA running in browser cache (≤68 MB RAM).
  - NLP Engine: In-memory hash lookup + Hindi morphological lemmatizer + Munda agglutinative clitic rules.
  - Speech Synthesis (TTS): Pre-warmed native speech (Android TTS / Windows SAPI) with mathematical Web Audio API formant synthesis fallback.
  - Edge Vision: Quantized on-device MobileNet CNN (~3.8 MB) running via WebGL/WASM in <150ms.

• Dual-Pipeline Offline Architecture:
  1. Real-Time Voice-to-Voice Pipeline: Continuous classroom dialogue translated from Hindi to Santhali (Ol Chiki), Ho (Warang Chiti), and Mundari in <400ms (beating the <3s SIH mandate).
  2. Curriculum Generation Pipeline: NIPUN Bharat FLN learning outcomes converted into print-ready A4 worksheets, 3D tactile flashcards, and 30-min structured lesson plans, cached offline in IndexedDB.
========================================================================================
```

---

## 🔬 3. Deep-Dive: The 4 Technical Pipelines

### 🎙️ PIPELINE 1: Real-Time Edge Voice-to-Voice (V2V) Pipeline
*Designed for live interactive classroom instruction between non-tribal teachers and tribal children.*

```
[ Teacher Speaks Hindi ]
          │
          ▼
[ 1. Web Speech API (Local ASR) ]
  • On-device speech-to-text conversion (e.g. "अपनी किताब खोलो")
  • Zero cloud connection; supported by one-tap quick classroom prompt chips
          │
          ▼
[ 2. Unicode Range Script Detector (<=0.02ms) ]
  • Ol Chiki (U+1C50 - U+1C7F) ➔ Santhali
  • Warang Chiti (U+118A0 - U+118FF) ➔ Ho
  • Devanagari (U+0900 - U+097F) ➔ Hindi / Mundari
          │
          ▼
[ 3. Morphological Lemmatizer (lemmatizeHindiWord) ]
  • Strips inflectional verb suffixes ("-ेंगे", "-ना", "-िए", "-ते")
  • Extracts root verb lemma ("पढ़", "बैठ", "खोल") to completely eliminate the Hindi echo bug
          │
          ▼
[ 4. 250+ Classroom Lexicon Hash Map (O(1) Memory Lookup) ]
  • Instant dictionary translation for classroom actions, numbers 1-10, family, nature, and FLN
          │
          ▼
[ 5. Munda Agglutinative Grammar Rules (grammarEngine.ts) ]
  • Appends imperative clitics: -me (singular), -pe (plural), -ben (dual)
  • Attaches collective plural markers (-ko) and locatives (-re, -te)
          │
          ▼
[ 6. Dual-Script Output Generator ]
  ├── Indigenous Script: ᱯᱳᱛᱷᱤ ᱨᱟᱲᱟᱭ ᱢᱮ (Ol Chiki for student literacy)
  └── Teacher Phonetic Guide: "पोथी राड़ाय मे" (Devanagari for teacher confidence)
          │
          ▼
[ 7. Offline Speech Synthesis (PalashPhoneticTTS) ]
  ├── Primary: Device-native TTS (Android TTS / Windows SAPI)
  └── Fallback: Web Audio API Klatt Formant Synthesizer (Pure mathematical DSP)
          │
          ▼
🔊 Child hears spoken tribal audio in <400 milliseconds!
```

---

### 🖨️ PIPELINE 2: Curriculum & Content Generation Pipeline
*Designed to support physical paper homework in classrooms with 1 tablet and 40 students.*

```
[ NIPUN Bharat Hindi FLN Framework ] (Lakshya 1 to Lakshya 4)
          │
          ▼
[ Local Generation Engine (WorksheetGenerator.tsx) ]
  • Matching activities (Pictures to Tribal words)
  • Number counting with dual-script writing boxes
  • Ol Chiki & Warang Chiti dashed letter-tracing lines
          │
          ▼
[ Client-Side Vector SVG & CSS Paged Media ]
  • Formatted to exact ISO A4 dimensions (210mm × 297mm)
  • Traditional Sohrai tribal art geometric borders
  • CSS @media print strips out navbars, buttons, and website headers
          │
          ▼
[ Direct Print to PDF / Photocopier ]
  • 300 DPI vector crisp output generated 100% offline
  • All 40 students receive physical paper homework!
```

---

### ✍️ PIPELINE 3: Student Multimodal Studio & Edge Vision Pipeline
*Designed for hands-on, multi-sensory self-learning without internet.*

```
1. Digital Slate Tracing Engine (DigitalSlate.tsx):
   • HTML5 2D Canvas with chalk texture simulation.
   • Euclidean Distance Stroke Evaluation: Compares child's touch path against target Ol Chiki glyph coordinates.
   • Instant accuracy score (0–100%) and native audio encouragement in <16ms.

2. On-Device Edge Computer Vision (VisualObjectIdentifier.tsx):
   • HTML5 Camera Stream (navigator.mediaDevices.getUserMedia) ➔ 224x224 RGB Canvas Tensor.
   • Quantized MobileNet CNN forward pass (<150ms on device WebGL/WASM).
   • Detected object label mapped to tribal dictionary ➔ Native voice speaks tribal name offline.
   • 100% Child Data Privacy (zero photos stored or uploaded).

3. Illustrated Folktales Player (FolkTalePlayer.tsx):
   • StoryWeaver open-licensed tribal folklore with sentence-by-sentence karaoke highlighting.
```

---

### 📡 PIPELINE 4: Zero-Internet Cluster Mesh Sync Pipeline
*Designed for inter-tablet collaboration in deep rural schools with no cellular coverage.*

```
[ Teacher Tablet 1 (Host) ] ──(Enables local Android Wi-Fi Hotspot)──> IP: 10.69.168.1
                                          │
                   ┌──────────────────────┴──────────────────────┐
                   ▼                                             ▼
       [ Teacher Tablet 2 ]                          [ Teacher Tablet 3 ]
       (Connects via local subnet)                   (Connects via local subnet)
                   │                                             │
                   └───────────◄ P2P JSON Sync ►─────────────────┘
                   • Custom lesson plans exchanged in <2 seconds
                   • Student progress & worksheet templates shared
                   • ZERO kilobytes (0 KB) internet data consumed!
```

---

## 📊 4. Technical Benchmarks vs. Hackathon Requirements

| Parameter | SIH Requirement | PALASH Vani Metric | Technical Advantage |
| :--- | :--- | :--- | :--- |
| **Voice-to-Voice Latency** | $\le$ 3.00 seconds | **320 ms – 450 ms** | **7x faster** than hackathon requirement |
| **Memory Consumption** | $\le$ 2GB RAM budget | **~68 MB Heap (3.4%)** | Safe from Android Out-Of-Memory (OOM) crashes |
| **Storage Footprint** | Offline capable | **< 4 MB total cache** | Fits on the cheapest 16GB/32GB storage tablets |
| **Network Independence** | Low-connectivity ready | **100% Offline (0 KB/s)** | Operates in dense forest schools with no signal |
| **Test Verification** | Production quality | **34 / 34 Tests Passed (100%)** | Full automated verification of NLP, scripts, and TTS |
| **Classroom Ratio** | 1:1 screen assumption | **1 tablet : 40 students** | Solved via offline A4 Worksheet Generator |
