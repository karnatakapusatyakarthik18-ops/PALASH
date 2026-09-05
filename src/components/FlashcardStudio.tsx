import React, { useState } from 'react';
import { TribalLanguage, VocabularyItem } from '../nlp/types';
import { PalashNLPTranslator } from '../nlp/translator';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { Volume2, Sparkles, Filter, RotateCw } from 'lucide-react';

interface FlashcardStudioProps {
  targetLang: TribalLanguage;
}

export const FlashcardStudio: React.FC<FlashcardStudioProps> = ({ targetLang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const vocabList = PalashNLPTranslator.getVocabulary(targetLang, selectedCategory);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const playAudio = (item: VocabularyItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePlayingId(item.id);
    PalashPhoneticTTS.speakOffline(
      item.targetText,
      item.devanagariPhonetic,
      item.englishPhonetic,
      targetLang
    );
    setTimeout(() => setActivePlayingId(null), 1000);
  };

  const categories = [
    { id: 'all', label: 'सभी शब्द (All)' },
    { id: 'classroom', label: 'कक्षा संवाद (Classroom)' },
    { id: 'numbers', label: 'संख्याएं 1-10 (Numbers)' },
    { id: 'animals', label: 'जानवर (Animals)' },
    { id: 'nature', label: 'प्रकृति व फूल (Nature)' },
    { id: 'family', label: 'परिवार (Family)' },
    { id: 'body', label: 'शरीर के अंग (Body)' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header & Filter */}
      <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-800 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <span>सचित्र द्विभाषी फ्लैशकार्ड (Visual Flashcard Studio)</span>
            </h2>
            <p className="text-xs text-slate-500">
              कक्षा में बच्चों को चित्र, लिपि (ओल चिकी/देवनागरी) और सटीक उच्चारण सिखाने हेतु परस्पर संवादात्मक कार्ड।
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-black bg-gradient-to-r from-orange-600 to-rose-600 text-white px-3.5 py-1.5 rounded-full shadow-sm">
              कुल फ्लैशकार्ड: {vocabList.length}
            </span>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcards Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {vocabList.map((item) => {
          const isFlipped = !!flippedCards[item.id];
          const isPlaying = activePlayingId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => toggleFlip(item.id)}
              className="group cursor-pointer perspective-1000 h-60 rounded-3xl transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-xl"
            >
              <div
                className={`relative w-full h-full rounded-3xl border-2 transition-transform duration-500 transform-style-preserve-3d ${
                  isFlipped
                    ? 'rotate-y-180 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-100 border-orange-300'
                    : 'bg-white border-slate-200 hover:border-orange-400'
                }`}
              >
                {/* Front Side: Visual + Hindi */}
                <div
                  className={`absolute inset-0 p-4 flex flex-col items-center justify-between backface-hidden ${
                    isFlipped ? 'hidden' : 'flex'
                  }`}
                >
                  <div className="w-full flex items-center justify-between text-[10px] text-slate-400 font-black uppercase tracking-wider">
                    <span>{item.category}</span>
                    <RotateCw className="w-3 h-3 text-slate-300 group-hover:text-orange-500 transition-colors" />
                  </div>

                  <div className="flex flex-col items-center space-y-2 my-auto">
                    <span className="text-5xl filter drop-shadow-sm transition-transform group-hover:scale-110">
                      {item.icon || '📖'}
                    </span>
                    <h3 className="font-black text-slate-800 text-base md:text-lg">{item.hindi}</h3>
                  </div>

                  <div className="w-full flex items-center justify-between gap-1">
                    <button
                      onClick={(e) => playAudio(item, e)}
                      className="p-1.5 bg-orange-100 hover:bg-orange-200 text-orange-900 rounded-lg text-[10px] font-bold flex items-center space-x-1"
                      title="ध्वनि सुनें"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>सुनें</span>
                    </button>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      पलटें ➔
                    </span>
                  </div>
                </div>

                {/* Back Side: Tribal Script + Phonetics + Audio */}
                <div
                  className={`absolute inset-0 p-4 flex flex-col items-center justify-between backface-hidden rotate-y-180 ${
                    isFlipped ? 'flex' : 'hidden'
                  }`}
                >
                  <div className="w-full flex items-center justify-between text-[10px] text-orange-950 font-black">
                    <span>{targetLang.toUpperCase()}</span>
                    <button
                      onClick={(e) => playAudio(item, e)}
                      className={`p-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white rounded-full shadow-md transition-transform hover:scale-110 ${
                        isPlaying ? 'ring-4 ring-orange-300 animate-pulse' : ''
                      }`}
                      title="ध्वनि सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col items-center space-y-1 my-auto text-center">
                    <p className="text-xl md:text-2xl font-black text-orange-950 font-olchiki">
                      {item.targetText}
                    </p>
                    <p className="text-xs font-black text-slate-800 bg-white/90 px-2.5 py-1 rounded-lg border border-orange-200 shadow-sm">
                      उच्चारण: {item.devanagariPhonetic}
                    </p>
                    <p className="text-[10px] text-slate-600 italic font-medium">
                      ({item.englishPhonetic})
                    </p>
                  </div>

                  <button
                    onClick={(e) => playAudio(item, e)}
                    className="w-full py-2 text-xs font-black bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white rounded-xl flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isPlaying ? 'ध्वनि बज रही है... 🔊' : 'ऑडियो सुनें (Audio)'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
