import React, { useState, useEffect, useRef } from 'react';
import { TribalLanguage } from '../nlp/types';
import { VoiceManager, V2VExchange, VoiceMode } from '../audio/voiceManager';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { PalashNLPTranslator } from '../nlp/translator';
import { useTheme } from '../theme/ThemeContext';
import { 
  Mic, MicOff, Volume2, Clock, Sparkles, User, GraduationCap, 
  BookOpen, CheckCircle2, ArrowRightLeft, Star, VolumeX 
} from 'lucide-react';

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

export const VoiceTranslator: React.FC<VoiceTranslatorProps> = ({ targetLang }) => {
  const { themeConfig } = useTheme();
  const [voiceMode, setVoiceMode] = useState<VoiceMode>('teacher_to_student');
  const [isListening, setIsListening] = useState(false);
  const [lastLatencyMs, setLastLatencyMs] = useState<number | null>(320);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activePraise, setActivePraise] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [exchanges, setExchanges] = useState<V2VExchange[]>([
    {
      id: 'init_1',
      mode: 'teacher_to_student',
      sourceText: 'नमस्ते बच्चों! सब अपनी जगह बैठ जाओ।',
      translatedText: targetLang === 'santhali' ? 'ᱡᱳᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱡᱚᱛᱚ ᱦᱚᱲ ᱫᱩᱲᱩᱵᱽ ᱯᱮ।' : (targetLang === 'ho' ? 'जोहार होनको! सबिन दुबेन।' : 'जोहार होनको! सबिन आपना ठांव रे दुबपे।'),
      phoneticText: 'जोहार गिदरा को! जोतो होड़ दुड़ुब पे।',
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
    vm.setCallbacks(
      (result) => {
        setExchanges((prev) => [result, ...prev]);
        setLastLatencyMs(result.latencyMs);
      },
      (status) => {
        setIsListening(status.listening);
        if (status.latencyMs) setLastLatencyMs(status.latencyMs);
        if (status.error) setErrorMessage(status.error);
      }
    );
    voiceManagerRef.current = vm;
  }, [targetLang, voiceMode]);

  const toggleListening = () => {
    setErrorMessage(null);
    if (isListening) {
      voiceManagerRef.current?.stopListening();
    } else {
      voiceManagerRef.current?.startListening();
    }
  };

  // Teacher mode prompt (Hindi -> Tribal)
  const handleTeacherPrompt = async (hindiText: string) => {
    setErrorMessage(null);
    setIsPlayingAudio(true);
    const start = performance.now();
    await voiceManagerRef.current?.processSpokenText(hindiText, start);
    setIsPlayingAudio(false);
  };

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
    setManualInput('');
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

  const teacherQuickPrompts = [
    'नमस्ते बच्चों',
    'बैठ जाओ',
    'खड़े हो जाओ',
    'अपनी किताब खोलो',
    'ताली बजाओ',
    'यह क्या है?',
    'पानी पियो',
    'बहुत अच्छा!'
  ];

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
            <p className="text-xs text-stone-500">
              लेटेंसी: <strong className="text-emerald-700 font-mono text-sm">{lastLatencyMs ? `${lastLatencyMs} ms` : 'तैयार'}</strong> • 100% ऑफ़लाइन Web Audio DSP
            </p>
          </div>
        </div>

        {/* Mode Toggle Buttons: Teacher Mode vs Student Self-Learning Mode */}
        <div className="flex items-center bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shadow-inner text-xs font-bold w-full md:w-auto">
          <button
            onClick={() => setVoiceMode('teacher_to_student')}
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
            onClick={() => setVoiceMode('student_to_teacher')}
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

        {/* Microphone Big Push Button */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <button
            onClick={toggleListening}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white ring-8 ring-red-200 animate-pulse'
                : isPlayingAudio
                ? 'bg-emerald-500 text-black ring-8 ring-emerald-200 scale-105'
                : 'bg-black hover:bg-zinc-900 text-emerald-400 border-2 border-emerald-400/50 ring-4 ring-emerald-100 hover:scale-105'
            }`}
            title="माइक दबाकर बोलें"
          >
            {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
          </button>
          <div className="flex items-center space-x-2 text-xs font-bold text-stone-600">
            <span>{isListening ? 'माइक चालू है • रुकने के लिए पुनः दबाएँ' : 'माइक दबाकर बोलें'}</span>
          </div>
          {errorMessage && (
            <p className="text-xs text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
              {errorMessage} (आप नीचे दिए गए त्वरित बटनों से तुरंत ध्वनि सुन सकते हैं)
            </p>
          )}
        </div>

        {/* MODE A: Teacher Quick Instruction Chips */}
        {voiceMode === 'teacher_to_student' && (
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <span className="text-xs font-black text-stone-500 uppercase tracking-wider block">
              कक्षा त्वरित निर्देश (One-Tap Prompts with Audio):
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {teacherQuickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTeacherPrompt(prompt)}
                  className="bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 px-3.5 py-2 rounded-xl text-xs font-black transition-all hover:scale-105 shadow-sm active:scale-95 flex items-center space-x-1.5"
                >
                  <span>{prompt}</span>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MODE B: Student Self-Learning Chips (Tribal -> Hindi) */}
        {voiceMode === 'student_to_teacher' && (
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">
                🌟 छात्र शब्दावली अभ्यास (अपनी मातृभाषा चुनें ➔ हिंदी अर्थ और उच्चारण सीखें):
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

        {/* Text Input Fallback */}
        <form onSubmit={handleManualSubmit} className="flex items-center gap-2 max-w-lg mx-auto pt-2">
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder={voiceMode === 'teacher_to_student' ? 'या यहाँ हिंदी वाक्य लिखें (उदा. बैठ जाओ)...' : 'या यहाँ मातृभाषा शब्द लिखें (उदा. ᱫᱟᱜ / पानी)...'}
            className="flex-1 px-4 py-2.5 text-xs md:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
          />
          <button
            type="submit"
            className="bg-black hover:bg-zinc-800 text-emerald-400 border border-emerald-400/40 px-5 py-2.5 rounded-xl text-xs font-black shadow-md flex items-center space-x-1.5 transition-all"
          >
            <Volume2 className="w-4 h-4" />
            <span>अनुवाद करें</span>
          </button>
        </form>
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
