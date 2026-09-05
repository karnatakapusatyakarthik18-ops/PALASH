import React from 'react';
import { TribalLanguage } from '../nlp/types';
import { 
  Mic, BookOpen, FileText, Layers, Sparkles, WifiOff, Cpu, 
  ArrowRight, Award, Edit3, Headphones, Camera, Radio 
} from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface HeroIntroProps {
  onSelectTab: (tab: string) => void;
  targetLang: TribalLanguage;
  setTargetLang: (lang: TribalLanguage) => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({ onSelectTab, targetLang, setTargetLang }) => {
  const { themeConfig } = useTheme();
  const allFeatures = [
    {
      id: 'v2v',
      title: '1. ध्वनि अनुवाद (Voice-to-Voice)',
      desc: 'शिक्षक हिंदी में बोलें और तुरंत संथाली/हो/मुंडारी में सटीक ऑडियो पाएं। <800ms लेटेंसी।',
      icon: Mic,
      gradient: 'from-amber-500 via-orange-500 to-rose-600',
      badge: '<800ms',
      badgeColor: 'bg-emerald-500 text-white'
    },
    {
      id: 'slate',
      title: '2. डिजिटल स्लेट (Letter Tracing)',
      desc: 'पारंपरिक स्लेट पर ओल चिकी व वारंग चिति अक्षर अनुरेखण, चॉक कलर्स एवं ऑडियो शाबाशी।',
      icon: Edit3,
      gradient: 'from-emerald-500 via-teal-600 to-green-700',
      badge: 'इंटरैक्टिव स्लेट',
      badgeColor: 'bg-emerald-600 text-white'
    },
    {
      id: 'game',
      title: '3. सुनो और पहचानो (Phonics Game)',
      desc: 'ध्वनि सुनकर सही चित्र चुनने वाला गेम — बालवाटिका व कक्षा 1 हेतु स्कोर व स्ट्रीक।',
      icon: Headphones,
      gradient: 'from-fuchsia-500 via-purple-600 to-indigo-700',
      badge: 'FLN गेम',
      badgeColor: 'bg-purple-600 text-white'
    },
    {
      id: 'camera',
      title: '4. फोटो पहचानो (Visual Camera FLN)',
      desc: 'कक्षा की वस्तुओं पर कैमरा इंगित करें — AI तुरंत वस्तु पहचानकर मातृभाषा में नाम बोलता है।',
      icon: Camera,
      gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
      badge: 'कैमरा AI',
      badgeColor: 'bg-cyan-600 text-white'
    },
    {
      id: 'folktale',
      title: '5. लोककथाएं व बालगीत (Karaoke)',
      desc: 'वाक्य-दर-वाक्य हाइलाइटिंग एवं ऑडियो के साथ पारंपरिक जनजातीय कथाएं।',
      icon: BookOpen,
      gradient: 'from-blue-600 via-indigo-600 to-violet-700',
      badge: 'मातृभाषा कराओके',
      badgeColor: 'bg-blue-600 text-white'
    },
    {
      id: 'cert',
      title: '6. शिक्षक भाषा सेतु (Certification)',
      desc: 'गैर-जनजातीय शिक्षकों हेतु 5-मिनट दैनिक अभ्यास, प्रश्नोत्तरी एवं आधिकारिक प्रमाण पत्र।',
      icon: Award,
      gradient: 'from-amber-600 via-orange-600 to-red-600',
      badge: 'सर्टिफिकेट',
      badgeColor: 'bg-amber-600 text-white'
    },
    {
      id: 'mesh',
      title: '7. क्लस्टर मेश सिंक (Offline P2P)',
      desc: 'शून्य इंटरनेट वाले क्षेत्रों में टैबलेट-टू-टैबलेट स्थानीय हॉटस्पॉट सामग्री साझाकरण।',
      icon: Radio,
      gradient: 'from-teal-500 via-emerald-600 to-green-700',
      badge: '0 KB डेटा',
      badgeColor: 'bg-teal-600 text-white'
    },
    {
      id: 'customLesson',
      title: '8. कस्टम पाठ योजना निर्माता (AI)',
      desc: 'कोई भी हिंदी विषय लिखें — AI स्वतः 30-मिनट का द्विभाषी कक्षा संवाद तैयार करेगा।',
      icon: Sparkles,
      gradient: 'from-rose-500 via-pink-600 to-purple-600',
      badge: 'AI जनरेटर',
      badgeColor: 'bg-rose-600 text-white'
    },
    {
      id: 'worksheet',
      title: '9. निपुण भारत कार्यपुस्तिका जनरेटर',
      desc: 'कक्षा 1-3 के लिए चित्र मिलान, गिनती और अनुरेखण कार्यपत्रक। A4 प्रिंट रेडी।',
      icon: FileText,
      gradient: 'from-orange-500 via-amber-600 to-yellow-600',
      badge: 'NIPUN Bharat',
      badgeColor: 'bg-orange-600 text-white'
    },
    {
      id: 'flashcards',
      title: '10. 3D सचित्र फ्लैशकार्ड स्टूडियो',
      desc: 'कक्षा में बच्चों को चित्र, लिपि और सटीक उच्चारण सिखाने हेतु 3D फ्लिप कार्ड्स।',
      icon: Layers,
      gradient: 'from-violet-600 via-purple-600 to-pink-600',
      badge: '3D फ्लिप',
      badgeColor: 'bg-violet-600 text-white'
    }
  ];

  return (
    <div className="space-y-8 mb-8">
      {/* Radiant Hero Banner */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${themeConfig.heroGradient} text-white shadow-2xl p-6 md:p-10 border border-white/20 transition-all duration-300`}>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Mission, Headlines & Quick CTAs */}
          <div className="space-y-5 max-w-2xl text-center lg:text-left">
            {/* Mission Tags */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="bg-amber-300 text-stone-950 text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center space-x-1 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>झारखण्ड PALASH MTB-MLE</span>
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 flex items-center space-x-1">
                <WifiOff className="w-3.5 h-3.5 text-emerald-300" />
                <span>100% ऑफ़लाइन टैबलेट रेडी</span>
              </span>
              <span className="bg-emerald-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center space-x-1 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{themeConfig.icon} {themeConfig.shortName}</span>
              </span>
            </div>

            {/* Main App Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
                पलाश वाणी <span className="text-amber-300">(PALASH Vani)</span>
              </h1>
              <p className="text-base md:text-lg font-medium text-stone-100 leading-relaxed">
                झारखण्ड के प्राथमिक विद्यालयों में गैर-जनजातीय शिक्षकों हेतु <strong>संथाली, हो और मुंडारी</strong> में मातृभाषा आधारित बहुभाषी शिक्षण (MTB-MLE) संवर्धन प्रणाली।
              </p>
            </div>

            {/* Quick Action Launch Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
              <button
                onClick={() => onSelectTab('v2v')}
                className="bg-white text-orange-700 hover:bg-amber-50 font-black px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 flex items-center space-x-1.5 text-xs md:text-sm"
              >
                <Mic className="w-4 h-4 text-orange-600 animate-pulse" />
                <span>ध्वनि अनुवाद</span>
              </button>

              <button
                onClick={() => onSelectTab('slate')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 text-xs md:text-sm flex items-center space-x-1.5"
              >
                <Edit3 className="w-4 h-4" />
                <span>डिजिटल स्लेट</span>
              </button>

              <button
                onClick={() => onSelectTab('game')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-black px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 text-xs md:text-sm flex items-center space-x-1.5"
              >
                <Headphones className="w-4 h-4" />
                <span>फ़ोनिक्स गेम</span>
              </button>

              <button
                onClick={() => onSelectTab('camera')}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-black px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 text-xs md:text-sm flex items-center space-x-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>फोटो पहचानो</span>
              </button>

              <button
                onClick={() => onSelectTab('folktale')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 text-xs md:text-sm flex items-center space-x-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>लोककथाएं</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero App Logo with Pulsing Vibrant Halo */}
          <div className="flex flex-col items-center justify-center relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-rose-500 to-violet-600 rounded-full blur-2xl opacity-60 group-hover:opacity-90 animate-pulse transition-opacity"></div>
              
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white/95 backdrop-blur-lg p-3 shadow-2xl border-4 border-white/50 flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <img src="/logo.svg" alt="PALASH Vani Logo" className="w-full h-full object-contain filter drop-shadow-md" />
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-bold">
              <span className="text-amber-300">सक्रिय:</span>
              <span className="uppercase text-white tracking-wider">{targetLang}</span>
              <span className="text-white/60">•</span>
              <span className="text-emerald-300">10 इंटरैक्टिव सुविधाएं</span>
            </div>
          </div>
        </div>
      </div>

      {/* Complete 10-Feature Interactive Hub Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-800 flex items-center space-x-2">
            <span>✨</span>
            <span>पलाश वाणी की सभी 10 प्रमुख सुविधाएं (Complete Feature Directory):</span>
          </h2>
          <span className="text-xs font-bold text-slate-500">
            किसी भी कार्ड पर क्लिक करके सीधे सुविधा खोलें ➔
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => onSelectTab(feat.id)}
                className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feat.gradient} transition-all`}></div>

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
                  <span>खोलें एवं उपयोग करें</span>
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
