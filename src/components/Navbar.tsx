import React, { useState } from 'react';
import { TribalLanguage } from '../nlp/types';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { 
  Wifi, WifiOff, Cpu, BookOpen, Layers, Mic, FileText, Sparkles, 
  Home, Volume2, Edit3, Headphones, Camera, Award, Radio, Compass, Database, Palette 
} from 'lucide-react';
import { useTheme, THEMES, ThemeMode } from '../theme/ThemeContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  targetLang: TribalLanguage;
  setTargetLang: (lang: TribalLanguage) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  targetLang,
  setTargetLang,
  isOffline,
  setIsOffline
}) => {
  const { theme, themeConfig, setTheme } = useTheme();
  const [testedAudio, setTestedAudio] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const languageLabels: Record<TribalLanguage, { name: string; script: string }> = {
    santhali: { name: 'संथाली', script: 'ᱚᱞ ᱪᱤᱠᱤ (Ol Chiki)' },
    ho: { name: 'हो', script: '𑢹𑣉𑣉 (Warang Chiti)' },
    mundari: { name: 'मुंडारी', script: 'देवनागरी (Mundari)' }
  };

  const tabs = [
    { id: 'home', label: 'होम', icon: Home },
    { id: 'v2v', label: 'ध्वनि अनुवाद', icon: Mic, badge: '<800ms' },
    { id: 'slate', label: 'डिजिटल स्लेट', icon: Edit3, badge: 'नया' },
    { id: 'game', label: 'फ़ोनिक्स गेम', icon: Headphones, badge: 'गेम' },
    { id: 'camera', label: 'फोटो पहचानो', icon: Camera, badge: 'AI' },
    { id: 'folktale', label: 'लोककथाएं', icon: BookOpen },
    { id: 'cert', label: 'शिक्षक सेतु', icon: Award, badge: 'सर्टिफिकेट' },
    { id: 'mesh', label: 'मेश सिंक', icon: Radio, badge: 'P2P' },
    { id: 'customLesson', label: 'कस्टम पाठ', icon: Sparkles },
    { id: 'worksheet', label: 'कार्यपुस्तिका', icon: FileText, badge: 'NIPUN' },
    { id: 'flashcards', label: 'फ्लैशकार्ड्स', icon: Layers },
    { id: 'datasets', label: 'Kaggle डेटासेट', icon: Database, badge: 'Data' },
    { id: 'text', label: 'पाठ्यचर्या', icon: Compass },
    { id: 'diagnostics', label: 'टैबलेट स्थिति', icon: Cpu }
  ];

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
                  पलाश वाणी <span className="text-emerald-300 font-semibold text-sm md:text-base">(PALASH Vani)</span>
                </h1>
                <span className="text-[10px] uppercase font-black bg-emerald-400 text-black px-2.5 py-0.5 rounded-full shadow-sm">
                  MTB-MLE Jharkhand
                </span>
                <span className="text-[10px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full shadow-sm ring-1 ring-white/40">
                  {themeConfig.icon} {themeConfig.shortName}
                </span>
              </div>
              <p className="text-xs text-stone-200 hidden sm:block">
                प्राथमिक शिक्षक AI सहायक | संथाली • हो • मुंडारी (लाइट ग्रीन & ब्लैक एडिशन)
              </p>
            </div>
          </div>

          {/* Right Status Controls */}
          <div className="flex items-center space-x-2 text-xs">
            {/* Interactive Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold bg-white/20 hover:bg-white/30 text-white border border-white/20 transition-all shadow-sm"
                title="रंग थीम बदलें (Color Theme)"
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">थीम:</span>
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
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm ${
                testedAudio
                  ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-300 animate-pulse'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/20'
              }`}
              title="स्पीकर ध्वनि टेस्ट करें"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{testedAudio ? 'ध्वनि बज रही है... 🔊' : 'स्पीकर टेस्ट 🔊'}</span>
            </button>

            {/* Memory indicator */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-amber-300" />
              <span>RAM: <strong>~68 MB</strong> / 2GB</span>
            </div>

            {/* Offline Mode Switcher */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all shadow-md ${
                isOffline 
                  ? 'bg-emerald-600 text-white border border-emerald-400 ring-2 ring-emerald-300/40' 
                  : 'bg-white/20 text-stone-100 hover:bg-white/30'
              }`}
              title="100% ऑफ़लाइन मोड टॉगल करें"
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-emerald-200" /> : <Wifi className="w-3.5 h-3.5" />}
              <span>{isOffline ? '100% ऑफ़लाइन' : 'ऑनलाइन'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Language Selection & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Language Selector */}
        <div className="flex items-center space-x-2 w-full md:w-auto shrink-0">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider">लक्षित भाषा:</span>
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
            {(['santhali', 'ho', 'mundari'] as TribalLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setTargetLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex flex-col items-center ${
                  targetLang === lang
                    ? `${themeConfig.activeNavBg} scale-105`
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{languageLabels[lang].name}</span>
                <span className="text-[10px] opacity-85">{languageLabels[lang].script}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <nav className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
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
