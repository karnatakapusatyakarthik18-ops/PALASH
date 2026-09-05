import React, { useState } from 'react';
import { TribalLanguage } from '../nlp/types';
import { WORKSHEET_TEMPLATES } from '../curriculum/worksheetData';
import { Printer, FileCheck } from 'lucide-react';

interface WorksheetGeneratorProps {
  targetLang: TribalLanguage;
}

export const WorksheetGenerator: React.FC<WorksheetGeneratorProps> = ({ targetLang }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('matching_animals');
  const [schoolName, setSchoolName] = useState('उत्क्रमित प्राथमिक विद्यालय, पश्चिम सिंहभूम, झारखण्ड');
  const [studentGrade, setStudentGrade] = useState('कक्षा 1 (Grade 1)');

  const template = WORKSHEET_TEMPLATES[selectedTemplateId] || WORKSHEET_TEMPLATES.matching_animals;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Control Panel (Hidden on Print) */}
      <div className="no-print bg-white rounded-2xl border border-orange-100 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-800 flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-orange-600" />
              <span>निपुण भारत द्विभाषी कार्यपुस्तिका जनरेटर (NIPUN Worksheet Generator)</span>
            </h2>
            <p className="text-xs text-slate-500">
              कक्षा 1-3 के विद्यार्थियों के लिए स्वतः-जनरेटेड मुद्रण-योग्य द्विभाषी कार्यपत्रक (A4 प्रिंट रेडी)।
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-5 py-2.5 rounded-xl flex items-center space-x-2 shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>A4 प्रिंट / PDF सेव करें</span>
          </button>
        </div>

        {/* Template & Options Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">कार्यपत्रक गतिविधि चुनें:</label>
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="w-full text-xs font-semibold p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="matching_animals">चित्र एवं शब्द मिलान (Animals Matching)</option>
              <option value="counting_nature">गिनो और संख्या लिखो (Counting 1-5)</option>
              <option value="tracing_olchiki">ओल चिकी वर्ण अनुरेखण (Letter Tracing)</option>
              <option value="classroom_dialogue">कक्षा क्रिया निर्देश (Classroom Actions)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">विद्यालय का नाम:</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">कक्षा स्तर:</label>
            <select
              value={studentGrade}
              onChange={(e) => setStudentGrade(e.target.value)}
              className="w-full text-xs font-semibold p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="बालवाटिका (Balvatika)">बालवाटिका (Balvatika)</option>
              <option value="कक्षा 1 (Grade 1)">कक्षा 1 (Grade 1)</option>
              <option value="कक्षा 2 (Grade 2)">कक्षा 2 (Grade 2)</option>
              <option value="कक्षा 3 (Grade 3)">कक्षा 3 (Grade 3)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Printable A4 Worksheet Sheet View */}
      <div className="bg-white border-2 border-slate-800 rounded-xl shadow-2xl p-8 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0 print:m-0 print:w-full print:max-w-none">
        {/* Printable Decorative Tribal Border */}
        <div className="border-4 border-double border-orange-950 p-6 rounded-lg min-h-[900px] flex flex-col justify-between">
          <div>
            {/* Header Section with Official Logos & School Info */}
            <div className="border-b-2 border-orange-950 pb-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-orange-900 p-1 flex items-center justify-center">
                    <img src="/logo.svg" alt="PALASH Logo" className="w-full h-full" />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-xl font-black text-orange-950 tracking-tight">
                      पलाश मातृभाषा बहुभाषी शिक्षण कार्यक्रम (PALASH MTB-MLE)
                    </h1>
                    <p className="text-xs font-bold text-slate-700">
                      झारखण्ड शिक्षा परियोजना परिषद् (JEPC) • निपुण भारत मिशन
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-orange-900 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded">
                    {template.competencyCode}
                  </span>
                  <p className="text-[10px] font-bold text-slate-600 mt-0.5">माध्यम: {targetLang.toUpperCase()} - हिंदी</p>
                </div>
              </div>

              {/* School Details & Student Info Fill Block */}
              <div className="mt-3 pt-2 border-t border-dashed border-slate-300 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-semibold text-slate-800">
                <div className="col-span-2">
                  <span className="text-slate-500">विद्यालय: </span>
                  <span className="font-bold underline">{schoolName}</span>
                </div>
                <div>
                  <span className="text-slate-500">कक्षा: </span>
                  <span className="font-bold underline">{studentGrade}</span>
                </div>
                <div>
                  <span className="text-slate-500">दिनांक: </span>
                  <span className="border-b border-dotted border-slate-600 inline-block w-20"></span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500">विद्यार्थी का नाम: </span>
                  <span className="border-b border-dotted border-slate-600 inline-block w-48"></span>
                </div>
                <div>
                  <span className="text-slate-500">क्रमांक (Roll No): </span>
                  <span className="border-b border-dotted border-slate-600 inline-block w-16"></span>
                </div>
              </div>
            </div>

            {/* Worksheet Activity Title & Instructions */}
            <div className="bg-orange-50/80 border border-orange-200 rounded-lg p-3 mb-6">
              <h2 className="text-base font-extrabold text-orange-950">
                {template.titleHindi} ({template.titleEnglish})
              </h2>
              <p className="text-xs text-slate-700 font-medium mt-1">
                <strong>निर्देश:</strong> {template.instructionsHindi}
              </p>
              <p className="text-xs text-orange-900 font-semibold font-olchiki mt-0.5">
                <strong>ᱦᱩᱠᱩᱢ:</strong> {template.instructionsTribal[targetLang]}
              </p>
            </div>

            {/* Content Display based on activity type */}
            {template.activityType === 'matching' && (
              <div className="space-y-4">
                {template.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-orange-400 transition-all"
                  >
                    {/* Left: Picture & Hindi */}
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl p-2 bg-slate-100 rounded-lg border border-slate-200">
                        {item.icon}
                      </span>
                      <div>
                        <span className="text-sm font-bold text-slate-800">{item.hindi}</span>
                        <span className="text-[11px] text-slate-500 block">चित्र {index + 1}</span>
                      </div>
                    </div>

                    {/* Middle: Line matching circle connector */}
                    <div className="flex items-center space-x-6">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-orange-700 bg-white"></div>
                      <span className="text-slate-300 text-xs tracking-widest hidden md:inline">-----------------</span>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-orange-700 bg-white"></div>
                    </div>

                    {/* Right: Tribal Word with script & phonetic */}
                    <div className="text-right min-w-[120px]">
                      <span className="text-lg font-bold text-orange-950 font-olchiki block">
                        {item.tribalText}
                      </span>
                      <span className="text-xs text-slate-600 font-medium block">
                        ({item.phonetic})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {template.activityType === 'counting' && (
              <div className="space-y-4">
                {template.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border-2 border-slate-200 rounded-xl"
                  >
                    {/* Item count visual */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-400 w-5">{index + 1}.</span>
                      <div className="flex items-center space-x-1.5 bg-amber-50/60 p-2 rounded-lg border border-amber-200">
                        {Array.from({ length: item.count || 1 }).map((_, cIdx) => (
                          <span key={cIdx} className="text-2xl">{item.icon}</span>
                        ))}
                      </div>
                    </div>

                    {/* Counting boxes to write */}
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-600 block">{item.hindi}</span>
                        <span className="text-xs font-bold text-orange-900 font-olchiki block">{item.tribalText}</span>
                      </div>
                      <div className="w-14 h-14 border-2 border-dashed border-orange-900 rounded-lg flex items-center justify-center font-bold text-slate-400 text-xs">
                        यहाँ लिखें
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {template.activityType === 'tracing' && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {template.items.map((item) => (
                  <div
                    key={item.id}
                    className="border-2 border-slate-300 rounded-xl p-4 text-center space-y-2 bg-slate-50/50"
                  >
                    <span className="text-xs font-bold text-slate-600">{item.hindi}</span>
                    <div className="h-28 border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center bg-white shadow-inner">
                      <span className="text-6xl font-black text-slate-300 font-olchiki select-none">
                        {item.letterToTrace}
                      </span>
                    </div>
                    <span className="text-[11px] text-orange-900 font-bold block">{item.phonetic}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer: Evaluation & Teacher Signature */}
          <div className="border-t-2 border-orange-950 pt-4 mt-8 flex items-center justify-between text-xs text-slate-700">
            <div className="space-y-1">
              <span className="font-bold block">शिक्षक मूल्यांकन (Teacher Assessment):</span>
              <div className="flex items-center space-x-3 text-[11px]">
                <label className="flex items-center space-x-1">
                  <input type="checkbox" className="rounded" />
                  <span>⭐⭐⭐ उत्कृष्ट (Excellent)</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input type="checkbox" className="rounded" />
                  <span>⭐⭐ अच्छा (Good)</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input type="checkbox" className="rounded" />
                  <span>⭐ अभ्यास आवश्यक (Needs Practice)</span>
                </label>
              </div>
            </div>

            <div className="text-right">
              <div className="border-b border-slate-400 w-40 mb-1"></div>
              <span className="font-bold">शिक्षक हस्ताक्षर (Teacher Sign)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
