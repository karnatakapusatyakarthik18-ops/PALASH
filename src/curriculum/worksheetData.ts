import { TribalLanguage } from '../nlp/types';

export interface WorksheetActivityItem {
  id: string;
  hindi: string;
  tribalText: string;
  phonetic: string;
  icon: string;
  count?: number;
  letterToTrace?: string;
  script?: string;
}

export interface WorksheetTemplate {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  grade: 'Balvatika' | 'Grade 1' | 'Grade 2' | 'Grade 3';
  competencyCode: string;
  instructionsHindi: string;
  instructionsTribal: Record<TribalLanguage, string>;
  activityType: 'matching' | 'tracing' | 'counting' | 'fill_in_blank';
  items: WorksheetActivityItem[];
}

export const WORKSHEET_TEMPLATES: Record<string, WorksheetTemplate> = {
  matching_animals: {
    id: 'matching_animals',
    titleHindi: 'जानवरों के नाम का सही मिलान करो',
    titleEnglish: 'Match the Animal with its Tribal Name',
    grade: 'Grade 1',
    competencyCode: 'FLN-L1-G1',
    instructionsHindi: 'चित्र देखकर उसकी मातृभाषा (संथाली/हो/मुंडारी) और हिंदी नाम से रेखा खींचकर मिलाएँ।',
    instructionsTribal: {
      santhali: 'ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱠᱟᱛᱮ ᱥᱟᱹᱨᱤ ᱧᱩᱛᱩᱢ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱢᱮ।',
      ho: 'चित्र नेल काते साड़ी नुतुम सांव जोड़ाव मे।',
      mundari: 'चित्र नेल काते साड़ी नुतुम सांव जोड़ाव मे।'
    },
    activityType: 'matching',
    items: [
      { id: '1', hindi: 'कुत्ता', tribalText: 'ᱥᱮᱛᱟ', phonetic: 'सेता', icon: '🐕' },
      { id: '2', hindi: 'बिल्ली', tribalText: 'ᱯᱩᱥᱤ', phonetic: 'पुसी', icon: '🐈' },
      { id: '3', hindi: 'गाय', tribalText: 'ᱜᱟᱹᱭ', phonetic: 'गई', icon: '🐄' },
      { id: '4', hindi: 'चिड़िया', tribalText: 'ᱪᱮᱬᱮ', phonetic: 'चेड़े', icon: '🐦' },
      { id: '5', hindi: 'मछली', tribalText: 'ᱦᱟᱹᱠᱩ', phonetic: 'हाकू', icon: '🐟' }
    ]
  },
  counting_nature: {
    id: 'counting_nature',
    titleHindi: 'गिनो और मातृभाषा में संख्या लिखो',
    titleEnglish: 'Count the Objects & Write in Mother Tongue',
    grade: 'Balvatika',
    competencyCode: 'FLN-N1-B',
    instructionsHindi: 'प्रत्येक पंक्ति में वस्तुएं गिनें और दिए गए बॉक्स में संख्या (अंक और शब्द) लिखें।',
    instructionsTribal: {
      santhali: 'ᱡᱤᱱᱤᱥ ᱠᱚ ᱞᱮᱠᱷᱟᱭ ᱢᱮ ᱟᱨ ᱵᱟᱠᱥᱟ ᱨᱮ ᱞᱮᱠᱷᱟ ᱚᱞ ᱢᱮ।',
      ho: 'जबलको लेखाएमे आर बाकसा रे लेखा ओलमे।',
      mundari: 'जबलको लेखाएमे आर बाकसा रे लेखा ओलमे।'
    },
    activityType: 'counting',
    items: [
      { id: 'c1', count: 1, hindi: 'एक पेड़', tribalText: 'ᱢᱤᱫ ᱫᱟᱨᱮ (᱑)', phonetic: 'मिद दारे', icon: '🌳' },
      { id: 'c2', count: 2, hindi: 'दो सूरजमुखी फूल', tribalText: 'ᱵᱟᱨ ᱵᱟᱦᱟ (᱒)', phonetic: 'बार बाहा', icon: '🌸' },
      { id: 'c3', count: 3, hindi: 'तीन सेब', tribalText: 'ᱯᱮ ᱡᱚ (᱓)', phonetic: 'पे जो', icon: '🍎' },
      { id: 'c4', count: 4, hindi: 'चार तारे', tribalText: 'ᱯᱩᱱ ᱤᱯᱤᱞ (᱔)', phonetic: 'पुन इपिल', icon: '⭐' },
      { id: 'c5', count: 5, hindi: 'पाँच पत्तियां', tribalText: 'ᱢᱚᱬᱮ ᱥᱟᱠᱟᱢ (᱕)', phonetic: 'मोड़े साकाम', icon: '🍃' }
    ]
  },
  tracing_olchiki: {
    id: 'tracing_olchiki',
    titleHindi: 'संथाली ओल चिकी वर्ण अनुरेखण (Tracing)',
    titleEnglish: 'Santhali Ol Chiki Letter Tracing',
    grade: 'Grade 1',
    competencyCode: 'FLN-L2-G1',
    instructionsHindi: 'दिए गए संथाली अक्षरों पर पेंसिल चलाकर सुंदर लिखावट का अभ्यास करें।',
    instructionsTribal: {
      santhali: 'ᱚᱞ ᱪᱤᱠᱤ ᱟᱠᱷᱚᱨ ᱪᱮᱛᱟᱱ ᱨᱮ ᱯᱮᱱᱥᱤᱞ ᱛᱮ ᱚᱞ ᱢᱮ।',
      ho: 'ओल चिकी आखोर चेतान रे पेंसिल ते ओल मे।',
      mundari: 'ओल चिकी आखोर चेतान रे पेंसिल ते ओल मे।'
    },
    activityType: 'tracing',
    items: [
      { id: 't1', letterToTrace: 'ᱚ', hindi: 'अ (Ol)', tribalText: 'ᱚ', phonetic: 'ऑ / ओ', icon: '✏️', script: 'ᱚᱞ ᱪᱤᱠᱤ' },
      { id: 't2', letterToTrace: 'ᱛ', hindi: 'त (At)', tribalText: 'ᱛ', phonetic: 'अत्', icon: '✏️', script: 'ᱚᱞ ᱪᱤᱠᱤ' },
      { id: 't3', letterToTrace: 'ᱜ', hindi: 'ग (Ag)', tribalText: 'ᱜ', phonetic: 'अग्', icon: '✏️', script: 'ᱚᱞ ᱪᱤᱠᱤ' },
      { id: 't4', letterToTrace: 'ᱟ', hindi: 'आ (Aak)', tribalText: 'ᱟ', phonetic: 'आ', icon: '✏️', script: 'ᱚᱞ ᱪᱤᱠᱤ' },
      { id: 't5', letterToTrace: 'ᱠ', hindi: 'क (Aak)', tribalText: 'ᱠ', phonetic: 'अक्', icon: '✏️', script: 'ᱚᱞ ᱪᱤᱠᱤ' }
    ]
  },
  classroom_dialogue: {
    id: 'classroom_dialogue',
    titleHindi: 'कक्षा निर्देश और कार्य',
    titleEnglish: 'Classroom Action Verbs',
    grade: 'Grade 2',
    competencyCode: 'FLN-L1-G2',
    instructionsHindi: 'शिक्षक के निर्देश को मातृभाषा में पहचानें और सही क्रिया पर गोला लगाएँ।',
    instructionsTribal: {
      santhali: 'ᱢᱟᱪᱮᱛ ᱟᱜ ᱦᱩᱠᱩᱢ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱟᱛᱮ ᱴᱷᱤᱠ ᱪᱤᱱᱦᱟᱹ ᱞᱟᱜᱟᱣ ᱢᱮ।',
      ho: 'माचेद अमाः हुकूम बुझाव काते ठीके चिन्ह लगाओ मे।',
      mundari: 'माचेद अमाः हुकूम बुझाव काते ठीके चिन्ह लगाओ मे।'
    },
    activityType: 'matching',
    items: [
      { id: 'd1', hindi: 'बैठ जाओ', tribalText: 'ᱫᱩᱲᱩᱵᱽ ᱢᱮ', phonetic: 'दुड़ुब मे', icon: '🪑' },
      { id: 'd2', hindi: 'खड़े हो जाओ', tribalText: 'ᱛᱮᱸᱜᱳᱱ ᱢᱮ', phonetic: 'तेंगोन मे', icon: '🧍' },
      { id: 'd3', hindi: 'ताली बजाओ', tribalText: 'ᱛᱷᱟᱹᱨᱤ ᱫᱟᱞ ᱢᱮ', phonetic: 'थारी दाल मे', icon: '👏' },
      { id: 'd4', hindi: 'किताब खोलो', tribalText: 'ᱯᱳᱛᱷᱤ ᱨᱟᱲᱟᱭ ᱢᱮ', phonetic: 'पोथी राड़ाय मे', icon: '📖' },
      { id: 'd5', hindi: 'पानी पियो', tribalText: 'ᱫᱟᱜ ᱧᱩᱭ ᱢᱮ', phonetic: 'दाग ञुय मे', icon: '🥤' }
    ]
  }
};
