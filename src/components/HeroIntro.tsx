import React from 'react';
import { TribalLanguage } from '../nlp/types';
import { AppLanguage, translations } from '../i18n/translations';
import { UserRole } from '../App';
import { 
  Mic, BookOpen, FileText, Layers, Sparkles, WifiOff, Cpu, 
  ArrowRight, Award, Edit3, Headphones, Camera, Radio, User, GraduationCap, Compass, Database, Globe
} from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface HeroIntroProps {
  onSelectTab: (tab: string) => void;
  targetLang: TribalLanguage;
  setTargetLang: (lang: TribalLanguage) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  appLang: AppLanguage;
  setAppLang: (lang: AppLanguage) => void;
  onOpenWelcome: () => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({ 
  onSelectTab, 
  targetLang, 
  setTargetLang,
  userRole,
  setUserRole,
  appLang,
  setAppLang,
  onOpenWelcome
}) => {
  const { themeConfig } = useTheme();
  const t = translations[appLang];

  const allFeatures = [
    {
      id: 'v2v',
      title: t.featV2VTitle,
      desc: t.featV2VDesc,
      icon: Mic,
      gradient: 'from-amber-500 via-orange-500 to-rose-600',
      badge: '<800ms',
      badgeColor: 'bg-emerald-500 text-white',
      role: 'all' as const
    },
    {
      id: 'slate',
      title: t.featSlateTitle,
      desc: t.featSlateDesc,
      icon: Edit3,
      gradient: 'from-emerald-500 via-teal-600 to-green-700',
      badge: appLang === 'hi' ? 'इंटरैक्टिव स्लेट' : 'Interactive Slate',
      badgeColor: 'bg-emerald-600 text-white',
      role: 'student' as const
    },
    {
      id: 'game',
      title: t.featGameTitle,
      desc: t.featGameDesc,
      icon: Headphones,
      gradient: 'from-fuchsia-500 via-purple-600 to-indigo-700',
      badge: appLang === 'hi' ? 'FLN गेम' : 'FLN Game',
      badgeColor: 'bg-purple-600 text-white',
      role: 'student' as const
    },
    {
      id: 'camera',
      title: t.featCameraTitle,
      desc: t.featCameraDesc,
      icon: Camera,
      gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
      badge: appLang === 'hi' ? 'कैमरा AI' : 'Camera AI',
      badgeColor: 'bg-cyan-600 text-white',
      role: 'student' as const
    },
    {
      id: 'folktale',
      title: t.featFolktaleTitle,
      desc: t.featFolktaleDesc,
      icon: BookOpen,
      gradient: 'from-blue-600 via-indigo-600 to-violet-700',
      badge: appLang === 'hi' ? 'मातृभाषा कराओके' : 'Tribal Karaoke',
      badgeColor: 'bg-blue-600 text-white',
      role: 'student' as const
    },
    {
      id: 'worksheet',
      title: t.featWorksheetTitle,
      desc: t.featWorksheetDesc,
      icon: FileText,
      gradient: 'from-orange-500 via-amber-600 to-yellow-600',
      badge: 'NIPUN Bharat',
      badgeColor: 'bg-orange-600 text-white',
      role: 'teacher' as const
    },
    {
      id: 'customLesson',
      title: t.featCustomLessonTitle,
      desc: t.featCustomLessonDesc,
      icon: Sparkles,
      gradient: 'from-rose-500 via-pink-600 to-purple-600',
      badge: appLang === 'hi' ? 'AI जनरेटर' : 'AI Planner',
      badgeColor: 'bg-rose-600 text-white',
      role: 'teacher' as const
    },
    {
      id: 'flashcards',
      title: t.featFlashcardsTitle,
      desc: t.featFlashcardsDesc,
      icon: Layers,
      gradient: 'from-violet-600 via-purple-600 to-pink-600',
      badge: appLang === 'hi' ? '3D फ्लिप' : '3D Flip',
      badgeColor: 'bg-violet-600 text-white',
      role: 'student' as const
    },
    {
      id: 'cert',
      title: t.featCertTitle,
      desc: t.featCertDesc,
      icon: Award,
      gradient: 'from-amber-600 via-orange-600 to-red-600',
      badge: appLang === 'hi' ? 'सर्टिफिकेट' : 'Certificate',
      badgeColor: 'bg-amber-600 text-white',
      role: 'teacher' as const
    },
    {
      id: 'mesh',
      title: t.featMeshTitle,
      desc: t.featMeshDesc,
      icon: Radio,
      gradient: 'from-teal-500 via-emerald-600 to-green-700',
      badge: '0 KB WiFi',
      badgeColor: 'bg-teal-600 text-white',
      role: 'teacher' as const
    },
    {
      id: 'datasets',
      title: t.featDatasetsTitle,
      desc: t.featDatasetsDesc,
      icon: Database,
      gradient: 'from-blue-700 via-indigo-700 to-slate-900',
      badge: 'Kaggle Data',
      badgeColor: 'bg-blue-800 text-white',
      role: 'teacher' as const
    },
    {
      id: 'text',
      title: t.featTextTitle,
      desc: t.featTextDesc,
      icon: Compass,
      gradient: 'from-emerald-600 via-teal-700 to-stone-800',
      badge: 'FLN Guide',
      badgeColor: 'bg-emerald-800 text-white',
      role: 'teacher' as const
    }
  ];

  const visibleFeatures = allFeatures.filter(f => {
    if (userRole === 'all') return true;
    if (f.role === 'all') return true;
    return f.role === userRole;
  });

  return (
    <div className="space-y-8 mb-8">
      {/* Radiant Hero Banner */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${themeConfig.heroGradient} text-white shadow-2xl p-6 md:p-10 border border-white/20 transition-all duration-300`}>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Mission, Headlines & Quick CTAs */}
          <div className="space-y-5 max-w-2xl text-center lg:text-left">
            {/* Mission Tags */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="bg-amber-300 text-stone-950 text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center space-x-1 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>{t.missionBadge}</span>
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 flex items-center space-x-1">
                <WifiOff className="w-3.5 h-3.5 text-emerald-300" />
                <span>{t.offlineBadge}</span>
              </span>
              <button 
                onClick={onOpenWelcome}
                className="bg-white/25 hover:bg-white/35 backdrop-blur-md text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-amber-300/40 flex items-center space-x-1 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.welcomeButton}</span>
              </button>
            </div>

            {/* Main App Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
                {t.heroTitle} <span className="text-amber-300">{t.appSubname}</span>
              </h1>
              <p className="text-base md:text-lg font-medium text-stone-100 leading-relaxed">
                {t.heroSubtitle}
              </p>
            </div>

            {/* Quick Action Launch Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
              <button
                onClick={() => onSelectTab('v2v')}
                className="bg-white text-orange-700 hover:bg-amber-50 font-black px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 flex items-center space-x-1.5 text-xs md:text-sm"
              >
                <Mic className="w-4 h-4 text-orange-600 animate-pulse" />
                <span>{t.heroQuickVoice}</span>
              </button>

              <button
                onClick={() => onSelectTab('slate')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 text-xs md:text-sm flex items-center space-x-1.5"
              >
                <Edit3 className="w-4 h-4" />
                <span>{t.heroQuickSlate}</span>
              </button>

              <button
                onClick={() => onSelectTab('game')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-black px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 text-xs md:text-sm flex items-center space-x-1.5"
              >
                <Headphones className="w-4 h-4" />
                <span>{t.heroQuickGame}</span>
              </button>

              <button
                onClick={() => onSelectTab('camera')}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-black px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 text-xs md:text-sm flex items-center space-x-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>{t.heroQuickCamera}</span>
              </button>

              <button
                onClick={() => onSelectTab('folktale')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 text-xs md:text-sm flex items-center space-x-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.heroQuickFolktale}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero App Logo with Pulsing Vibrant Halo */}
          <div className="flex flex-col items-center justify-center relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-rose-500 to-violet-600 rounded-full blur-2xl opacity-60 group-hover:opacity-90 animate-pulse transition-opacity" />
              
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white/95 backdrop-blur-lg p-3 shadow-2xl border-4 border-white/50 flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <img src="/logo.svg" alt="PALASH Vani Logo" className="w-full h-full object-contain filter drop-shadow-md" />
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-bold">
              <span className="text-amber-300">{t.heroActiveLang}</span>
              <span className="uppercase text-white tracking-wider">{targetLang}</span>
              <span className="text-white/60">•</span>
              <span className="text-emerald-300">{allFeatures.length} {t.heroInteractiveFeatures}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Role Switcher Hub: Teacher vs Student */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-slate-800 flex items-center space-x-2">
              <span>👥</span>
              <span>{appLang === 'hi' ? 'कक्षा भूमिका चयन (Select Persona Interface):' : 'Select Classroom Persona Interface:'}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {appLang === 'hi' 
                ? 'शिक्षक अध्यापन उपकरण अथवा छात्र बाल-अध्ययन स्टूडियो में से अपना इंटरफेस चुनें।'
                : 'Switch between the Teacher Pedagogical Portal and Student Learning Studio.'}
            </p>
          </div>
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner text-xs font-black shrink-0">
            <button
              onClick={() => setUserRole('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                userRole === 'all'
                  ? 'bg-black text-emerald-400 shadow-sm'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              {t.heroMasterViewBtn}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Teacher Portal */}
          <div 
            onClick={() => setUserRole('teacher')}
            className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              userRole === 'teacher'
                ? 'bg-black text-white border-emerald-500 shadow-2xl ring-4 ring-emerald-500/20 scale-[1.01]'
                : 'bg-white text-stone-900 border-stone-200 hover:border-emerald-400 shadow-sm hover:shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <GraduationCap className="w-6 h-6 text-emerald-400" />
                </div>
                <span className={`text-xs font-black px-3 py-1 rounded-full ${
                  userRole === 'teacher' ? 'bg-emerald-500 text-black' : 'bg-stone-100 text-stone-700'
                }`}>
                  {userRole === 'teacher' ? t.roleActiveBadge : t.roleClickToActivate}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-black flex items-center gap-2">
                  <span>{t.heroTeacherCardTitle}</span>
                  <span className="text-xs font-semibold text-emerald-400">{t.heroTeacherCardSubtitle}</span>
                </h3>
                <p className={`text-xs mt-1.5 leading-relaxed ${userRole === 'teacher' ? 'text-stone-300' : 'text-stone-600'}`}>
                  {t.heroTeacherCardDesc}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(appLang === 'hi' 
                  ? ['🎙️ ध्वनि अनुवाद', '📄 कार्यपुस्तिका जनरेटर', '✨ कस्टम पाठ योजना', '🧭 पाठ्यचर्या स्क्रिप्ट', '🏅 शिक्षक सेतु', '📶 मेश सिंक', '📊 Kaggle डेटा']
                  : ['🎙️ Voice Translator', '📄 A4 Worksheets', '✨ Custom Lesson AI', '🧭 Curriculum Guide', '🏅 Teacher Bridge', '📶 Mesh Sync', '📊 Kaggle Datasets']
                ).map((chip, idx) => (
                  <span key={idx} className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                    userRole === 'teacher' ? 'bg-white/10 text-emerald-300 border border-emerald-500/20' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className={`pt-4 mt-4 border-t flex items-center justify-between text-xs font-black ${
              userRole === 'teacher' ? 'border-white/10 text-emerald-400' : 'border-stone-100 text-stone-800'
            }`}>
              <span>{t.heroTeacherCardCta} ({allFeatures.filter(f => f.role === 'teacher' || f.role === 'all').length} {appLang === 'hi' ? 'टूल्स' : 'tools'})</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Student Learning Studio */}
          <div 
            onClick={() => setUserRole('student')}
            className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              userRole === 'student'
                ? 'bg-gradient-to-br from-emerald-600 to-teal-800 text-white border-emerald-300 shadow-2xl ring-4 ring-emerald-400/30 scale-[1.01]'
                : 'bg-white text-stone-900 border-stone-200 hover:border-emerald-400 shadow-sm hover:shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                  <User className="w-6 h-6 text-amber-300" />
                </div>
                <span className={`text-xs font-black px-3 py-1 rounded-full ${
                  userRole === 'student' ? 'bg-amber-300 text-black' : 'bg-stone-100 text-stone-700'
                }`}>
                  {userRole === 'student' ? t.roleActiveBadge : t.roleClickToActivate}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-black flex items-center gap-2">
                  <span>{t.heroStudentCardTitle}</span>
                  <span className="text-xs font-semibold text-amber-200">{t.heroStudentCardSubtitle}</span>
                </h3>
                <p className={`text-xs mt-1.5 leading-relaxed ${userRole === 'student' ? 'text-emerald-100' : 'text-stone-600'}`}>
                  {t.heroStudentCardDesc}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(appLang === 'hi'
                  ? ['✏️ डिजिटल स्लेट', '🎮 फ़ोनिक्स गेम', '📚 सचित्र लोककथाएं', '📸 फोटो AI', '🃏 3D फ्लैशकार्ड्स', '🗣️ छात्र स्व-अध्ययन']
                  : ['✏️ Digital Slate', '🎮 Phonics Game', '📚 Tribal Folktales', '📸 Photo AI', '🃏 3D Flashcards', '🗣️ Self-Learning']
                ).map((chip, idx) => (
                  <span key={idx} className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                    userRole === 'student' ? 'bg-white/20 text-amber-200 border border-white/20' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className={`pt-4 mt-4 border-t flex items-center justify-between text-xs font-black ${
              userRole === 'student' ? 'border-white/10 text-amber-300' : 'border-stone-100 text-stone-800'
            }`}>
              <span>{t.heroStudentCardCta} ({allFeatures.filter(f => f.role === 'student' || f.role === 'all').length} {appLang === 'hi' ? 'गतिविधियां' : 'activities'})</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtered Feature Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h2 className="text-xl font-black text-slate-800 flex items-center space-x-2">
            <span>✨</span>
            <span>
              {userRole === 'teacher'
                ? t.heroDirectoryTitleTeacher
                : userRole === 'student'
                ? t.heroDirectoryTitleStudent
                : t.heroDirectoryTitleAll}
            </span>
          </h2>
          <span className="text-xs font-bold text-slate-500">
            {visibleFeatures.length} {t.heroDirectorySubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visibleFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => onSelectTab(feat.id)}
                className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feat.gradient} transition-all`} />

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm ${feat.badgeColor}`}>
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-black text-slate-800 text-sm group-hover:text-orange-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-orange-600 group-hover:text-orange-700">
                  <span>{t.cardOpenBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
