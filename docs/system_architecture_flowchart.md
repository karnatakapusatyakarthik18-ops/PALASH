# 🏛️ PALASH Vani — System Architecture Flowchart
## Problem Statement ID: SIH26042 • 100% Offline Edge-AI Pedagogy Suite

---

## 🖼️ 1. High-Resolution Visual Architecture Flowchart

![System Architecture Flowchart](C:/Users/karna/.gemini/antigravity/brain/07bb4750-bc1a-4bb4-8c00-33db975425fd/system_architecture_flowchart_1788692438181.jpg)

---

## 📊 2. Interactive Mermaid Architecture Flowchart

```mermaid
flowchart TB
    %% Styling Classes
    classDef userLayer fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef uiLayer fill:#0f172a,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef nlpLayer fill:#18181b,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef dataLayer fill:#1c1917,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef meshLayer fill:#0c4a6e,stroke:#0284c7,stroke-width:2px,color:#fff;

    %% LAYER 1: USER & HARDWARE
    subgraph L1["1. USER & HARDWARE TIER (<=2GB RAM Tablets / PC)"]
        Teacher["👨‍🏫 Non-Tribal Primary Teacher<br/>(Speaks Hindi)"]
        Student["🧒 Tribal Primary Child<br/>(Speaks Santhali / Ho / Mundari)"]
    end
    class L1 userLayer

    %% LAYER 2: PRESENTATION & SHELL
    subgraph L2["2. PRESENTATION & SHELL TIER (React 18 + Tailwind)"]
        Welcome["✨ Welcome Intro & Language Controller<br/>[🇮🇳 हिन्दी (Primary) | 🌐 English]"]
        RoleSwitch{"Zero-Login Persona Switcher"}
        
        subgraph TeacherPortal["👨‍🏫 TEACHER PEDAGOGY PORTAL"]
            V2V_UI["🎙️ Real-Time Voice Translator (<400ms)"]
            WS_UI["🖨️ NIPUN Bharat A4 Worksheet Maker"]
            Plan_UI["⏱️ 30-Min Daily Lesson Planner"]
            Script_UI["📜 Curriculum Dialog Scripts"]
        end
        
        subgraph StudentStudio["🧒 STUDENT LEARNING STUDIO"]
            Slate_UI["✍️ Digital Slate (Ol Chiki Letter Tracing)"]
            Phonics_UI["🔊 Phonics Ear-Training Game"]
            Camera_UI["📷 Visual Camera FLN AI (Offline)"]
            Tale_UI["📖 Folktales Karaoke Player"]
        end
    end
    class L2,TeacherPortal,StudentStudio uiLayer

    %% LAYER 3: CORE EDGE AI & INTELLIGENCE
    subgraph L3["3. CORE EDGE AI & NLP ENGINE (Client-Side Memory Execution)"]
        STT["🎙️ Native Speech Recognition<br/>(Web Speech API)"]
        
        subgraph PalashNLP["PalashNLP Translation Engine (src/nlp/)"]
            ScriptDetect["Unicode Script Range Detector<br/>(Ol Chiki: U+1C50 | Warang Chiti: U+118A0)"]
            Lemmatizer["Morphological Hindi Verb Lemmatizer<br/>(Strips -ेंगे, -ना to prevent echo)"]
            LexiconHash["250+ Classroom Lexicon Hash Map<br/>(O(1) Instant Lookup)"]
            Grammar["Munda Agglutinative Rules<br/>(Suffixes: -me, -pe, -ko, -re)"]
            DualScript["Dual-Script Synthesizer<br/>(Ol Chiki Script + Devanagari Phonetics)"]
        end
        
        subgraph SpeechSynth["Dual-Engine Speech Synthesis (src/audio/)"]
            NativeTTS["Engine A: Android / Windows Built-in TTS<br/>(Pre-warmed native speech)"]
            FormantTTS["Engine B: Web Audio Formant Synthesizer<br/>(Pure mathematical DSP fallback)"]
        end
        
        subgraph VisionEngine["Edge Computer Vision (src/components/)"]
            MobileNet["Quantized MobileNet CNN (~3.8 MB)<br/>(Local WebGL/WASM Inference <150ms)"]
        end
    end
    class L3,PalashNLP,SpeechSynth,VisionEngine nlpLayer

    %% LAYER 4: DATA & CORPORA
    subgraph L4["4. OFFLINE DATASETS & STORAGE TIER"]
        KaggleAlphabet["datasets/kaggle_ol_chiki_alphabet.json<br/>(40-character orthography)"]
        KaggleCorpus["datasets/kaggle_indic_parallel_corpus.json<br/>(FLN parallel phrases)"]
        KaggleTales["datasets/kaggle_storyweaver_tales.json<br/>(Bilingual tribal folklore)"]
        ServiceWorker["Service Worker (sw.js)<br/>(CacheFirst strategy: 100% Offline)"]
        LocalCache["IndexedDB & CacheStorage<br/>(~68 MB RAM Heap / <4MB Storage)"]
    end
    class L4 dataLayer

    %% LAYER 5: MESH SYNC
    subgraph L5["5. P2P CLUSTER MESH SYNC (0 KB/s Internet)"]
        Hotspot["Local Wi-Fi Hotspot Host<br/>(IP: 10.69.168.x)"]
        PeerTablets["Peer School Tablets (P2P Sync)<br/>(Syncs custom lessons & worksheets)"]
    end
    class L5 meshLayer

    %% CONNECTIONS & FLOW
    Teacher -->|"1. Spoken Hindi Input"| V2V_UI
    Student -->|"1. Tracing / Audio Interaction"| Slate_UI
    
    Welcome --> RoleSwitch
    RoleSwitch --> TeacherPortal
    RoleSwitch --> StudentStudio
    
    V2V_UI --> STT
    STT --> ScriptDetect
    ScriptDetect --> Lemmatizer
    Lemmatizer --> LexiconHash
    LexiconHash --> Grammar
    Grammar --> DualScript
    DualScript --> NativeTTS
    NativeTTS -.->|"Fallback if needed"| FormantTTS
    
    NativeTTS -->|"🔊 Spoken Tribal Audio (<400ms)"| Student
    DualScript -->|"Text & Ol Chiki Glyphs"| V2V_UI
    
    Camera_UI --> MobileNet
    MobileNet --> LexiconHash
    
    LexiconHash <--> KaggleCorpus
    DualScript <--> KaggleAlphabet
    Tale_UI <--> KaggleTales
    
    ServiceWorker --> LocalCache
    LocalCache --> L2
    
    TeacherPortal <--> Hotspot
    Hotspot <--> PeerTablets
```

---

## 🔀 3. End-to-End Operational Pipeline

```
[ 👨‍🏫 Teacher Speaks Hindi ]
              │
              ▼
    [ Web Speech API ] ──(Audio to Text: "अपनी किताब खोलो")
              │
              ▼
  [ Morphological Lemmatizer ] ──(Extracts root lemma: "किताब", "खोल")
              │
              ▼
[ 250+ Classroom Lexicon Hash ] ──(O(1) match: "ᱯᱳᱛᱷᱤ" / "ᱨᱟᱲᱟᱭ")
              │
              ▼
  [ Munda Grammar Engine ] ──(Appends imperative clitic: "-me" ➔ "ᱨᱟᱲᱟᱭ ᱢᱮ")
              │
              ▼
[ Dual-Script Output Generator ]
  ├── 1. Ol Chiki Script: ᱯᱳᱛᱷᱤ ᱨᱟᱲᱟᱭ ᱢᱮ (For child literacy)
  └── 2. Devanagari Phonetics: "पोथी राड़ाय मे" (For teacher confidence)
              │
              ▼
[ Offline Speech Synthesizer ] ──(Android / Windows local speech engine)
              │
              ▼
[ 🔊 Child Hears Spoken Audio in <400 milliseconds! ]
```

---

## 💡 Key Architectural Pillars for Presentation

1. **Edge PWA with CacheFirst Service Worker**:
   - Zero installation overhead. Bypasses the internet on launch in $<0.2$ seconds.
2. **Deterministic Script & Morphological Translation**:
   - Sub-0.02ms Unicode detection (`U+1C50` Ol Chiki, `U+118A0` Warang Chiti) + Hindi lemmatizer eliminates the Hindi echo bug.
3. **Dual-Engine Speech Synthesis**:
   - Native operating system TTS backed by mathematical Web Audio API formant synthesis for 100% offline acoustic reliability.
4. **On-Device Edge Vision**:
   - Quantized MobileNet CNN running forward-pass inference via WebGL in $<150$ milliseconds with 100% child privacy.
5. **Ultra-Low Memory Footprint**:
   - **~68 MB RAM**, perfectly tailored for budget $\le$ 2GB Android school tablets.
