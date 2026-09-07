import React, { useState } from 'react';
import { Database, BookOpen, Volume2, Sparkles, Download, Layers, CheckCircle2, ExternalLink } from 'lucide-react';
import { TribalLanguage } from '../nlp/types';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import olChikiData from '../../datasets/kaggle_ol_chiki_alphabet.json';
import parallelCorpusData from '../../datasets/kaggle_indic_parallel_corpus.json';
import storyweaverData from '../../datasets/kaggle_storyweaver_tales.json';

interface DatasetExplorerProps {
  currentLang: TribalLanguage;
}

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'olChiki' | 'parallel' | 'stories'>('olChiki');
  const [filterType, setFilterType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSpeak = (text: string, lang: TribalLanguage = currentLang) => {
    PalashPhoneticTTS.speakOffline(text, text, text, lang);
  };

  const filteredOlChiki = olChikiData.characters.filter(c => {
    if (filterType === 'all') return true;
    return c.type === filterType;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Database className="w-3.5 h-3.5" /> Kaggle Open Data Pipeline
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Kaggle & Indic Tribal Datasets Explorer
            </h2>
            <p className="text-purple-200 text-sm max-w-2xl leading-relaxed">
              Curated multilingual datasets extracted from <strong>Kaggle</strong>, <strong>AI4Bharat</strong>, and <strong>Pratham StoryWeaver</strong>, preprocessed with Python for primary school MTB-MLE classrooms in Jharkhand.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="https://www.kaggle.com"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if ((window as any).electronAPI?.openExternal) {
                  e.preventDefault();
                  (window as any).electronAPI.openExternal('https://www.kaggle.com');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white transition-all shadow-sm backdrop-blur-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Kaggle Hub
            </a>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 backdrop-blur-sm">
            <div className="text-xs text-purple-300 font-medium">Ol Chiki Glyphs</div>
            <div className="text-2xl font-bold text-white mt-0.5">{olChikiData.characters.length}</div>
            <div className="text-[10px] text-purple-400">Vowels, Consonants, Digits</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 backdrop-blur-sm">
            <div className="text-xs text-purple-300 font-medium">FLN Parallel Pairs</div>
            <div className="text-2xl font-bold text-white mt-0.5">{parallelCorpusData.pairs.length}</div>
            <div className="text-[10px] text-purple-400">Classroom Commands & Math</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 backdrop-blur-sm">
            <div className="text-xs text-purple-300 font-medium">StoryWeaver Tales</div>
            <div className="text-2xl font-bold text-white mt-0.5">{storyweaverData.stories.length}</div>
            <div className="text-[10px] text-purple-400">Grade 1-3 Graded Readers</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 backdrop-blur-sm">
            <div className="text-xs text-purple-300 font-medium">Pipeline Status</div>
            <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 100% Ingested
            </div>
            <div className="text-[10px] text-purple-400">Client-side offline cached</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-orange-200/60 pb-3">
        <button
          onClick={() => setActiveTab('olChiki')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'olChiki'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
              : 'bg-white/80 text-stone-600 hover:bg-orange-50 hover:text-orange-600'
          }`}
        >
          <Layers className="w-4 h-4" /> 1. Ol Chiki OCR & Alphabet ({olChikiData.characters.length})
        </button>
        <button
          onClick={() => setActiveTab('parallel')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'parallel'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
              : 'bg-white/80 text-stone-600 hover:bg-orange-50 hover:text-orange-600'
          }`}
        >
          <Database className="w-4 h-4" /> 2. IndicCorp FLN Parallel Sentences ({parallelCorpusData.pairs.length})
        </button>
        <button
          onClick={() => setActiveTab('stories')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'stories'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
              : 'bg-white/80 text-stone-600 hover:bg-orange-50 hover:text-orange-600'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 3. StoryWeaver Graded Stories ({storyweaverData.stories.length})
        </button>
      </div>

      {/* TAB 1: Ol Chiki Glyphs */}
      {activeTab === 'olChiki' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500">Filter Type:</span>
              {['all', 'vowel', 'consonant', 'digit'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    filterType === type
                      ? 'bg-orange-100 text-orange-700 border border-orange-300'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="text-xs text-stone-500">
              Source: Kaggle (<code className="bg-stone-100 px-1.5 py-0.5 rounded text-orange-600">ai4bharat/ol-chiki-ocr</code>)
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredOlChiki.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-stone-200 hover:border-orange-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold font-ol-chiki text-orange-600 group-hover:scale-110 transition-transform">
                      {item.char}
                    </span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-base font-bold text-stone-800">{item.name}</div>
                  <div className="text-xs text-stone-500 font-hindi mt-0.5">{item.hindi}</div>
                  <div className="text-[11px] text-amber-700 font-mono mt-1">{item.ipa}</div>
                  <div className="text-[11px] text-stone-600 italic mt-1.5 line-clamp-1">
                    "{item.meaning}"
                  </div>
                </div>

                <button
                  onClick={() => handleSpeak(item.hindi, 'santhali')}
                  className="mt-3 w-full py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" /> उच्चारण सुनें
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Parallel Sentences */}
      {activeTab === 'parallel' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
            <div>
              <strong>Kaggle Parallel Alignment:</strong> NIPUN Bharat Foundational Literacy and Numeracy (FLN) classroom pairs.
            </div>
            <div className="text-stone-400">Total: {parallelCorpusData.pairs.length} sentences</div>
          </div>

          <div className="space-y-3">
            {parallelCorpusData.pairs.map((pair, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wide bg-orange-50 px-2.5 py-0.5 rounded-full">
                    {pair.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono text-stone-400">ID: {pair.id}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <div className="text-[10px] font-semibold text-stone-400 uppercase">Hindi (शिक्षक निर्देश)</div>
                    <div className="text-base font-medium text-stone-800 font-hindi mt-0.5">{pair.hindi}</div>
                    <div className="text-xs text-stone-500 italic mt-1">{pair.english}</div>
                  </div>

                  <div className="p-3 bg-orange-50/60 border border-orange-100 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-semibold text-orange-700 uppercase">Santhali (Ol Chiki + देवनागरी)</div>
                      <button
                        onClick={() => handleSpeak(pair.santhali.devanagari, 'santhali')}
                        className="p-1 hover:bg-orange-200/50 rounded-md text-orange-600 transition-colors"
                        title="उच्चारण सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-base font-bold text-stone-900 font-ol-chiki">{pair.santhali.olChiki}</div>
                    <div className="text-xs text-orange-950 font-hindi">{pair.santhali.devanagari}</div>
                  </div>
                </div>

                {/* Ho and Mundari rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-stone-100">
                  <div className="flex items-center justify-between p-2 bg-stone-50/80 rounded-lg">
                    <div>
                      <span className="font-semibold text-stone-600">Ho: </span>
                      <span className="text-stone-800">{pair.ho.text}</span>
                    </div>
                    <button
                      onClick={() => handleSpeak(pair.ho.text, 'ho')}
                      className="p-1 hover:bg-stone-200 rounded text-stone-600"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-stone-50/80 rounded-lg">
                    <div>
                      <span className="font-semibold text-stone-600">Mundari: </span>
                      <span className="text-stone-800">{pair.mundari.text}</span>
                    </div>
                    <button
                      onClick={() => handleSpeak(pair.mundari.text, 'mundari')}
                      className="p-1 hover:bg-stone-200 rounded text-stone-600"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: StoryWeaver Tales */}
      {activeTab === 'stories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {storyweaverData.stories.map((story, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-stone-200 hover:border-orange-400 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    {story.readingLevel}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">Story #{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-stone-800">{story.titleHindi}</h3>
                <p className="text-xs text-orange-600 font-semibold">{story.theme}</p>

                <div className="p-3 bg-stone-50 rounded-xl space-y-1.5 mt-3">
                  <div className="text-[10px] font-semibold text-stone-500 uppercase">Santhali Title</div>
                  <div className="text-sm font-bold text-stone-800 font-ol-chiki">{story.santhali.title}</div>
                  <div className="text-xs text-stone-600 mt-1">{story.santhali.summary}</div>
                </div>
              </div>

              <button
                onClick={() => handleSpeak(story.santhali.title, 'santhali')}
                className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all"
              >
                <Volume2 className="w-4 h-4" /> कहानी का शीर्षक सुनें
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
