import React, { useState } from 'react';
import { TribalLanguage } from '../nlp/types';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { AppLanguage, translations } from '../i18n/translations';
import { UserRole } from '../App';
import { 
  Wifi, WifiOff, Cpu, BookOpen, Layers, Mic, FileText, Sparkles, 
  Home, Volume2, Edit3, Headphones, Camera, Award, Radio, Compass, Database, Palette,
  User, GraduationCap, Globe
} from 'lucide-react';
import { useTheme, THEMES, ThemeMode } from '../theme/ThemeContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  targetLang: TribalLanguage;
  setTargetLang: (lang: TribalLanguage) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  appLang: AppLanguage;
  setAppLang: (lang: AppLanguage) => void;
  onOpenWelcome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  targetLang,
  setTargetLang,
  isOffline,
  setIsOffline,
  userRole,
  setUserRole,
  appLang,
  setAppLang,
  onOpenWelcome
}) => {
  const { theme, themeConfig, setTheme } = useTheme();
  const [testedAudio, setTestedAudio] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const t = translations[appLang];

  const languageLabels: Record<TribalLanguage, { name: string; script: string }> = {
    santhali: { name: 'संथाली', script: 'ᱚᱞ ᱪᱤᱠᱤ (Ol Chiki)' },
    ho: { name: 'हो', script: '𑢹𑣉𑣉 (Warang Chiti)' },
    mundari: { name: 'मुंडारी', script: 'देवनागरी (Mundari)' }
  };

  const allTabs: Array<{ id: string; label: string; icon: any; badge?: string; role: UserRole }> = [
    { id: 'home', label: t.tabHome, icon: Home, role: 'all' },
    // Teacher & Core
    { id: 'v2v', label: t.tabV2V, icon: Mic, badge: '<800ms', role: 'all' },
    { id: 'worksheet', label: t.tabWorksheet, icon: FileText, badge: 'NIPUN', role: 'teacher' },
    { id: 'customLesson', label: t.tabCustomLesson, icon: Sparkles, role: 'teacher' },
    { id: 'text', label: t.tabText, icon: Compass, role: 'teacher' },
    { id: 'cert', label: t.tabCert, icon: Award, badge: appLang === 'hi' ? 'सर्टिफिकेट' : 'Cert', role: 'teacher' },
    { id: 'mesh', label: t.tabMesh, icon: Radio, badge: 'P2P', role: 'teacher' },
    { id: 'datasets', label: t.tabDatasets, icon: Database, badge: 'Data', role: 'teacher' },
    { id: 'diagnostics', label: t.tabDiagnostics, icon: Cpu, role: 'teacher' },
    // Student Activities
    { id: 'slate', label: t.tabSlate, icon: Edit3, badge: appLang === 'hi' ? 'नया' : 'New', role: 'student' },
    { id: 'game', label: t.tabGame, icon: Headphones, badge: appLang === 'hi' ? 'गेम' : 'Game', role: 'student' },
    { id: 'camera', label: t.tabCamera, icon: Camera, badge: 'AI', role: 'student' },
    { id: 'folktale', label: t.tabFolktale, icon: BookOpen, role: 'student' },
    { id: 'flashcards', label: t.tabFlashcards, icon: Layers, role: 'student' }
  ];

  const visibleTabs = allTabs.filter(tab => {
    if (userRole === 'all') return true;
    if (tab.role === 'all') return true;
    return tab.role === userRole;
  });

  const handleTestSpeaker = () => {
    setTestedAudio(true);
    PalashPhoneticTTS.speakOffline('नमस्ते बच्चों! जोहार!', 'जोहार गिदरा को!', 'Johar gidra ko!', targetLang);
    setTimeout(() => setTestedAudio(false), 1500);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 shadow-md">
      {/* Top Banner with Dynamic Theme Gradient & Status Controls */}
      <div className={`bg-gradient-to-r ${themeConfig.headerGradient} text-white px-4 py-2 shadow-inner transition-all duration-300`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Logo & Subtitle */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-white p-1 shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <img src="/logo.svg" alt="PALASH Logo" className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-black text-lg md:text-xl tracking-tight text-white drop-shadow-sm">
                  {t.appName} <span className="text-emerald-300 font-semibold text-sm md:text-base">{t.appSubname}</span>
                </h1>
                <span className="text-[10px] uppercase font-black bg-emerald-400 text-black px-2.5 py-0.5 rounded-full shadow-sm">
                  MTB-MLE Jharkhand
                </span>
                <span className="text-[10px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full shadow-sm ring-1 ring-white/40">
                  {themeConfig.icon} {themeConfig.shortName}
                </span>
              </div>
              <p className="text-xs text-stone-200 hidden sm:block">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Right Status Controls */}
          <div className="flex flex-wrap items-center space-x-2 text-xs">
            {/* Primary Language Switcher: Hindi (Primary) vs English (Secondary) */}
            <div className="inline-flex bg-black/25 backdrop-blur-md p-0.5 rounded-xl border border-white/20 shadow-inner">
              <button
                onClick={() => setAppLang('hi')}
                className={`px-2.5 py-1 rounded-lg font-black text-xs transition-all flex items-center space-x-1 ${
                  appLang === 'hi'
                    ? 'bg-amber-400 text-stone-950 shadow-md ring-1 ring-amber-300 scale-105'
                    : 'text-stone-200 hover:text-white'
                }`}
                title="हिन्दी (मुख्य भाषा - SIH Focus)"
              >
                <span>🇮🇳</span>
                <span>हिन्दी</span>
                <span className="text-[9px] opacity-75 font-normal hidden md:inline">(Primary)</span>
              </button>
              <button
                onClick={() => setAppLang('en')}
                className={`px-2.5 py-1 rounded-lg font-black text-xs transition-all flex items-center space-x-1 ${
                  appLang === 'en'
                    ? 'bg-amber-400 text-stone-950 shadow-md ring-1 ring-amber-300 scale-105'
                    : 'text-stone-200 hover:text-white'
                }`}
                title="English (Secondary Language - For Faculty & Students)"
              >
                <span>🌐</span>
                <span>English</span>
                <span className="text-[9px] opacity-75 font-normal hidden md:inline">(Secondary)</span>
              </button>
            </div>

            {/* Intro / Welcome Screen Re-opener Button */}
            <button
              onClick={onOpenWelcome}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg font-bold bg-white/20 hover:bg-white/30 text-white border border-white/20 transition-all shadow-sm"
              title={t.welcomeButton}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.welcomeButton}</span>
            </button>

            {/* Interactive Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg font-bold bg-white/20 hover:bg-white/30 text-white border border-white/20 transition-all shadow-sm"
                title="रंग थीम बदलें (Color Theme)"
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.themeLabel}</span>
                <span>{themeConfig.icon} {themeConfig.shortName}</span>
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2 z-50 text-stone-800 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                    रंग थीम चुनें (Color Themes)
                  </div>
                  {(Object.keys(THEMES) as ThemeMode[]).map((mode) => {
                    const item = THEMES[mode];
                    const isSelected = theme === mode;
                    return (
                      <button
                        key={mode}
                        onClick={() => {
                          setTheme(mode);
                          setShowThemeMenu(false);
                        }}
                        className={`w-full px-3 py-2.5 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                          isSelected ? `${item.primaryBg} ${item.primaryText} font-bold` : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{item.icon}</span>
                          <span>{item.name}</span>
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Audio Test Button */}
            <button
              onClick={handleTestSpeaker}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg font-bold transition-all shadow-sm ${
                testedAudio
                  ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-300 animate-pulse'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/20'
              }`}
              title="स्पीकर ध्वनि टेस्ट करें"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{testedAudio ? t.speakerTesting : t.speakerTestBtn}</span>
            </button>

            {/* Memory indicator */}
            <div className="hidden xl:flex items-center space-x-1.5 bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.ramLabel}</span>
            </div>

            {/* Offline Mode Switcher */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg font-bold transition-all shadow-md ${
                isOffline 
                  ? 'bg-emerald-600 text-white border border-emerald-400 ring-2 ring-emerald-300/40' 
                  : 'bg-white/20 text-stone-100 hover:bg-white/30'
              }`}
              title="100% ऑफ़लाइन मोड टॉगल करें"
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-emerald-200" /> : <Wifi className="w-3.5 h-3.5" />}
              <span>{isOffline ? t.offlineMode : t.onlineMode}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Language Selection & Role Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Left Side: Language Selector + Role Interface Switcher */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
          {/* Tribal Language Selector */}
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">{t.languageLabel}</span>
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
              {(['santhali', 'ho', 'mundari'] as TribalLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setTargetLang(lang)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all flex flex-col items-center ${
                    targetLang === lang
                      ? `${themeConfig.activeNavBg} scale-105`
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{languageLabels[lang].name}</span>
                  <span className="text-[9px] opacity-85">{languageLabels[lang].script}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Role Interface Switcher: Teacher vs Student vs All */}
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">{t.interfaceLabel}</span>
            <div className="inline-flex bg-stone-100 p-1 rounded-xl border border-stone-200 shadow-inner">
              <button
                onClick={() => {
                  setUserRole('teacher');
                  if (['slate', 'game', 'camera', 'folktale', 'flashcards'].includes(currentTab)) {
                    setCurrentTab('v2v');
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center space-x-1.5 ${
                  userRole === 'teacher'
                    ? 'bg-black text-emerald-400 border border-emerald-400 shadow-md ring-2 ring-emerald-400/20 scale-105'
                    : 'text-stone-600 hover:bg-stone-200'
                }`}
                title="शिक्षक अध्यापन उपकरण (Teacher Mode)"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{t.roleTeacher}</span>
              </button>

              <button
                onClick={() => {
                  setUserRole('student');
                  if (['worksheet', 'customLesson', 'text', 'cert', 'mesh', 'datasets', 'diagnostics'].includes(currentTab)) {
                    setCurrentTab('slate');
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center space-x-1.5 ${
                  userRole === 'student'
                    ? 'bg-emerald-500 text-black border border-emerald-400 shadow-md ring-2 ring-emerald-400/20 scale-105'
                    : 'text-stone-600 hover:bg-stone-200'
                }`}
                title="छात्र खेल व स्व-अध्ययन (Student Mode)"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t.roleStudent}</span>
              </button>

              <button
                onClick={() => setUserRole('all')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  userRole === 'all'
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'text-stone-500 hover:bg-stone-200'
                }`}
                title="सभी 14 मॉड्यूल देखें (Master View)"
              >
                <span>{t.roleAll}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <nav className="flex items-center space-x-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            const active = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? `${themeConfig.primaryBg} ${themeConfig.primaryText} border ${themeConfig.primaryBorder} shadow-sm font-bold`
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? themeConfig.primaryText : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                    active 
                      ? `${themeConfig.activeNavBg} text-white shadow-sm` 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
