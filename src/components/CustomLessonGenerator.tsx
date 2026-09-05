import React, { useState } from 'react';
import { TribalLanguage } from '../nlp/types';
import { PalashNLPTranslator } from '../nlp/translator';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { Sparkles, Printer, Volume2, BookOpen, CheckCircle, Clock, Lightbulb, ArrowRight } from 'lucide-react';

interface CustomLessonGeneratorProps {
  targetLang: TribalLanguage;
}

interface CustomLessonStep {
  stepNumber: number;
  phase: string;
  durationMinutes: number;
  teacherPromptHindi: string;
  tribalSpeech: { text: string; phonetic: string; english: string };
  expectedStudentAction: string;
  pedagogicalTip: string;
}

export const CustomLessonGenerator: React.FC<CustomLessonGeneratorProps> = ({ targetLang }) => {
  const [topicInput, setTopicInput] = useState('स्वच्छता और हाथ धोना');
  const [gradeLevel, setGradeLevel] = useState('कक्षा 1 (Grade 1)');
  const [generatedPlan, setGeneratedPlan] = useState<{
    topic: string;
    grade: string;
    learningOutcome: string;
    steps: CustomLessonStep[];
  } | null>(null);

  const generateLesson = (topic: string) => {
    const cleanTopic = topic.trim() || 'कक्षा संवाद';

    // Translate key concept keywords
    const translatedConcept = PalashNLPTranslator.translate(cleanTopic, targetLang);

    const steps: CustomLessonStep[] = [
      {
        stepNumber: 1,
        phase: 'अभिवादन एवं ध्यानाकर्षण (Warm-up & Greeting)',
        durationMinutes: 5,
        teacherPromptHindi: `नमस्ते बच्चों! आज हम "${cleanTopic}" के बारे में सीखेंगे। सभी अपनी जगह बैठ जाओ।`,
        tribalSpeech: {
          text: targetLang === 'santhali' 
            ? `ᱡᱳᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ${translatedConcept.targetText} ᱵᱟᱵᱚᱛ ᱵᱚ ᱪᱮᱫᱚᱜᱼᱟ। ᱡᱚᱛᱚ ᱦᱚᱲ ᱫᱩᱲᱩᱵᱽ ᱯᱮ।`
            : (targetLang === 'ho' 
              ? `जोहार होनको! तेहेंगे आबु ${translatedConcept.devanagariPhonetic} बयते चेदोगाबु। सबिन दुबेन।`
              : `जोहार होनको! तिहिंग आबु ${translatedConcept.devanagariPhonetic} बयते चेदोगाबु। सबिन दुबपे।`),
          phonetic: `जोहार गिदरा को! आज हम ${translatedConcept.devanagariPhonetic} सीखेंगे। दुड़ुब पे।`,
          english: `Johar gidra ko! ${translatedConcept.englishPhonetic}. Durub pe.`
        },
        expectedStudentAction: 'सभी बच्चे मुस्कुराते हुए शिक्षक का अभिवादन करेंगे और शांत बैठेंगे।',
        pedagogicalTip: 'मातृभाषा में अभिवादन करने से बच्चे कक्षा में मानसिक रूप से सहज हो जाते हैं।'
      },
      {
        stepNumber: 2,
        phase: 'शारीरिक क्रिया एवं मातृभाषा शब्दावली (TPR Action Drill)',
        durationMinutes: 10,
        teacherPromptHindi: `सभी बच्चे खड़े हो जाओ और मेरे साथ मिलकर ताली बजाओ!`,
        tribalSpeech: {
          text: targetLang === 'santhali'
            ? 'ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱮᱸᱜᱳᱱ ᱯᱮ ᱟᱨ ᱤᱧ ᱥᱟᱶ ᱛᱷᱟᱹᱨᱤ ᱫᱟᱞ ᱯᱮ!'
            : (targetLang === 'ho' ? 'सबिन होनको तिंगुन आर अइंगाः सांव ताली तेये!' : 'सबिन होनको तिंगुनपे आर अइंगाः सांव ताली धरावपे!'),
          phonetic: 'जोतो गिदरा तेंगोन पे आर इञ साव थारी दाल पे!',
          english: 'Joto gidra tengon pe ar in saw thari dal pe!'
        },
        expectedStudentAction: 'बच्चे खड़े होकर 3 बार ताली बजाएंगे और क्रिया को दोहराएंगे।',
        pedagogicalTip: 'TPR (Total Physical Response) विधि से शब्दावली लंबे समय तक याद रहती है।'
      },
      {
        stepNumber: 3,
        phase: 'सचित्र सामग्री एवं पठन अभ्यास (Guided Activity)',
        durationMinutes: 10,
        teacherPromptHindi: `अपनी किताब खोलो और दिए गए चित्र को ध्यान से देखो।`,
        tribalSpeech: {
          text: targetLang === 'santhali'
            ? 'ᱟᱯᱱᱟᱨ ᱯᱳᱛᱷᱤ ᱨᱟᱲᱟᱭ ᱢᱮ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱢᱮ।'
            : (targetLang === 'ho' ? 'अमाः पोथी उघड़ेन आर चित्र नेलमे।' : 'अमाः पोथी उघड़मे आर चित्र नेलमे।'),
          phonetic: 'आपनार पोथी राड़ाय मे आर चितार ञेल मे।',
          english: 'Apnar pothi raray me ar chitar nel me.'
        },
        expectedStudentAction: 'बच्चे अपनी कार्यपुस्तिका में चित्र पर उंगली रखकर देखेंगे।',
        pedagogicalTip: 'चित्र में दिख रही वस्तुओं के नाम पहले मातृभाषा में पूछें, फिर हिंदी में।'
      },
      {
        stepNumber: 4,
        phase: 'मौखिक समझ आकलन एवं प्रोत्साहन (Review & Praise)',
        durationMinutes: 5,
        teacherPromptHindi: `बहुत अच्छा बच्चों! शाबाश! क्या सबको समझ आया?`,
        tribalSpeech: {
          text: targetLang === 'santhali'
            ? 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱵᱩᱡᱷᱟᱹᱣ ᱮᱱᱟ ᱥᱮ?'
            : (targetLang === 'ho' ? 'बुगिनगे होनको! बेसगे!' : 'बुगिनगे होनको! बहुत बेस!'),
          phonetic: 'आडी नापाय गिदरा को! बुझाव एना से?',
          english: 'Ari napay gidra ko! Bujhaw ena se?'
        },
        expectedStudentAction: 'बच्चे उत्साहपूर्वक "हाँ / हें" कहेंगे और ताली बजाएंगे।',
        pedagogicalTip: 'कक्षा के अंत में सकारात्मक प्रशंसा से बच्चों का आत्मविश्वास कई गुना बढ़ जाता है।'
      }
    ];

    setGeneratedPlan({
      topic: cleanTopic,
      grade: gradeLevel,
      learningOutcome: `बच्चे "${cleanTopic}" की मूल अवधारणाओं को अपनी मातृभाषा (${targetLang.toUpperCase()}) और हिंदी में समझकर मौखिक रूप से व्यक्त कर सकेंगे।`,
      steps
    });
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    generateLesson(topicInput);
  };

  const playStep = async (step: CustomLessonStep) => {
    await PalashPhoneticTTS.speakOffline(
      step.tribalSpeech.text,
      step.tribalSpeech.phonetic,
      step.tribalSpeech.english,
      targetLang
    );
  };

  const presetTopics = [
    'स्वच्छता और हाथ धोना',
    'जंगल और पशु-पक्षी',
    'पानी और बरसात',
    'हमारा प्यारा गाँव',
    'फल और रंग पहचान',
    'मेरा परिवार'
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Generator Box */}
      <div className="no-print bg-white rounded-3xl border border-orange-100 p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-orange-600" />
              <span>कस्टम पाठ योजना निर्माता (Custom AI Lesson Plan Generator)</span>
            </h2>
            <p className="text-xs text-slate-500">
              कोई भी हिंदी विषय या थीम दर्ज करें — AI स्वतः 30-मिनट का द्विभाषी कक्षा संवाद और शिक्षण स्क्रिप्ट तैयार करेगा।
            </p>
          </div>

          <span className="text-xs bg-gradient-to-r from-orange-600 to-rose-600 text-white font-black px-3.5 py-1.5 rounded-full shadow-sm">
            लक्षित भाषा: {targetLang.toUpperCase()}
          </span>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-600 block mb-1">पाठ का विषय / थीम (Topic in Hindi):</label>
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="उदा. हाथ धोना, जंगल के जानवर, फल और सब्जियां..."
              className="w-full p-3 text-xs md:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">कक्षा स्तर:</label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full p-3 text-xs md:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold"
            >
              <option value="बालवाटिका (Balvatika)">बालवाटिका (Balvatika)</option>
              <option value="कक्षा 1 (Grade 1)">कक्षा 1 (Grade 1)</option>
              <option value="कक्षा 2 (Grade 2)">कक्षा 2 (Grade 2)</option>
              <option value="कक्षा 3 (Grade 3)">कक्षा 3 (Grade 3)</option>
            </select>
          </div>

          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition-all hover:scale-105 active:scale-95 flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>पाठ योजना जनरेट करें</span>
            </button>
          </div>
        </form>

        {/* Preset Topic Chips */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500">सुझाए गए विषय:</span>
          {presetTopics.map((top, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTopicInput(top);
                generateLesson(top);
              }}
              className="bg-slate-100 hover:bg-orange-100 hover:text-orange-950 px-3 py-1 rounded-xl text-xs font-bold border border-slate-200 transition-all active:scale-95"
            >
              {top}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Lesson Plan View */}
      {generatedPlan ? (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-orange-600 via-rose-600 to-purple-700 text-white rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-black uppercase text-amber-200">
                {generatedPlan.grade} • 30 मिनट पाठ
              </span>
              <h3 className="text-xl md:text-2xl font-black">
                विषय: {generatedPlan.topic}
              </h3>
              <p className="text-xs text-orange-100">
                सीखने का प्रतिफल: {generatedPlan.learningOutcome}
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="no-print bg-white text-orange-700 hover:bg-amber-50 font-black px-4 py-2 rounded-xl text-xs shadow-md flex items-center space-x-1.5 transition-all hover:scale-105"
            >
              <Printer className="w-4 h-4" />
              <span>A4 प्रिंट / सेव</span>
            </button>
          </div>

          {/* 4 Pedagogical Steps */}
          <div className="space-y-4">
            {generatedPlan.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 hover:border-orange-300 hover:shadow-md transition-all"
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-600 to-rose-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                      {step.stepNumber}
                    </span>
                    <h4 className="font-black text-slate-800 text-sm md:text-base">{step.phase}</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                    ⏱️ {step.durationMinutes} मिनट
                  </span>
                </div>

                {/* Prompt vs Tribal Speech */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wide block mb-1">
                      शिक्षक का हिंदी विचार:
                    </span>
                    <p className="font-bold text-slate-800 text-sm md:text-base">
                      "{step.teacherPromptHindi}"
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 p-4 rounded-2xl border border-orange-200 relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black text-orange-900 uppercase tracking-wide">
                        कक्षा में यह बोलें ({targetLang.toUpperCase()}):
                      </span>
                      <button
                        onClick={() => playStep(step)}
                        className="p-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 text-white rounded-full shadow-sm transition-transform hover:scale-110"
                        title="उच्चारण सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-black text-orange-950 text-base md:text-lg font-olchiki">
                      {step.tribalSpeech.text}
                    </p>
                    <p className="text-xs font-bold text-orange-900 mt-1">
                      उच्चारण: <span className="underline">{step.tribalSpeech.phonetic}</span>
                    </p>
                  </div>
                </div>

                {/* Expected response & Pedagogical advice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="flex items-start space-x-2.5 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-emerald-950">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-emerald-900">अपेक्षित प्रतिक्रिया:</strong>
                      <p className="mt-0.5">{step.expectedStudentAction}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-amber-950">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-900">शिक्षण युक्ति (Pedagogy):</strong>
                      <p className="mt-0.5">{step.pedagogicalTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-black text-slate-700 text-base">
            ऊपर कोई भी विषय लिखकर 'पाठ योजना जनरेट करें' दबाएँ
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            AI इंजन झारखंड के प्राथमिक पाठ्यक्रम के अनुसार सटीक 30-मिनट का द्विभाषी पाठ स्वतः तैयार करेगा।
          </p>
        </div>
      )}
    </div>
  );
};
