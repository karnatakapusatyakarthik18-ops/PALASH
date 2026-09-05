import React, { useState } from 'react';
import { TribalLanguage } from './nlp/types';
import { Navbar } from './components/Navbar';
import { HeroIntro } from './components/HeroIntro';
import { VoiceTranslator } from './components/VoiceTranslator';
import { DigitalSlate } from './components/DigitalSlate';
import { PhonicsGame } from './components/PhonicsGame';
import { VisualObjectIdentifier } from './components/VisualObjectIdentifier';
import { FolkTalePlayer } from './components/FolkTalePlayer';
import { TeacherCertification } from './components/TeacherCertification';
import { MeshSyncSimulator } from './components/MeshSyncSimulator';
import { CustomLessonGenerator } from './components/CustomLessonGenerator';
import { TextTranslator } from './components/TextTranslator';
import { WorksheetGenerator } from './components/WorksheetGenerator';
import { FlashcardStudio } from './components/FlashcardStudio';
import { LessonScriptViewer } from './components/LessonScriptViewer';
import { OfflineDiagnostics } from './components/OfflineDiagnostics';
import { DatasetExplorer } from './components/DatasetExplorer';
import { useTheme } from './theme/ThemeContext';

export type UserRole = 'all' | 'teacher' | 'student';

export const App: React.FC = () => {
  const { themeConfig } = useTheme();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [targetLang, setTargetLang] = useState<TribalLanguage>('santhali');
  const [isOffline, setIsOffline] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<UserRole>('all');

  return (
    <div className={`min-h-screen bg-gradient-to-b ${themeConfig.pageBackground} flex flex-col font-sans selection:bg-emerald-400 selection:text-black transition-colors duration-300 ${themeConfig.isDark ? 'dark text-stone-100' : 'text-stone-900'}`}>
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        targetLang={targetLang}
        setTargetLang={setTargetLang}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        {currentTab === 'home' && (
          <HeroIntro
            onSelectTab={(tab) => setCurrentTab(tab)}
            targetLang={targetLang}
            setTargetLang={setTargetLang}
            userRole={userRole}
            setUserRole={setUserRole}
          />
        )}
        {currentTab === 'v2v' && <VoiceTranslator targetLang={targetLang} />}
        {currentTab === 'slate' && <DigitalSlate targetLang={targetLang} />}
        {currentTab === 'game' && <PhonicsGame targetLang={targetLang} />}
        {currentTab === 'camera' && <VisualObjectIdentifier targetLang={targetLang} />}
        {currentTab === 'folktale' && <FolkTalePlayer targetLang={targetLang} />}
        {currentTab === 'cert' && <TeacherCertification targetLang={targetLang} />}
        {currentTab === 'mesh' && <MeshSyncSimulator />}
        {currentTab === 'customLesson' && <CustomLessonGenerator targetLang={targetLang} />}
        {currentTab === 'text' && <TextTranslator targetLang={targetLang} />}
        {currentTab === 'worksheet' && <WorksheetGenerator targetLang={targetLang} />}
        {currentTab === 'flashcards' && <FlashcardStudio targetLang={targetLang} />}
        {currentTab === 'datasets' && <DatasetExplorer currentLang={targetLang} />}
        {currentTab === 'lessons' && <LessonScriptViewer targetLang={targetLang} />}
        {currentTab === 'diagnostics' && <OfflineDiagnostics isOffline={isOffline} setIsOffline={setIsOffline} />}
      </main>

      {/* Classroom Helper Footer (Hidden in print) */}
      <footer className="no-print bg-white/80 backdrop-blur-md border-t border-slate-200/80 py-6 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-600">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-orange-600 p-0.5 flex items-center justify-center shadow-sm">
              <img src="/logo.svg" alt="Logo" className="w-full h-full" />
            </div>
            <p className="font-extrabold text-slate-800">
              पलाश वाणी (PALASH Vani) • झारखंड मातृभाषा बहुभाषी शिक्षण संवर्धन (MTB-MLE)
            </p>
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-semibold text-slate-500">
            <span>संथाली (Ol Chiki)</span>
            <span>•</span>
            <span>हो (Warang Chiti)</span>
            <span>•</span>
            <span>मुंडारी</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">100% ऑफ़लाइन (≤2GB RAM)</span>
            <span>•</span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-black text-[10px]">v2.0 अपडेटेड</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
