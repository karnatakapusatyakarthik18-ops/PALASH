import React, { useState, useEffect } from 'react';
import { TribalLanguage } from '../nlp/types';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { Volume2, Trophy, Flame, RotateCcw, CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';

interface PhonicsGameProps {
  targetLang: TribalLanguage;
}

interface QuestionItem {
  id: string;
  hindi: string;
  tribalWord: string;
  phonetic: string;
  english: string;
  icon: string;
}

export const PhonicsGame: React.FC<PhonicsGameProps> = ({ targetLang }) => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [options, setOptions] = useState<QuestionItem[]>([]);

  // Question pool tailored per tribal language
  const questionBank: Record<TribalLanguage, QuestionItem[]> = {
    santhali: [
      { id: '1', hindi: 'मछली', tribalWord: 'ᱦᱟᱹᱠᱩ', phonetic: 'हाकू', english: 'Haku', icon: '🐟' },
      { id: '2', hindi: 'कुत्ता', tribalWord: 'ᱥᱮᱛᱟ', phonetic: 'सेता', english: 'Seta', icon: '🐕' },
      { id: '3', hindi: 'पेड़', tribalWord: 'ᱫᱟᱨᱮ', phonetic: 'दारे', english: 'Dare', icon: '🌳' },
      { id: '4', hindi: 'पानी', tribalWord: 'ᱫᱟᱜ', phonetic: 'दाग', english: 'Daq', icon: '💧' },
      { id: '5', hindi: 'फूल', tribalWord: 'ᱵᱟᱦᱟ', phonetic: 'बाहा', english: 'Baha', icon: '🌸' },
      { id: '6', hindi: 'चिड़िया', tribalWord: 'ᱪᱮᱬᱮ', phonetic: 'चेड़े', english: 'Chene', icon: '🐦' },
      { id: '7', hindi: 'गाय', tribalWord: 'ᱜᱟᱹᱭ', phonetic: 'गई', english: 'Gai', icon: '🐄' },
      { id: '8', hindi: 'किताब', tribalWord: 'ᱯᱳᱛᱷᱤ', phonetic: 'पोथी', english: 'Pothi', icon: '📖' }
    ],
    ho: [
      { id: '1', hindi: 'पेड़', tribalWord: 'दारू', phonetic: 'दारू', english: 'Daru', icon: '🌳' },
      { id: '2', hindi: 'पानी', tribalWord: 'दाः', phonetic: 'दाः', english: 'Da\'', icon: '💧' },
      { id: '3', hindi: 'कुत्ता', tribalWord: 'सेता', phonetic: 'सेता', english: 'Seta', icon: '🐕' },
      { id: '4', hindi: 'फूल', tribalWord: 'बाहा', phonetic: 'बाहा', english: 'Baha', icon: '🌸' },
      { id: '5', hindi: 'चिड़िया', tribalWord: 'चेणे', phonetic: 'चेणे', english: 'Chene', icon: '🐦' },
      { id: '6', hindi: 'किताब', tribalWord: 'पोथी', phonetic: 'पोथी', english: 'Pothi', icon: '📖' }
    ],
    mundari: [
      { id: '1', hindi: 'पानी', tribalWord: 'दाः', phonetic: 'दाः', english: 'Da\'', icon: '💧' },
      { id: '2', hindi: 'पेड़', tribalWord: 'दारू', phonetic: 'दारू', english: 'Daru', icon: '🌳' },
      { id: '3', hindi: 'मछली', tribalWord: 'हाकू', phonetic: 'हाकू', english: 'Haku', icon: '🐟' },
      { id: '4', hindi: 'कुत्ता', tribalWord: 'सेता', phonetic: 'सेता', english: 'Seta', icon: '🐕' },
      { id: '5', hindi: 'चिड़िया', tribalWord: 'चेणे', phonetic: 'चेणे', english: 'Chene', icon: '🐦' },
      { id: '6', hindi: 'फूल', tribalWord: 'बाहा', phonetic: 'बाहा', english: 'Baha', icon: '🌸' }
    ]
  };

  const currentPool = questionBank[targetLang] || questionBank.santhali;
  const currentTarget = currentPool[currentQuestionIndex % currentPool.length];

  // Generate 3 multiple choice options (including the correct one)
  const setupRound = (target: QuestionItem) => {
    const distractors = currentPool.filter(item => item.id !== target.id);
    const shuffledDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 2);
    const roundOptions = [target, ...shuffledDistractors].sort(() => 0.5 - Math.random());
    setOptions(roundOptions);
    setSelectedOption(null);
    setIsAnswered(false);
    setFeedback(null);
    // Auto-play the target tribal word audio
    setTimeout(() => {
      PalashPhoneticTTS.speakOffline(target.tribalWord, target.phonetic, target.english, targetLang);
    }, 300);
  };

  useEffect(() => {
    setupRound(currentTarget);
  }, [currentQuestionIndex, targetLang]);

  const handleOptionClick = async (option: QuestionItem) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(option.id);

    if (option.id === currentTarget.id) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      setFeedback({
        isCorrect: true,
        message: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! (शाबाश! सही उत्तर!)'
      });
      // Speak encouraging praise in tribal language
      await PalashPhoneticTTS.speakOffline('ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ!', 'आडी नापाय! सही उत्तर!', 'Ari napay!', targetLang);
    } else {
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: `सही उत्तर है: "${currentTarget.hindi} - ${currentTarget.phonetic}"`
      });
      // Speak the correct word again
      await PalashPhoneticTTS.speakOffline(
        currentTarget.tribalWord,
        currentTarget.phonetic,
        currentTarget.english,
        targetLang
      );
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const playTargetSound = () => {
    PalashPhoneticTTS.speakOffline(
      currentTarget.tribalWord,
      currentTarget.phonetic,
      currentTarget.english,
      targetLang
    );
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setCurrentQuestionIndex(0);
    setupRound(currentPool[0]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title & Scoreboard Bar */}
      <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center space-x-2">
              <span className="text-2xl">🎧</span>
              <span>सुनो और पहचानो (Tribal Audio Phonics Game)</span>
            </h2>
            <p className="text-xs text-slate-500">
              ध्वनि सुनकर सही चित्र चुनें: बालवाटिका एवं कक्षा 1 के बच्चों हेतु मातृभाषा श्रवण बोध (NIPUN FLN-L1)।
            </p>
          </div>

          {/* Game Stats Pills */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-amber-100 text-amber-950 px-3.5 py-1.5 rounded-xl font-black text-xs shadow-sm">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>अंक: {score}</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-rose-100 text-rose-950 px-3 py-1.5 rounded-xl font-black text-xs shadow-sm">
              <Flame className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>लगातार: {streak} 🔥</span>
            </div>
            <button
              onClick={resetGame}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
              title="पुनः प्रारंभ करें"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Question Listening Card */}
      <div className="bg-gradient-to-br from-orange-500 via-rose-500 to-purple-700 rounded-3xl p-8 text-white shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Glow decorative blur */}
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="space-y-2 relative z-10">
          <span className="bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-200">
            प्रश्न {currentQuestionIndex + 1}
          </span>
          <h3 className="text-xl md:text-2xl font-black">
            "ध्वनि ध्यान से सुनो और सही चित्र पर टैप करो!"
          </h3>
        </div>

        {/* Big Audio Play Button */}
        <div className="flex flex-col items-center justify-center space-y-3 relative z-10">
          <button
            onClick={playTargetSound}
            className="w-24 h-24 rounded-full bg-white text-orange-600 hover:bg-amber-100 shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ring-8 ring-white/30 animate-pulse"
            title="पुनः आवाज़ सुनें"
          >
            <Volume2 className="w-12 h-12 text-orange-600" />
          </button>
          <span className="text-xs font-black text-orange-100">
            (आवाज़ दोबारा सुनने के लिए स्पीकर बटन दबाएँ)
          </span>
        </div>

        {/* Hint toggle for teachers */}
        <div className="pt-2 text-xs text-white/80">
          <span>संकेत उच्चारण: </span>
          <strong className="underline text-amber-200 font-bold">{currentTarget.phonetic}</strong>
          <span className="ml-2 font-olchiki">({currentTarget.tribalWord})</span>
        </div>
      </div>

      {/* 3 Interactive Picture Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          const isCorrect = opt.id === currentTarget.id;

          let cardStyle = 'bg-white border-slate-200 hover:border-orange-400 hover:shadow-xl';
          if (isAnswered) {
            if (isCorrect) {
              cardStyle = 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300 scale-105';
            } else if (isSelected) {
              cardStyle = 'bg-red-50 border-red-500 ring-4 ring-red-300 opacity-70';
            } else {
              cardStyle = 'bg-slate-50 border-slate-200 opacity-50';
            }
          }

          return (
            <div
              key={opt.id}
              onClick={() => handleOptionClick(opt)}
              className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[220px] shadow-sm ${cardStyle}`}
            >
              {/* Picture icon */}
              <span className="text-6xl filter drop-shadow-md my-auto transform group-hover:scale-110 transition-transform">
                {opt.icon}
              </span>

              {/* Hindi & Tribal Name */}
              <div className="space-y-1 w-full pt-4 border-t border-slate-100">
                <h4 className="text-lg font-black text-slate-800">{opt.hindi}</h4>
                {isAnswered && (
                  <p className="text-xs font-bold text-orange-950 font-olchiki">
                    {opt.tribalWord} ({opt.phonetic})
                  </p>
                )}
              </div>

              {/* Result checkmark icon */}
              {isAnswered && isCorrect && (
                <div className="mt-2 text-xs font-black text-emerald-700 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>सही!</span>
                </div>
              )}
              {isAnswered && isSelected && !isCorrect && (
                <div className="mt-2 text-xs font-black text-red-700 flex items-center space-x-1">
                  <XCircle className="w-4 h-4" />
                  <span>गलत</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback & Next Button */}
      {isAnswered && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-lg flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center space-x-3">
            {feedback?.isCorrect ? (
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
            )}
            <div>
              <p className={`font-black text-sm md:text-base ${feedback?.isCorrect ? 'text-emerald-800' : 'text-slate-800'}`}>
                {feedback?.message}
              </p>
              <p className="text-xs text-slate-500">
                अगले प्रश्न के लिए 'अगला प्रश्न' दबाएँ।
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition-all hover:scale-105 active:scale-95"
          >
            अगला प्रश्न ➔
          </button>
        </div>
      )}
    </div>
  );
};
