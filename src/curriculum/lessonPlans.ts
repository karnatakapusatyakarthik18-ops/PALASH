import { TribalLanguage } from '../nlp/types';

export interface LessonStep {
  stepNumber: number;
  phase: string;
  durationMinutes: number;
  teacherPromptHindi: string;
  tribalSpeech: {
    santhali: { text: string; phonetic: string };
    ho: { text: string; phonetic: string };
    mundari: { text: string; phonetic: string };
  };
  expectedStudentAction: string;
  pedagogicalTip: string;
}

export interface DailyLessonPlan {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  grade: string;
  theme: string;
  durationTotal: number;
  learningOutcome: string;
  steps: LessonStep[];
}

export const DAILY_LESSON_PLANS: DailyLessonPlan[] = [
  {
    id: 'lesson_fln_01',
    titleHindi: 'कक्षा में स्वागत और अभिवादन',
    titleEnglish: 'Morning Welcome & Classroom Routines',
    grade: 'Grade 1 / Balvatika',
    theme: 'कक्षा संवाद (Classroom)',
    durationTotal: 30,
    learningOutcome: 'बच्चे मातृभाषा में शिक्षक का अभिवादन करेंगे और कक्षा निर्देशों का पालन करेंगे।',
    steps: [
      {
        stepNumber: 1,
        phase: 'अभिवादन एवं वार्म-अप (Warm-up & Greeting)',
        durationMinutes: 5,
        teacherPromptHindi: 'नमस्ते बच्चों! सब अपनी जगह बैठ जाओ।',
        tribalSpeech: {
          santhali: { text: 'ᱡᱳᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱡᱚᱛᱚ ᱦᱚᱲ ᱫᱩᱲᱩᱵᱽ ᱯᱮ।', phonetic: 'जोहार गिदरा को! जोतो होड़ दुड़ुब पे।' },
          ho: { text: 'जोहार होनको! सबिन दुबेन।', phonetic: 'जोहार होनको! सबिन दुबेन।' },
          mundari: { text: 'जोहार होनको! सबिन आपना ठांव रे दुबपे।', phonetic: 'जोहार होनको! सबिन आपना ठांव रे दुबपे।' }
        },
        expectedStudentAction: 'सभी बच्चे मुस्कुराते हुए "जोहार" कहेंगे और बैठेंगे।',
        pedagogicalTip: 'शिक्षक दोनों हाथ जोड़कर जोहार कहें जिससे बच्चे मातृभाषा में सुरक्षित महसूस करें।'
      },
      {
        stepNumber: 2,
        phase: 'मौखिक निर्देश और शारीरिक गतिविधि (Action Game)',
        durationMinutes: 10,
        teacherPromptHindi: 'चलो सब मिलकर ताली बजाएं और खड़े हो जाएं!',
        tribalSpeech: {
          santhali: { text: 'ᱪᱚᱞᱚ ᱛᱷᱟᱹᱨᱤ ᱫᱟᱞ ᱯᱮ ᱟᱨ ᱛᱮᱸᱜᱳᱱ ᱯᱮ!', phonetic: 'चोलो थारी दाल पे आर तेंगोन पे!' },
          ho: { text: 'ताली तेये आर सबिन तिंगुन!', phonetic: 'ताली तेये आर सबिन तिंगुन!' },
          mundari: { text: 'ताली धराव पे आर तिंगुनपे!', phonetic: 'ताली धराव पे आर तिंगुनपे!' }
        },
        expectedStudentAction: 'बच्चे 3 बार ताली बजाकर खड़े होंगे।',
        pedagogicalTip: 'TPR (Total Physical Response) पद्धति से बिना हिचकिचाहट के भाषा समझ विकसित होती है।'
      },
      {
        stepNumber: 3,
        phase: 'सचित्र सामग्री एवं पठन (Flashcard Activity)',
        durationMinutes: 10,
        teacherPromptHindi: 'अपनी किताब खोलो और चित्र देखो।',
        tribalSpeech: {
          santhali: { text: 'ᱟᱯᱱᱟᱨ ᱯᱳᱛᱷᱤ ᱨᱟᱲᱟᱭ ᱢᱮ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱢᱮ।', phonetic: 'आपनार पोथी राड़ाय मे आर चितार ञेल मे।' },
          ho: { text: 'अमाः पोथी उघड़ेन आर चित्र नेलमे।', phonetic: 'अमाः पोथी उघड़ेन आर चित्र नेलमे।' },
          mundari: { text: 'अमाः पोथी उघड़मे आर चित्र नेलमे।', phonetic: 'अमाः पोथी उघड़मे आर चित्र नेलमे।' }
        },
        expectedStudentAction: 'बच्चे अपनी कार्यपुस्तिका खोलकर दिए गए चित्र पर उंगली रखेंगे।',
        pedagogicalTip: 'चित्र में दिख रहे पेड़ (दारे / दारू) और पानी (दाग / दाः) का नाम मातृभाषा में पूछें।'
      },
      {
        stepNumber: 4,
        phase: 'आकलन एवं समापन (Review & Praise)',
        durationMinutes: 5,
        teacherPromptHindi: 'बहुत अच्छा बच्चों! शाबाश!',
        tribalSpeech: {
          santhali: { text: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱵᱮᱥ ᱜᱮ!', phonetic: 'आडी नापाय गिदरा को! बेस गे!' },
          ho: { text: 'बुगिनगे होनको! बेसगे!', phonetic: 'बुगिनगे होनको! बेसगे!' },
          mundari: { text: 'बुगिनगे होनको! बहुत बेस!', phonetic: 'बुगिनगे होनको! बहुत बेस!' }
        },
        expectedStudentAction: 'बच्चे खुश होकर ताली बजाएंगे और अगले पाठ के लिए तैयार होंगे।',
        pedagogicalTip: 'सकारात्मक प्रोत्साहन से गैर-हिंदी भाषी बच्चों का कक्षा में आत्मविश्वास बढ़ता है।'
      }
    ]
  },
  {
    id: 'lesson_fln_02',
    titleHindi: '1 से 5 तक फल और वस्तुओं की गिनती',
    titleEnglish: 'Counting 1-5 with Nature & Fruits',
    grade: 'Grade 1 / Balvatika',
    theme: 'गणित और प्रकृति (Numeracy & Nature)',
    durationTotal: 30,
    learningOutcome: 'बच्चे मातृभाषा में 1 से 5 तक संख्याएं बोलेंगे और वस्तुओं को गिनेंगे।',
    steps: [
      {
        stepNumber: 1,
        phase: 'वार्म-अप एवं ध्यानाकर्षण (Focus & Numbers)',
        durationMinutes: 5,
        teacherPromptHindi: 'यहाँ आओ और देखो मेरे पास कितने फल हैं।',
        tribalSpeech: {
          santhali: { text: 'ᱱᱚᱰᱮ ᱦᱤᱡᱩᱜᱽ ᱯᱮ ᱟᱨ ᱧᱮᱞ ᱯᱮ ᱤᱧ ᱴᱷᱮᱱ ᱛᱤᱱᱟᱹᱜ ᱡᱚ ᱢᱮᱱᱟᱜᱼᱟ।', phonetic: 'नोडे हिजुग पे आर ञेल पे इञ ठेन तीनाग जो मेनागा।' },
          ho: { text: 'नेता हिजुमे आर नेलमे अइंगाः तिन जो मेनाः।', phonetic: 'नेता हिजुमे आर नेलमे अइंगाः तिन जो मेनाः।' },
          mundari: { text: 'नेता हिजुमे आर नेलमे अइंगाः चिमिन जो मेनाः।', phonetic: 'नेता हिजुमे आर नेलमे अइंगाः चिमिन जो मेनाः।' }
        },
        expectedStudentAction: 'बच्चे शिक्षक की मेज के पास आएंगे।',
        pedagogicalTip: 'वास्तविक फल या पत्तों का उपयोग करें।'
      },
      {
        stepNumber: 2,
        phase: 'सामूहिक गिनती (Choral Counting)',
        durationMinutes: 10,
        teacherPromptHindi: 'मेरे साथ बोलो: एक, दो, तीन, चार, पाँच!',
        tribalSpeech: {
          santhali: { text: 'ᱤᱧ ᱥᱟᱶ ᱞᱟᱹᱭ ᱯᱮ: ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ, ᱯᱩᱱ, ᱢᱚᱬᱮ!', phonetic: 'इञ साव लई पे: मिद, बार, पे, पुन, मोड़े!' },
          ho: { text: 'अइंगाः सांव काजिमे: मि, बार, अपि, उपुन, मोये!', phonetic: 'अइंगाः सांव काजिमे: मि, बार, अपि, उपुन, मोये!' },
          mundari: { text: 'अइंगाः सांव काजीपे: मियाद, बरिया, अपिया, उपुनिया, मोड़ेया!', phonetic: 'अइंगाः सांव काजीपे: मियाद, बरिया, अपिया, उपुनिया, मोड़ेया!' }
        },
        expectedStudentAction: 'बच्चे उंगलियां दिखाते हुए साथ में संख्याएं दोहराएंगे।',
        pedagogicalTip: 'प्रत्येक संख्या के साथ उतनी उंगलियां हवा में लहराएं।'
      },
      {
        stepNumber: 3,
        phase: 'कार्यपुस्तिका अनुरेखण (Worksheet Tracing)',
        durationMinutes: 10,
        teacherPromptHindi: 'अब अपनी वर्कशीट पर बिंदुओं को मिलाकर लिखो।',
        tribalSpeech: {
          santhali: { text: 'ᱱᱤᱛᱚᱜ ᱟᱢᱟᱜ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱨᱮ ᱚᱞ ᱢᱮ।', phonetic: 'नितोग अमाग कामी साकाम रे ओल मे।' },
          ho: { text: 'नाः अमाः ओल साकाम रे ओलमे।', phonetic: 'नाः अमाः ओल साकाम रे ओलमे।' },
          mundari: { text: 'नाः अमाः ओल साकाम रे ओलमे।', phonetic: 'नाः अमाः ओल साकाम रे ओलमे।' }
        },
        expectedStudentAction: 'बच्चे वर्कशीट पर 1, 2, 3 के बिंदुओं को पेंसिल से जोड़ेंगे।',
        pedagogicalTip: 'जो बच्चे संथाली ओल चिकी सीख रहे हैं, उन्हें ᱑, ᱒, ᱓ का अभ्यास कराएं।'
      },
      {
        stepNumber: 4,
        phase: 'आकलन (Quick Assessment)',
        durationMinutes: 5,
        teacherPromptHindi: 'यहाँ कितने सेब हैं? बताओ।',
        tribalSpeech: {
          santhali: { text: 'ᱱᱚᱰᱮ ᱛᱤᱱᱟᱹᱜ ᱡᱚ ᱢᱮᱱᱟᱜᱼᱟ? ᱞᱟᱹᱭ ᱢᱮ।', phonetic: 'नोडे तीनाग जो मेनागा? लई मे।' },
          ho: { text: 'नेया चिमिन जो तन? काजिमे।', phonetic: 'नेया चिमिन जो तन? काजिमे।' },
          mundari: { text: 'नेया चिमिन जो तना? काजीमे।', phonetic: 'नेया चिमिन जो तना? काजीमे।' }
        },
        expectedStudentAction: 'अलग-अलग बच्चे मातृभाषा में संख्या बताएंगे (जैसे- "पे" या "अपिया")।',
        pedagogicalTip: 'सटीक उत्तर मिलने पर पूरी कक्षा से ताली बजवाएं।'
      }
    ]
  }
];
