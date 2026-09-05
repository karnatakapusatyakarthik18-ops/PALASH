import React, { useState, useEffect } from 'react';
import { TribalLanguage } from '../nlp/types';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { Play, Pause, RotateCcw, Volume2, BookOpen, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface FolkTalePlayerProps {
  targetLang: TribalLanguage;
}

interface StorySentence {
  id: number;
  tribalText: {
    santhali: { text: string; phonetic: string };
    ho: { text: string; phonetic: string };
    mundari: { text: string; phonetic: string };
  };
  hindi: string;
}

interface Story {
  id: string;
  titleHindi: string;
  titleTribal: Record<TribalLanguage, string>;
  theme: string;
  moral: string;
  icon: string;
  sentences: StorySentence[];
}

export const FolkTalePlayer: React.FC<FolkTalePlayerProps> = ({ targetLang }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stories: Story[] = [
    {
      id: 'tree_and_bird',
      titleHindi: 'जंगल का विशाल पेड़ और चिड़िया',
      titleTribal: {
        santhali: 'ᱵᱤᱨ ᱫᱟᱨᱮ ᱟᱨ ᱪᱮᱬᱮ (बीर दारे आर चेड़े)',
        ho: 'बीर दारू आर चेणे (बीर दारू आर चेणे)',
        mundari: 'बीर दारू आर चेणे (बीर दारू आर चेणे)'
      },
      theme: 'प्रकृति एवं मित्रता (Nature & Friendship)',
      moral: 'पेड़ सभी जीवों को आश्रय और भोजन देते हैं, हमें पेड़ों की रक्षा करनी चाहिए।',
      icon: '🌳🐦',
      sentences: [
        {
          id: 1,
          tribalText: {
            santhali: { text: 'ᱢᱤᱫ ᱢᱟᱨᱟᱝ ᱵᱤᱨ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ।', phonetic: 'मिद मारांग बीर ताहे काना।' },
            ho: { text: 'मि मारांग बीर ताएकेना।', phonetic: 'मि मारांग बीर ताएकेना।' },
            mundari: { text: 'मियाद मारांग बीर ताएकेना।', phonetic: 'मियाद मारांग बीर ताएकेना।' }
          },
          hindi: 'एक बहुत बड़ा घना जंगल था।'
        },
        {
          id: 2,
          tribalText: {
            santhali: { text: 'ᱚᱱᱟ ᱵᱤᱨ ᱨᱮ ᱢᱤᱫ ᱩᱥᱩᱞ ᱫᱟᱨᱮ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ।', phonetic: 'ओना बीर रे मिद उसुल दारे ताहे काना।' },
            ho: { text: 'एना बीर रे मि उसुल दारू ताएकेना।', phonetic: 'एना बीर रे मि उसुल दारू ताएकेना।' },
            mundari: { text: 'एना बीर रे मियाद उसुल दारू ताएकेना।', phonetic: 'एना बीर रे मियाद उसुल दारू ताएकेना।' }
          },
          hindi: 'उस जंगल में एक बहुत ऊँचा हरा पेड़ था।'
        },
        {
          id: 3,
          tribalText: {
            santhali: { text: 'ᱫᱟᱨᱮ ᱪᱮᱛᱟᱱ ᱨᱮ ᱢᱤᱫ ᱪᱮᱬᱮ ᱛᱩᱠᱟᱹ ᱛᱮᱭᱟᱨ ᱞᱮᱫᱟᱭ।', phonetic: 'दारे चेतान रे मिद चेड़े तुका तेयार लेदाय।' },
            ho: { text: 'दारू चेतान रे मि चेणे तुका बाईकेदा।', phonetic: 'दारू चेतान रे मि चेणे तुका बाईकेदा।' },
            mundari: { text: 'दारू चेतान रे मियाद चेणे तुका बाईकेदा।', phonetic: 'दारू चेतान रे मियाद चेणे तुका बाईकेदा।' }
          },
          hindi: 'उस पेड़ की डाली पर एक प्यारी चिड़िया ने घोंसला बनाया।'
        },
        {
          id: 4,
          tribalText: {
            santhali: { text: 'ᱫᱟᱨᱮ ᱫᱚ ᱪᱮᱬᱮ ᱡᱚᱢᱟᱜ ᱟᱨ ᱩᱢᱩᱞ ᱮᱢᱟᱫᱮᱭᱟ।', phonetic: 'दारे दो चेड़े जोमाग आर उमुल एमादेया।' },
            ho: { text: 'दारू चेणे के जोमाः आर उमबुल एमाएया।', phonetic: 'दारू चेणे के जोमाः आर उमबुल एमाएया।' },
            mundari: { text: 'दारू चेणे के जोमाः आर उमबुल एमाएया।', phonetic: 'दारू चेणे के जोमाः आर उमबुल एमाएया।' }
          },
          hindi: 'पेड़ चिड़िया को मीठे फल और शीतल छाया देता था।'
        },
        {
          id: 5,
          tribalText: {
            santhali: { text: 'ᱵᱟᱱᱟᱨ ᱦᱚᱲ ᱟᱹᱰᱤ ᱠᱩᱥᱤ ᱛᱮ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟᱠᱤᱱ।', phonetic: 'बानार होड़ आडी कुसी ते ताहे कानाकीन।' },
            ho: { text: 'किनार बानार बेसगे ताएकेनाकिन।', phonetic: 'किनार बानार बेसगे ताएकेनाकिन।' },
            mundari: { text: 'किनार बानार बुगिनगे ताएकेनाकिन।', phonetic: 'किनार बानार बुगिनगे ताएकेनाकिन।' }
          },
          hindi: 'दोनों बहुत खुशी-खुशी साथ रहते थे।'
        }
      ]
    },
    {
      id: 'sun_and_moon',
      titleHindi: 'सूरज और चाँद (सिंगी आर चांदो)',
      titleTribal: {
        santhali: 'ᱥᱤᱝᱜᱤ ᱟᱨ ᱪᱟᱸᱫᱳ (सिंगी आर चांदो)',
        ho: 'सिंगी आर चांदो (सिंगी आर चांदो)',
        mundari: 'सिंगी आर चंदू (सिंगी आर चंदू)'
      },
      theme: 'आकाश एवं दिन-रात (Day & Night Rhyme)',
      moral: 'प्रकृति में हर किसी का अपना विशेष समय और महत्व होता है।',
      icon: '☀️🌙',
      sentences: [
        {
          id: 1,
          tribalText: {
            santhali: { text: 'ᱥᱮᱛᱟᱜ ᱨᱮ ᱥᱤᱝᱜᱤ ᱨᱟᱠᱟᱵᱚᱜᱼᱟᱭ।', phonetic: 'सेताग रे सिंगी राकाबोगाए।' },
            ho: { text: 'सेता रे सिंगी तुड़ुगोवा।', phonetic: 'सेता रे सिंगी तुड़ुगोवा।' },
            mundari: { text: 'सेता रे सिंगी तुड़ुगोवा।', phonetic: 'सेता रे सिंगी तुड़ुगोवा।' }
          },
          hindi: 'सुबह के समय पूर्व से सूरज उगता है।'
        },
        {
          id: 2,
          tribalText: {
            santhali: { text: 'ᱥᱤᱝᱜᱤ ᱫᱚ ᱫᱷᱟᱹᱨᱛᱤ ᱨᱮ ᱢᱟᱨᱥᱟᱞ ᱮᱢᱟᱭ।', phonetic: 'सिंगी दो धारती रे मारसाल एमाय।' },
            ho: { text: 'सिंगी धरती रे मारशाल एमाए।', phonetic: 'सिंगी धरती रे मारशाल एमाए।' },
            mundari: { text: 'सिंगी धरती रे मारशाल एमाए।', phonetic: 'सिंगी धरती रे मारशाल एमाए।' }
          },
          hindi: 'सूरज पूरी धरती को सुनहरा प्रकाश देता है।'
        },
        {
          id: 3,
          tribalText: {
            santhali: { text: 'ᱧᱤᱫᱟᱹ ᱨᱮ ᱪᱟᱸᱫᱳ ᱢᱟᱨᱥᱟᱞ ᱮᱢᱟᱭ।', phonetic: 'ञिदा रे चांदो मारसाल एमाय।' },
            ho: { text: 'निदा रे चांदो मारशाल एमाए।', phonetic: 'निदा रे चांदो मारशाल एमाए।' },
            mundari: { text: 'निदा रे चंदू मारशाल एमाए।', phonetic: 'निदा रे चंदू मारशाल एमाए।' }
          },
          hindi: 'रात होते ही चाँद और तारे चमकते हैं।'
        }
      ]
    }
  ];

  const currentStory = stories[selectedStoryIndex];
  const currentSentence = currentStory.sentences[currentSentenceIndex];

  const playSentenceAudio = async (sentence: StorySentence) => {
    const data = sentence.tribalText[targetLang];
    await PalashPhoneticTTS.speakOffline(data.text, data.phonetic, data.phonetic, targetLang);
  };

  const handlePlayToggle = async () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      await playSentenceAudio(currentSentence);
    }
  };

  const handleNextSentence = () => {
    if (currentSentenceIndex < currentStory.sentences.length - 1) {
      const nextIndex = currentSentenceIndex + 1;
      setCurrentSentenceIndex(nextIndex);
      playSentenceAudio(currentStory.sentences[nextIndex]);
    }
  };

  const handlePrevSentence = () => {
    if (currentSentenceIndex > 0) {
      const prevIndex = currentSentenceIndex - 1;
      setCurrentSentenceIndex(prevIndex);
      playSentenceAudio(currentStory.sentences[prevIndex]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Story Selector */}
      <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center space-x-2">
              <span className="text-2xl">📖</span>
              <span>झारखंड जनजातीय लोककथा एवं बालगीत (Tribal Folk Tales)</span>
            </h2>
            <p className="text-xs text-slate-500">
              मातृभाषा कराओके: कहानी सुनते समय वाक्य स्वतः हाइलाइट होते हैं (NIPUN FLN-L3 समझ विकास)।
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {stories.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => {
                  setSelectedStoryIndex(idx);
                  setCurrentSentenceIndex(0);
                  setIsPlaying(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 ${
                  selectedStoryIndex === idx
                    ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{st.icon}</span>
                <span>{st.titleHindi}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Story Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Story Header Banner */}
        <div className="bg-gradient-to-r from-orange-600 via-rose-600 to-purple-700 text-white p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-black uppercase text-amber-200">
              थीम: {currentStory.theme}
            </span>
            <h3 className="text-xl md:text-2xl font-black">
              {currentStory.titleHindi}
            </h3>
            <p className="text-xs text-orange-100 font-olchiki">
              {currentStory.titleTribal[targetLang]}
            </p>
          </div>

          <div className="text-4xl filter drop-shadow-md">
            {currentStory.icon}
          </div>
        </div>

        {/* Sentence by Sentence Karaoke Display */}
        <div className="p-6 md:p-8 space-y-4">
          <div className="space-y-3">
            {currentStory.sentences.map((sent, idx) => {
              const isCurrent = idx === currentSentenceIndex;
              const sentData = sent.tribalText[targetLang];
              return (
                <div
                  key={sent.id}
                  onClick={() => {
                    setCurrentSentenceIndex(idx);
                    playSentenceAudio(sent);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-orange-50 via-amber-50 to-rose-50 border-orange-400 shadow-md scale-[1.01]'
                      : 'bg-slate-50/70 border-transparent hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                      isCurrent ? 'bg-orange-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {sent.id}
                    </span>

                    <div className="space-y-1 flex-1">
                      {/* Tribal Native Script */}
                      <p className={`font-black text-base md:text-lg leading-relaxed font-olchiki ${
                        isCurrent ? 'text-orange-950' : 'text-slate-800'
                      }`}>
                        {sentData.text}
                      </p>

                      {/* Devanagari Pronunciation Guide */}
                      <p className="text-xs font-bold text-orange-900">
                        उच्चारण: <span className="underline">{sentData.phonetic}</span>
                      </p>

                      {/* Hindi Subtitle */}
                      <p className="text-xs text-slate-500 font-medium">
                        हिंदी: "{sent.hindi}"
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playSentenceAudio(sent);
                      }}
                      className="p-2 bg-white hover:bg-orange-100 text-orange-600 rounded-full shadow-sm shrink-0"
                      title="इस वाक्य की आवाज़ सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Moral Box */}
          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs flex items-center space-x-3 text-emerald-950">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="block text-emerald-900">कथा से सीख (Moral of Story):</strong>
              <p className="mt-0.5">{currentStory.moral}</p>
            </div>
          </div>
        </div>

        {/* Audio Playback Controls Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-bold text-slate-600">
            वाक्य {currentSentenceIndex + 1} / {currentStory.sentences.length}
          </div>

          {/* Controls: Prev, Play/Pause, Next */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevSentence}
              disabled={currentSentenceIndex === 0}
              className="p-2 bg-white hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl shadow-sm transition-all"
              title="पिछला वाक्य"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handlePlayToggle}
              className="bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white font-black px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'रोकें' : 'बोलें (Play Sentence)'}</span>
            </button>

            <button
              onClick={handleNextSentence}
              disabled={currentSentenceIndex === currentStory.sentences.length - 1}
              className="p-2 bg-white hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl shadow-sm transition-all"
              title="अगला वाक्य"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => {
              setCurrentSentenceIndex(0);
              playSentenceAudio(currentStory.sentences[0]);
            }}
            className="flex items-center space-x-1 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>शुरुआत से सुनें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
