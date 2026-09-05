/**
 * High-precision Indic to Clean ASCII Transliteration Engine
 * Converts any Devanagari, Tribal phonetic, or diacritic string into 
 * pure standard ASCII [a-zA-Z] so standard English voices (Microsoft David, Zira, etc.)
 * pronounce every tribal word flawlessly with zero silence.
 */

const VOWEL_MAP: Record<string, string> = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
  'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
  'अं': 'an', 'अः': 'ah', 'ऑ': 'o', 'ॲ': 'a'
};

const MATRA_MAP: Record<string, string> = {
  'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ँ': 'n',
  'ः': 'h', 'ॉ': 'o', 'ॅ': 'e'
};

const CONSONANT_MAP: Record<string, string> = {
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
  'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh',
  'ष': 'sh', 'स': 's', 'ह': 'h', 'क्ष': 'ksh', 'त्र': 'tr',
  'ज्ञ': 'gy', 'ड़': 'r', 'ढ़': 'rh', 'फ़': 'f', 'ज़': 'z',
  'क़': 'q', 'ख़': 'kh', 'ग़': 'gh', 'ड़': 'r', 'ढ़': 'rh'
};

const PHONETIC_OVERRIDES: Record<string, string> = {
  'जोहार': 'Johar',
  'दुड़ुब': 'Durup',
  'दुड़ुब मे': 'Durup me',
  'दुड़ुब पे': 'Durup pe',
  'तेंगोन': 'Tengon',
  'तेंगोन मे': 'Tengon me',
  'तेंगोन पे': 'Tengon pe',
  'पोथी': 'Pothi',
  'पोथी राड़ाय मे': 'Pothi raray me',
  'पोथी बोंद मे': 'Pothi bond me',
  'राड़ाय': 'Raray',
  'हाकू': 'Haku',
  'हाकु': 'Haku',
  'सेता': 'Seta',
  'दारे': 'Dare',
  'दारू': 'Daru',
  'दाग': 'Daq',
  'दाः': 'Daa',
  'बाहा': 'Baha',
  'चेड़े': 'Chene',
  'चेणे': 'Chene',
  'गई': 'Gai',
  'गाइ': 'Gai',
  'मिद': 'Mit',
  'बार': 'Bar',
  'पे': 'Pe',
  'पुन': 'Pun',
  'मोड़े': 'More',
  'आडी नापाय': 'Ari napay',
  'आडी नापाय!': 'Ari napay!',
  'बेस गे': 'Bes ge',
  'बेस गे!': 'Bes ge!',
  'शाबाश': 'Shabash',
  'नमस्ते': 'Namaste',
  'नमस्ते बच्चों': 'Namaste bachho',
  'नमस्ते बच्चों!': 'Namaste bachho!',
  'बैठ जाओ': 'Baith jao',
  'खड़े हो जाओ': 'Khade ho jao',
  'किताब खोलो': 'Kitab kholo',
  'ताली बजाओ': 'Tali bajao',
  'पानी': 'Pani',
  'पेड़': 'Ped',
  'मछली': 'Machhli',
  'कुत्ता': 'Kutta',
  'फूल': 'Phool',
  'चिड़िया': 'Chiriya',
  'गाय': 'Gaay',
  'किताब': 'Kitab',
  'यह क्या है?': 'Yeh kya hai?',
  'तुम्हारा नाम क्या है?': 'Tumhara naam kya hai?'
};

export function cleanToAscii(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ṛ/g, 'r')
    .replace(/Ṛ/g, 'R')
    .replace(/ń/g, 'n')
    .replace(/Ń/g, 'N')
    .replace(/ṭ/g, 't')
    .replace(/ḍ/g, 'd')
    .replace(/ṇ/g, 'n')
    .replace(/ṁ/g, 'm')
    .replace(/ś/g, 'sh')
    .replace(/ṣ/g, 'sh')
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/[^a-zA-Z0-9\s.,!?'\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function transliterateDevanagariToLatin(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();

  // 1. Direct dictionary override lookup
  if (PHONETIC_OVERRIDES[trimmed]) {
    return PHONETIC_OVERRIDES[trimmed];
  }

  // 2. Check phrase word-by-word
  const words = trimmed.split(/\s+/);
  const translatedWords = words.map(w => {
    const cleanWord = w.replace(/[.,!?:;।]/g, '');
    const punct = w.replace(/[^.,!?:;।]/g, '');

    if (PHONETIC_OVERRIDES[cleanWord]) {
      return PHONETIC_OVERRIDES[cleanWord] + punct;
    }

    let result = '';
    const chars = Array.from(cleanWord);
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      const next = chars[i + 1];

      if (VOWEL_MAP[ch]) {
        result += VOWEL_MAP[ch];
      } else if (CONSONANT_MAP[ch]) {
        result += CONSONANT_MAP[ch];
        if (next === '्') {
          i++; // skip halant
        } else if (next && MATRA_MAP[next]) {
          result += MATRA_MAP[next];
          i++; // skip matra
        } else if (i === chars.length - 1) {
          // No inherent 'a' at word boundary
        } else {
          result += 'a';
        }
      } else if (MATRA_MAP[ch]) {
        result += MATRA_MAP[ch];
      } else {
        result += ch;
      }
    }

    return result + punct;
  });

  return cleanToAscii(translatedWords.join(' '));
}
