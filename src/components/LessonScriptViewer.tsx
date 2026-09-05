import React, { useState } from 'react';
import { TribalLanguage } from '../nlp/types';
import { DAILY_LESSON_PLANS, DailyLessonPlan, LessonStep } from '../curriculum/lessonPlans';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { Clock, Volume2, CheckCircle, Lightbulb, BookOpen } from 'lucide-react';

interface LessonScriptViewerProps {
  targetLang: TribalLanguage;
}

export const LessonScriptViewer: React.FC<LessonScriptViewerProps> = ({ targetLang }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(DAILY_LESSON_PLANS[0].id);
  const [activePlayingStep, setActivePlayingStep] = useState<number | null>(null);

  const currentLesson: DailyLessonPlan = DAILY_LESSON_PLANS.find(l => l.id === selectedLessonId) || DAILY_LESSON_PLANS[0];

  const playStepAudio = (step: LessonStep) => {
    setActivePlayingStep(step.stepNumber);
    const data = step.tribalSpeech[targetLang];
    PalashPhoneticTTS.speakOffline(data.text, data.phonetic, data.phonetic, targetLang);
    setTimeout(() => setActivePlayingStep(null), 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header & Lesson Picker */}
      <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-800 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span>दैनिक 30-मिनट द्विभाषी पाठ योजना (Daily Classroom Lesson Script)</span>
            </h2>
            <p className="text-xs text-slate-500">
              गैर-जनजातीय प्राथमिक शिक्षकों के लिए कक्षा में बोलने हेतु चरणबद्ध द्विभाषी संवाद एवं शिक्षण टिप्स।
            </p>
          </div>

          <span className="text-xs bg-gradient-to-r from-orange-600 to-rose-600 text-white font-black px-3.5 py-1.5 rounded-full shadow-sm">
            समय: {currentLesson.durationTotal} मिनट • {currentLesson.grade}
          </span>
        </div>

        {/* Lesson Switcher Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {DAILY_LESSON_PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedLessonId(plan.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 ${
                selectedLessonId === plan.id
                  ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{plan.titleHindi}</span>
              <span className="text-[10px] opacity-85">({plan.theme})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Details Card */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-rose-50 border border-orange-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div>
          <span className="text-[10px] font-black text-orange-900 uppercase tracking-wider">निपुण भारत सीखने का प्रतिफल (Learning Outcome):</span>
          <p className="text-xs md:text-sm font-bold text-slate-800 mt-0.5">{currentLesson.learningOutcome}</p>
        </div>
        <div className="flex items-center space-x-1.5 text-xs font-black text-orange-950 bg-white/90 px-3.5 py-2 rounded-xl border border-orange-200 shadow-sm">
          <Clock className="w-4 h-4 text-orange-600" />
          <span>4 चरण • 30 मिनट</span>
        </div>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-4">
        {currentLesson.steps.map((step) => {
          const tribalData = step.tribalSpeech[targetLang];
          const isPlaying = activePlayingStep === step.stepNumber;
          return (
            <div
              key={step.stepNumber}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 hover:border-orange-300 hover:shadow-md transition-all"
            >
              {/* Step Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-600 to-rose-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                    {step.stepNumber}
                  </span>
                  <div>
                    <h3 className="font-black text-slate-800 text-sm md:text-base">{step.phase}</h3>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                  ⏱️ {step.durationMinutes} मिनट
                </span>
              </div>

              {/* What the Teacher Says in Hindi vs What to Speak in Tribal Language */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Hindi intent */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                    शिक्षक का हिंदी निर्देश (What You Intend to Say):
                  </span>
                  <p className="font-bold text-slate-800 text-sm md:text-base">
                    "{step.teacherPromptHindi}"
                  </p>
                </div>

                {/* Tribal Speech Box */}
                <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 p-4 rounded-2xl border border-orange-200 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-orange-900 uppercase tracking-wide">
                      कक्षा में यह बोलें ({targetLang.toUpperCase()} में):
                    </span>
                    <button
                      onClick={() => playStepAudio(step)}
                      className={`p-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white rounded-full shadow-md transition-transform hover:scale-110 ${
                        isPlaying ? 'ring-4 ring-orange-300 animate-pulse' : ''
                      }`}
                      title="उच्चारण सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="font-black text-orange-950 text-base md:text-lg font-olchiki">
                    {tribalData.text}
                  </p>
                  <p className="text-xs font-black text-orange-900">
                    उच्चारण (Devanagari): <span className="underline">{tribalData.phonetic}</span>
                  </p>
                </div>
              </div>

              {/* Expected Student Response & Teacher Pedagogical Tip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                <div className="flex items-start space-x-2.5 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-emerald-950">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black block">बच्चों से अपेक्षित प्रतिक्रिया:</span>
                    <p className="text-emerald-900 mt-0.5 font-medium">{step.expectedStudentAction}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-amber-950">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black block">शिक्षण युक्ति (Pedagogical Tip):</span>
                    <p className="text-amber-900 mt-0.5 font-medium">{step.pedagogicalTip}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
