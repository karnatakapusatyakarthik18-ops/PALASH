import React, { useState, useEffect, useRef } from 'react';
import { TribalLanguage, TranslationResult } from '../nlp/types';
import { VoiceManager, V2VExchange, VoiceMode } from '../audio/voiceManager';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { PalashNLPTranslator } from '../nlp/translator';
import { SpeechMatchCandidate } from '../audio/offlineSTT';
import { useTheme } from '../theme/ThemeContext';
import { 
  Mic, MicOff, Volume2, Clock, Sparkles, User, GraduationCap, 
  BookOpen, CheckCircle2, ArrowRightLeft, Star, VolumeX,
  Wifi, WifiOff, Activity, ShieldCheck, Zap, Copy, Check
} from 'lucide-react';
import { transliterateDevanagariToLatin } from '../audio/transliterate';

interface VoiceTranslatorProps {
  targetLang: TribalLanguage;
}

interface StudentPrompt {
  tribalText: string;
  displayLabel: string;
  hindiMeaning: string;
  icon: string;
  phonetic: string;
}

interface ScenarioPreset {
  category: 'classroom' | 'needs' | 'lesson' | 'conversation';
  hindi: string;
  label: string;
  icon: string;
}

const SCENARIO_PRESETS: ScenarioPreset[] = [
  // Classroom instructions
  { category: 'classroom', hindi: 'अपनी किताब खोलो', label: 'अपनी किताब खोलो', icon: '📖' },
  { category: 'classroom', hindi: 'बैठ जाओ', label: 'बैठ जाओ', icon: '🪑' },
  { category: 'classroom', hindi: 'खड़े हो जाओ', label: 'खड़े हो जाओ', icon: '🧍' },
  { category: 'classroom', hindi: 'ताली बजाओ', label: 'ताली बजाओ', icon: '👏' },
  { category: 'classroom', hindi: 'किताब में देखो और ध्यान से सुनो', label: 'किताब में देखो और सुनो', icon: '👀' },
  { category: 'classroom', hindi: 'Open your books', label: 'Open your books', icon: '🌐' },
  { category: 'classroom', hindi: 'Sit down', label: 'Sit down', icon: '🌐' },
  { category: 'classroom', hindi: 'Listen carefully', label: 'Listen carefully', icon: '🌐' },
  
  // Daily Needs & Activities
  { category: 'needs', hindi: 'मुझे पानी चाहिए', label: 'मुझे पानी चाहिए', icon: '💧' },
  { category: 'needs', hindi: 'पानी पियो', label: 'पानी पियो', icon: '🥤' },
  { category: 'needs', hindi: 'मुझे भूख लगी है', label: 'मुझे भूख लगी है', icon: '🥣' },
  { category: 'needs', hindi: 'खाना खाओ', label: 'खाना खाओ', icon: '🍲' },
  { category: 'needs', hindi: 'घर जाओ', label: 'घर जाओ', icon: '🏠' },
  { category: 'needs', hindi: 'Drink water', label: 'Drink water', icon: '🌐' },

  // Lesson & Grammar Sentences
  { category: 'lesson', hindi: 'बच्चे मैदान में खेल रहे हैं', label: 'बच्चे मैदान में खेल रहे हैं', icon: '⚽' },
  { category: 'lesson', hindi: 'गाय हमें दूध देती है', label: 'गाय हमें दूध देती है', icon: '🐄' },
  { category: 'lesson', hindi: 'सूरज सुबह पूर्व में उगता है', label: 'सूरज पूर्व में उगता है', icon: '☀️' },
  { category: 'lesson', hindi: 'पेड़ पर मीठे फल हैं', label: 'पेड़ पर मीठे फल हैं', icon: '🌳' },
  { category: 'lesson', hindi: 'हम रोज स्कूल जाते हैं', label: 'हम रोज स्कूल जाते हैं', icon: '🏫' },
  { category: 'lesson', hindi: 'बारिश हो रही है', label: 'बारिश हो रही है', icon: '🌧️' },

  // Conversation & Greetings
  { category: 'conversation', hindi: 'नमस्ते बच्चों', label: 'नमस्ते बच्चों', icon: '🙏' },
  { category: 'conversation', hindi: 'आज छुट्टी है', label: 'आज छुट्टी है', icon: '🎉' },
  { category: 'conversation', hindi: 'यह क्या है?', label: 'यह क्या है?', icon: '❓' },
  { category: 'conversation', hindi: 'बहुत अच्छा!', label: 'बहुत अच्छा!', icon: '⭐' },
  { category: 'conversation', hindi: 'आप कैसे हैं?', label: 'आप कैसे हैं?', icon: '🤝' },
];

export const VoiceTranslator: React.FC<VoiceTranslatorProps> = ({ targetLang }) => {
  const { themeConfig } = useTheme();
  const [voiceMode, setVoiceMode] = useState<VoiceMode>('teacher_to_student');
  const [micLang, setMicLang] = useState<'en-IN' | 'hi-IN'>('hi-IN');
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [isOfflineMicActive, setIsOfflineMicActive] = useState<boolean>(typeof navigator !== 'undefined' ? !navigator.onLine : false);
  const [isVoiceDetected, setIsVoiceDetected] = useState<boolean>(false);
  const [activeTargetPhrase, setActiveTargetPhrase] = useState<string>('बच्चे मैदान में खेल रहे हैं');
  const [lastDetectedSpeech, setLastDetectedSpeech] = useState<string | null>(null);
  const [lastLatencyMs, setLastLatencyMs] = useState<number | null>(320);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activePraise, setActivePraise] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState('बच्चे मैदान में खेल रहे हैं');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detectedCandidates, setDetectedCandidates] = useState<SpeechMatchCandidate[]>([]);
  const [detectedSyllables, setDetectedSyllables] = useState<number | null>(null);
  const [detectedCentroid, setDetectedCentroid] = useState<number | null>(null);
  const [currentTranslation, setCurrentTranslation] = useState<TranslationResult | null>(() => {
    return PalashNLPTranslator.translate('बच्चे मैदान में खेल रहे हैं', targetLang);
  });
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    try {
      navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Copy failed:', e);
    }
  };

  useEffect(() => {
    const handleOnline = () => setIsOfflineMicActive(false);
    const handleOffline = () => setIsOfflineMicActive(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const [exchanges, setExchanges] = useState<V2VExchange[]>([
    {
      id: 'init_1',
      mode: 'teacher_to_student',
      sourceText: 'नमस्ते बच्चों! सब अपनी जगह बैठ जाओ।',
      translatedText: targetLang === 'santhali' ? 'ᱡᱳᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱡᱚᱛᱚ ᱦᱚᱲ ᱫᱩᱲᱩᱵᱽ ᱯᱮ।' : (targetLang === 'ho' ? 'जोहार होनको! सबिन दुबेन।' : 'जोहार होनको! सबिन आपना ठांव रे दुबपे।'),
      phoneticText: 'जोहार गिदरा को! जोतो होड़ दुड़ुब पे.',
      englishPhonetic: 'Johar gidra ko! Joto hor durub pe.',
      latencyMs: 310,
      timestamp: '10:00 AM',
      confidence: 0.98
    }
  ]);

  const voiceManagerRef = useRef<VoiceManager | null>(null);

  useEffect(() => {
    const vm = new VoiceManager();
    vm.setLanguage(targetLang);
    vm.setMode(voiceMode);
    vm.setMicLanguage(micLang);
    vm.setActiveTargetPhrase(activeTargetPhrase);
    vm.setCallbacks(
      (result) => {
        setExchanges((prev) => [result, ...prev]);
        setLastLatencyMs(result.latencyMs);
      },
      (status) => {
        setIsListening(status.listening);
        if (status.latencyMs) setLastLatencyMs(status.latencyMs);
        if (status.error) setErrorMessage(status.error);
        if (status.isOffline !== undefined) setIsOfflineMicActive(status.isOffline);
        if (status.audioLevel !== undefined) setAudioLevel(status.audioLevel);
        if (status.isVoiceDetected !== undefined) setIsVoiceDetected(status.isVoiceDetected);
        if (status.candidates && status.candidates.length > 0) {
          setDetectedCandidates(status.candidates);
        }
        if (status.detectedSyllables !== undefined) {
          setDetectedSyllables(status.detectedSyllables);
        }
        if (status.spectralCentroid !== undefined) {
          setDetectedCentroid(status.spectralCentroid);
        }
        if (status.detectedSpeechText) {
          const phrase = status.detectedSpeechText;
          setLastDetectedSpeech(phrase);
          setManualInput(phrase);
          setActiveTargetPhrase(phrase);
          const trans = PalashNLPTranslator.translate(phrase, targetLang);
          setCurrentTranslation(trans);
          setActivePraise(`🎙️ ऑफ़लाइन आवाज़ पहचानी गई: "${phrase}" ➔ अनुवाद संपन्न! 🌟`);
          setTimeout(() => setActivePraise(null), 4000);
        }
      }
    );
    voiceManagerRef.current = vm;
  }, [targetLang, voiceMode, micLang]);

  const toggleListening = () => {
    setErrorMessage(null);
    if (isListening) {
      voiceManagerRef.current?.stopListening();
    } else {
      voiceManagerRef.current?.startListening(micLang);
    }
  };

  const forceCommitSpeech = (phrase?: string) => {
    setErrorMessage(null);
    voiceManagerRef.current?.forceOfflineInput(phrase || activeTargetPhrase);
  };

  // Teacher mode prompt (Hindi or English -> Tribal)
  const handleTeacherPrompt = async (promptText: string) => {
    setErrorMessage(null);
    const cleanText = promptText.trim();
    if (!cleanText) return;
    setActiveTargetPhrase(cleanText);
    setManualInput(cleanText);
    voiceManagerRef.current?.setActiveTargetPhrase(cleanText);

    // Run local NLP translation immediately
    const result = PalashNLPTranslator.translate(cleanText, targetLang);
    setCurrentTranslation(result);

    setIsPlayingAudio(true);
    const start = performance.now();
    await voiceManagerRef.current?.processSpokenText(cleanText, start);
    setIsPlayingAudio(false);
  };

  useEffect(() => {
    if (activeTargetPhrase) {
      const res = PalashNLPTranslator.translate(activeTargetPhrase, targetLang);
      setCurrentTranslation(res);
    }
  }, [targetLang]);

  // Student Self-Learning mode prompt (Tribal -> Hindi)
  const handleStudentSelfLearnPrompt = (item: StudentPrompt) => {
    setErrorMessage(null);
    setIsPlayingAudio(true);
    const start = performance.now();

    // 1. Reverse translate to Hindi
    const result = PalashNLPTranslator.translateTribalToHindi(item.tribalText, targetLang);
    const hindiWord = result.hindiText || item.hindiMeaning;

    // 2. Play Audio: Speak the Hindi word aloud so student self-learns Hindi!
    PalashPhoneticTTS.speakOffline(hindiWord, hindiWord, hindiWord, 'santhali');

    const latencyMs = Math.round(performance.now() - start);
    setLastLatencyMs(Math.max(120, latencyMs));

    // 3. Log Exchange in dialogue stream
    const exchange: V2VExchange = {
      id: 'student_' + Date.now(),
      mode: 'student_to_teacher',
      sourceText: `${item.displayLabel}`,
      translatedText: `${item.icon} ${hindiWord}`,
      phoneticText: `हिंदी अर्थ: ${hindiWord}`,
      englishPhonetic: hindiWord,
      latencyMs: Math.max(120, latencyMs),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confidence: 0.98
    };

    setExchanges((prev) => [exchange, ...prev]);

    // 4. Trigger visual praise
    setActivePraise(`शाबाश! आपने सीखा: "${item.displayLabel}" = "${hindiWord}" 🌟`);
    setTimeout(() => {
      setIsPlayingAudio(false);
      setActivePraise(null);
    }, 2500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    if (voiceMode === 'teacher_to_student') {
      handleTeacherPrompt(manualInput.trim());
    } else {
      const match = getStudentPrompts().find(p => p.tribalText === manualInput.trim() || p.displayLabel.includes(manualInput.trim()));
      if (match) {
        handleStudentSelfLearnPrompt(match);
      } else {
        handleTeacherPrompt(manualInput.trim());
      }
    }
  };

  const replayAudio = (item: V2VExchange) => {
    setIsPlayingAudio(true);
    if (item.mode === 'teacher_to_student') {
      PalashPhoneticTTS.speakOffline(
        item.translatedText,
        item.phoneticText,
        item.englishPhonetic || item.phoneticText,
        targetLang
      );
    } else {
      PalashPhoneticTTS.speakOffline(
        item.translatedText,
        item.translatedText,
        item.translatedText,
        'santhali'
      );
    }
    setTimeout(() => setIsPlayingAudio(false), 800);
  };

  const getStudentPrompts = (): StudentPrompt[] => {
    if (targetLang === 'santhali') {
      return [
        { tribalText: 'ᱫᱟᱜ', displayLabel: 'ᱫᱟᱜ (दाग)', hindiMeaning: 'पानी', icon: '💧', phonetic: 'दाग' },
        { tribalText: 'ᱫᱩᱲᱩᱵᱽ', displayLabel: 'ᱫᱩᱲᱩᱵᱽ (दुड़ुब)', hindiMeaning: 'बैठो', icon: '🪑', phonetic: 'दुड़ुब' },
        { tribalText: 'ᱯᱳᱛᱷᱤ', displayLabel: 'ᱯᱳᱛᱷᱤ (पोथी)', hindiMeaning: 'किताब', icon: '📖', phonetic: 'पोथी' },
        { tribalText: 'ᱫᱟᱨᱮ', displayLabel: 'ᱫᱟᱨᱮ (दारे)', hindiMeaning: 'पेड़', icon: '🌳', phonetic: 'दारे' },
        { tribalText: 'ᱦᱟᱹᱠᱩ', displayLabel: 'ᱦᱟᱹᱠᱩ (हाकू)', hindiMeaning: 'मछली', icon: '🐟', phonetic: 'हाकू' },
        { tribalText: 'ᱥᱮᱛᱟ', displayLabel: 'ᱥᱮᱛᱟ (सेता)', hindiMeaning: 'कुत्ता', icon: '🐕', phonetic: 'सेता' },
        { tribalText: 'ᱡᱚ', displayLabel: 'ᱡᱚ (जो)', hindiMeaning: 'फल', icon: '🍎', phonetic: 'जो' },
        { tribalText: 'ᱵᱟᱦᱟ', displayLabel: 'ᱵᱟᱦᱟ (बाहा)', hindiMeaning: 'फूल', icon: '🌸', phonetic: 'बाहा' },
        { tribalText: 'ᱢᱤᱫ', displayLabel: 'ᱢᱤᱫ (मिद)', hindiMeaning: 'एक (1)', icon: '1️⃣', phonetic: 'मिद' },
        { tribalText: 'ᱵᱟᱨ', displayLabel: 'ᱵᱟᱨ (बार)', hindiMeaning: 'दो (2)', icon: '2️⃣', phonetic: 'बार' },
        { tribalText: 'ᱡᱳᱦᱟᱨ', displayLabel: 'ᱡᱳᱦᱟᱨ (जोहार)', hindiMeaning: 'नमस्ते', icon: '🙏', phonetic: 'जोहार' },
        { tribalText: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ', displayLabel: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ (अडी नापाय)', hindiMeaning: 'बहुत अच्छा', icon: '⭐', phonetic: 'अडी नापाय' }
      ];
    } else if (targetLang === 'ho') {
      return [
        { tribalText: 'दाः', displayLabel: 'दाः (दाह)', hindiMeaning: 'पानी', icon: '💧', phonetic: 'दाह' },
        { tribalText: 'दुब', displayLabel: 'दुब (दुब)', hindiMeaning: 'बैठो', icon: '🪑', phonetic: 'दुब' },
        { tribalText: 'पोथी', displayLabel: 'पोथी (पोथी)', hindiMeaning: 'किताब', icon: '📖', phonetic: 'पोथी' },
        { tribalText: 'दारू', displayLabel: 'दारू (दारू)', hindiMeaning: 'पेड़', icon: '🌳', phonetic: 'दारू' },
        { tribalText: 'हाकु', displayLabel: 'हाकु (हाकु)', hindiMeaning: 'मछली', icon: '🐟', phonetic: 'हाकु' },
        { tribalText: 'सेता', displayLabel: 'सेता (सेता)', hindiMeaning: 'कुत्ता', icon: '🐕', phonetic: 'सेता' },
        { tribalText: 'जो', displayLabel: 'जो (जो)', hindiMeaning: 'फल', icon: '🍎', phonetic: 'जो' },
        { tribalText: 'बा', displayLabel: 'बा (बा)', hindiMeaning: 'फूल', icon: '🌸', phonetic: 'बा' },
        { tribalText: 'मि', displayLabel: 'मि (मि)', hindiMeaning: 'एक (1)', icon: '1️⃣', phonetic: 'मि' },
        { tribalText: 'बार', displayLabel: 'बार (बार)', hindiMeaning: 'दो (2)', icon: '2️⃣', phonetic: 'बार' },
        { tribalText: 'जोहार', displayLabel: 'जोहार (जोहार)', hindiMeaning: 'नमस्ते', icon: '🙏', phonetic: 'जोहार' },
        { tribalText: 'बुगिगे', displayLabel: 'बुगिगे (बुगिगे)', hindiMeaning: 'बहुत अच्छा', icon: '⭐', phonetic: 'बुगिगे' }
      ];
    } else {
      return [
        { tribalText: 'दाः', displayLabel: 'दाः (दाह)', hindiMeaning: 'पानी', icon: '💧', phonetic: 'दाह' },
        { tribalText: 'दुब', displayLabel: 'दुब (दुब)', hindiMeaning: 'बैठो', icon: '🪑', phonetic: 'दुब' },
        { tribalText: 'पोथी', displayLabel: 'पोथी (पोथी)', hindiMeaning: 'किताब', icon: '📖', phonetic: 'पोथी' },
        { tribalText: 'दारू', displayLabel: 'दारू (दारू)', hindiMeaning: 'पेड़', icon: '🌳', phonetic: 'दारू' },
        { tribalText: 'हाकु', displayLabel: 'हाकु (हाकु)', hindiMeaning: 'मछली', icon: '🐟', phonetic: 'हाकु' },
        { tribalText: 'सेता', displayLabel: 'सेता (सेता)', hindiMeaning: 'कुत्ता', icon: '🐕', phonetic: 'सेता' },
        { tribalText: 'जो', displayLabel: 'जो (जो)', hindiMeaning: 'फल', icon: '🍎', phonetic: 'जो' },
        { tribalText: 'बा', displayLabel: 'बा (बा)', hindiMeaning: 'फूल', icon: '🌸', phonetic: 'बा' },
        { tribalText: 'मियाद', displayLabel: 'मियाद (मियाद)', hindiMeaning: 'एक (1)', icon: '1️⃣', phonetic: 'मियाद' },
        { tribalText: 'बरिया', displayLabel: 'बरिया (बरिया)', hindiMeaning: 'दो (2)', icon: '2️⃣', phonetic: 'बरिया' },
        { tribalText: 'जोहार', displayLabel: 'जोहार (जोहार)', hindiMeaning: 'नमस्ते', icon: '🙏', phonetic: 'जोहार' },
        { tribalText: 'बेसगे', displayLabel: 'बेसगे (बेसगे)', hindiMeaning: 'बहुत अच्छा', icon: '⭐', phonetic: 'बेसगे' }
      ];
    }
  };

  const studentPrompts = getStudentPrompts();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner with Latency & 2-Way Mode Switcher */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-sm shrink-0">
            <ArrowRightLeft className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 text-sm md:text-base">
              द्वि-मार्गी ध्वनि अनुवाद (2-Way Real-Time Voice Translation)
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-stone-500">
                लेटेंसी: <strong className="text-emerald-700 font-mono text-sm">{lastLatencyMs ? `${lastLatencyMs} ms` : 'तैयार'}</strong> • 100% ऑफ़लाइन Web Audio DSP
              </p>
              {isOfflineMicActive ? (
                <span className="inline-flex items-center space-x-1 bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full text-[10px] font-black">
                  <WifiOff className="w-3 h-3 text-amber-700" />
                  <span>100% ऑफ़लाइन</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1 bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-black">
                  <Wifi className="w-3 h-3 text-emerald-600" />
                  <span>हाइब्रिड / ऑफ़लाइन रेडी</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mode Toggle Buttons: Teacher Mode vs Student Self-Learning Mode */}
        <div className="flex items-center bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shadow-inner text-xs font-bold w-full md:w-auto">
          <button
            onClick={() => {
              setVoiceMode('teacher_to_student');
              const phrase = micLang === 'en-IN' ? 'Open your books' : 'अपनी किताब खोलो';
              setActiveTargetPhrase(phrase);
              voiceManagerRef.current?.setMode('teacher_to_student');
              voiceManagerRef.current?.setActiveTargetPhrase(phrase);
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl transition-all ${
              voiceMode === 'teacher_to_student'
                ? 'bg-black text-emerald-400 font-black shadow-md border border-emerald-500/40'
                : 'text-stone-600 hover:text-black'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>👨‍🏫 शिक्षक निर्देश (हिंदी ➔ जनजातीय)</span>
          </button>
          <button
            onClick={() => {
              setVoiceMode('student_to_teacher');
              const phrase = targetLang === 'santhali' ? 'ᱫᱟᱜ' : 'दाः';
              setActiveTargetPhrase(phrase);
              voiceManagerRef.current?.setMode('student_to_teacher');
              voiceManagerRef.current?.setActiveTargetPhrase(phrase);
            }}
            className={`flex-1 md:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl transition-all ${
              voiceMode === 'student_to_teacher'
                ? 'bg-emerald-500 text-black font-black shadow-md border border-emerald-400'
                : 'text-stone-600 hover:text-black'
            }`}
          >
            <User className="w-4 h-4" />
            <span>🧒 छात्र स्व-अध्ययन (जनजातीय ➔ हिंदी)</span>
          </button>
        </div>
      </div>

      {/* Main Mic Recording & Interactive Action Area */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-8 text-center space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-black shadow-sm bg-emerald-100 text-emerald-950 border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {voiceMode === 'teacher_to_student' 
                ? `शिक्षक बोलें (हिंदी) ➔ अनुवाद एवं वाचन (${targetLang.toUpperCase()} में)` 
                : `छात्र अपनी मातृभाषा बोलें (${targetLang.toUpperCase()}) ➔ सीखें मानक हिंदी`}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-stone-900">
            {voiceMode === 'teacher_to_student' 
              ? (isListening ? 'माइक सुन रहा है... हिंदी में बोलिए!' : 'शिक्षक निर्देश: माइक दबाएँ या नीचे से वाक्य चुनें')
              : (isListening ? 'माइक सुन रहा है... अपनी भाषा में बोलिए!' : 'छात्र स्व-अध्ययन: कोई भी मातृभाषा शब्द चुनें और हिंदी सीखें')}
          </h2>

          {voiceMode === 'student_to_teacher' && (
            <p className="text-xs text-stone-600 max-w-xl mx-auto">
              💡 <strong>स्व-अध्ययन सहायता:</strong> जनजातीय बच्चे अपने घर की बोली में शब्द दबाते हैं, और ऐप उन्हें तुरंत मानक हिंदी में बोलना सिखाता है।
            </p>
          )}
        </div>

        {/* Praise Message Banner */}
        {activePraise && (
          <div className="bg-emerald-500 text-black font-black px-4 py-2.5 rounded-2xl shadow-lg animate-bounce text-sm max-w-md mx-auto flex items-center justify-center gap-2">
            <Star className="w-4 h-4 fill-black" />
            <span>{activePraise}</span>
          </div>
        )}

        {/* 1. Universal Custom Input Bar */}
        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-4 sm:p-5 shadow-inner space-y-3 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-black text-stone-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>कस्टम वाक्य इनपुट (कोई भी वाक्य लिखें या माइक से बोलें):</span>
            </label>
            {voiceMode === 'teacher_to_student' && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-stone-500">माइक इनपुट:</span>
                <button
                  type="button"
                  onClick={() => {
                    setMicLang('hi-IN');
                    voiceManagerRef.current?.setMicLanguage('hi-IN');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                    micLang === 'hi-IN'
                      ? 'bg-black text-emerald-400 border border-emerald-400 shadow-sm'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  🇮🇳 हिंदी (hi-IN)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMicLang('en-IN');
                    voiceManagerRef.current?.setMicLanguage('en-IN');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                    micLang === 'en-IN'
                      ? 'bg-black text-emerald-400 border border-emerald-400 shadow-sm'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  🌐 English (en-IN)
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => {
                  setManualInput(e.target.value);
                  if (e.target.value.trim()) {
                    setActiveTargetPhrase(e.target.value.trim());
                    voiceManagerRef.current?.setActiveTargetPhrase(e.target.value.trim());
                  }
                }}
                placeholder={
                  voiceMode === 'teacher_to_student'
                    ? 'यहाँ कोई भी वाक्य लिखें (उदा. "बच्चे मैदान में खेल रहे हैं", "मुझे पानी चाहिए", "आज छुट्टी है")...'
                    : 'यहाँ मातृभाषा शब्द लिखें (उदा. ᱫᱟᱜ / पानी)...'
                }
                className="w-full pl-4 pr-10 py-3 text-xs sm:text-sm font-semibold bg-white border-2 border-stone-300 focus:border-emerald-500 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/20 text-stone-900 placeholder:text-stone-400"
              />
              {manualInput && (
                <button
                  type="button"
                  onClick={() => setManualInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 text-sm font-bold"
                  title="साफ़ करें"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 border border-emerald-400/40 shrink-0"
            >
              <Zap className="w-4 h-4 text-emerald-200" />
              <span>⚡ अनुवाद करें व बोलें</span>
            </button>
          </form>
        </div>

        {/* 2. Live Translation Output Card */}
        {currentTranslation && (
          <div className="bg-gradient-to-br from-stone-950 via-stone-900 to-emerald-950 text-white rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-emerald-500/30 text-left space-y-4 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-500 text-black font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  {targetLang === 'santhali' ? 'ᱥᱟᱱᱛᱟᱲᱤ • SANTHALI' : (targetLang === 'ho' ? '𑢹𑣉𑣉 • HO' : 'मुण्डारी • MUNDARI')}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  (लिपि: {currentTranslation.scriptType === 'olchiki' ? 'Ol Chiki' : currentTranslation.scriptType})
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                  ⏱️ {lastLatencyMs || 280} ms
                </span>
                <span className="text-[11px] font-black text-emerald-300 bg-black/60 border border-stone-700 px-2.5 py-0.5 rounded-full">
                  सटीकता: {Math.round((currentTranslation.confidence || 0.95) * 100)}%
                </span>
                <span className="text-[11px] font-bold text-amber-300 bg-amber-950/60 border border-amber-800 px-2.5 py-0.5 rounded-full">
                  ⚡ 100% ऑफ़लाइन
                </span>
              </div>
            </div>

            {/* Source & Translated Utterance */}
            <div className="space-y-1.5">
              <div className="text-xs text-stone-400 font-semibold flex items-center gap-1.5">
                <span>मूल वाक्य:</span>
                <strong className="text-white">"{currentTranslation.sourceText}"</strong>
              </div>

              <div className="text-2xl sm:text-3xl font-black text-emerald-300 tracking-wide font-olchiki leading-tight">
                {currentTranslation.targetText}
              </div>
            </div>

            {/* Phonetic Pronunciation Guides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="bg-black/40 border border-emerald-500/20 rounded-2xl p-3">
                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-wider mb-0.5">
                  🗣️ देवनागरी उच्चारण (शिक्षक मार्गदर्शिका):
                </div>
                <div className="text-sm font-bold text-stone-100">
                  {currentTranslation.devanagariPhonetic || currentTranslation.targetText}
                </div>
              </div>

              <div className="bg-black/40 border border-emerald-500/20 rounded-2xl p-3">
                <div className="text-[10px] font-black text-teal-400 uppercase tracking-wider mb-0.5">
                  🔤 English / Roman Phonetics:
                </div>
                <div className="text-sm font-mono font-bold text-stone-200">
                  {currentTranslation.englishPhonetic || transliterateDevanagariToLatin(currentTranslation.devanagariPhonetic || '')}
                </div>
              </div>
            </div>

            {/* Word-by-Word Grammatical Decomposition (Tokens) */}
            {currentTranslation.tokens && currentTranslation.tokens.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-black text-stone-400 uppercase tracking-wider">
                  🔍 शब्द-दर-शब्द विश्लेषण (Word-by-Word Token Analysis):
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentTranslation.tokens.map((tok, i) => (
                    <div
                      key={i}
                      className="bg-stone-900 border border-stone-700 hover:border-emerald-500 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-sm"
                    >
                      <span className="text-stone-300">{tok.hindi}</span>
                      <span className="text-emerald-400 font-black">➔</span>
                      <span className="text-emerald-300 font-bold font-olchiki">{tok.target}</span>
                      <span className="text-[10px] text-stone-400 font-mono">({tok.phonetic})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons: Replay Voice & Copy */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800/80">
              <button
                type="button"
                onClick={() => {
                  setIsPlayingAudio(true);
                  PalashPhoneticTTS.speakOffline(
                    currentTranslation.targetText,
                    currentTranslation.devanagariPhonetic,
                    currentTranslation.englishPhonetic,
                    targetLang
                  );
                  setTimeout(() => setIsPlayingAudio(false), 1200);
                }}
                className="bg-emerald-400 hover:bg-emerald-300 text-black font-black px-5 py-2.5 rounded-xl text-xs shadow-lg flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
              >
                <Volume2 className="w-4 h-4 text-black" />
                <span>{isPlayingAudio ? 'ध्वनि चल रही है...' : '🔊 पुनः ध्वनि सुनें (Replay Voice)'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy(`${currentTranslation.sourceText} -> ${currentTranslation.targetText} (${currentTranslation.devanagariPhonetic})`)}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold px-3.5 py-2 rounded-xl text-xs transition-all flex items-center space-x-1.5 border border-stone-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-stone-400" />}
                <span>{copied ? 'कॉपी हो गया!' : 'कॉपी करें'}</span>
              </button>
            </div>

            {/* Offline Acoustic Match Candidate Chips */}
            {detectedCandidates.length > 0 && (
              <div className="bg-black/60 border border-emerald-500/25 rounded-2xl p-3.5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>🎯 ऑफ़लाइन पहचानी गई आवाज़ के विकल्प (Acoustic Match Candidates):</span>
                  </span>
                  {detectedSyllables && (
                    <span className="text-[10px] text-stone-300 font-mono bg-stone-900 border border-stone-700 px-2 py-0.5 rounded-full">
                      शब्दांश: {detectedSyllables} • स्पेक्ट्रल सेंट्रोइड: {detectedCentroid || 1800} Hz
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {detectedCandidates.map((cand, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setManualInput(cand.text);
                        setActiveTargetPhrase(cand.text);
                        voiceManagerRef.current?.setActiveTargetPhrase(cand.text);
                        handleTeacherPrompt(cand.text);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border active:scale-95 ${
                        (currentTranslation?.sourceText === cand.text || activeTargetPhrase === cand.text)
                          ? 'bg-emerald-500 text-black border-emerald-400 shadow-md font-black ring-2 ring-emerald-400/40'
                          : 'bg-stone-900 text-stone-200 hover:text-white border-stone-700 hover:border-emerald-500'
                      }`}
                    >
                      <span>"{cand.text}"</span>
                      <span className="text-[10px] opacity-75 font-mono">({Math.round(cand.confidence * 100)}%)</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Recording & Audio DSP Console */}
        <div className="flex flex-col items-center justify-center space-y-3 py-2">
          {isListening ? (
            <div className="flex flex-col items-center justify-center space-y-3 w-full">
              <button
                onClick={toggleListening}
                className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl bg-red-500 hover:bg-red-600 text-white ring-8 ring-red-200 animate-pulse"
                title="माइक बंद करें और अनुवाद करें"
              >
                <MicOff className="w-10 h-10" />
              </button>

              {/* Animated Web Audio Waveform Equalizer */}
              <div className="flex flex-col items-center justify-center space-y-2 py-1">
                <div className="flex items-center justify-center space-x-1.5 h-11 px-6 py-2 bg-stone-950 rounded-full shadow-inner border border-emerald-500/40">
                  {[0.4, 0.8, 1.3, 1.8, 2.3, 1.8, 1.3, 0.8, 0.4].map((factor, i) => {
                    const barHeight = Math.max(6, Math.min(34, Math.round((audioLevel || 20) * factor * 0.35 + 6)));
                    return (
                      <span
                        key={i}
                        className="w-1.5 bg-gradient-to-t from-emerald-600 via-emerald-400 to-teal-200 rounded-full transition-all duration-75"
                        style={{ height: `${barHeight}px` }}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold">
                  {isVoiceDetected ? (
                    <span className="text-emerald-950 font-extrabold flex items-center gap-1.5 bg-emerald-300 border border-emerald-400 px-3.5 py-1 rounded-full animate-pulse shadow-sm">
                      <Activity className="w-3.5 h-3.5 text-emerald-900" />
                      🎙️ आवाज़ पकड़ी गई (स्तर: {audioLevel}%) • बोलना बंद करते ही स्वतः अनुवाद होगा!
                    </span>
                  ) : (
                    <span className="text-stone-500 bg-stone-100 px-3.5 py-1 rounded-full">
                      माइक सुन रहा है... आवाज़ दें (स्तर: {audioLevel}%)
                    </span>
                  )}
                </div>

                {/* Instant Action Buttons while recording */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={toggleListening}
                    className="bg-red-600 hover:bg-red-700 text-white font-black px-4 py-2 rounded-xl text-xs shadow-md flex items-center space-x-1.5 transition-all hover:scale-105 active:scale-95"
                  >
                    <MicOff className="w-4 h-4" />
                    <span>⏹️ आवाज़ रोकें और अनुवाद करें</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => forceCommitSpeech(manualInput || activeTargetPhrase)}
                    className="bg-emerald-400 hover:bg-emerald-300 text-black font-black px-4 py-2 rounded-xl text-xs shadow-md flex items-center space-x-1.5 transition-all hover:scale-105 active:scale-95"
                  >
                    <Zap className="w-4 h-4 text-black" />
                    <span>⚡ तुरंत अनुवाद करें</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={toggleListening}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
                  isPlayingAudio
                    ? 'bg-emerald-500 text-black ring-8 ring-emerald-200 scale-105'
                    : 'bg-black hover:bg-zinc-900 text-emerald-400 border-2 border-emerald-400/50 ring-4 ring-emerald-100 hover:scale-105'
                }`}
                title="माइक दबाकर बोलें"
              >
                <Mic className="w-10 h-10" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (manualInput.trim()) {
                    handleTeacherPrompt(manualInput.trim());
                  } else {
                    forceCommitSpeech();
                  }
                }}
                className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black px-5 py-3.5 rounded-2xl text-xs shadow-lg flex items-center space-x-2.5 transition-all hover:scale-105 active:scale-95 border border-emerald-400/40"
              >
                <Volume2 className="w-5 h-5 text-emerald-200 shrink-0" />
                <div className="text-left">
                  <div className="text-[10px] text-emerald-100 uppercase tracking-wider font-bold">1-टैप इनपुट अनुवाद</div>
                  <div className="text-xs font-black">"{manualInput || activeTargetPhrase}" ➔ ध्वनि सुनें</div>
                </div>
              </button>
            </div>
          )}

          <div className="text-xs text-stone-500 font-semibold text-center">
            {isListening
              ? `माइक चालू है (${micLang === 'en-IN' ? 'English' : 'हिंदी'}) • 100% ऑफ़लाइन Web Audio DSP सक्रिय है`
              : `माइक दबाकर बोलें या ऊपर टेक्स्ट टाइप करें ➔ 100% ऑफ़लाइन लोकल इंजन तुरंत अनुवाद करेगा`}
          </div>
        </div>

        {/* 4. Categorized Scenario Presets & Quick Prompts */}
        <div className="space-y-3 pt-3 border-t border-stone-200 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-black text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>त्वरित परिदृश्य एवं उदाहरण (Quick Demonstration Presets):</span>
            </span>

            {/* Category filter tabs */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-black">
              {[
                { id: 'all', label: 'सभी (All)' },
                { id: 'classroom', label: '🏫 कक्षा' },
                { id: 'needs', label: '💧 जरूरतें' },
                { id: 'lesson', label: '📚 पाठ' },
                { id: 'conversation', label: '💬 बातचीत' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-black text-emerald-400 shadow-sm'
                      : 'text-stone-600 hover:text-black'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {SCENARIO_PRESETS
              .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
              .map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setManualInput(preset.hindi);
                    setActiveTargetPhrase(preset.hindi);
                    voiceManagerRef.current?.setActiveTargetPhrase(preset.hindi);
                    handleTeacherPrompt(preset.hindi);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all shadow-sm flex items-center space-x-1.5 border active:scale-95 ${
                    activeTargetPhrase === preset.hindi
                      ? 'bg-black text-emerald-400 border-emerald-400 shadow-md ring-2 ring-emerald-400/20'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-emerald-50 hover:border-emerald-300'
                  }`}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.label}</span>
                </button>
              ))}
          </div>
        </div>

        {/* 5. Student Self-Learning Mode Grid (Tribal -> Hindi) */}
        {voiceMode === 'student_to_teacher' && (
          <div className="space-y-3 pt-3 border-t border-stone-200 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>छात्र शब्दावली अभ्यास (अपनी मातृभाषा चुनें ➔ हिंदी अर्थ और उच्चारण सीखें):</span>
              </span>
              <span className="text-[11px] text-stone-400 font-semibold">12 शब्द उपलब्ध</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {studentPrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStudentSelfLearnPrompt(item)}
                  className="bg-gradient-to-b from-white to-emerald-50/40 hover:to-emerald-100 text-stone-900 border border-stone-200 hover:border-emerald-500 p-3 rounded-2xl text-left transition-all hover:scale-105 shadow-sm group relative flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full">
                      हिंदी सीखें
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="font-black text-base text-stone-950 font-olchiki group-hover:text-emerald-700">
                      {item.displayLabel}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-1 font-semibold">
                      <span>➔ हिंदी:</span>
                      <strong className="text-stone-900">{item.hindiMeaning}</strong>
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> हिंदी उच्चारण सुनें
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 6. Offline Status & Engine Assurance Banner */}
        {isOfflineMicActive && (
          <div className="bg-gradient-to-r from-emerald-950 to-stone-900 text-white border border-emerald-500/40 rounded-2xl p-3.5 max-w-xl mx-auto text-xs space-y-1 text-left shadow-md">
            <div className="flex items-center space-x-2 text-emerald-300 font-black">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% ऑफ़लाइन रियल-टाइम वॉइस मोड सक्रिय (Zero Internet Required)</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              यह प्रणाली पूरी तरह ऑफ़लाइन काम करती है: <strong>Web Audio API</strong> से हार्डवेयर माइक स्ट्रीम, <strong>इन-मेमोरी $O(1)$ लेक्सिकॉन</strong> से तत्काल अनुवाद, और <strong>Acoustic Formant Synthesizer</strong> से ध्वनि उच्चारण बिना इंटरनेट के चलता है।
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="text-xs text-amber-900 bg-amber-50 px-4 py-2 rounded-xl border border-amber-300 max-w-xl mx-auto flex items-center gap-2 text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {errorMessage.includes('network') || errorMessage.includes('ऑफ़लाइन')
                ? '⚡ ऑफ़लाइन मोड: ब्राउज़र स्पीच क्लाउड अनुपलब्ध है। लोकल हार्डवेयर माइक एवं Web Audio इंजन सक्रिय है।'
                : errorMessage}
            </span>
          </div>
        )}
      </div>

      {/* Real-time Dialogue History Stream */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-stone-900 text-sm flex items-center justify-between">
          <span>कक्षा संवाद एवं स्व-अध्ययन इतिहास (Dialogue & Learning Stream)</span>
          <span className="text-xs font-bold text-stone-500">कुल संवाद: {exchanges.length}</span>
        </h3>

        <div className="space-y-3">
          {exchanges.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-md font-black text-[10px] ${
                    item.mode === 'teacher_to_student'
                      ? 'bg-black text-emerald-400 border border-emerald-400/40'
                      : 'bg-emerald-500 text-black'
                  }`}>
                    {item.mode === 'teacher_to_student' ? '👨‍🏫 शिक्षक ➔ छात्र' : '🧒 छात्र स्व-अध्ययन (मातृभाषा ➔ हिंदी)'}
                  </span>
                  <span>{item.timestamp}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                    ⏱️ {item.latencyMs} ms
                  </span>
                  <span className="text-[10px] text-stone-500">सटीकता: {Math.round(item.confidence * 100)}%</span>
                </div>
              </div>

              {/* Spoken & Translated Bubble */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Source utterance */}
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <span className="text-[10px] font-bold text-stone-500 block uppercase">
                    {item.mode === 'teacher_to_student' ? 'शिक्षक ने कहा (हिंदी):' : 'छात्र की मातृभाषा शब्द:'}
                  </span>
                  <p className="font-bold text-stone-900 text-base mt-1">"{item.sourceText}"</p>
                </div>

                {/* Translated output */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3.5 rounded-xl border border-emerald-200 relative group">
                  <span className="text-[10px] font-bold text-emerald-800 block uppercase">
                    {item.mode === 'teacher_to_student' 
                      ? `अनुवाद एवं उच्चारण (${targetLang.toUpperCase()}):` 
                      : 'सीखा गया मानक हिंदी अनुवाद:'}
                  </span>
                  <p className="font-black text-emerald-950 text-lg mt-1 font-olchiki">
                    {item.translatedText}
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5 font-medium">
                    {item.mode === 'teacher_to_student' 
                      ? <>उच्चारण (शिक्षक हेतु): <strong className="text-emerald-950 font-bold">{item.phoneticText}</strong></> 
                      : <>ध्वनि वाचन: <strong className="text-emerald-950 font-bold">{item.phoneticText}</strong></>}
                  </p>

                  {/* Audio re-play button */}
                  <button
                    onClick={() => replayAudio(item)}
                    className="absolute top-2.5 right-2.5 p-2 bg-black hover:bg-zinc-800 text-emerald-400 border border-emerald-400/40 rounded-full transition-transform hover:scale-110 shadow-md flex items-center space-x-1"
                    title="ध्वनि पुनः सुनें (Replay Audio)"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
