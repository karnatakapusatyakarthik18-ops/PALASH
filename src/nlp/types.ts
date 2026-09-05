export type TribalLanguage = 'santhali' | 'ho' | 'mundari';
export type LanguageCode = TribalLanguage | 'hindi' | 'english';

export type ScriptType = 'olchiki' | 'warangchiti' | 'devanagari' | 'latin';

export type WordCategory = 
  | 'classroom'
  | 'numbers'
  | 'family'
  | 'animals'
  | 'nature'
  | 'fruits'
  | 'body'
  | 'actions'
  | 'feelings'
  | 'questions';

export interface VocabularyItem {
  id: string;
  hindi: string;
  targetText: string;          // Native script (e.g. Ol Chiki for Santhali, Warang Chiti/Devanagari for Ho)
  devanagariPhonetic: string;  // Guide for Hindi teachers to pronounce correctly
  englishPhonetic: string;     // Romanized pronunciation
  category: WordCategory;
  nipunLakshya?: 'L1' | 'L2' | 'L3' | 'L4';
  icon?: string;
  audioPhonemes?: string[];
  exampleHindi?: string;
  exampleTarget?: string;
  exampleDevanagari?: string;
}

export interface TranslationResult {
  sourceText: string;
  sourceLang: LanguageCode;
  targetLang: TribalLanguage;
  targetText: string;
  scriptType: ScriptType;
  devanagariPhonetic: string;
  englishPhonetic: string;
  confidence: number;
  method: 'exact-phrase' | 'rule-based-morph' | 'slot-filled' | 'ngram-fallback';
  tokens: Array<{
    hindi: string;
    target: string;
    phonetic: string;
  }>;
  audioDurationMs?: number;
}

export interface TeacherPromptTemplate {
  hindi: string;
  category: string;
  context: string;
}
