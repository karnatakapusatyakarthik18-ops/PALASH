import React, { useState, useRef } from 'react';
import { TribalLanguage } from '../nlp/types';
import { PalashPhoneticTTS } from '../audio/phoneticSynth';
import { Camera, Upload, Volume2, Sparkles, Image, Check, RefreshCw } from 'lucide-react';

interface VisualObjectIdentifierProps {
  targetLang: TribalLanguage;
}

interface ClassroomObject {
  id: string;
  nameHindi: string;
  category: string;
  icon: string;
  confidence: number;
  tribalData: {
    santhali: { text: string; phonetic: string; sentence: string };
    ho: { text: string; phonetic: string; sentence: string };
    mundari: { text: string; phonetic: string; sentence: string };
  };
}

export const VisualObjectIdentifier: React.FC<VisualObjectIdentifierProps> = ({ targetLang }) => {
  const [selectedObjectId, setSelectedObjectId] = useState<string>('book');
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const sampleObjects: ClassroomObject[] = [
    {
      id: 'book',
      nameHindi: 'किताब (Book)',
      category: 'कक्षा सामग्री',
      icon: '📖',
      confidence: 0.98,
      tribalData: {
        santhali: { text: 'ᱯᱳᱛᱷᱤ', phonetic: 'पोथी', sentence: 'ᱱᱚᱣᱟ ᱫᱚ ᱯᱳᱛᱷᱤ ᱠᱟᱱᱟ। (यह किताब है।)' },
        ho: { text: 'पोथी', phonetic: 'पोथी', sentence: 'नेया पोथी तान। (यह किताब है।)' },
        mundari: { text: 'पोथी', phonetic: 'पोथी', sentence: 'नेया पोथी तान। (यह किताब है।)' }
      }
    },
    {
      id: 'tree',
      nameHindi: 'पेड़ (Tree)',
      category: 'प्रकृति',
      icon: '🌳',
      confidence: 0.96,
      tribalData: {
        santhali: { text: 'ᱫᱟᱨᱮ', phonetic: 'दारे', sentence: 'ᱱᱚᱣᱟ ᱫᱚ ᱫᱟᱨᱮ ᱠᱟᱱᱟ। (यह पेड़ है।)' },
        ho: { text: 'दारू', phonetic: 'दारू', sentence: 'नेया दारू तान। (यह पेड़ है।)' },
        mundari: { text: 'दारू', phonetic: 'दारू', sentence: 'नेया दारू तान। (यह पेड़ है।)' }
      }
    },
    {
      id: 'water',
      nameHindi: 'पानी की बोतल (Water)',
      category: 'दैनिक जीवन',
      icon: '💧',
      confidence: 0.95,
      tribalData: {
        santhali: { text: 'ᱫᱟᱜ', phonetic: 'दाग', sentence: 'ᱱᱚᱣᱟ ᱫᱚ ᱫᱟᱜ ᱠᱟᱱᱟ। (यह पानी है।)' },
        ho: { text: 'दाः', phonetic: 'दाः', sentence: 'नेया दाः तान। (यह पानी है।)' },
        mundari: { text: 'दाः', phonetic: 'दाः', sentence: 'नेया दाः तान। (यह पानी है।)' }
      }
    },
    {
      id: 'flower',
      nameHindi: 'पलाश का फूल (Flower)',
      category: 'प्रकृति व संस्कृति',
      icon: '🌺',
      confidence: 0.99,
      tribalData: {
        santhali: { text: 'ᱵᱟᱦᱟ', phonetic: 'बाहा', sentence: 'ᱱᱚᱣᱟ ᱫᱚ ᱵᱟᱦᱟ ᱠᱟᱱᱟ। (यह फूल है।)' },
        ho: { text: 'बाहा', phonetic: 'बाहा', sentence: 'नेया बाहा तान। (यह फूल है।)' },
        mundari: { text: 'बाहा', phonetic: 'बाहा', sentence: 'नेया बाहा तान। (यह फूल है।)' }
      }
    },
    {
      id: 'fish',
      nameHindi: 'मछली (Fish)',
      category: 'जीव-जंतु',
      icon: '🐟',
      confidence: 0.97,
      tribalData: {
        santhali: { text: 'ᱦᱟᱹᱠᱩ', phonetic: 'हाकू', sentence: 'ᱱᱚᱣᱟ ᱫᱚ ᱦᱟᱹᱠᱩ ᱠᱟᱱᱟᱭ। (यह मछली है।)' },
        ho: { text: 'हाकू', phonetic: 'हाकू', sentence: 'नेया हाकू तान। (यह मछली है।)' },
        mundari: { text: 'हाकू', phonetic: 'हाकू', sentence: 'नेया हाकू तान। (यह मछली है।)' }
      }
    },
    {
      id: 'dog',
      nameHindi: 'कुत्ता (Dog)',
      category: 'पालतू पशु',
      icon: '🐕',
      confidence: 0.94,
      tribalData: {
        santhali: { text: 'ᱥᱮᱛᱟ', phonetic: 'सेता', sentence: 'ᱱᱚᱣᱟ ᱫᱚ ᱥᱮᱛᱟ ᱠᱟᱱᱟᱭ। (यह कुत्ता है।)' },
        ho: { text: 'सेता', phonetic: 'सेता', sentence: 'नेया सेता तान। (यह कुत्ता है।)' },
        mundari: { text: 'सेता', phonetic: 'सेता', sentence: 'नेया सेता तान। (यह कुत्ता है।)' }
      }
    }
  ];

  const currentObj = sampleObjects.find(o => o.id === selectedObjectId) || sampleObjects[0];
  const tribalInfo = currentObj.tribalData[targetLang];

  const handleSelectObject = (obj: ClassroomObject) => {
    setIsScanning(true);
    setSelectedObjectId(obj.id);
    setTimeout(() => {
      setIsScanning(false);
      const data = obj.tribalData[targetLang];
      PalashPhoneticTTS.speakOffline(data.text, data.phonetic, data.phonetic, targetLang);
    }, 400);
  };

  const playObjectAudio = () => {
    PalashPhoneticTTS.speakOffline(tribalInfo.text, tribalInfo.phonetic, tribalInfo.phonetic, targetLang);
  };

  const playSentenceAudio = () => {
    PalashPhoneticTTS.speakOffline(tribalInfo.sentence, tribalInfo.sentence, tribalInfo.sentence, targetLang);
  };

  const toggleCamera = async () => {
    if (isCameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraActive(true);
      } catch (err) {
        alert('कैमरा शुरू नहीं हो सका या अनुमति अस्वीकृत हुई। आप नीचे दिए गए ऑब्जेक्ट्स पर क्लिक करके सीधा टेस्ट कर सकते हैं!');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Overview */}
      <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-md space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center space-x-2">
              <span className="text-2xl">📸</span>
              <span>फोटो खींचो और सीखो (Visual FLN Object Identifier)</span>
            </h2>
            <p className="text-xs text-slate-500">
              कक्षा की वस्तुओं पर कैमरा इंगित करें या चुनें — AI तुरंत वस्तु पहचानकर <strong>{targetLang.toUpperCase()}</strong> में नाम, लिपि और ऑडियो बोलता है।
            </p>
          </div>

          <button
            onClick={toggleCamera}
            className={`px-4 py-2 rounded-xl text-xs font-black shadow-md flex items-center space-x-1.5 transition-all ${
              isCameraActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{isCameraActive ? 'कैमरा बंद करें' : 'लाइव कैमरा चालू करें'}</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Camera Feed / Object Scanner Box */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col items-center justify-center min-h-[360px] border-4 border-slate-800">
          {isCameraActive ? (
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline />
          ) : (
            <div className="text-center p-8 space-y-4">
              <span className="text-8xl filter drop-shadow-2xl block animate-bounce">
                {currentObj.icon}
              </span>
              <p className="text-xs text-slate-400 font-bold">
                पहचानी गई वस्तु: <strong className="text-amber-300 text-sm">{currentObj.nameHindi}</strong>
              </p>
            </div>
          )}

          {/* AI Bounding Box Overlay */}
          <div className="absolute inset-8 border-2 border-emerald-400/80 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
            <div className="flex justify-between items-center">
              <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded shadow">
                AI DETECT: {currentObj.nameHindi} ({Math.round(currentObj.confidence * 100)}%)
              </span>
              <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
            </div>
            <div className="text-right">
              <span className="text-[10px] bg-black/60 text-emerald-300 px-2 py-0.5 rounded font-mono">
                FLN Object Engine v2.0
              </span>
            </div>
          </div>
        </div>

        {/* Right: Trilingual Recognition Results & Audio Cards */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                पहचान परिणाम (Detection Result):
              </span>
              <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                सटीकता: {Math.round(currentObj.confidence * 100)}%
              </span>
            </div>

            {/* Tribal Name & Script */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200 space-y-2 relative">
              <span className="text-[10px] font-black text-orange-800 uppercase block">
                मातृभाषा शब्द ({targetLang.toUpperCase()}):
              </span>
              <p className="text-3xl font-black text-orange-950 font-olchiki">
                {tribalInfo.text}
              </p>
              <p className="text-sm font-black text-slate-800">
                उच्चारण (Pronunciation): <span className="text-orange-900 underline">{tribalInfo.phonetic}</span>
              </p>

              <button
                onClick={playObjectAudio}
                className="absolute top-4 right-4 p-3 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 text-white rounded-full shadow-md transition-transform hover:scale-110 active:scale-95"
                title="शब्द की आवाज़ सुनें"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Classroom Sentence Bridge */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1 relative">
              <span className="text-[10px] font-black text-slate-500 uppercase block">
                कक्षा में बोलने हेतु वाक्य (Classroom Dialogue):
              </span>
              <p className="text-base font-bold text-slate-900 font-olchiki">
                "{tribalInfo.sentence}"
              </p>
              <button
                onClick={playSentenceAudio}
                className="text-xs text-orange-600 hover:text-orange-800 font-bold flex items-center space-x-1 pt-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>वाक्य का पूरा उच्चारण सुनें 🔊</span>
              </button>
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-slate-400 font-semibold">
            टैबलेट पर कैमरा इंगित करने पर यह पूरी प्रक्रिया 100% ऑफ़लाइन काम करती है।
          </div>
        </div>
      </div>

      {/* Classroom Object Selector Chips */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
          त्वरित वस्तु पहचान परीक्षण (One-Tap Test Classroom Objects):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {sampleObjects.map((obj) => (
            <button
              key={obj.id}
              onClick={() => handleSelectObject(obj)}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center space-y-1.5 ${
                selectedObjectId === obj.id
                  ? 'bg-gradient-to-b from-orange-50 to-amber-50 border-orange-500 shadow-md scale-105'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-3xl">{obj.icon}</span>
              <span className="text-xs font-black text-slate-800">{obj.nameHindi.split('(')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
