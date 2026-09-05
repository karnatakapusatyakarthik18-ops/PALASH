import { TribalLanguage, TranslationResult, ScriptType, VocabularyItem } from './types';
import { SANTHALI_LEXICON } from './lexicons/santhali';
import { HO_LEXICON } from './lexicons/ho';
import { MUNDARI_LEXICON } from './lexicons/mundari';
import { transliterateDevanagariToLatin } from '../audio/transliterate';
import { 
  CLASSROOM_VOCABULARY_MAP, 
  lemmatizeHindiWord, 
  devanagariToOlChiki 
} from './classroomDict';

const CLASSROOM_INTENT_MAP: Record<string, string> = {
  // Books & Reading
  'open your books': 'किताब खोलो',
  'open your book': 'किताब खोलो',
  'open books': 'किताब खोलो',
  'open book': 'किताब खोलो',
  'open the books': 'किताब खोलो',
  'open the book': 'किताब खोलो',
  'please open your books': 'किताब खोलो',
  'please open book': 'किताब खोलो',
  'books open': 'किताब खोलो',
  'kitab kholo': 'किताब खोलो',
  'apni kitab kholo': 'किताब खोलो',
  'apna book kholo': 'किताब खोलो',
  'book kholo': 'किताब खोलो',
  'pothi kholo': 'किताब खोलो',

  'close your books': 'किताब बंद करो',
  'close your book': 'किताब बंद करो',
  'close books': 'किताब बंद करो',
  'close book': 'किताब बंद करो',
  'close the book': 'किताब बंद करो',
  'kitab band karo': 'किताब बंद करो',
  'book band karo': 'किताब बंद करो',

  'read': 'पढ़ो',
  'read this': 'पढ़ो',
  'read book': 'पढ़ो',
  'start reading': 'पढ़ो',
  'padho': 'पढ़ो',
  'kitab padho': 'पढ़ो',

  'write': 'लिखो',
  'write this': 'लिखो',
  'write down': 'लिखो',
  'start writing': 'लिखो',
  'likho': 'लिखो',

  // Movement & Sitting
  'sit down': 'बैठ जाओ',
  'sit': 'बैठ जाओ',
  'please sit down': 'बैठ जाओ',
  'please sit': 'बैठ जाओ',
  'take your seat': 'बैठ जाओ',
  'be seated': 'बैठ जाओ',
  'baith jao': 'बैठ जाओ',
  'baitho': 'बैठ जाओ',
  'apni jagah baith jao': 'बैठ जाओ',

  'stand up': 'खड़े हो जाओ',
  'stand': 'खड़े हो जाओ',
  'please stand up': 'खड़े हो जाओ',
  'khade ho jao': 'खड़े हो जाओ',
  'khade ho': 'खड़े हो जाओ',

  'come here': 'यहाँ आओ',
  'come': 'यहाँ आओ',
  'come to me': 'यहाँ आओ',
  'yahan aao': 'यहाँ आओ',
  'idhar aao': 'यहाँ आओ',

  'go there': 'वहाँ जाओ',
  'go': 'वहाँ जाओ',
  'go back': 'वहाँ जाओ',
  'wahan jao': 'वहाँ जाओ',

  // Actions & Engagement
  'clap your hands': 'ताली बजाओ',
  'clap hands': 'ताली बजाओ',
  'clap': 'ताली बजाओ',
  'start clapping': 'ताली बजाओ',
  'tali bajao': 'ताली बजाओ',

  'drink water': 'पानी पियो',
  'drink some water': 'पानी पियो',
  'have some water': 'पानी पियो',
  'pani piyo': 'पानी पियो',

  'eat food': 'खाना खाओ',
  'eat': 'खाना खाओ',
  'have food': 'खाना खाओ',
  'khana khao': 'खाना खाओ',

  'listen to me': 'सुनो',
  'listen carefully': 'ध्यान से सुनो',
  'listen': 'सुनो',
  'suno': 'सुनो',
  'dhyan se suno': 'ध्यान से सुनो',

  'look here': 'यहाँ देखो',
  'look at the board': 'यहाँ देखो',
  'look at me': 'यहाँ देखो',
  'look': 'यहाँ देखो',
  'dekho': 'यहाँ देखो',
  'yahan dekho': 'यहाँ देखो',

  'keep quiet': 'शांत रहो',
  'silence please': 'शांत रहो',
  'silence': 'शांत रहो',
  'be quiet': 'शांत रहो',
  'quiet': 'शांत रहो',
  'shant raho': 'शांत रहो',
  'chup raho': 'शांत रहो',

  'wash your hands': 'हाथ धो लो',
  'wash hands': 'हाथ धो लो',
  'haath dho': 'हाथ धो लो',

  'sing a song': 'गाना गाओ',
  'sing': 'गाना गाओ',
  'gana gao': 'गाना गाओ',

  'dance': 'नाचो',
  'nacho': 'नाचो',

  'play': 'खेलो',
  'khelo': 'खेलो',

  'count': 'गिनो',
  'count numbers': 'गिनो',
  'gino': 'गिनो',

  // Greetings & Questions
  'hello': 'नमस्ते',
  'namaste': 'नमस्ते',
  'good morning': 'नमस्ते',
  'good afternoon': 'नमस्ते',
  'johar': 'नमस्ते',

  'how are you': 'तुम कैसे हो',
  'how are you doing': 'तुम कैसे हो',
  'tum kaise ho': 'तुम कैसे हो',
  'aap kaise hain': 'तुम कैसे हो',

  'what is your name': 'तुम्हारा नाम क्या है',
  'whats your name': 'तुम्हारा नाम क्या है',
  "what's your name": 'तुम्हारा नाम क्या है',
  'tumhara naam kya hai': 'तुम्हारा नाम क्या है',
  'aapka naam kya hai': ' तुम्हारा नाम क्या है',

  'what is this': 'यह क्या है?',
  'whats this': 'यह क्या है?',
  "what's this": 'यह क्या है?',
  'what is it': 'यह क्या है?',
  'yeh kya hai': 'यह क्या है?',
  'ye kya hai': 'यह क्या है?',

  'what is that': 'वह क्या है?',
  'whats that': 'वह क्या है?',
  "what's that": 'वह क्या है?',
  'woh kya hai': 'वह क्या है?',

  'very good': 'बहुत अच्छा',
  'good job': 'बहुत अच्छा',
  'well done': 'बहुत अच्छा',
  'great': 'बहुत अच्छा',
  'good': 'बहुत अच्छा',
  'bahut accha': 'बहुत अच्छा',
  'shabash': 'बहुत अच्छा',

  'thank you': 'धन्यवाद',
  'thanks': 'धन्यवाद',
  'dhanyawad': 'धन्यवाद',

  'yes': 'हाँ',
  'haan': 'हाँ',
  'no': 'नहीं',
  'nahi': 'नहीं'
};

const ENGLISH_TO_HINDI_NOUNS: Record<string, string> = {
  book: 'किताब',
  books: 'किताब',
  water: 'पानी',
  tree: 'पेड़',
  trees: 'पेड़',
  flower: 'फूल',
  flowers: 'फूल',
  fruit: 'फल',
  fruits: 'फल',
  apple: 'फल',
  dog: 'कुत्ता',
  dogs: 'कुत्ता',
  cat: 'बिल्ली',
  cats: 'बिल्ली',
  cow: 'गाय',
  cows: 'गाय',
  fish: 'मछली',
  bird: 'चिड़िया',
  birds: 'चिड़िया',
  sun: 'सूरज',
  moon: 'चाँद',
  school: 'स्कूल',
  teacher: 'शिक्षक',
  student: 'बच्चे',
  students: 'बच्चे',
  child: 'बच्चे',
  children: 'बच्चे',
  kid: 'बच्चे',
  kids: 'बच्चे',
  hand: 'हाथ',
  hands: 'हाथ',
  eye: 'आँख',
  eyes: 'आँख',
  ear: 'कान',
  ears: 'कान',
  head: 'सिर',
  nose: 'नाक',
  one: 'एक',
  two: 'दो',
  three: 'तीन',
  four: 'चार',
  five: 'पाँच',
  six: 'छह',
  seven: 'सात',
  eight: 'आठ',
  nine: 'नौ',
  ten: 'दस',
  story: 'कहानी',
  stories: 'कहानी',
  read: 'पढ़ो',
  reading: 'पढ़ो',
  listen: 'सुनो',
  listening: 'सुनो',
  write: 'लिखो',
  writing: 'लिखो',
  look: 'देखो',
  see: 'देखो',
  we: 'हम',
  us: 'हमें',
  our: 'हमारा',
  today: 'आज',
  milk: 'दूध',
  give: 'दे',
  gives: 'देती',
  sweet: 'मीठे',
  clean: 'साफ',
  morning: 'सुबह',
  rise: 'उगता',
  rises: 'उगता',
  east: 'पूर्व',
  all: 'सब',
  your: 'अपना',
  up: 'ऊपर',
  down: 'नीचे',
  in: 'में',
  on: 'पर',
  and: 'और',
  carefully: 'ध्यान से'
};

export class PalashNLPTranslator {
  private static lexicons: Record<TribalLanguage, VocabularyItem[]> = {
    santhali: SANTHALI_LEXICON,
    ho: HO_LEXICON,
    mundari: MUNDARI_LEXICON
  };

  /**
   * Translates Hindi, English, or Hinglish text into the target tribal language (Ho, Mundari, Santhali)
   * Designed for FLN primary school curriculum and classroom communication
   */
  public static translate(inputText: string, targetLang: TribalLanguage): TranslationResult {
    const cleaned = inputText.trim().replace(/[।.?!,]+$/, '').toLowerCase();
    const isEnglishSource = /^[a-z0-9\s'.,?!-]+$/i.test(cleaned);
    const sourceLang = isEnglishSource ? 'english' : 'hindi';
    const lexicon = this.lexicons[targetLang];
    const scriptType: ScriptType = targetLang === 'santhali' ? 'olchiki' : (targetLang === 'ho' ? 'warangchiti' : 'devanagari');

    // 0. Normalize English / Hinglish intents to canonical Hindi classroom phrases
    let normalized = cleaned;
    if (CLASSROOM_INTENT_MAP[cleaned]) {
      normalized = CLASSROOM_INTENT_MAP[cleaned];
    } else if (/\bopen\b/i.test(cleaned) && (/\bbook/i.test(cleaned) || cleaned === 'open')) {
      normalized = 'किताब खोलो';
    } else if (/\bclose\b/i.test(cleaned) && /\bbook/i.test(cleaned)) {
      normalized = 'किताब बंद करो';
    } else if (/\bsit\b/i.test(cleaned)) {
      normalized = 'बैठ जाओ';
    } else if (/\bstand\b/i.test(cleaned)) {
      normalized = 'खड़े हो जाओ';
    } else if (/\bclap\b/i.test(cleaned)) {
      normalized = 'ताली बजाओ';
    } else if (/\bdrink\b/i.test(cleaned) || (/\bwater\b/i.test(cleaned) && !/\bthis\b/i.test(cleaned))) {
      normalized = 'पानी पियो';
    } else if (/\beat\b/i.test(cleaned) || /\bfood\b/i.test(cleaned)) {
      normalized = 'खाना खाओ';
    } else if (/\bcome\b/i.test(cleaned) && /\bhere\b/i.test(cleaned)) {
      normalized = 'यहाँ आओ';
    } else if (/\bgo\b/i.test(cleaned) && /\bthere\b/i.test(cleaned)) {
      normalized = 'वहाँ जाओ';
    } else if (/\blisten\b/i.test(cleaned)) {
      normalized = 'सुनो';
    } else if (/\blook\b/i.test(cleaned)) {
      normalized = 'यहाँ देखो';
    } else if (/\bread\b/i.test(cleaned)) {
      normalized = 'पढ़ो';
    } else if (/\bwrite\b/i.test(cleaned)) {
      normalized = 'लिखो';
    } else if (/\bquiet\b/i.test(cleaned) || /\bsilence\b/i.test(cleaned)) {
      normalized = 'शांत रहो';
    } else if (ENGLISH_TO_HINDI_NOUNS[cleaned]) {
      normalized = ENGLISH_TO_HINDI_NOUNS[cleaned];
    }

    // 1. Exact Phrase Match in Lexicon (matches either original Hindi or normalized intent)
    const exact = lexicon.find(item => 
      item.hindi.toLowerCase() === normalized || 
      item.hindi.toLowerCase() === cleaned ||
      (normalized.includes(item.hindi.toLowerCase()) && normalized.length === item.hindi.length)
    );

    if (exact) {
      return {
        sourceText: inputText,
        sourceLang,
        targetLang,
        targetText: exact.targetText,
        scriptType,
        devanagariPhonetic: exact.devanagariPhonetic,
        englishPhonetic: exact.englishPhonetic,
        confidence: 0.98,
        method: 'exact-phrase',
        tokens: [{ hindi: isEnglishSource ? inputText : exact.hindi, target: exact.targetText, phonetic: exact.devanagariPhonetic }]
      };
    }

    // 2. High-Frequency Primary Classroom Sentence Patterns
    // Pattern A: 'यह क्या है?' (What is this?)
    if (
      /^(यह|ये)\s+क्या\s+है\??/i.test(normalized) || 
      /what('?s|\s+is)\s+(this|it)\??/i.test(cleaned) ||
      /^(yeh|ye)\s+kya\s+hai\??/i.test(cleaned)
    ) {
      if (targetLang === 'santhali') {
        return {
          sourceText: inputText,
          sourceLang,
          targetLang,
          targetText: 'ᱱᱚᱣᱟ ᱫᱚ ᱪᱮᱫ?',
          scriptType,
          devanagariPhonetic: 'नोवा दो चेद?',
          englishPhonetic: 'Nowa do chet\'?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [
            { hindi: isEnglishSource ? 'What' : 'यह', target: 'ᱱᱚᱣᱟ', phonetic: 'नोवा' },
            { hindi: isEnglishSource ? 'is this' : 'क्या है', target: 'ᱪᱮᱫ', phonetic: 'चेद' }
          ]
        };
      } else if (targetLang === 'ho') {
        return {
          sourceText: inputText,
          sourceLang,
          targetLang,
          targetText: '𑣌𑣇𑣂𑢡 𑣎𑣈𑣌𑢡𑣂𑢡𑣒?',
          scriptType,
          devanagariPhonetic: 'नेया चिनातन?',
          englishPhonetic: 'Nea chinatan?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [
            { hindi: isEnglishSource ? 'What' : 'यह', target: 'नेया', phonetic: 'नेया' },
            { hindi: isEnglishSource ? 'is this' : 'क्या है', target: 'चिनातन', phonetic: 'चिनातन' }
          ]
        };
      } else {
        return {
          sourceText: inputText,
          sourceLang,
          targetLang,
          targetText: 'नेया चि-ना?',
          scriptType,
          devanagariPhonetic: 'नेया चि-ना?',
          englishPhonetic: 'Nea chi-na?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [
            { hindi: isEnglishSource ? 'What' : 'यह', target: 'नेया', phonetic: 'नेया' },
            { hindi: isEnglishSource ? 'is this' : 'क्या है', target: 'चि-ना', phonetic: 'चि-ना' }
          ]
        };
      }
    }

    // Pattern B: 'वह क्या है?' (What is that?)
    if (
      /^(वह|वो)\s+क्या\s+है\??/i.test(normalized) || 
      /what('?s|\s+is)\s+that\??/i.test(cleaned) ||
      /^(woh|wo)\s+kya\s+hai\??/i.test(cleaned)
    ) {
      if (targetLang === 'santhali') {
        return {
          sourceText: inputText,
          sourceLang,
          targetLang,
          targetText: 'ᱦᱟᱱᱟ ᱫᱚ ᱪᱮᱫ?',
          scriptType,
          devanagariPhonetic: 'हाना दो चेद?',
          englishPhonetic: 'Hana do chet\'?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [{ hindi: isEnglishSource ? 'What is that' : 'वह क्या है', target: 'ᱦᱟᱱᱟ ᱫᱚ ᱪᱮᱫ', phonetic: 'हाना दो चेद' }]
        };
      } else if (targetLang === 'ho') {
        return {
          sourceText: inputText,
          sourceLang,
          targetLang,
          targetText: 'एना चिनातन?',
          scriptType,
          devanagariPhonetic: 'एना चिनातन?',
          englishPhonetic: 'Ena chinatan?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [{ hindi: isEnglishSource ? 'What is that' : 'वह क्या है', target: 'एना चिनातन', phonetic: 'एना चिनातन' }]
        };
      } else {
        return {
          sourceText: inputText,
          sourceLang,
          targetLang,
          targetText: 'एना चि-ना?',
          scriptType,
          devanagariPhonetic: 'एना चि-ना?',
          englishPhonetic: 'Ena chi-na?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [{ hindi: isEnglishSource ? 'What is that' : 'वह क्या है', target: 'एना चि-ना', phonetic: 'एना चि-ना' }]
        };
      }
    }

    // Pattern C: 'यह एक [वस्तु] है' (This is a [noun])
    let nounHindi = '';
    const nounMatch = normalized.match(/^(यह|ये)\s+(एक\s+)?([^\s]+)\s+है/);
    const enNounMatch = cleaned.match(/^(this|that)\s+(is\s+)?(a\s+|an\s+)?([a-z]+)/i);

    if (nounMatch && nounMatch[3]) {
      nounHindi = nounMatch[3];
    } else if (enNounMatch && enNounMatch[4]) {
      const enNoun = enNounMatch[4];
      nounHindi = ENGLISH_TO_HINDI_NOUNS[enNoun] || enNoun;
    }

    if (nounHindi) {
      const nounItem = lexicon.find(i => i.hindi === nounHindi || i.hindi.includes(nounHindi));
      if (nounItem) {
        if (targetLang === 'santhali') {
          return {
            sourceText: inputText,
            sourceLang,
            targetLang,
            targetText: `ᱱᱚᱣᱟ ᱫᱚ ᱢᱤᱫ ${nounItem.targetText} ᱠᱟᱱᱟ`,
            scriptType,
            devanagariPhonetic: `नोवा दो मिद ${nounItem.devanagariPhonetic} काना`,
            englishPhonetic: `Nowa do mit' ${nounItem.englishPhonetic} kana`,
            confidence: 0.92,
            method: 'slot-filled',
            tokens: [
              { hindi: isEnglishSource ? 'This is' : 'यह एक', target: 'ᱱᱚᱣᱟ ᱫᱚ ᱢᱤᱫ', phonetic: 'नोवा दो मिद' },
              { hindi: nounHindi, target: nounItem.targetText, phonetic: nounItem.devanagariPhonetic },
              { hindi: 'है', target: 'ᱠᱟᱱᱟ', phonetic: 'काना' }
            ]
          };
        } else if (targetLang === 'ho') {
          return {
            sourceText: inputText,
            sourceLang,
            targetLang,
            targetText: `नेया मि ${nounItem.targetText} तन`,
            scriptType,
            devanagariPhonetic: `नेया मि ${nounItem.devanagariPhonetic} तन`,
            englishPhonetic: `Nea mi ${nounItem.englishPhonetic} tan`,
            confidence: 0.92,
            method: 'slot-filled',
            tokens: [
              { hindi: isEnglishSource ? 'This is' : 'नेया मि', target: 'नेया मि', phonetic: 'नेया मि' },
              { hindi: nounHindi, target: nounItem.targetText, phonetic: nounItem.devanagariPhonetic },
              { hindi: 'है', target: 'तन', phonetic: 'तन' }
            ]
          };
        } else {
          return {
            sourceText: inputText,
            sourceLang,
            targetLang,
            targetText: `नेया मियाद ${nounItem.targetText} तना`,
            scriptType,
            devanagariPhonetic: `नेया मियाद ${nounItem.devanagariPhonetic} तना`,
            englishPhonetic: `Nea miad ${nounItem.englishPhonetic} tana`,
            confidence: 0.92,
            method: 'slot-filled',
            tokens: [
              { hindi: isEnglishSource ? 'This is' : 'नेया मियाद', target: 'नेया मियाद', phonetic: 'नेया मियाद' },
              { hindi: nounHindi, target: nounItem.targetText, phonetic: nounItem.devanagariPhonetic },
              { hindi: 'है', target: 'तना', phonetic: 'तना' }
            ]
          };
        }
      }
    }

    // Pattern D: 'सभी बच्चे [action]' (Teacher addressing classroom collectively)
    if (/^(सब|सभी)\s+बच्चे\s+(बैठ|खड़े|सुनो|लिखो|ताली|किताब)/i.test(normalized)) {
      if (normalized.includes('बैठ')) {
        return this.translate('बैठ जाओ', targetLang);
      } else if (normalized.includes('खड़े')) {
        return this.translate('खड़े हो जाओ', targetLang);
      } else if (normalized.includes('ताली')) {
        return this.translate('ताली बजाओ', targetLang);
      } else if (normalized.includes('किताब')) {
        return this.translate('किताब खोलो', targetLang);
      }
    }

    // 3. Multi-word & Token-level N-gram Translation with Lemmatization & Grammar
    const rawTokens = (isEnglishSource ? cleaned : normalized).split(/\s+/).filter(w => w.length > 0);
    const matchedTokens: Array<{ hindi: string; target: string; phonetic: string }> = [];
    const translatedTargetWords: string[] = [];
    const translatedPhoneticWords: string[] = [];
    const translatedEnglishPhoneticWords: string[] = [];

    let i = 0;
    while (i < rawTokens.length) {
      const rawWord = rawTokens[i];
      const nextWord = i + 1 < rawTokens.length ? rawTokens[i + 1] : '';
      const twoWords = nextWord ? `${rawWord} ${nextWord}` : '';

      // Normalize common speech-to-text spelling variations
      const word = rawWord.replace(/पेड/g, 'पेड़').replace(/पढ/g, 'पढ़').replace(/बड/g, 'बड़');
      const twoWordsNorm = twoWords.replace(/पेड/g, 'पेड़').replace(/पढ/g, 'पढ़').replace(/बड/g, 'बड़');

      // A. Check 2-word phrase first (e.g. "बैठ जाओ", "खड़े हो", "ध्यान से", "हाथ धो", "ताली बजाओ")
      let phraseMatch = twoWordsNorm ? lexicon.find(item => item.hindi === twoWordsNorm || twoWordsNorm.includes(item.hindi)) : null;
      let dictPhraseMatch = twoWordsNorm ? CLASSROOM_VOCABULARY_MAP[twoWordsNorm] : null;

      if (phraseMatch) {
        matchedTokens.push({
          hindi: twoWords,
          target: phraseMatch.targetText,
          phonetic: phraseMatch.devanagariPhonetic
        });
        translatedTargetWords.push(phraseMatch.targetText);
        translatedPhoneticWords.push(phraseMatch.devanagariPhonetic);
        translatedEnglishPhoneticWords.push(phraseMatch.englishPhonetic);
        i += 2;
        continue;
      } else if (dictPhraseMatch) {
        const entry = dictPhraseMatch[targetLang];
        matchedTokens.push({
          hindi: twoWords,
          target: entry.target,
          phonetic: entry.phonetic
        });
        translatedTargetWords.push(entry.target);
        translatedPhoneticWords.push(entry.phonetic);
        translatedEnglishPhoneticWords.push(entry.english);
        i += 2;
        continue;
      }

      // B. Single word translation
      let hWord = word;
      if (isEnglishSource && ENGLISH_TO_HINDI_NOUNS[word]) {
        hWord = ENGLISH_TO_HINDI_NOUNS[word];
      }

      // 1. Direct lexicon item match
      let match = lexicon.find(item => item.hindi === hWord);
      if (match) {
        matchedTokens.push({
          hindi: word,
          target: match.targetText,
          phonetic: match.devanagariPhonetic
        });
        translatedTargetWords.push(match.targetText);
        translatedPhoneticWords.push(match.devanagariPhonetic);
        translatedEnglishPhoneticWords.push(match.englishPhonetic);
        i++;
        continue;
      }

      // 2. Lemmatize word & lookup in 250+ CLASSROOM_VOCABULARY_MAP
      const lemma = lemmatizeHindiWord(hWord);
      const dictEntry = CLASSROOM_VOCABULARY_MAP[hWord] || CLASSROOM_VOCABULARY_MAP[lemma.root];

      if (dictEntry) {
        const equiv = dictEntry[targetLang];
        let targetGlyphs = equiv.target;
        let phon = equiv.phonetic;
        let eng = equiv.english;

        // Apply authentic grammatical particles based on inflection
        if (lemma.isVerbFuture) {
          // Future tense marker (e.g. "पढ़ेंगे", "सीखेंगे", "सुनेंगे")
          if (targetLang === 'santhali') {
            targetGlyphs += ' ᱵᱚᱱ';
            phon += ' बोन';
            eng += ' bon';
          } else {
            targetGlyphs += ' बू';
            phon += ' बू';
            eng += ' bu';
          }
        } else if (lemma.isVerbImperative && !dictEntry[targetLang].target.includes('ᱯᱮ') && !dictEntry[targetLang].target.includes('पे')) {
          // Collective / polite imperative marker (e.g. "पढ़ो", "सुनो", "देखो")
          if (targetLang === 'santhali') {
            targetGlyphs += ' ᱯᱮ';
            phon += ' पे';
            eng += ' pe';
          } else {
            targetGlyphs += ' पे';
            phon += ' पे';
            eng += ' pe';
          }
        } else if (lemma.isPlural && !dictEntry[targetLang].target.includes('ᱠᱚ') && !dictEntry[targetLang].target.includes('को')) {
          // Plural noun marker
          if (targetLang === 'santhali') {
            targetGlyphs += ' ᱠᱚ';
            phon += ' को';
            eng += ' ko';
          } else {
            targetGlyphs += 'को';
            phon += 'को';
            eng += 'ko';
          }
        }

        matchedTokens.push({
          hindi: word,
          target: targetGlyphs,
          phonetic: phon
        });
        translatedTargetWords.push(targetGlyphs);
        translatedPhoneticWords.push(phon);
        translatedEnglishPhoneticWords.push(eng);
        i++;
        continue;
      }

      // 3. Phonetic matching in lexicon
      const phonMatch = lexicon.find(item => 
        item.englishPhonetic.toLowerCase() === word ||
        item.englishPhonetic.toLowerCase().includes(word)
      );

      if (phonMatch) {
        matchedTokens.push({
          hindi: word,
          target: phonMatch.targetText,
          phonetic: phonMatch.devanagariPhonetic
        });
        translatedTargetWords.push(phonMatch.targetText);
        translatedPhoneticWords.push(phonMatch.devanagariPhonetic);
        translatedEnglishPhoneticWords.push(phonMatch.englishPhonetic);
        i++;
        continue;
      }

      // 4. Fallback for untranslated word / proper noun:
      // In Santhali: transliterate Devanagari to authentic Ol Chiki unicode (U+1C50-U+1C7F)
      // so zero Devanagari Hindi script ever pollutes Santhali Ol Chiki output!
      const targetWord = targetLang === 'santhali' ? devanagariToOlChiki(word) : word;
      translatedTargetWords.push(targetWord);
      translatedPhoneticWords.push(word);
      translatedEnglishPhoneticWords.push(transliterateDevanagariToLatin(word));
      i++;
    }

    const hitRate = matchedTokens.length / (rawTokens.length || 1);
    const confidence = Math.max(0.85, Math.min(0.98, Number((0.75 + hitRate * 0.23).toFixed(2))));

    return {
      sourceText: inputText,
      sourceLang,
      targetLang,
      targetText: translatedTargetWords.join(' '),
      scriptType,
      devanagariPhonetic: translatedPhoneticWords.join(' '),
      englishPhonetic: translatedEnglishPhoneticWords.join(' '),
      confidence: Number(confidence.toFixed(2)),
      method: matchedTokens.length > 0 ? 'rule-based-morph' : 'ngram-fallback',
      tokens: matchedTokens
    };
  }

  /**
   * Reverse translation: Tribal speech to Hindi (for student-to-teacher communication)
   */
  public static translateTribalToHindi(tribalText: string, sourceLang: TribalLanguage): {
    hindiText: string;
    confidence: number;
    original: string;
  } {
    const cleaned = tribalText.trim().toLowerCase();
    const lexicon = this.lexicons[sourceLang];

    // 1. Exact match first
    const exactMatch = lexicon.find(item => 
      item.targetText.toLowerCase() === cleaned ||
      item.devanagariPhonetic.toLowerCase() === cleaned ||
      item.englishPhonetic.toLowerCase() === cleaned
    );

    if (exactMatch) {
      return {
        hindiText: exactMatch.hindi,
        confidence: 0.98,
        original: tribalText
      };
    }

    // 2. Substring match
    const match = lexicon.find(item => 
      item.targetText.toLowerCase().includes(cleaned) ||
      cleaned.includes(item.targetText.toLowerCase()) ||
      item.devanagariPhonetic.toLowerCase().includes(cleaned) ||
      cleaned.includes(item.devanagariPhonetic.toLowerCase()) ||
      item.englishPhonetic.toLowerCase().includes(cleaned) ||
      cleaned.includes(item.englishPhonetic.toLowerCase())
    );

    if (match) {
      return {
        hindiText: match.hindi,
        confidence: 0.90,
        original: tribalText
      };
    }

    return {
      hindiText: tribalText,
      confidence: 0.50,
      original: tribalText
    };
  }

  /**
   * Get all vocabulary items for a given language and category
   */
  public static getVocabulary(lang: TribalLanguage, category?: string): VocabularyItem[] {
    const list = this.lexicons[lang];
    if (!category || category === 'all') return list;
    return list.filter(item => item.category === category);
  }
}
