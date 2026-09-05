import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'mintBlack' | 'onyxMint' | 'forest' | 'palash' | 'indigo' | 'terracotta';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  shortName: string;
  icon: string;
  headerGradient: string;
  heroGradient: string;
  pageBackground: string;
  primaryBtn: string;
  primaryBg: string;
  primaryText: string;
  primaryBorder: string;
  badgeBg: string;
  activeNavBg: string;
  themeColorMeta: string;
  isDark?: boolean;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  mintBlack: {
    id: 'mintBlack',
    name: 'लाइट ग्रीन और ब्लैक (Mint & Black)',
    shortName: 'ग्रीन-ब्लैक',
    icon: '🟢',
    headerGradient: 'from-black via-zinc-950 to-neutral-900 border-b border-emerald-400/30',
    heroGradient: 'from-zinc-950 via-black to-neutral-900 border border-emerald-400/30',
    pageBackground: 'from-[#f0fdf4] via-[#ecfdf5] to-[#dcfce7]',
    primaryBtn: 'bg-black hover:bg-zinc-800 text-emerald-400 border border-emerald-400/50 shadow-lg shadow-black/25 font-black',
    primaryBg: 'bg-emerald-100/90',
    primaryText: 'text-stone-950 font-black',
    primaryBorder: 'border-stone-900',
    badgeBg: 'bg-emerald-400 text-black font-black',
    activeNavBg: 'bg-black text-emerald-400 font-black shadow-md shadow-emerald-500/25 border border-emerald-400/40',
    themeColorMeta: '#09090b',
    isDark: false
  },
  onyxMint: {
    id: 'onyxMint',
    name: 'ब्लैक और नियॉन ग्रीन (Onyx & Mint Dark)',
    shortName: 'डार्क मिंट',
    icon: '🖤',
    headerGradient: 'from-black via-stone-950 to-neutral-950 border-b border-emerald-500/40',
    heroGradient: 'from-stone-950 via-zinc-950 to-black border border-emerald-500/30',
    pageBackground: 'from-[#0a0f0d] via-[#0f1713] to-[#070b09]',
    primaryBtn: 'bg-emerald-400 hover:bg-emerald-300 text-black font-black shadow-lg shadow-emerald-400/30',
    primaryBg: 'bg-emerald-950/70',
    primaryText: 'text-emerald-300 font-bold',
    primaryBorder: 'border-emerald-500/50',
    badgeBg: 'bg-emerald-400 text-black font-black',
    activeNavBg: 'bg-emerald-400 text-black font-black shadow-md shadow-emerald-400/30',
    themeColorMeta: '#0a0f0d',
    isDark: true
  },
  forest: {
    id: 'forest',
    name: 'झारखंड वनभूमि (Forest Emerald)',
    shortName: 'वनभूमि हरा',
    icon: '🌲',
    headerGradient: 'from-emerald-900 via-teal-800 to-green-950',
    heroGradient: 'from-emerald-800 via-teal-800 to-green-900',
    pageBackground: 'from-[#f2f8f4] via-[#f7fbf8] to-[#edf5f0]',
    primaryBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20',
    primaryBg: 'bg-emerald-50',
    primaryText: 'text-emerald-800 font-bold',
    primaryBorder: 'border-emerald-300',
    badgeBg: 'bg-emerald-500 text-white',
    activeNavBg: 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-emerald-900/20',
    themeColorMeta: '#064e3b',
    isDark: false
  },
  palash: {
    id: 'palash',
    name: 'राजसी पलाश (Flame Coral)',
    shortName: 'पलाश फ्लेम',
    icon: '🌺',
    headerGradient: 'from-orange-600 via-rose-600 to-purple-700',
    heroGradient: 'from-orange-600 via-rose-600 to-purple-800',
    pageBackground: 'from-[#fffaf4] via-[#fcf8f5] to-[#f6f2ec]',
    primaryBtn: 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-700/20',
    primaryBg: 'bg-orange-50',
    primaryText: 'text-orange-800 font-bold',
    primaryBorder: 'border-orange-300',
    badgeBg: 'bg-orange-500 text-white',
    activeNavBg: 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-orange-900/20',
    themeColorMeta: '#ea580c',
    isDark: false
  },
  indigo: {
    id: 'indigo',
    name: 'ज्ञान सागर (Royal Indigo)',
    shortName: 'रॉयल इंडिगो',
    icon: '🌊',
    headerGradient: 'from-indigo-900 via-blue-800 to-slate-900',
    heroGradient: 'from-indigo-800 via-blue-700 to-slate-900',
    pageBackground: 'from-[#f0f4fd] via-[#f7f9ff] to-[#edf1fc]',
    primaryBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-700/20',
    primaryBg: 'bg-indigo-50',
    primaryText: 'text-indigo-800 font-bold',
    primaryBorder: 'border-indigo-300',
    badgeBg: 'bg-indigo-500 text-white',
    activeNavBg: 'bg-gradient-to-r from-indigo-700 to-blue-700 text-white shadow-indigo-900/20',
    themeColorMeta: '#312e81',
    isDark: false
  },
  terracotta: {
    id: 'terracotta',
    name: 'सोहराय माटी (Earthy Terracotta)',
    shortName: 'सोहराय माटी',
    icon: '🏺',
    headerGradient: 'from-stone-900 via-amber-950 to-orange-950',
    heroGradient: 'from-amber-900 via-orange-900 to-stone-900',
    pageBackground: 'from-[#faf5ee] via-[#fcf9f5] to-[#f5eee3]',
    primaryBtn: 'bg-amber-700 hover:bg-amber-800 text-white shadow-amber-800/20',
    primaryBg: 'bg-amber-50',
    primaryText: 'text-amber-900 font-bold',
    primaryBorder: 'border-amber-300',
    badgeBg: 'bg-amber-600 text-white',
    activeNavBg: 'bg-gradient-to-r from-amber-800 to-orange-800 text-white shadow-stone-900/20',
    themeColorMeta: '#78350f',
    isDark: false
  }
};

interface ThemeContextType {
  theme: ThemeMode;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'mintBlack',
  themeConfig: THEMES.mintBlack,
  setTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to 'mintBlack' (Light Green and Black) as requested by user
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('palash_theme') as ThemeMode;
      if (saved && THEMES[saved]) return saved;
    }
    return 'mintBlack';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('palash_theme', newTheme);
      // Update HTML theme-color meta tag
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute('content', THEMES[newTheme].themeColorMeta);
      }
    }
  };

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', THEMES[theme].themeColorMeta);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeConfig: THEMES[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
