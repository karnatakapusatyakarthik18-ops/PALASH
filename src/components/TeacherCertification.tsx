import React, { useState } from 'react';
import { TribalLanguage } from '../nlp/types';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { Award, Flame, CheckCircle, Volume2, Printer, Star, BookOpen, ShieldCheck } from 'lucide-react';

interface TeacherCertificationProps {
  targetLang: TribalLanguage;
}

export const TeacherCertification: React.FC<TeacherCertificationProps> = ({ targetLang }) => {
  const [teacherName, setTeacherName] = useState('रोहित कुमार (शिक्षक)');
  const [schoolName, setSchoolName] = useState('राजकीय प्राथमिक विद्यालय, खूंटी, झारखण्ड');
  const [activeDay, setActiveDay] = useState<number>(1);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showCertificate, setShowCertificate] = useState(false);

  const dailyLessons = [
    {
      day: 1,
      title: 'दिन 1: प्राथमिक अभिवादन व परिचय',
      phrases: [
        { hindi: 'नमस्ते बच्चों!', tribal: targetLang === 'santhali' ? 'ᱡᱳᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ!' : 'जोहार होनको!', phonetic: 'जोहार गिदरा को!' },
        { hindi: 'तुम्हारा नाम क्या है?', tribal: targetLang === 'santhali' ? 'ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱮᱫ?' : 'अमाः नुतुम चिनातन?', phonetic: 'आमाग ञुतुम चेद?' },
        { hindi: 'मेरा नाम रोहित है।', tribal: targetLang === 'santhali' ? 'ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ ᱨᱳᱦᱤᱛ ᱠᱟᱱᱟ।' : 'अइंगाः नुतुम रोहित तान।', phonetic: 'इञाग ञुतुम रोहित काना।' }
      ],
      quiz: [
        {
          q: 'कक्षा में बच्चों को संथाली/हो में अभिवादन करने के लिए क्या कहेंगे?',
          options: ['जोहार (ᱡᱳᱦᱟᱨ)', 'सलाम', 'नमस्ते'],
          correct: 0
        },
        {
          q: '"तुम्हारा नाम क्या है?" के लिए सही जनजातीय वाक्य क्या है?',
          options: ['आमाग ञुतुम चेद?', 'दारे चेतान', 'पोथी राड़ाय'],
          correct: 0
        }
      ]
    },
    {
      day: 2,
      title: 'दिन 2: कक्षा में शारीरिक क्रियाएं (TPR)',
      phrases: [
        { hindi: 'बैठ जाओ', tribal: targetLang === 'santhali' ? 'ᱫᱩᱲᱩᱵᱽ ᱢᱮ' : 'दुबेन', phonetic: 'दुड़ुब मे' },
        { hindi: 'खड़े हो जाओ', tribal: targetLang === 'santhali' ? 'ᱛᱮᱸᱜᱳᱱ ᱢᱮ' : 'तिंगुन', phonetic: 'तेंगोन मे' },
        { hindi: 'ताली बजाओ', tribal: targetLang === 'santhali' ? 'ᱛᱷᱟᱹᱨᱤ ᱫᱟᱞ ᱢᱮ' : 'ताली तेये', phonetic: 'थारी दाल मे' }
      ],
      quiz: [
        {
          q: 'बच्चों को "बैठ जाओ" कहने के लिए किस शब्द का प्रयोग करेंगे?',
          options: ['तेंगोन मे', 'दुड़ुब मे (ᱫᱩᱲᱩᱵᱽ ᱢᱮ)', 'चेणे'],
          correct: 1
        }
      ]
    },
    {
      day: 3,
      title: 'दिन 3: प्रोत्साहन व प्रशंसा',
      phrases: [
        { hindi: 'बहुत अच्छा!', tribal: targetLang === 'santhali' ? 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ!' : 'बुगिनगे!', phonetic: 'आडी नापाय!' },
        { hindi: 'शाबाश!', tribal: targetLang === 'santhali' ? 'ᱵᱮᱥ ᱜᱮ!' : 'बेसगे!', phonetic: 'बेस गे!' }
      ],
      quiz: [
        {
          q: 'बच्चे द्वारा सही उत्तर देने पर प्रशंसा हेतु क्या कहेंगे?',
          options: ['आडी नापाय! (ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ!)', 'दाग ञुय', 'हाकू'],
          correct: 0
        }
      ]
    }
  ];

  const currentLesson = dailyLessons.find(l => l.day === activeDay) || dailyLessons[0];

  const playPhrase = (p: { tribal: string; phonetic: string }) => {
    PalashPhoneticTTS.speakOffline(p.tribal, p.phonetic, p.phonetic, targetLang);
  };

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleEvaluateQuiz = () => {
    let correct = 0;
    currentLesson.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) correct++;
    });
    setQuizScore(correct);
    if (correct === currentLesson.quiz.length) {
      setShowCertificate(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="no-print bg-white rounded-3xl border border-orange-100 p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center space-x-2">
              <Award className="w-6 h-6 text-orange-600" />
              <span>शिक्षक भाषा सेतु एवं माइक्रो-सर्टिफिकेशन (Teacher Training)</span>
            </h2>
            <p className="text-xs text-slate-500">
              गैर-जनजातीय शिक्षकों हेतु 5-मिनट दैनिक मातृभाषा संवाद अभ्यास एवं डिजिटल प्रवीणता प्रमाण पत्र।
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-orange-100 text-orange-950 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-sm">
              <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
              <span>लगातार 3 दिन सक्रिय 🔥</span>
            </div>
          </div>
        </div>

        {/* Day Picker Tabs */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 mt-3">
          {dailyLessons.map((l) => (
            <button
              key={l.day}
              onClick={() => {
                setActiveDay(l.day);
                setSelectedAnswers({});
                setQuizScore(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 ${
                activeDay === l.day
                  ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{l.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Lesson Content */}
      <div className="no-print grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Daily Audio Phrases */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
          <h3 className="text-base font-black text-slate-800 flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-orange-600" />
            <span>आज के आवश्यक संवाद (Tap to Listen):</span>
          </h3>

          <div className="space-y-3">
            {currentLesson.phrases.map((p, i) => (
              <div
                key={i}
                onClick={() => playPhrase(p)}
                className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-200 hover:border-orange-400 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{p.hindi}</span>
                  <p className="text-lg font-black text-orange-950 font-olchiki mt-0.5">{p.tribal}</p>
                  <p className="text-xs font-bold text-orange-900">उच्चारण: {p.phonetic}</p>
                </div>
                <button
                  className="p-2.5 bg-gradient-to-r from-orange-600 to-rose-600 text-white rounded-full shadow-sm hover:scale-110 transition-transform"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Micro-Quiz */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-800 flex items-center space-x-2">
              <Star className="w-4 h-4 text-amber-500" />
              <span>त्वरित समझ मूल्यांकन (2-Min Quiz):</span>
            </h3>

            {currentLesson.quiz.map((q, qIdx) => (
              <div key={qIdx} className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <p className="text-xs font-black text-slate-800">{qIdx + 1}. {q.q}</p>
                <div className="space-y-1.5">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedAnswers[qIdx] === optIdx
                          ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleEvaluateQuiz}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 text-white font-black py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              उत्तर सबमिट करें एवं प्रमाण पत्र देखें ➔
            </button>
          </div>
        </div>
      </div>

      {/* Official Certificate of Completion (Printable) */}
      {showCertificate && (
        <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-600/80 rounded-3xl p-8 shadow-2xl space-y-6 text-center relative overflow-hidden">
          <div className="space-y-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-600 to-rose-600 text-white mx-auto flex items-center justify-center shadow-lg">
              <Award className="w-10 h-10 text-amber-300" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-black text-orange-900 bg-amber-200 px-3 py-0.5 rounded-full">
              झारखण्ड प्राथमिक शिक्षा परियोजना परिषद
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              मातृभाषा बहुभाषी शिक्षण (MTB-MLE) प्रवीणता प्रमाण पत्र
            </h3>
            <p className="text-xs text-slate-600">
              प्रमाणित किया जाता है कि निम्नलिखित शिक्षक ने पलाश वाणी AI मॉड्यूल सफलतापूर्वक पूर्ण किया है:
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white/90 p-4 rounded-2xl border border-amber-300 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-1">
              <span className="text-slate-500 font-bold">शिक्षक का नाम:</span>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="font-black text-slate-800 text-right bg-transparent border-b border-dashed border-orange-300 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-1">
              <span className="text-slate-500 font-bold">विद्यालय:</span>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="font-bold text-slate-700 text-right bg-transparent border-b border-dashed border-orange-300 focus:outline-none text-[11px]"
              />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500 font-bold">प्रमाणित भाषा:</span>
              <strong className="text-orange-950 uppercase">{targetLang} (FLN Level-1)</strong>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6 text-xs text-slate-500 pt-2">
            <div>
              <div className="w-24 border-b border-slate-400 mx-auto mb-1"></div>
              <span>हस्ताक्षर, ब्लॉक शिक्षा अधिकारी</span>
            </div>
            <div>
              <div className="w-24 border-b border-slate-400 mx-auto mb-1"></div>
              <span>सील, पलाश वाणी AI</span>
            </div>
          </div>

          <div className="no-print pt-3">
            <button
              onClick={() => window.print()}
              className="bg-orange-600 hover:bg-orange-700 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center space-x-2 mx-auto"
            >
              <Printer className="w-4 h-4" />
              <span>प्रमाण पत्र A4 प्रिंट करें</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
