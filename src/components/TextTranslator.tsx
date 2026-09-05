import React, { useState } from 'react';
import { TribalLanguage, TranslationResult } from '../nlp/types';
import { PalashNLPTranslator } from '../nlp/translator';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { Volume2, Copy, Check, BookOpen, ArrowRight } from 'lucide-react';

interface TextTranslatorProps {
  targetLang: TribalLanguage;
}

export const TextTranslator: React.FC<TextTranslatorProps> = ({ targetLang }) => {
  const [inputText, setInputText] = useState('सभी बच्चे अपनी किताब खोलो');
  const [result, setResult] = useState<TranslationResult>(() => 
    PalashNLPTranslator.translate('सभी बच्चे अपनी किताब खोलो', targetLang)
  );
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTranslate = (text: string) => {
    setInputText(text);
    const res = PalashNLPTranslator.translate(text, targetLang);
    setResult(res);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${result.targetText} (${result.devanagariPhonetic})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playAudio = () => {
    setIsPlaying(true);
    PalashPhoneticTTS.speakOffline(
      result.targetText,
      result.devanagariPhonetic,
      result.englishPhonetic,
      targetLang
    );
    setTimeout(() => setIsPlaying(false), 1200);
  };

  const curriculumPresets = [
    { label: 'कक्षा शुरुआत', text: 'नमस्ते बच्चों! सब अपनी जगह बैठ जाओ।' },
    { label: 'निर्देश', text: 'अपनी किताब खोलो और सुनो।' },
    { label: 'प्रश्न', text: 'यह क्या है? यह एक पेड़ है।' },
    { label: 'संख्या बोध', text: 'एक, दो, तीन, चार, पाँच' },
    { label: 'प्रशंसा', text: 'बहुत अच्छा बच्चों! शाबाश!' },
    { label: 'व्यक्तिगत नाम', text: 'तुम्हारा नाम क्या है?' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Presets */}
      <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-800 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span>पाठ्यचर्या एवं निर्देश अनुवाद (Curriculum NLP Engine)</span>
            </h2>
            <p className="text-xs text-slate-500">
              मानक हिंदी FLN पाठ्यपुस्तिका, पाठ योजना और गतिविधि निर्देशों का जनजातीय भाषाओं में संदर्भ-सटीक अनुवाद।
            </p>
          </div>
          <span className="text-xs bg-gradient-to-r from-orange-600 to-rose-600 text-white font-black px-3.5 py-1.5 rounded-full shadow-sm">
            लक्षित भाषा: {targetLang.toUpperCase()}
          </span>
        </div>

        {/* Quick Curriculum Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500">त्वरित पाठ्यक्रम निर्देश:</span>
          {curriculumPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleTranslate(preset.text)}
              className="bg-slate-100 hover:bg-orange-100 hover:text-orange-950 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Translation Workspace (Input & Output side-by-side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Hindi Input */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                स्रोत पाठ (मानक हिंदी FLN):
              </label>
              <span className="text-[10px] text-slate-400 font-semibold">निपुण भारत आधारित</span>
            </div>
            <textarea
              rows={5}
              value={inputText}
              onChange={(e) => handleTranslate(e.target.value)}
              placeholder="यहाँ हिंदी पाठ या गतिविधि निर्देश लिखें..."
              className="w-full p-3.5 text-sm md:text-base border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium shadow-inner"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>अक्षर: {inputText.length}</span>
            <button
              onClick={() => handleTranslate(inputText)}
              className="bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white font-black px-5 py-2 rounded-xl flex items-center space-x-1.5 shadow-md hover:scale-105 transition-all"
            >
              <span>अनुवाद करें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Tribal Output & Dual Script Representation */}
        <div className="bg-gradient-to-br from-orange-50/90 via-amber-50/70 to-rose-50/50 rounded-3xl border border-orange-200 p-6 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-orange-800 uppercase tracking-wide">
                  जनजातीय अनुवाद:
                </span>
                <span className="text-[10px] bg-orange-200 text-orange-950 font-black px-2.5 py-0.5 rounded-full shadow-sm">
                  {result.scriptType === 'olchiki' ? 'ᱚᱞ ᱪᱤᱠᱤ (Ol Chiki)' : (result.scriptType === 'warangchiti' ? 'Warang Chiti / Devanagari' : 'Devanagari')}
                </span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                विश्वास: {Math.round(result.confidence * 100)}% ({result.method})
              </span>
            </div>

            {/* Native Script Display */}
            <div className="bg-white p-4 rounded-2xl border border-orange-200 shadow-inner">
              <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">मूल लिपि (Native Script):</span>
              <p className="text-xl md:text-2xl font-black text-slate-900 leading-relaxed font-olchiki">
                {result.targetText}
              </p>
            </div>

            {/* Teacher Pronunciation Guide (Crucial for Hindi teachers!) */}
            <div className="bg-amber-100/70 p-4 rounded-2xl border border-amber-200">
              <span className="text-[10px] font-black text-amber-900 block uppercase mb-0.5">
                शिक्षक हेतु उच्चारण निर्देश (Pronunciation Guide in Devanagari):
              </span>
              <p className="text-base md:text-lg font-black text-orange-950">
                {result.devanagariPhonetic}
              </p>
              <p className="text-xs text-slate-600 mt-1 italic font-medium">
                रोमन लिपि: {result.englishPhonetic}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center justify-between pt-3 border-t border-orange-200/60">
            <button
              onClick={playAudio}
              className={`bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white font-black px-5 py-2.5 rounded-xl flex items-center space-x-2 text-xs shadow-md transition-all hover:scale-105 active:scale-95 ${
                isPlaying ? 'ring-4 ring-orange-300 animate-pulse' : ''
              }`}
              title="ऑफ़लाइन ऑडियो उच्चारण सुनें"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlaying ? 'वाचन जारी है... 🔊' : 'ऑडियो सुनें (TTS)'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="bg-white hover:bg-orange-50 text-slate-700 font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 text-xs border border-slate-200 shadow-sm transition-all hover:scale-105"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'कॉपी हो गया' : 'कॉपी करें'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Concept Breakdown Chips */}
      {result.tokens && result.tokens.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-wide">
            शब्दावली विश्लेषण एवं अवधारणा मिलान (Vocabulary Alignment):
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {result.tokens.map((token, i) => (
              <div
                key={i}
                className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl px-3.5 py-2 text-xs flex flex-col items-center shadow-sm transition-all"
              >
                <span className="text-slate-500 text-[10px]">{token.hindi}</span>
                <span className="font-bold text-slate-900 font-olchiki text-sm">{token.target}</span>
                <span className="text-[10px] text-orange-700 font-bold">({token.phonetic})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
