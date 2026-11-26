import React, { useState, useEffect, useRef } from 'react';
import { TribalLanguage, TranslationResult } from '../nlp/types';
import { VoiceManager, V2VExchange } from '../audio/voiceManager';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { PalashNLPTranslator } from '../nlp/translator';
import { useTheme } from '../theme/ThemeContext';
import { PalashLogo } from './PalashLogo';
import { 
  Mic, MicOff, Volume2, Copy, Check, Sparkles, Zap, 
  RotateCcw, Globe, VolumeX, ShieldCheck, CheckCircle2, ChevronRight
} from 'lucide-react';
import { transliterateDevanagariToLatin } from '../audio/transliterate';

interface VoiceTranslatorProps {
  targetLang: TribalLanguage;
}

const QUICK_CLASSROOM_PRESETS = [
  { text: 'अपनी किताब खोलो', label: 'अपनी किताब खोलो', icon: '📖' },
  { text: 'सब बैठ जाओ', label: 'बैठ जाओ', icon: '🪑' },
  { text: 'खड़े हो जाओ', label: 'खड़े हो जाओ', icon: '🧍' },
  { text: 'ताली बजाओ', label: 'ताली बजाओ', icon: '👏' },
  { text: 'मुझे पानी चाहिए', label: 'पानी चाहिए', icon: '💧' },
  { text: 'खाना खाओ', label: 'खाना खाओ', icon: '🍲' },
  { text: 'बच्चे मैदान में खेल रहे हैं', label: 'मैदान में खेलें', icon: '⚽' },
  { text: 'नमस्ते बच्चों! जोहार', label: 'नमस्ते बच्चों', icon: '🙏' },
  { text: 'आज स्कूल में छुट्टी है', label: 'स्कूल छुट्टी', icon: '🏫' },
  { text: 'सूरज पूर्व में उगता है', label: 'सूरज पूर्व में', icon: '☀️' },
];

export const VoiceTranslator: React.FC<VoiceTranslatorProps> = ({ targetLang }) => {
  const { themeConfig } = useTheme();

  // Selected Target Language (Internal state synced with prop)
  const [activeLang, setActiveLang] = useState<TribalLanguage>(targetLang);
  useEffect(() => {
    setActiveLang(targetLang);
  }, [targetLang]);

  // Mic Language: Hindi (default) or English
  const [micLang, setMicLang] = useState<'hi-IN' | 'en-IN'>('hi-IN');

  // Mic Listening & Audio State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [isVoiceDetected, setIsVoiceDetected] = useState<boolean>(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [lastLatencyMs, setLastLatencyMs] = useState<number>(18);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. INPUT TEXT (What was spoken / typed)
  const [inputText, setInputText] = useState<string>('नमस्ते बच्चों! सब अपनी जगह बैठ जाओ।');
  
  // 2. TRANSLATED OUTPUT (Resulting translation & phonetics)
  const [translation, setTranslation] = useState<TranslationResult>(() => {
    return PalashNLPTranslator.translate('नमस्ते बच्चों! सब अपनी जगह बैठ जाओ।', targetLang);
  });

  // Recent Exchanges History
  const [exchanges, setExchanges] = useState<V2VExchange[]>([]);

  // VoiceManager Reference
  const voiceManagerRef = useRef<VoiceManager | null>(null);

  // Initialize and bind VoiceManager
  useEffect(() => {
    const vm = new VoiceManager();
    vm.setLanguage(activeLang);
    vm.setMode('teacher_to_student');
    vm.setMicLanguage(micLang);
    vm.setActiveTargetPhrase(inputText);

    vm.setCallbacks(
      (result) => {
        setExchanges((prev) => [result, ...prev.slice(0, 9)]);
        setLastLatencyMs(result.latencyMs);
      },
      (status) => {
        setIsListening(status.listening);
        if (status.latencyMs) setLastLatencyMs(status.latencyMs);
        if (status.audioLevel !== undefined) setAudioLevel(status.audioLevel);
        if (status.isVoiceDetected !== undefined) setIsVoiceDetected(status.isVoiceDetected);
        if (status.error) setErrorMessage(status.error);

        // When speech is recognized from the mic
        if (status.detectedSpeechText) {
          const phrase = status.detectedSpeechText.trim();
          if (phrase) {
            handleExecuteTranslation(phrase, true);
          }
        }
      }
    );

    voiceManagerRef.current = vm;

    return () => {
      vm.stopListening();
    };
  }, [activeLang, micLang]);

  // Core Translation & Voice Output Function
  const handleExecuteTranslation = (textToTranslate: string, autoSpeak: boolean = true) => {
    const clean = textToTranslate.trim();
    if (!clean) return;

    setErrorMessage(null);
    setInputText(clean);
    voiceManagerRef.current?.setActiveTargetPhrase(clean);

    const start = performance.now();
    // 1. Instant O(1) Offline Translation
    const res = PalashNLPTranslator.translate(clean, activeLang);
    const latency = Math.round(performance.now() - start);
    setLastLatencyMs(Math.max(12, latency));
    setTranslation(res);

    // 2. Guaranteed Voice Output (Reads resulting output aloud with voice)
    if (autoSpeak) {
      setIsPlayingVoice(true);
      PalashPhoneticTTS.speakOffline(
        res.targetText,
        res.devanagariPhonetic,
        res.englishPhonetic,
        activeLang
      );
      setTimeout(() => setIsPlayingVoice(false), 1200);
    }

    // Record into exchange history
    const exchange: V2VExchange = {
      id: 'v2v_' + Date.now(),
      mode: 'teacher_to_student',
      sourceText: clean,
      translatedText: res.targetText,
      phoneticText: res.devanagariPhonetic,
      englishPhonetic: res.englishPhonetic,
      latencyMs: Math.max(15, latency),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confidence: res.confidence || 0.98
    };
    setExchanges((prev) => [exchange, ...prev.slice(0, 9)]);
  };

  // Re-run translation when target language changes
  useEffect(() => {
    if (inputText) {
      const res = PalashNLPTranslator.translate(inputText, activeLang);
      setTranslation(res);
      // Automatically speak output in the newly selected tribal language
      PalashPhoneticTTS.speakOffline(
        res.targetText,
        res.devanagariPhonetic,
        res.englishPhonetic,
        activeLang
      );
    }
  }, [activeLang]);

  // Toggle Single Mic
  const handleToggleSingleMic = () => {
    setErrorMessage(null);
    if (isListening) {
      // User tapped to stop mic -> immediately commit & translate
      voiceManagerRef.current?.stopListening();
    } else {
      // User tapped to start mic
      voiceManagerRef.current?.startListening(micLang);
    }
  };

  // Play Result Voice
  const handlePlayResultVoice = () => {
    if (!translation) return;
    setIsPlayingVoice(true);
    PalashPhoneticTTS.speakOffline(
      translation.targetText,
      translation.devanagariPhonetic,
      translation.englishPhonetic,
      activeLang
    );
    setTimeout(() => setIsPlayingVoice(false), 1200);
  };

  // Play Input Voice (Hindi/English)
  const handlePlayInputVoice = () => {
    if (!inputText) return;
    PalashPhoneticTTS.speakOffline(inputText, inputText, inputText, 'santhali');
  };

  // Copy result
  const handleCopy = () => {
    if (!translation) return;
    const textToCopy = `${translation.sourceText} -> ${translation.targetText} (${translation.devanagariPhonetic})`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Target Language Meta Info
  const langMeta: Record<TribalLanguage, { name: string; script: string; code: string; color: string }> = {
    santhali: { name: 'संथाली (Santhali)', script: 'ᱚᱞ ᱪᱤᱠᱤ • Ol Chiki', code: 'SAT', color: 'from-amber-600 to-orange-700' },
    ho: { name: 'हो (Ho)', script: '𑢹𑣉𑣉 • Warang Chiti', code: 'HO', color: 'from-emerald-600 to-teal-700' },
    mundari: { name: 'मुंडारी (Mundari)', script: 'देवनागरी • Mundari', code: 'UNR', color: 'from-blue-600 to-indigo-700' }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* ─────────────────────────────────────────────────────────────
          HEADER CARD WITH APP ICON & TARGET LANGUAGE PICKER
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* App Icon + Title */}
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-50 to-orange-100 p-1 shadow-md border border-amber-200 flex items-center justify-center shrink-0">
            <PalashLogo className="w-full h-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-stone-900 text-base sm:text-lg tracking-tight">
                पलाश वाणी • ध्वनि अनुवाद
              </h2>
              <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-full shadow-xs">
                ⚡ 100% ऑफ़लाइन
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium">
              माइक से बोलें ➔ तत्काल अनुवाद ➔ स्वतः ध्वनि वाचन
            </p>
          </div>
        </div>

        {/* Target Language Dropdown Selector */}
        <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shadow-inner w-full sm:w-auto">
          <span className="text-xs font-bold text-stone-600 pl-2">अनुवाद भाषा:</span>
          {(['santhali', 'ho', 'mundari'] as TribalLanguage[]).map((langKey) => (
            <button
              key={langKey}
              onClick={() => setActiveLang(langKey)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeLang === langKey
                  ? 'bg-black text-emerald-400 shadow-md scale-102 ring-1 ring-emerald-400/50'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200'
              }`}
            >
              {langKey === 'santhali' ? 'संथाली (Ol Chiki)' : (langKey === 'ho' ? 'हो (Warang Chiti)' : 'मुंडारी')}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: THE ONLY INPUT MIC (Clean, Prominent, Central)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-white to-stone-50 rounded-3xl border-2 border-stone-200 shadow-lg p-6 sm:p-8 text-center space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-bold text-stone-500 tracking-wider uppercase">
            चरण 1 • आवाज़ इनपुट
          </span>
          <h3 className="text-lg sm:text-xl font-black text-stone-900">
            {isListening ? 'माइक सुन रहा है... बोलिए!' : 'माइक दबाकर बोलें'}
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            {isListening
              ? 'आप जो बोलेंगे, ऐप उसे तुरंत सुनकर नीचे अनुवाद करेगा और बोलकर सुनाएगा।'
              : 'एक बार क्लिक करें और बोलें। बोलना बंद करते ही स्वतः अनुवाद और वाचन होगा।'}
          </p>
        </div>

        {/* Language Switcher for Mic (Hindi vs English) */}
        <div className="inline-flex items-center bg-stone-200/80 p-1 rounded-2xl border border-stone-300 shadow-inner text-xs font-bold">
          <button
            onClick={() => {
              setMicLang('hi-IN');
              voiceManagerRef.current?.setMicLanguage('hi-IN');
            }}
            className={`px-4 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 ${
              micLang === 'hi-IN'
                ? 'bg-black text-emerald-400 shadow-md font-black ring-1 ring-emerald-400/40'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🇮🇳</span>
            <span>हिंदी में बोलें (hi-IN)</span>
          </button>
          <button
            onClick={() => {
              setMicLang('en-IN');
              voiceManagerRef.current?.setMicLanguage('en-IN');
            }}
            className={`px-4 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 ${
              micLang === 'en-IN'
                ? 'bg-black text-emerald-400 shadow-md font-black ring-1 ring-emerald-400/40'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🌐</span>
            <span>English (en-IN)</span>
          </button>
        </div>

        {/* ─── THE SINGLE MICROPHONE BUTTON ─── */}
        <div className="flex flex-col items-center justify-center pt-2">
          <button
            type="button"
            onClick={handleToggleSingleMic}
            className={`relative group w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
              isListening
                ? 'bg-rose-600 text-white ring-8 ring-rose-200 shadow-rose-500/40 animate-pulse scale-105'
                : isPlayingVoice
                ? 'bg-emerald-600 text-white ring-8 ring-emerald-200 shadow-emerald-500/40 scale-105'
                : 'bg-stone-950 text-emerald-400 hover:bg-black ring-4 ring-stone-200 shadow-xl hover:scale-105 hover:ring-emerald-400/30'
            }`}
            title={isListening ? 'माइक रोकें और अनुवाद करें' : 'माइक चालू करें और बोलें'}
          >
            {isListening ? (
              <MicOff className="w-12 h-12 text-white animate-bounce" />
            ) : (
              <Mic className="w-12 h-12 text-emerald-400 group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Real-time Web Audio Waveform when Mic is active */}
          {isListening && (
            <div className="mt-4 flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center space-x-1 h-9 px-5 py-1.5 bg-black rounded-full border border-emerald-400/40 shadow-inner">
                {[0.4, 0.7, 1.2, 1.8, 2.2, 1.8, 1.2, 0.7, 0.4].map((factor, i) => {
                  const barH = Math.max(5, Math.min(28, Math.round((audioLevel || 15) * factor * 0.35 + 5)));
                  return (
                    <span
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-emerald-500 to-teal-300 rounded-full transition-all duration-75"
                      style={{ height: `${barH}px` }}
                    />
                  );
                })}
              </div>
              <span className="text-xs font-bold text-rose-600 animate-pulse">
                🔴 माइक सक्रिय • बोलना पूरा होते ही रोकें या स्वतः अनुवाद होगा
              </span>
            </div>
          )}

          {errorMessage && (
            <div className="mt-3 text-xs text-amber-900 bg-amber-50 border border-amber-300 px-4 py-2 rounded-xl flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: THE INPUT (Spoken / Typed Text)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              चरण 2 • बोला गया इनपुट (Input)
            </span>
            <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
              {micLang === 'hi-IN' ? '🇮🇳 हिंदी' : '🌐 English'}
            </span>
          </div>

          {/* Quick Speak Input Button */}
          <button
            type="button"
            onClick={handlePlayInputVoice}
            className="text-stone-600 hover:text-stone-900 text-xs font-bold flex items-center space-x-1 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg transition-colors"
            title="इनपुट वाक्य सुनें"
          >
            <Volume2 className="w-3.5 h-3.5 text-stone-700" />
            <span>इनपुट सुनें</span>
          </button>
        </div>

        {/* Input Text Box with Instant Translate Action */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleExecuteTranslation(inputText, true);
                }
              }}
              placeholder="यहाँ कोई भी वाक्य लिखें या माइक से बोलें..."
              className="w-full pl-4 pr-10 py-3 text-sm sm:text-base font-bold bg-stone-50 border-2 border-stone-300 focus:border-emerald-600 focus:bg-white rounded-2xl shadow-inner focus:outline-none focus:ring-4 focus:ring-emerald-500/20 text-stone-900 transition-all"
            />
            {inputText && (
              <button
                type="button"
                onClick={() => setInputText('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 text-sm font-bold"
                title="साफ़ करें"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleExecuteTranslation(inputText, true)}
            className="bg-black hover:bg-stone-800 text-emerald-400 border border-emerald-400/40 font-black px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 shrink-0"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>⚡ अनुवाद एवं वाचन</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: THE TRANSLATED OUTPUT (Result + Guaranteed Voice)
      ───────────────────────────────────────────────────────────── */}
      {translation && (
        <div className="bg-gradient-to-br from-stone-950 via-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-emerald-500/40 space-y-4 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Output Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                चरण 3 • अनुवादित परिणाम
              </span>
              <span className="bg-emerald-400 text-black font-black text-xs px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                {langMeta[activeLang].script}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/90 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                ⏱️ {lastLatencyMs} ms
              </span>
              <span className="text-[11px] font-bold text-amber-300 bg-amber-950/70 border border-amber-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span>🔊</span>
                <span>स्वतः वाचन</span>
              </span>
            </div>
          </div>

          {/* Translated Result Utterance (Big typography) */}
          <div className="space-y-2 py-1">
            <div className="text-2xl sm:text-3xl font-black text-emerald-300 tracking-wide font-olchiki leading-relaxed">
              {translation.targetText}
            </div>
          </div>

          {/* Pronunciation Guides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Devanagari Pronunciation for Teachers */}
            <div className="bg-black/50 border border-emerald-500/20 rounded-2xl p-3.5 space-y-1">
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                🗣️ देवनागरी उच्चारण (शिक्षक मार्गदर्शिका):
              </div>
              <div className="text-sm font-bold text-stone-100">
                {translation.devanagariPhonetic || translation.targetText}
              </div>
            </div>

            {/* Roman / English Phonetics */}
            <div className="bg-black/50 border border-emerald-500/20 rounded-2xl p-3.5 space-y-1">
              <div className="text-[10px] font-black text-teal-400 uppercase tracking-wider">
                🔤 English / Roman Phonetics:
              </div>
              <div className="text-sm font-mono font-bold text-stone-200">
                {translation.englishPhonetic || transliterateDevanagariToLatin(translation.devanagariPhonetic || '')}
              </div>
            </div>
          </div>

          {/* Word-by-Word Tokens (if available) */}
          {translation.tokens && translation.tokens.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                🔍 शब्द-दर-शब्द विश्लेषण:
              </div>
              <div className="flex flex-wrap gap-2">
                {translation.tokens.map((tok, i) => (
                  <div
                    key={i}
                    className="bg-stone-900 border border-stone-800 rounded-xl px-2.5 py-1 text-xs font-semibold flex items-center space-x-1.5"
                  >
                    <span className="text-stone-300">{tok.hindi}</span>
                    <span className="text-emerald-400 font-bold">➔</span>
                    <span className="text-emerald-300 font-bold font-olchiki">{tok.target}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons: Replay Voice & Copy */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800">
            <button
              type="button"
              onClick={handlePlayResultVoice}
              className={`font-black px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-xl flex items-center space-x-2 transition-all active:scale-95 ${
                isPlayingVoice
                  ? 'bg-emerald-300 text-black ring-4 ring-emerald-500/50 scale-102'
                  : 'bg-emerald-400 hover:bg-emerald-300 text-black hover:scale-102'
              }`}
            >
              <Volume2 className="w-4 h-4 text-black" />
              <span>{isPlayingVoice ? '🔊 ध्वनि चल रही है...' : '🔊 पुनः ध्वनि सुनें (Replay Voice)'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-1.5 border border-stone-700 active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-stone-400" />}
              <span>{copied ? 'कॉपी हो गया!' : 'अनुवाद कॉपी करें'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: QUICK CLASSROOM PRESETS (Compact 1-Tap Pills)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>त्वरित कक्षा निर्देश (1-क्लिक में अनुवाद व ध्वनि सुनें):</span>
          </span>
          <span className="text-[11px] text-stone-400 font-semibold">10 वाक्य उपलब्ध</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {QUICK_CLASSROOM_PRESETS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleExecuteTranslation(item.text, true)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 border active:scale-95 ${
                inputText === item.text
                  ? 'bg-black text-emerald-400 border-emerald-400 font-black ring-2 ring-emerald-400/30'
                  : 'bg-stone-50 hover:bg-emerald-50 text-stone-800 border-stone-200 hover:border-emerald-300'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: RECENT TRANSLATIONS STREAM (Compact History)
      ───────────────────────────────────────────────────────────── */}
      {exchanges.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-stone-700 uppercase tracking-wider">
              हालिया संवाद इतिहास (Recent History)
            </h4>
            <span className="text-[11px] text-stone-400 font-semibold">
              {exchanges.length} संवाद
            </span>
          </div>

          <div className="space-y-2">
            {exchanges.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-stone-200 rounded-2xl p-3.5 shadow-xs hover:shadow-sm transition-all flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-stone-900 truncate">"{item.sourceText}"</span>
                    <span className="text-stone-400">➔</span>
                    <span className="font-black text-emerald-700 font-olchiki truncate">{item.translatedText}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">
                    उच्चारण: <strong className="text-stone-700">{item.phoneticText}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    PalashPhoneticTTS.speakOffline(
                      item.translatedText,
                      item.phoneticText,
                      item.englishPhonetic,
                      activeLang
                    );
                  }}
                  className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-all shrink-0"
                  title="ध्वनि पुनः सुनें"
                >
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
