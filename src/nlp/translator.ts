import { TribalLanguage, TranslationResult, ScriptType, VocabularyItem } from './types';
import { SANTHALI_LEXICON } from './lexicons/santhali';
import { HO_LEXICON } from './lexicons/ho';
import { MUNDARI_LEXICON } from './lexicons/mundari';
import { transliterateDevanagariToLatin } from '../audio/transliterate';

export class PalashNLPTranslator {
  private static lexicons: Record<TribalLanguage, VocabularyItem[]> = {
    santhali: SANTHALI_LEXICON,
    ho: HO_LEXICON,
    mundari: MUNDARI_LEXICON
  };

  /**
   * Translates Hindi text into the target tribal language (Ho, Mundari, Santhali)
   * Designed for FLN primary school curriculum and classroom communication
   */
  public static translate(hindiText: string, targetLang: TribalLanguage): TranslationResult {
    const cleaned = hindiText.trim().replace(/[।.?!]+$/, '').toLowerCase();
    const lexicon = this.lexicons[targetLang];
    const scriptType: ScriptType = targetLang === 'santhali' ? 'olchiki' : (targetLang === 'ho' ? 'warangchiti' : 'devanagari');

    // 1. Exact Phrase Match in Lexicon
    const exact = lexicon.find(item => 
      item.hindi.toLowerCase() === cleaned || 
      cleaned.includes(item.hindi.toLowerCase()) && cleaned.length === item.hindi.length
    );

    if (exact) {
      return {
        sourceText: hindiText,
        sourceLang: 'hindi',
        targetLang,
        targetText: exact.targetText,
        scriptType,
        devanagariPhonetic: exact.devanagariPhonetic,
        englishPhonetic: exact.englishPhonetic,
        confidence: 0.98,
        method: 'exact-phrase',
        tokens: [{ hindi: exact.hindi, target: exact.targetText, phonetic: exact.devanagariPhonetic }]
      };
    }

    // 2. High-Frequency Primary Classroom Sentence Patterns
    // Pattern A: 'यह क्या है?' (What is this?)
    if (/^(यह|ये)\s+क्या\s+है\??/i.test(cleaned)) {
      if (targetLang === 'santhali') {
        return {
          sourceText: hindiText,
          sourceLang: 'hindi',
          targetLang,
          targetText: 'ᱱᱚᱣᱟ ᱫᱚ ᱪᱮᱫ?',
          scriptType,
          devanagariPhonetic: 'नोवा दो चेद?',
          englishPhonetic: 'Nowa do chet\'?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [
            { hindi: 'यह', target: 'ᱱᱚᱣᱟ', phonetic: 'नोवा' },
            { hindi: 'क्या है', target: 'ᱪᱮᱫ', phonetic: 'चेद' }
          ]
        };
      } else if (targetLang === 'ho') {
        return {
          sourceText: hindiText,
          sourceLang: 'hindi',
          targetLang,
          targetText: '𑣌𑣇𑣂𑢡 𑣎𑣈𑣌𑢡𑣂𑢡𑣒?',
          scriptType,
          devanagariPhonetic: 'नेया चिनातन?',
          englishPhonetic: 'Nea chinatan?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [
            { hindi: 'यह', target: 'नेया', phonetic: 'नेया' },
            { hindi: 'क्या है', target: 'चिनातन', phonetic: 'चिनातन' }
          ]
        };
      } else {
        return {
          sourceText: hindiText,
          sourceLang: 'hindi',
          targetLang,
          targetText: 'नेया चि-ना?',
          scriptType,
          devanagariPhonetic: 'नेया चि-ना?',
          englishPhonetic: 'Nea chi-na?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [
            { hindi: 'यह', target: 'नेया', phonetic: 'नेया' },
            { hindi: 'क्या है', target: 'चि-ना', phonetic: 'चि-ना' }
          ]
        };
      }
    }

    // Pattern B: 'वह क्या है?' (What is that?)
    if (/^(वह|वो)\s+क्या\s+है\??/i.test(cleaned)) {
      if (targetLang === 'santhali') {
        return {
          sourceText: hindiText,
          sourceLang: 'hindi',
          targetLang,
          targetText: 'ᱦᱟᱱᱟ ᱫᱚ ᱪᱮᱫ?',
          scriptType,
          devanagariPhonetic: 'हाना दो चेद?',
          englishPhonetic: 'Hana do chet\'?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [{ hindi: 'वह क्या है', target: 'ᱦᱟᱱᱟ ᱫᱚ ᱪᱮᱫ', phonetic: 'हाना दो चेद' }]
        };
      } else if (targetLang === 'ho') {
        return {
          sourceText: hindiText,
          sourceLang: 'hindi',
          targetLang,
          targetText: 'एना चिनातन?',
          scriptType,
          devanagariPhonetic: 'एना चिनातन?',
          englishPhonetic: 'Ena chinatan?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [{ hindi: 'वह क्या है', target: 'एना चिनातन', phonetic: 'एना चिनातन' }]
        };
      } else {
        return {
          sourceText: hindiText,
          sourceLang: 'hindi',
          targetLang,
          targetText: 'एना चि-ना?',
          scriptType,
          devanagariPhonetic: 'एना चि-ना?',
          englishPhonetic: 'Ena chi-na?',
          confidence: 0.95,
          method: 'slot-filled',
          tokens: [{ hindi: 'वह क्या है', target: 'एना चि-ना', phonetic: 'एना चि-ना' }]
        };
      }
    }

    // Pattern C: 'यह एक [वस्तु] है' (This is a [noun])
    const nounMatch = cleaned.match(/^(यह|ये)\s+(एक\s+)?([^\s]+)\s+है/);
    if (nounMatch && nounMatch[3]) {
      const nounHindi = nounMatch[3];
      const nounItem = lexicon.find(i => i.hindi === nounHindi);
      if (nounItem) {
        if (targetLang === 'santhali') {
          return {
            sourceText: hindiText,
            sourceLang: 'hindi',
            targetLang,
            targetText: `ᱱᱚᱣᱟ ᱫᱚ ᱢᱤᱫ ${nounItem.targetText} ᱠᱟᱱᱟ`,
            scriptType,
            devanagariPhonetic: `नोवा दो मिद ${nounItem.devanagariPhonetic} काना`,
            englishPhonetic: `Nowa do mit' ${nounItem.englishPhonetic} kana`,
            confidence: 0.92,
            method: 'slot-filled',
            tokens: [
              { hindi: 'यह एक', target: 'ᱱᱚᱣᱟ ᱫᱚ ᱢᱤᱫ', phonetic: 'नोवा दो मिद' },
              { hindi: nounHindi, target: nounItem.targetText, phonetic: nounItem.devanagariPhonetic },
              { hindi: 'है', target: 'ᱠᱟᱱᱟ', phonetic: 'काना' }
            ]
          };
        } else if (targetLang === 'ho') {
          return {
            sourceText: hindiText,
            sourceLang: 'hindi',
            targetLang,
            targetText: `नेया मि ${nounItem.targetText} तन`,
            scriptType,
            devanagariPhonetic: `नेया मि ${nounItem.devanagariPhonetic} तन`,
            englishPhonetic: `Nea mi ${nounItem.englishPhonetic} tan`,
            confidence: 0.92,
            method: 'slot-filled',
            tokens: [
              { hindi: 'यह एक', target: 'नेया मि', phonetic: 'नेया मि' },
              { hindi: nounHindi, target: nounItem.targetText, phonetic: nounItem.devanagariPhonetic },
              { hindi: 'है', target: 'तन', phonetic: 'तन' }
            ]
          };
        } else {
          return {
            sourceText: hindiText,
            sourceLang: 'hindi',
            targetLang,
            targetText: `नेया मियाद ${nounItem.targetText} तना`,
            scriptType,
            devanagariPhonetic: `नेया मियाद ${nounItem.devanagariPhonetic} तना`,
            englishPhonetic: `Nea miad ${nounItem.englishPhonetic} tana`,
            confidence: 0.92,
            method: 'slot-filled',
            tokens: [
              { hindi: 'यह एक', target: 'नेया मियाद', phonetic: 'नेया मियाद' },
              { hindi: nounHindi, target: nounItem.targetText, phonetic: nounItem.devanagariPhonetic },
              { hindi: 'है', target: 'तना', phonetic: 'तना' }
            ]
          };
        }
      }
    }

    // Pattern D: 'सभी बच्चे [action]' (Teacher addressing classroom collectively)
    if (/^(सब|सभी)\s+बच्चे\s+(बैठ|खड़े|सुनो|लिखो|ताली|किताब)/i.test(cleaned)) {
      if (cleaned.includes('बैठ')) {
        return this.translate('बैठ जाओ', targetLang);
      } else if (cleaned.includes('खड़े')) {
        return this.translate('खड़े हो जाओ', targetLang);
      } else if (cleaned.includes('ताली')) {
        return this.translate('ताली बजाओ', targetLang);
      } else if (cleaned.includes('किताब')) {
        return this.translate('किताब खोलो', targetLang);
      }
    }

    // 3. Token-level N-gram Decomposition & Synthesis
    const words = cleaned.split(/\s+/);
    const matchedTokens: Array<{ hindi: string; target: string; phonetic: string }> = [];
    const translatedTargetWords: string[] = [];
    const translatedPhoneticWords: string[] = [];

    for (const word of words) {
      const match = lexicon.find(i => i.hindi === word || word.includes(i.hindi));
      if (match) {
        matchedTokens.push({
          hindi: word,
          target: match.targetText,
          phonetic: match.devanagariPhonetic
        });
        translatedTargetWords.push(match.targetText);
        translatedPhoneticWords.push(match.devanagariPhonetic);
      } else {
        // Untranslated token kept phonetically
        translatedTargetWords.push(word);
        translatedPhoneticWords.push(word);
      }
    }

    const hitRate = matchedTokens.length / (words.length || 1);
    const confidence = Math.max(0.65, Math.min(0.90, hitRate));

    return {
      sourceText: hindiText,
      sourceLang: 'hindi',
      targetLang,
      targetText: translatedTargetWords.join(' '),
      scriptType,
      devanagariPhonetic: translatedPhoneticWords.join(' '),
      englishPhonetic: transliterateDevanagariToLatin(translatedPhoneticWords.join(' ')),
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
