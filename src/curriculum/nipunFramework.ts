export interface NipunCompetency {
  code: string;
  grade: 'Balvatika' | 'Grade 1' | 'Grade 2' | 'Grade 3';
  domain: 'Literacy' | 'Numeracy';
  titleHindi: string;
  titleEnglish: string;
  description: string;
  suggestedActivity: string;
}

export const NIPUN_COMPETENCIES: NipunCompetency[] = [
  // --- Oral Language (Lakshya 1) ---
  {
    code: 'FLN-L1-B',
    grade: 'Balvatika',
    domain: 'Literacy',
    titleHindi: 'मौखिक भाषा और शब्दावली',
    titleEnglish: 'Oral Vocabulary & Conversation',
    description: 'घर की भाषा (हो/मुंडारी/संथाली) में बातचीत करना और बुनियादी निर्देशों को समझना।',
    suggestedActivity: 'चित्र चार्ट देखकर बातचीत और कक्षा निर्देश खेल (जैसे- दुड़ुबमे / बैठो)'
  },
  {
    code: 'FLN-L1-G1',
    grade: 'Grade 1',
    domain: 'Literacy',
    titleHindi: 'कक्षा संवाद और निर्देश पालन',
    titleEnglish: 'Classroom Dialogue & Response',
    description: 'द्विभाषी (हिंदी-जनजातीय भाषा) में 3-4 वाक्यों में अपनी बात व्यक्त करना।',
    suggestedActivity: 'दैनिक रोल-प्ले और फ्लैशकार्ड पर आधारित मौखिक प्रश्नोत्तरी'
  },

  // --- Decoding & Phonics (Lakshya 2) ---
  {
    code: 'FLN-L2-G1',
    grade: 'Grade 1',
    domain: 'Literacy',
    titleHindi: 'ध्वनि और लिपि पहचान (ओल चिकी / देवनागरी)',
    titleEnglish: 'Phonological Awareness & Script Recognition',
    description: 'शब्दों की पहली ध्वनि पहचानना और अक्षरों का अनुरेखण (Tracing) करना।',
    suggestedActivity: 'वर्कशीट पर अक्षरों को उंगली या पेंसिल से अनुरेखित करना और मिलान करना'
  },
  {
    code: 'FLN-L2-G2',
    grade: 'Grade 2',
    domain: 'Literacy',
    titleHindi: 'सरल शब्द पठन और लेखन',
    titleEnglish: 'Simple Word Decoding & Writing',
    description: '2-3 अक्षरों के परिचित शब्दों को सही उच्चारण के साथ पढ़ना और लिखना।',
    suggestedActivity: 'द्विभाषी शब्द पहेली और रिक्त स्थान भरो वर्कशीट'
  },

  // --- Reading Comprehension & Stories (Lakshya 3) ---
  {
    code: 'FLN-L3-G2',
    grade: 'Grade 2',
    domain: 'Literacy',
    titleHindi: 'लोककथा और चित्र कहानी समझ',
    titleEnglish: 'Tribal Folk Tales & Story Comprehension',
    description: 'झारखंड की लोककथाओं को सुनना, क्रमबद्ध बताना और सरल प्रश्नों के उत्तर देना।',
    suggestedActivity: 'संथाली/हो लोकगीत और सचित्र कहानी चार्ट पर चर्चा'
  },

  // --- Foundational Numeracy (Lakshya 4) ---
  {
    code: 'FLN-N1-B',
    grade: 'Balvatika',
    domain: 'Numeracy',
    titleHindi: 'संख्या पूर्व अवधारणा और 1-5 गिनती',
    titleEnglish: 'Pre-Number Concepts & 1-5 Counting',
    description: 'वस्तुओं को गिनना (मिद, बार, पे...) और बड़ा-छोटा पहचानना।',
    suggestedActivity: 'पत्ते, कंकड़ या फल गिनकर सही अंक के साथ मिलान करना'
  },
  {
    code: 'FLN-N1-G1',
    grade: 'Grade 1',
    domain: 'Numeracy',
    titleHindi: '1 से 20 तक संख्या बोध और जोड़',
    titleEnglish: 'Numbers 1-20 & Concrete Addition',
    description: 'मातृभाषा में 20 तक गिनती बोलना और वस्तुओं को जोड़कर कुल बताना।',
    suggestedActivity: 'चित्र गिनकर संख्या लिखो और द्विभाषी गिनती अभ्यास'
  }
];
