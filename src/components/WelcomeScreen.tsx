import React from 'react';
import { TribalLanguage } from '../nlp/types';
import { AppLanguage, translations } from '../i18n/translations';
import { UserRole } from '../App';
import { 
  Sparkles, Award, WifiOff, Globe, GraduationCap, User, 
  ArrowRight, Check, CheckCircle2, ShieldCheck, Heart
} from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface WelcomeScreenProps {
  isOpen: boolean;
  onClose: () => void;
  appLang: AppLanguage;
  setAppLang: (lang: AppLanguage) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  targetLang: TribalLanguage;
  setTargetLang: (lang: TribalLanguage) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  isOpen,
  onClose,
  appLang,
  setAppLang,
  userRole,
  setUserRole,
  targetLang,
  setTargetLang
}) => {
  const { themeConfig } = useTheme();
  const t = translations[appLang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Top Header Banner with Dynamic Gradient */}
        <div className={`relative bg-gradient-to-r ${themeConfig.headerGradient} text-white p-6 sm:p-8 shrink-0 overflow-hidden`}>
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-black/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white p-2 shadow-2xl flex items-center justify-center shrink-0 border-2 border-white/60 transform hover:scale-105 transition-transform">
              <img src="/logo.svg" alt="PALASH Vani Logo" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.missionBadge}</span>
                <span className="text-white/60">•</span>
                <span className="text-amber-300">{t.offlineBadge}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight drop-shadow-md">
                {t.welcomeTitle}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-emerald-100">
                {t.welcomeSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 text-stone-800">
          {/* Welcome Intro Callout */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-black text-emerald-950 text-sm sm:text-base">
                {appLang === 'hi' ? 'स्वागत सन्देश (Welcome Note)' : 'Welcome to our app!'}
              </p>
              <p className="text-emerald-900 leading-relaxed font-medium">
                {t.welcomeIntroText}
              </p>
            </div>
          </div>

          {/* Step 1: Language Selection (Hindi Primary vs English Secondary) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-base sm:text-lg text-stone-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <span>{t.welcomeLangHeading}</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t.welcomeLangSubheading}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Hindi (Primary) */}
              <div 
                onClick={() => setAppLang('hi')}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all relative flex flex-col justify-between ${
                  appLang === 'hi'
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-lg ring-4 ring-emerald-500/10'
                    : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-stone-50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-orange-600 text-white shadow-sm">
                      {t.langHindiBadge}
                    </span>
                    {appLang === 'hi' && (
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-black text-stone-900 flex items-center gap-1.5">
                    <span>🇮🇳</span>
                    <span>{t.langHindiTitle}</span>
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t.langHindiDesc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-200 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{appLang === 'hi' ? 'प्राथमिक कक्षा अध्यापन एवं संवाद' : 'Primary classroom teaching & communication'}</span>
                </div>
              </div>

              {/* Option 2: English */}
              <div 
                onClick={() => setAppLang('en')}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all relative flex flex-col justify-between ${
                  appLang === 'en'
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-lg ring-4 ring-emerald-500/10'
                    : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-stone-50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-sm">
                      {t.langEnglishBadge}
                    </span>
                    {appLang === 'en' && (
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-black text-stone-900 flex items-center gap-1.5">
                    <span>🌐</span>
                    <span>{t.langEnglishTitle}</span>
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t.langEnglishDesc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-200 text-[11px] font-bold text-blue-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{appLang === 'hi' ? 'द्विभाषी अध्ययन एवं अभ्यास' : 'Bilingual learning & practice'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Role Selection */}
          <div className="space-y-3">
            <div>
              <h3 className="font-black text-base sm:text-lg text-stone-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-orange-600" />
                <span>{t.roleHeading}</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {t.roleSubheading}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Teacher Portal */}
              <div
                onClick={() => setUserRole('teacher')}
                className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                  userRole === 'teacher'
                    ? 'border-black bg-black text-white shadow-md ring-2 ring-emerald-400/20'
                    : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <GraduationCap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-black text-sm">{t.roleTeacherTitle}</h4>
                  <p className={`text-xs leading-relaxed ${userRole === 'teacher' ? 'text-stone-300' : 'text-stone-500'}`}>
                    {t.roleTeacherDesc}
                  </p>
                </div>
                {userRole === 'teacher' && (
                  <span className="text-[10px] font-black mt-3 text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> {t.roleActiveBadge}
                  </span>
                )}
              </div>

              {/* Student Studio */}
              <div
                onClick={() => setUserRole('student')}
                className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                  userRole === 'student'
                    ? 'border-emerald-500 bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-md ring-2 ring-emerald-400/20'
                    : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
                    <User className="w-5 h-5 text-amber-300" />
                  </div>
                  <h4 className="font-black text-sm">{t.roleStudentTitle}</h4>
                  <p className={`text-xs leading-relaxed ${userRole === 'student' ? 'text-emerald-100' : 'text-stone-500'}`}>
                    {t.roleStudentDesc}
                  </p>
                </div>
                {userRole === 'student' && (
                  <span className="text-[10px] font-black mt-3 text-amber-300 flex items-center gap-1">
                    <Check className="w-3 h-3" /> {t.roleActiveBadge}
                  </span>
                )}
              </div>

              {/* Master View */}
              <div
                onClick={() => setUserRole('all')}
                className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                  userRole === 'all'
                    ? 'border-stone-800 bg-stone-800 text-white shadow-md'
                    : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-stone-300">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-sm">{t.roleAllTitle}</h4>
                  <p className={`text-xs leading-relaxed ${userRole === 'all' ? 'text-stone-300' : 'text-stone-500'}`}>
                    {t.roleAllDesc}
                  </p>
                </div>
                {userRole === 'all' && (
                  <span className="text-[10px] font-black mt-3 text-emerald-300 flex items-center gap-1">
                    <Check className="w-3 h-3" /> {t.roleActiveBadge}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Target Tribal Language */}
          <div className="space-y-3">
            <h3 className="font-black text-base sm:text-lg text-stone-900">
              {t.targetLangHeading}
            </h3>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'santhali' as const, name: 'संथाली (Santhali)', script: 'ᱚᱞ ᱪᱤᱠᱤ (Ol Chiki)' },
                { id: 'ho' as const, name: 'हो (Ho)', script: '𑢹𑣉𑣉 (Warang Chiti)' },
                { id: 'mundari' as const, name: 'मुंडारी (Mundari)', script: 'देवनागरी (Devanagari)' }
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setTargetLang(lang.id)}
                  className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                    targetLang === lang.id
                      ? 'border-orange-500 bg-orange-50/70 text-orange-900 font-black shadow-md ring-2 ring-orange-400/20'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold">{lang.name}</span>
                  <span className="text-[10px] sm:text-xs opacity-75">{lang.script}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Core Highlights Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
              <WifiOff className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h5 className="text-xs font-black text-stone-900">{t.welcomeFeature1Title}</h5>
                <p className="text-[11px] text-stone-500">{t.welcomeFeature1Desc}</p>
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h5 className="text-xs font-black text-stone-900">{t.welcomeFeature2Title}</h5>
                <p className="text-[11px] text-stone-500">{t.welcomeFeature2Desc}</p>
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
              <Award className="w-5 h-5 text-purple-600 shrink-0" />
              <div>
                <h5 className="text-xs font-black text-stone-900">{t.welcomeFeature3Title}</h5>
                <p className="text-[11px] text-stone-500">{t.welcomeFeature3Desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="p-4 sm:p-6 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {appLang === 'hi' 
                ? 'यह सेटिंग आप कभी भी शीर्ष नेविगेशन बार से बदल सकते हैं।'
                : 'You can change language and role anytime from the top bar.'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <span>{t.enterAppButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
