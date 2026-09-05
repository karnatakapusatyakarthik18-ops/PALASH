import React, { useRef, useState, useEffect } from 'react';
import { TribalLanguage } from '../nlp/types';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { Eraser, RotateCcw, Volume2, Sparkles, CheckCircle2, Palette } from 'lucide-react';
import olChikiData from '../../datasets/kaggle_ol_chiki_alphabet.json';

interface DigitalSlateProps {
  targetLang: TribalLanguage;
}

export const DigitalSlate: React.FC<DigitalSlateProps> = ({ targetLang }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [chalkColor, setChalkColor] = useState('#ffffff');
  const [chalkSize, setChalkSize] = useState(6);
  const [guideChar, setGuideChar] = useState('ᱚ');
  const [guideName, setGuideName] = useState('LA - अ (Ol Chiki)');
  const [praiseMessage, setPraiseMessage] = useState<string | null>(null);

  // Character sets for slate tracing practice (dynamically powered by Kaggle dataset for Ol Chiki)
  const guides: Record<TribalLanguage, Array<{ char: string; label: string; phonetic: string; english: string }>> = {
    santhali: olChikiData.characters.map(c => ({
      char: c.char,
      label: `${c.char} - ${c.name}`,
      phonetic: c.hindi,
      english: c.meaning
    })),
    ho: [
      { char: '𑣡', label: '1 (Mi)', phonetic: 'मि', english: 'Mi' },
      { char: '𑣢', label: '2 (Bar)', phonetic: 'बार', english: 'Bar' },
      { char: '𑣣', label: '3 (Ape)', phonetic: 'अपि', english: 'Ape' },
      { char: '𑣤', label: '4 (Upun)', phonetic: 'उपुन', english: 'Upun' },
      { char: '𑣥', label: '5 (Moye)', phonetic: 'मोये', english: 'Moye' },
      { char: 'अ', label: 'अ (Akshara)', phonetic: 'अ', english: 'A' },
      { char: 'क', label: 'क (Akshara)', phonetic: 'क', english: 'Ka' }
    ],
    mundari: [
      { char: '१', label: '1 (Miad)', phonetic: 'मियाद', english: 'Miad' },
      { char: '२', label: '2 (Baria)', phonetic: 'बरिया', english: 'Baria' },
      { char: '३', label: '3 (Apia)', phonetic: 'अपिया', english: 'Apia' },
      { char: '४', label: '4 (Upunia)', phonetic: 'उपुनिया', english: 'Upunia' },
      { char: '५', label: '5 (Morea)', phonetic: 'मोड़ेया', english: 'Morea' },
      { char: 'ओ', label: 'ओल (Ol - लिखना)', phonetic: 'ओल', english: 'Ol' }
    ]
  };

  const currentGuides = guides[targetLang] || guides.santhali;

  useEffect(() => {
    // Reset to first guide character of the selected language
    if (currentGuides.length > 0) {
      setGuideChar(currentGuides[0].char);
      setGuideName(`${currentGuides[0].label} (${currentGuides[0].phonetic})`);
    }
    clearCanvas();
  }, [targetLang]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPraiseMessage(null);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineWidth = chalkSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = chalkColor;

    // Chalk powdery texture effect
    ctx.shadowBlur = 2;
    ctx.shadowColor = chalkColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const selectGuide = (item: { char: string; label: string; phonetic: string; english: string }) => {
    setGuideChar(item.char);
    setGuideName(`${item.label} (${item.phonetic})`);
    clearCanvas();
    // Play pronunciation of the letter
    PalashPhoneticTTS.speakOffline(item.char, item.phonetic, item.english, targetLang);
  };

  const handlePraise = async () => {
    setPraiseMessage('ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱵᱮᱥ ᱜᱮ! (शाबाश! बहुत सुंदर लिखा!)');
    // Speak encouraging praise in tribal language
    await PalashPhoneticTTS.speakOffline(
      'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱵᱮᱥ ᱜᱮ!',
      'आडी नापाय! बेस गे! शाबाश!',
      'Ari napay! Bes ge! Shabash!',
      targetLang
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Overview Banner */}
      <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-md space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center space-x-2">
              <span className="text-2xl">📝</span>
              <span>डिजिटल स्लेट (Interactive Slate & Letter Tracing)</span>
            </h2>
            <p className="text-xs text-slate-500">
              निपुण भारत (FLN-L2) लिपि अनुरेखण: बच्चे स्क्रीन पर उंगली या चॉक से <strong>{targetLang.toUpperCase()}</strong> अक्षर और अंक लिखना सीखते हैं।
            </p>
          </div>
          <button
            onClick={handlePraise}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black px-4 py-2 rounded-xl text-xs shadow-md flex items-center space-x-1.5 transition-all hover:scale-105 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>शाबाशी दें (Praise & Audio)</span>
          </button>
        </div>
      </div>

      {/* Guide Character Picker Chips */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
        <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
          अनुरेखण हेतु अक्षर या अंक चुनें (Select Character to Trace):
        </span>
        <div className="flex flex-wrap gap-2">
          {currentGuides.map((item, idx) => (
            <button
              key={idx}
              onClick={() => selectGuide(item)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 ${
                guideChar === item.char
                  ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="text-lg font-olchiki">{item.char}</span>
              <span className="text-[11px] opacity-80">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Traditional Green Chalkboard Slate Container */}
      <div className="relative mx-auto max-w-2xl bg-[#5c4033] p-4 rounded-3xl shadow-2xl border-4 border-[#3e2723]">
        {/* Wooden slate frame screws */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-amber-200/60 border border-amber-900/50"></div>
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-amber-200/60 border border-amber-900/50"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-amber-200/60 border border-amber-900/50"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-amber-200/60 border border-amber-900/50"></div>

        {/* Inner Slate Blackboard / Greenboard */}
        <div className="relative bg-[#1e3f20] rounded-2xl overflow-hidden border-2 border-[#142815] shadow-inner flex items-center justify-center min-h-[380px]">
          {/* Faint Dotted Background Guide Character */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-[220px] font-black text-white/10 font-olchiki tracking-widest drop-shadow-sm">
              {guideChar}
            </span>
          </div>

          {/* Dotted horizontal writing guidelines (like school notebook) */}
          <div className="absolute inset-0 flex flex-col justify-between py-12 pointer-events-none opacity-20">
            <div className="w-full border-b border-dashed border-white"></div>
            <div className="w-full border-b border-white"></div>
            <div className="w-full border-b border-dashed border-white"></div>
          </div>

          {/* Interactive Drawing Canvas */}
          <canvas
            ref={canvasRef}
            width={600}
            height={380}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="w-full h-full cursor-crosshair relative z-10 touch-none"
          />

          {/* Praise message overlay banner */}
          {praiseMessage && (
            <div className="absolute bottom-4 left-4 right-4 bg-amber-400 text-orange-950 font-black px-4 py-2.5 rounded-xl text-xs md:text-sm text-center shadow-lg border border-amber-300 animate-bounce z-20">
              🌟 {praiseMessage}
            </div>
          )}
        </div>

        {/* Chalk & Eraser Toolbar underneath the slate */}
        <div className="mt-3 bg-[#3e2723]/90 backdrop-blur-md rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-white">
          {/* Chalk Colors */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-amber-200 flex items-center space-x-1">
              <Palette className="w-3.5 h-3.5" />
              <span>चॉक रंग:</span>
            </span>
            <div className="flex items-center space-x-1.5">
              {[
                { name: 'White', hex: '#ffffff' },
                { name: 'Yellow', hex: '#fef08a' },
                { name: 'Orange', hex: '#fb923c' },
                { name: 'Sky', hex: '#7dd3fc' },
                { name: 'Pink', hex: '#f472b6' }
              ].map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setChalkColor(c.hex)}
                  style={{ backgroundColor: c.hex }}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    chalkColor === c.hex ? 'scale-125 border-white shadow-md' : 'border-black/30'
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons: Audio, Clear, Praise */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => PalashPhoneticTTS.speakOffline(guideChar, guideName, guideName, targetLang)}
              className="bg-amber-500 hover:bg-amber-600 text-orange-950 px-3 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1 shadow-sm transition-all active:scale-95"
              title="अक्षर का उच्चारण सुनें"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>उच्चारण</span>
            </button>

            <button
              onClick={clearCanvas}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm transition-all active:scale-95"
              title="स्लेट साफ़ करें (डस्टर)"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>साफ़ करें (डस्टर)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
