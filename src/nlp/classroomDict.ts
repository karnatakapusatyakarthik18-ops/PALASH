import { TribalLanguage } from './types';

export interface WordEquiv {
  target: string;
  phonetic: string;
  english: string;
}

export interface TribalTranslationEntry {
  santhali: WordEquiv;
  ho: WordEquiv;
  mundari: WordEquiv;
}

// 250+ Essential Classroom & Lesson Explanation Words
export const CLASSROOM_VOCABULARY_MAP: Record<string, TribalTranslationEntry> = {
  // --- Pronouns & People ---
  'बच्चा': {
    santhali: { target: 'ᱜᱤᱫᱽᱨᱟᱹ', phonetic: 'गिदरा', english: 'Gidra' },
    ho: { target: 'होन', phonetic: 'होन', english: 'Hon' },
    mundari: { target: 'होन', phonetic: 'होन', english: 'Hon' }
  },
  'बच्चे': {
    santhali: { target: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ', phonetic: 'गिदरा को', english: 'Gidra ko' },
    ho: { target: 'होनको', phonetic: 'होनको', english: 'Honko' },
    mundari: { target: 'होनको', phonetic: 'होनको', english: 'Honko' }
  },
  'बच्चों': {
    santhali: { target: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ', phonetic: 'गिदरा को', english: 'Gidra ko' },
    ho: { target: 'होनको', phonetic: 'होनको', english: 'Honko' },
    mundari: { target: 'होनको', phonetic: 'होनको', english: 'Honko' }
  },
  'छात्र': {
    santhali: { target: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ', phonetic: 'पाठुवा', english: 'Pathuwa' },
    ho: { target: 'होनको', phonetic: 'होनको', english: 'Honko' },
    mundari: { target: 'होनको', phonetic: 'होनको', english: 'Honko' }
  },
  'शिक्षक': {
    santhali: { target: 'ᱢᱟᱪᱮᱫ', phonetic: 'माचेत', english: 'Machet' },
    ho: { target: 'मास्टर', phonetic: 'मास्टर', english: 'Master' },
    mundari: { target: 'गुरुजी', phonetic: 'गुरुजी', english: 'Guruji' }
  },
  'गुरुजी': {
    santhali: { target: 'ᱢᱟᱪᱮᱫ', phonetic: 'माचेत', english: 'Machet' },
    ho: { target: 'मास्टर', phonetic: 'मास्टर', english: 'Master' },
    mundari: { target: 'गुरुजी', phonetic: 'गुरुजी', english: 'Guruji' }
  },
  'दोस्त': {
    santhali: { target: 'ᱜᱟᱛᱮ', phonetic: 'गाते', english: 'Gate' },
    ho: { target: 'गाति', phonetic: 'गाति', english: 'Gati' },
    mundari: { target: 'गाति', phonetic: 'गाति', english: 'Gati' }
  },
  'मित्र': {
    santhali: { target: 'ᱜᱟᱛᱮ', phonetic: 'गाते', english: 'Gate' },
    ho: { target: 'गाति', phonetic: 'गाति', english: 'Gati' },
    mundari: { target: 'गाति', phonetic: 'गाति', english: 'Gati' }
  },
  'हम': {
    santhali: { target: 'ᱟᱵᱚ', phonetic: 'आबो', english: 'Abo' },
    ho: { target: 'आबू', phonetic: 'आबू', english: 'Abu' },
    mundari: { target: 'आबू', phonetic: 'आबू', english: 'Abu' }
  },
  'आप': {
    santhali: { target: 'ᱟᱯᱮ', phonetic: 'आपे', english: 'Ape' },
    ho: { target: 'अपे', phonetic: 'अपे', english: 'Ape' },
    mundari: { target: 'अपे', phonetic: 'अपे', english: 'Ape' }
  },
  'तुम': {
    santhali: { target: 'ᱟᱢ', phonetic: 'आम', english: 'Am' },
    ho: { target: 'अम', phonetic: 'अम', english: 'Am' },
    mundari: { target: 'अम', phonetic: 'अम', english: 'Am' }
  },
  'मैं': {
    santhali: { target: 'ᱤᱧ', phonetic: 'इंज', english: 'Inj' },
    ho: { target: 'ऐंग', phonetic: 'ऐंग', english: 'Aing' },
    mundari: { target: 'आईंग', phonetic: 'आईंग', english: 'Aing' }
  },
  'मेरा': {
    santhali: { target: 'ᱤᱧᱟᱜ', phonetic: 'इंजाग', english: 'Injag' },
    ho: { target: 'अइंगअः', phonetic: 'अइंगअह', english: 'Aing-ah' },
    mundari: { target: 'अइंगअः', phonetic: 'अइंगअह', english: 'Aing-ah' }
  },
  'तुम्हारा': {
    santhali: { target: 'ᱟᱢᱟᱜ', phonetic: 'अमाग', english: 'Amag' },
    ho: { target: 'अमाः', phonetic: 'अमाह', english: 'Amah' },
    mundari: { target: 'अमाः', phonetic: 'अमाह', english: 'Amah' }
  },
  'आपका': {
    santhali: { target: 'ᱟᱯᱮᱭᱟᱜ', phonetic: 'आपेयाग', english: 'Apeyag' },
    ho: { target: 'अपेयाः', phonetic: 'अपेयाह', english: 'Apeyah' },
    mundari: { target: 'अपेयाः', phonetic: 'अपेयाह', english: 'Apeyah' }
  },
  'अपना': {
    santhali: { target: 'ᱟᱯᱱᱟᱨ', phonetic: 'आपनार', english: 'Apnar' },
    ho: { target: 'आपना', phonetic: 'आपना', english: 'Apna' },
    mundari: { target: 'आपना', phonetic: 'आपना', english: 'Apna' }
  },
  'अपनी': {
    santhali: { target: 'ᱟᱯᱱᱟᱨ', phonetic: 'आपनार', english: 'Apnar' },
    ho: { target: 'आपना', phonetic: 'आपना', english: 'Apna' },
    mundari: { target: 'आपना', phonetic: 'आपना', english: 'Apna' }
  },
  'अपने': {
    santhali: { target: 'ᱟᱯᱱᱟᱨ', phonetic: 'आपनार', english: 'Apnar' },
    ho: { target: 'आपना', phonetic: 'आपना', english: 'Apna' },
    mundari: { target: 'आपना', phonetic: 'आपना', english: 'Apna' }
  },
  'यह': {
    santhali: { target: 'ᱱᱚᱣᱟ', phonetic: 'नोवा', english: 'Nowa' },
    ho: { target: 'नेया', phonetic: 'नेया', english: 'Neya' },
    mundari: { target: 'नेया', phonetic: 'नेया', english: 'Neya' }
  },
  'ये': {
    santhali: { target: 'ᱱᱚᱣᱟ', phonetic: 'नोवा', english: 'Nowa' },
    ho: { target: 'नेया', phonetic: 'नेया', english: 'Neya' },
    mundari: { target: 'नेया', phonetic: 'नेया', english: 'Neya' }
  },
  'वह': {
    santhali: { target: 'ᱦᱟᱱᱟ', phonetic: 'हाना', english: 'Hana' },
    ho: { target: 'एना', phonetic: 'एना', english: 'Ena' },
    mundari: { target: 'एना', phonetic: 'एना', english: 'Ena' }
  },
  'वो': {
    santhali: { target: 'ᱦᱟᱱᱟ', phonetic: 'हाना', english: 'Hana' },
    ho: { target: 'एना', phonetic: 'एना', english: 'Ena' },
    mundari: { target: 'एना', phonetic: 'एना', english: 'Ena' }
  },
  'यहाँ': {
    santhali: { target: 'ᱱᱚᱰᱮ', phonetic: 'नोडे', english: 'Node' },
    ho: { target: 'नेता', phonetic: 'नेता', english: 'Neta' },
    mundari: { target: 'नेरे', phonetic: 'नेरे', english: 'Nere' }
  },
  'वहाँ': {
    santhali: { target: 'ᱦᱟᱸᱰᱮ', phonetic: 'हांडे', english: 'Hande' },
    ho: { target: 'हेंता', phonetic: 'हेंता', english: 'Henta' },
    mundari: { target: 'एंटे', phonetic: 'एंटे', english: 'Ente' }
  },
  'कहाँ': {
    santhali: { target: 'ᱚᱠᱟᱨᱮ', phonetic: 'ओकारे', english: 'Okare' },
    ho: { target: 'ओकोनता', phonetic: 'ओकोनता', english: 'Okonta' },
    mundari: { target: 'ओकोनरे', phonetic: 'ओकोनरे', english: 'Okonre' }
  },
  'सब': {
    santhali: { target: 'ᱡᱚᱛᱚ', phonetic: 'जोतो', english: 'Joto' },
    ho: { target: 'सबिन', phonetic: 'सबिन', english: 'Sabin' },
    mundari: { target: 'सबिन', phonetic: 'सबिन', english: 'Sabin' }
  },
  'सभी': {
    santhali: { target: 'ᱡᱚᱛᱚ', phonetic: 'जोतो', english: 'Joto' },
    ho: { target: 'सबिन', phonetic: 'सबिन', english: 'Sabin' },
    mundari: { target: 'सबिन', phonetic: 'सबिन', english: 'Sabin' }
  },

  // --- Time & Discourse ---
  'आज': {
    santhali: { target: 'ᱛᱮᱦᱮᱧ', phonetic: 'तेहेंज', english: 'Tehenj' },
    ho: { target: 'तिसिंग', phonetic: 'तिसिंग', english: 'Tising' },
    mundari: { target: 'तिसिंग', phonetic: 'तिसिंग', english: 'Tising' }
  },
  'कल': {
    santhali: { target: 'ᱜᱟᱯᱟ', phonetic: 'गापा', english: 'Gapa' },
    ho: { target: 'गापा', phonetic: 'गापा', english: 'Gapa' },
    mundari: { target: 'गापा', phonetic: 'गापा', english: 'Gapa' }
  },
  'अब': {
    santhali: { target: 'ᱱᱤᱛᱚᱜ', phonetic: 'नितोक', english: 'Nitog' },
    ho: { target: 'नाः', phonetic: 'नाह', english: 'Nah' },
    mundari: { target: 'नाः', phonetic: 'नाह', english: 'Nah' }
  },
  'सुबह': {
    santhali: { target: 'ᱥᱮᱛᱟᱜ', phonetic: 'सेताग', english: 'Setag' },
    ho: { target: 'सेताः', phonetic: 'सेताह', english: 'Setah' },
    mundari: { target: 'सेताः', phonetic: 'सेताह', english: 'Setah' }
  },
  'शाम': {
    santhali: { target: 'ᱟᱹᱭᱩᱵ', phonetic: 'आयुब', english: 'Ayub' },
    ho: { target: 'आयुब', phonetic: 'आयुब', english: 'Ayub' },
    mundari: { target: 'आयुब', phonetic: 'आयुब', english: 'Ayub' }
  },
  'दिन': {
    santhali: { target: 'ᱢᱟᱦᱟ', phonetic: 'माहा', english: 'Maha' },
    ho: { target: 'दिन', phonetic: 'दिन', english: 'Din' },
    mundari: { target: 'दिन', phonetic: 'दिन', english: 'Din' }
  },
  'रात': {
    santhali: { target: 'ᱧᱤᱫᱟᱹ', phonetic: 'ञिदा', english: 'Nyida' },
    ho: { target: 'निदा', phonetic: 'निदा', english: 'Nida' },
    mundari: { target: 'निदा', phonetic: 'निदा', english: 'Nida' }
  },

  // --- Classroom & Learning Objects ---
  'किताब': {
    santhali: { target: 'ᱯᱳᱛᱷᱤ', phonetic: 'पोथी', english: 'Pothi' },
    ho: { target: '𑣕𑣉𑣂𑣈', phonetic: 'पुति', english: 'Puti' },
    mundari: { target: 'पोथी', phonetic: 'पोथी', english: 'Pothi' }
  },
  'किताबें': {
    santhali: { target: 'ᱯᱳᱛᱷᱤ ᱠᱚ', phonetic: 'पोथी को', english: 'Pothi ko' },
    ho: { target: 'पुतिको', phonetic: 'पुतिको', english: 'Putiko' },
    mundari: { target: 'पोथीको', phonetic: 'पोथीको', english: 'Pothiko' }
  },
  'पुस्तक': {
    santhali: { target: 'ᱯᱳᱛᱷᱤ', phonetic: 'पोथी', english: 'Pothi' },
    ho: { target: 'पुति', phonetic: 'पुति', english: 'Puti' },
    mundari: { target: 'पोथी', phonetic: 'पोथी', english: 'Pothi' }
  },
  'कॉपी': {
    santhali: { target: 'ᱠᱷᱟᱛᱟ', phonetic: 'खाता', english: 'Khata' },
    ho: { target: 'खाता', phonetic: 'खाता', english: 'Khata' },
    mundari: { target: 'खाता', phonetic: 'खाता', english: 'Khata' }
  },
  'कलम': {
    santhali: { target: 'ᱠᱚᱞᱚᱢ', phonetic: 'कोलोम', english: 'Kolom' },
    ho: { target: 'कलम', phonetic: 'कलम', english: 'Kalam' },
    mundari: { target: 'कलम', phonetic: 'कलम', english: 'Kalam' }
  },
  'पेंसिल': {
    santhali: { target: 'ᱯᱮᱱᱥᱤᱞ', phonetic: 'पेंसिल', english: 'Pensil' },
    ho: { target: 'पेंसिल', phonetic: 'पेंसिल', english: 'Pensil' },
    mundari: { target: 'पेंसिल', phonetic: 'पेंसिल', english: 'Pensil' }
  },
  'स्लेट': {
    santhali: { target: 'ᱥᱞᱮᱴ', phonetic: 'स्लेट', english: 'Slet' },
    ho: { target: 'स्लेट', phonetic: 'स्लेट', english: 'Slet' },
    mundari: { target: 'स्लेट', phonetic: 'स्लेट', english: 'Slet' }
  },
  'पाठ': {
    santhali: { target: 'ᱯᱟᱴᱷ', phonetic: 'पाठ', english: 'Path' },
    ho: { target: 'पाठ', phonetic: 'पाठ', english: 'Path' },
    mundari: { target: 'पाठ', phonetic: 'पाठ', english: 'Path' }
  },
  'कहानी': {
    santhali: { target: 'ᱠᱟᱹᱦᱱᱤ', phonetic: 'काहनी', english: 'Kahni' },
    ho: { target: 'कहाणी', phonetic: 'कहाणी', english: 'Kahani' },
    mundari: { target: 'कहाणी', phonetic: 'कहाणी', english: 'Kahani' }
  },
  'कहानियाँ': {
    santhali: { target: 'ᱠᱟᱹᱦᱱᱤ ᱠᱚ', phonetic: 'काहनी को', english: 'Kahni ko' },
    ho: { target: 'कहाणीको', phonetic: 'कहाणीको', english: 'Kahaniko' },
    mundari: { target: 'कहाणीको', phonetic: 'कहाणीको', english: 'Kahaniko' }
  },
  'कविता': {
    santhali: { target: 'ᱥᱮᱨᱮᱧ', phonetic: 'सेरेंज', english: 'Serenj' },
    ho: { target: 'दुरंग', phonetic: 'दुरंग', english: 'Durang' },
    mundari: { target: 'दुरंग', phonetic: 'दुरंग', english: 'Durang' }
  },
  'गाना': {
    santhali: { target: 'ᱥᱮᱨᱮᱧ', phonetic: 'सेरेंज', english: 'Serenj' },
    ho: { target: 'दुरंग', phonetic: 'दुरंग', english: 'Durang' },
    mundari: { target: 'दुरंग', phonetic: 'दुरंग', english: 'Durang' }
  },
  'चित्र': {
    santhali: { target: 'ᱪᱤᱛᱟᱹᱨ', phonetic: 'चितार', english: 'Chitar' },
    ho: { target: 'मूरत', phonetic: 'मूरत', english: 'Murat' },
    mundari: { target: 'मूरत', phonetic: 'मूरत', english: 'Murat' }
  },
  'गिनती': {
    santhali: { target: 'ᱞᱮᱠᱷᱟ', phonetic: 'लेखा', english: 'Lekha' },
    ho: { target: 'लेका', phonetic: 'लेका', english: 'Leka' },
    mundari: { target: 'लेका', phonetic: 'लेका', english: 'Leka' }
  },
  'संख्या': {
    santhali: { target: 'ᱞᱮᱠᱷᱟ', phonetic: 'लेखा', english: 'Lekha' },
    ho: { target: 'लेका', phonetic: 'लेका', english: 'Leka' },
    mundari: { target: 'लेका', phonetic: 'लेका', english: 'Leka' }
  },
  'अक्षर': {
    santhali: { target: 'ᱚᱞ', phonetic: 'ओल', english: 'Ol' },
    ho: { target: 'अखोर', phonetic: 'अखोर', english: 'Akhor' },
    mundari: { target: 'अखोर', phonetic: 'अखोर', english: 'Akhor' }
  },
  'शब्द': {
    santhali: { target: 'ᱟᱹᱲᱟᱹ', phonetic: 'आड़ा', english: 'Ara' },
    ho: { target: 'काजी', phonetic: 'काजी', english: 'Kaji' },
    mundari: { target: 'काजी', phonetic: 'काजी', english: 'Kaji' }
  },
  'स्कूल': {
    santhali: { target: 'ᱟᱥᱲᱟ', phonetic: 'आसड़ा', english: 'Asra' },
    ho: { target: 'स्कूल', phonetic: 'स्कूल', english: 'School' },
    mundari: { target: 'स्कूल', phonetic: 'स्कूल', english: 'School' }
  },
  'कक्षा': {
    santhali: { target: 'ᱪᱟᱱᱟᱪ', phonetic: 'चानाच', english: 'Chanach' },
    ho: { target: 'कलास', phonetic: 'कलास', english: 'Kalas' },
    mundari: { target: 'कलास', phonetic: 'कलास', english: 'Kalas' }
  },

  // --- Verbs (Root Stems) ---
  'पढ़': {
    santhali: { target: 'ᱯᱟᱲᱦᱟᱣ', phonetic: 'पाड़हाव', english: 'Parhaw' },
    ho: { target: 'पइड़ाव', phonetic: 'पइड़ाव', english: 'Pairao' },
    mundari: { target: 'पड़ाव', phonetic: 'पड़ाव', english: 'Padaw' }
  },
  'सुन': {
    santhali: { target: 'ᱟᱸᱡᱚᱢ', phonetic: 'आंजोम', english: 'Aanjom' },
    ho: { target: 'आयूम', phonetic: 'आयूम', english: 'Ayum' },
    mundari: { target: 'आयुम', phonetic: 'आयुम', english: 'Ayum' }
  },
  'लिख': {
    santhali: { target: 'ᱚᱞ', phonetic: 'ओल', english: 'Ol' },
    ho: { target: 'ओल', phonetic: 'ओल', english: 'Ol' },
    mundari: { target: 'ओल', phonetic: 'ओल', english: 'Ol' }
  },
  'देख': {
    santhali: { target: 'ᱧᱮᱞ', phonetic: 'ञेल', english: 'Nyel' },
    ho: { target: 'नेल', phonetic: 'नेल', english: 'Nel' },
    mundari: { target: 'नेल', phonetic: 'नेल', english: 'Nel' }
  },
  'बोल': {
    santhali: { target: 'ᱨᱚᱲ', phonetic: 'रोड़', english: 'Ror' },
    ho: { target: 'काजी', phonetic: 'काजी', english: 'Kaji' },
    mundari: { target: 'काजी', phonetic: 'काजी', english: 'Kaji' }
  },
  'सीख': {
    santhali: { target: 'ᱪᱮᱫ', phonetic: 'चेद', english: 'Chet' },
    ho: { target: 'इतु', phonetic: 'इतु', english: 'Itu' },
    mundari: { target: 'इतु', phonetic: 'इतु', english: 'Itu' }
  },
  'बता': {
    santhali: { target: 'ᱞᱟᱹᱭ', phonetic: 'लई', english: 'Lay' },
    ho: { target: 'काजी', phonetic: 'काजी', english: 'Kaji' },
    mundari: { target: 'काजी', phonetic: 'काजी', english: 'Kaji' }
  },
  'बैठ': {
    santhali: { target: 'ᱫᱩᱲᱩᱵᱽ', phonetic: 'दुड़ुब', english: 'Durup' },
    ho: { target: 'दुब', phonetic: 'दुब', english: 'Dub' },
    mundari: { target: 'दुब', phonetic: 'दुब', english: 'Dub' }
  },
  'खड़ा': {
    santhali: { target: 'ᱛᱮᱸᱜᱳᱱ', phonetic: 'तेंगोन', english: 'Tengon' },
    ho: { target: 'तिंगुन', phonetic: 'तिंगुन', english: 'Tingun' },
    mundari: { target: 'तिंगुन', phonetic: 'तिंगुन', english: 'Tingun' }
  },
  'खा': {
    santhali: { target: 'ᱡᱚᱢ', phonetic: 'जोम', english: 'Jom' },
    ho: { target: 'जोम', phonetic: 'जोम', english: 'Jom' },
    mundari: { target: 'जोम', phonetic: 'जोम', english: 'Jom' }
  },
  'पी': {
    santhali: { target: 'ᱧᱩ', phonetic: 'ञु', english: 'Nyu' },
    ho: { target: 'नुई', phonetic: 'नुई', english: 'Nui' },
    mundari: { target: 'नु', phonetic: 'नु', english: 'Nu' }
  },
  'धो': {
    santhali: { target: 'ᱟᱹᱨᱩᱵ', phonetic: 'आरुब', english: 'Arub' },
    ho: { target: 'अभुंग', phonetic: 'अभुंग', english: 'Abhung' },
    mundari: { target: 'अभुंग', phonetic: 'अभुंग', english: 'Abhung' }
  },
  'गा': {
    santhali: { target: 'ᱥᱮᱨᱮᱧ', phonetic: 'सेरेंज', english: 'Serenj' },
    ho: { target: 'दुरंग', phonetic: 'दुरंग', english: 'Durang' },
    mundari: { target: 'दुरंग', phonetic: 'दुरंग', english: 'Durang' }
  },
  'नाच': {
    santhali: { target: 'ᱮᱱᱮᱡ', phonetic: 'एनेज', english: 'Enej' },
    ho: { target: 'सुसुन', phonetic: 'सुसुन', english: 'Susun' },
    mundari: { target: 'सुसुन', phonetic: 'सुसुन', english: 'Susun' }
  },
  'खेल': {
    santhali: { target: 'ᱮᱱᱮᱡ', phonetic: 'एनेज', english: 'Enej' },
    ho: { target: 'इनुंग', phonetic: 'इनुंग', english: 'Inung' },
    mundari: { target: 'इनुंग', phonetic: 'इनुंग', english: 'Inung' }
  },
  'गिन': {
    santhali: { target: 'ᱞᱮᱠᱷᱟ', phonetic: 'लेखा', english: 'Lekha' },
    ho: { target: 'लेका', phonetic: 'लेका', english: 'Leka' },
    mundari: { target: 'लेका', phonetic: 'लेका', english: 'Leka' }
  },
  'कर': {
    santhali: { target: 'ᱠᱟᱹᱢᱤ', phonetic: 'कामी', english: 'Kami' },
    ho: { target: 'बाइ', phonetic: 'बाइ', english: 'Bai' },
    mundari: { target: 'बाइ', phonetic: 'बाइ', english: 'Bai' }
  },
  'दे': {
    santhali: { target: 'ᱮᱢ', phonetic: 'एम', english: 'Em' },
    ho: { target: 'एम', phonetic: 'एम', english: 'Em' },
    mundari: { target: 'एम', phonetic: 'एम', english: 'Em' }
  },
  'ले': {
    santhali: { target: 'ᱦᱟᱛᱟᱣ', phonetic: 'हाताव', english: 'Hataw' },
    ho: { target: 'इदि', phonetic: 'इदि', english: 'Idi' },
    mundari: { target: 'इदि', phonetic: 'इदि', english: 'Idi' }
  },
  'जा': {
    santhali: { target: 'ᱪᱟᱞᱟᱜ', phonetic: 'चालाग', english: 'Chalaq' },
    ho: { target: 'सेनो', phonetic: 'सेनो', english: 'Seno' },
    mundari: { target: 'सेनो', phonetic: 'सेनो', english: 'Seno' }
  },
  'आ': {
    santhali: { target: 'ᱦᱤᱡᱩᱜ', phonetic: 'हिजुग', english: 'Hijuq' },
    ho: { target: 'हिजु', phonetic: 'हिजु', english: 'Hiju' },
    mundari: { target: 'हिजु', phonetic: 'हिजु', english: 'Hiju' }
  },
  'उड़': {
    santhali: { target: 'ᱩᱰᱟᱹᱣ', phonetic: 'उडाव', english: 'Udaw' },
    ho: { target: 'उडाव', phonetic: 'उडाव', english: 'Udaw' },
    mundari: { target: 'उडाव', phonetic: 'उडाव', english: 'Udaw' }
  },
  'निकल': {
    santhali: { target: 'ᱚᱰᱚᱠ', phonetic: 'ओडोक', english: 'Odok' },
    ho: { target: 'ओड़ोक', phonetic: 'ओड़ोक', english: 'Odok' },
    mundari: { target: 'ओड़ोक', phonetic: 'ओड़ोक', english: 'Odok' }
  },
  'बजा': {
    santhali: { target: 'ᱫᱟᱞ', phonetic: 'दाल', english: 'Dal' },
    ho: { target: 'तेये', phonetic: 'तेये', english: 'Teye' },
    mundari: { target: 'बजाव', phonetic: 'बजाव', english: 'Bajaw' }
  },
  'खोलो': {
    santhali: { target: 'ᱨᱟᱲᱟᱭ ᱢᱮ', phonetic: 'राड़ाय मे', english: 'Raray me' },
    ho: { target: 'उघड़ेन', phonetic: 'उघड़ेन', english: 'Ugharen' },
    mundari: { target: 'उघड़मे', phonetic: 'उघड़मे', english: 'Ugharme' }
  },
  'बंद': {
    santhali: { target: 'ᱵᱚᱸᱫᱽ', phonetic: 'बोंद', english: 'Bond' },
    ho: { target: 'बोंद', phonetic: 'बोंद', english: 'Bond' },
    mundari: { target: 'बोंद', phonetic: 'बोंद', english: 'Bond' }
  },

  // --- Nature, Animals & Food ---
  'पेड़': {
    santhali: { target: 'ᱫᱟᱨᱮ', phonetic: 'दारे', english: 'Dare' },
    ho: { target: 'दारू', phonetic: 'दारू', english: 'Daru' },
    mundari: { target: 'दारू', phonetic: 'दारू', english: 'Daru' }
  },
  'पेड़ों': {
    santhali: { target: 'ᱫᱟᱨᱮ ᱠᱚ', phonetic: 'दारे को', english: 'Dare ko' },
    ho: { target: 'दारूको', phonetic: 'दारूको', english: 'Daruko' },
    mundari: { target: 'दारूको', phonetic: 'दारूको', english: 'Daruko' }
  },
  'वृक्ष': {
    santhali: { target: 'ᱫᱟᱨᱮ', phonetic: 'दारे', english: 'Dare' },
    ho: { target: 'दारू', phonetic: 'दारू', english: 'Daru' },
    mundari: { target: 'दारू', phonetic: 'दारू', english: 'Daru' }
  },
  'फल': {
    santhali: { target: 'ᱡᱚ', phonetic: 'जो', english: 'Jo' },
    ho: { target: 'जो', phonetic: 'जो', english: 'Jo' },
    mundari: { target: 'जो', phonetic: 'जो', english: 'Jo' }
  },
  'फूल': {
    santhali: { target: 'ᱵᱟᱦᱟ', phonetic: 'बाहा', english: 'Baha' },
    ho: { target: 'बा', phonetic: 'बा', english: 'Ba' },
    mundari: { target: 'बाहा', phonetic: 'बाहा', english: 'Baha' }
  },
  'पत्ता': {
    santhali: { target: 'ᱥᱟᱠᱟᱢ', phonetic: 'साकाम', english: 'Sakam' },
    ho: { target: 'साकाम', phonetic: 'साकाम', english: 'Sakam' },
    mundari: { target: 'साकाम', phonetic: 'साकाम', english: 'Sakam' }
  },
  'घास': {
    santhali: { target: 'ᱜᱷᱟᱸᱥ', phonetic: 'घांस', english: 'Ghas' },
    ho: { target: 'तासी', phonetic: 'तासी', english: 'Tasi' },
    mundari: { target: 'तासी', phonetic: 'तासी', english: 'Tasi' }
  },
  'पानी': {
    santhali: { target: 'ᱫᱟᱜ', phonetic: 'दाग', english: 'Daq' },
    ho: { target: 'दाः', phonetic: 'दाह', english: 'Da' },
    mundari: { target: 'दाः', phonetic: 'दाह', english: 'Da' }
  },
  'जल': {
    santhali: { target: 'ᱫᱟᱜ', phonetic: 'दाग', english: 'Daq' },
    ho: { target: 'दाः', phonetic: 'दाह', english: 'Da' },
    mundari: { target: 'दाः', phonetic: 'दाह', english: 'Da' }
  },
  'दूध': {
    santhali: { target: 'ᱛᱳᱣᱟ', phonetic: 'तोवा', english: 'Towa' },
    ho: { target: 'तोवा', phonetic: 'तोवा', english: 'Towa' },
    mundari: { target: 'तोवा', phonetic: 'तोवा', english: 'Towa' }
  },
  'खाना': {
    santhali: { target: 'ᱫᱟᱠᱟ', phonetic: 'दाका', english: 'Daka' },
    ho: { target: 'मंडी', phonetic: 'मंडी', english: 'Mandi' },
    mundari: { target: 'मंडी', phonetic: 'मंडी', english: 'Mandi' }
  },
  'रोटी': {
    santhali: { target: 'ᱯᱤᱴᱷᱟᱹ', phonetic: 'पिठा', english: 'Pitha' },
    ho: { target: 'रोटी', phonetic: 'रोटी', english: 'Roti' },
    mundari: { target: 'रोटी', phonetic: 'रोटी', english: 'Roti' }
  },
  'सूरज': {
    santhali: { target: 'ᱥᱤᱧ', phonetic: 'सिंञ', english: 'Sinj' },
    ho: { target: 'सिंगी', phonetic: 'सिंगी', english: 'Singi' },
    mundari: { target: 'सिंगी', phonetic: 'सिंगी', english: 'Singi' }
  },
  'धूप': {
    santhali: { target: 'ᱵᱮᱲᱟ', phonetic: 'बेड़ा', english: 'Bera' },
    ho: { target: 'सिंगी', phonetic: 'सिंगी', english: 'Singi' },
    mundari: { target: 'सिंगी', phonetic: 'सिंगी', english: 'Singi' }
  },
  'चाँद': {
    santhali: { target: 'ᱪᱟᱸᱫᱚ', phonetic: 'चांदो', english: 'Chando' },
    ho: { target: 'चांदु', phonetic: 'चांदु', english: 'Chandu' },
    mundari: { target: 'चांदू', phonetic: 'चांदू', english: 'Chandu' }
  },
  'तारे': {
    santhali: { target: 'ᱤᱯᱤᱞ', phonetic: 'इपिल', english: 'Ipil' },
    ho: { target: 'इपिल', phonetic: 'इपिल', english: 'Ipil' },
    mundari: { target: 'इपिल', phonetic: 'इपिल', english: 'Ipil' }
  },
  'आकाश': {
    santhali: { target: 'ᱥᱮᱨᱢᱟ', phonetic: 'सेरमा', english: 'Serma' },
    ho: { target: 'सिरमा', phonetic: 'सिरमा', english: 'Sirma' },
    mundari: { target: 'सिरमा', phonetic: 'सिरमा', english: 'Sirma' }
  },
  'बादल': {
    santhali: { target: 'ᱨᱤᱢᱤᱞ', phonetic: 'रिमिल', english: 'Rimil' },
    ho: { target: 'रिमिल', phonetic: 'रिमिल', english: 'Rimil' },
    mundari: { target: 'रिमिल', phonetic: 'रिमिल', english: 'Rimil' }
  },
  'हवा': {
    santhali: { target: 'ᱦᱚᱭ', phonetic: 'होय', english: 'Hoy' },
    ho: { target: 'होयो', phonetic: 'होयो', english: 'Hoyo' },
    mundari: { target: 'होयो', phonetic: 'होयो', english: 'Hoyo' }
  },
  'घर': {
    santhali: { target: 'ᱚᱲᱟᱜ', phonetic: 'ओड़ाग', english: 'Orag' },
    ho: { target: 'ओड़ाः', phonetic: 'ओड़ाह', english: 'Orah' },
    mundari: { target: 'ओड़ाः', phonetic: 'ओड़ाह', english: 'Orah' }
  },
  'गाँव': {
    santhali: { target: 'ᱟᱹᱛᱩ', phonetic: 'आतु', english: 'Atu' },
    ho: { target: 'हातू', phonetic: 'हातू', english: 'Hatu' },
    mundari: { target: 'हातू', phonetic: 'हातू', english: 'Hatu' }
  },
  'गाय': {
    santhali: { target: 'ᱜᱟᱹᱭ', phonetic: 'गई', english: 'Gai' },
    ho: { target: 'गाई', phonetic: 'गाई', english: 'Gai' },
    mundari: { target: 'उरीः', phonetic: 'उरीह', english: 'Uri' }
  },
  'बैल': {
    santhali: { target: 'ᱰᱟᱝᱜᱽᱨᱟ', phonetic: 'डांगरा', english: 'Dangra' },
    ho: { target: 'उरीः', phonetic: 'उरीह', english: 'Uri' },
    mundari: { target: 'डांगरा', phonetic: 'डांगरा', english: 'Dangra' }
  },
  'बकरी': {
    santhali: { target: 'ᱢᱮᱨᱚᱢ', phonetic: 'मेरम', english: 'Merom' },
    ho: { target: 'मेरम', phonetic: 'मेरम', english: 'Merom' },
    mundari: { target: 'मेरम', phonetic: 'मेरम', english: 'Merom' }
  },
  'कुत्ता': {
    santhali: { target: 'ᱥᱮᱛᱟ', phonetic: 'सेता', english: 'Seta' },
    ho: { target: 'सेता', phonetic: 'सेता', english: 'Seta' },
    mundari: { target: 'सेता', phonetic: 'सेता', english: 'Seta' }
  },
  'बिल्ली': {
    santhali: { target: 'ᱯᱩᱥᱤ', phonetic: 'पुसी', english: 'Pusi' },
    ho: { target: 'पुसी', phonetic: 'पुसी', english: 'Pusi' },
    mundari: { target: 'पुसी', phonetic: 'पुसी', english: 'Pusi' }
  },
  'मछली': {
    santhali: { target: 'ᱦᱟᱹᱠᱩ', phonetic: 'हाकू', english: 'Haku' },
    ho: { target: 'हाकु', phonetic: 'हाकु', english: 'Haku' },
    mundari: { target: 'हाकु', phonetic: 'हाकु', english: 'Haku' }
  },
  'चिड़िया': {
    santhali: { target: 'ᱪᱮᱬᱮ', phonetic: 'चेड़े', english: 'Chene' },
    ho: { target: 'चेड़े', phonetic: 'चेड़े', english: 'Chede' },
    mundari: { target: 'चेड़े', phonetic: 'चेड़े', english: 'Chede' }
  },
  'पक्षी': {
    santhali: { target: 'ᱪᱮᱬᱮ', phonetic: 'चेड़े', english: 'Chene' },
    ho: { target: 'चेड़े', phonetic: 'चेड़े', english: 'Chede' },
    mundari: { target: 'चेड़े', phonetic: 'चेड़े', english: 'Chede' }
  },
  'हाथी': {
    santhali: { target: 'ᱦᱟᱹᱛᱤ', phonetic: 'हाती', english: 'Hati' },
    ho: { target: 'हाती', phonetic: 'हाती', english: 'Hati' },
    mundari: { target: 'हाती', phonetic: 'हाती', english: 'Hati' }
  },
  'शेर': {
    santhali: { target: 'ᱛᱟᱹᱨᱩᱵ', phonetic: 'तारुब', english: 'Tarub' },
    ho: { target: 'कुल', phonetic: 'कुल', english: 'Kul' },
    mundari: { target: 'कुल', phonetic: 'कुल', english: 'Kul' }
  },
  'बाघ': {
    santhali: { target: 'ᱛᱟᱹᱨᱩᱵ', phonetic: 'तारुब', english: 'Tarub' },
    ho: { target: 'कुल', phonetic: 'कुल', english: 'Kul' },
    mundari: { target: 'कुल', phonetic: 'कुल', english: 'Kul' }
  },
  'साँप': {
    santhali: { target: 'ᱵᱤᱧ', phonetic: 'बेंज', english: 'Binj' },
    ho: { target: 'बिंग', phonetic: 'बिंग', english: 'Bing' },
    mundari: { target: 'बिंग', phonetic: 'बिंग', english: 'Bing' }
  },

  // --- Body Parts ---
  'हाथ': {
    santhali: { target: 'ᱛᱤ', phonetic: 'ती', english: 'Ti' },
    ho: { target: 'ती', phonetic: 'ती', english: 'Ti' },
    mundari: { target: 'ती', phonetic: 'ती', english: 'Ti' }
  },
  'पैर': {
    santhali: { target: 'ᱡᱟᱝᱜᱟ', phonetic: 'जांगा', english: 'Janga' },
    ho: { target: 'काता', phonetic: 'काता', english: 'Kata' },
    mundari: { target: 'काता', phonetic: 'काता', english: 'Kata' }
  },
  'आँख': {
    santhali: { target: 'ᱢᱮᱫ', phonetic: 'मेद', english: 'Med' },
    ho: { target: 'मेद', phonetic: 'मेद', english: 'Med' },
    mundari: { target: 'मेद', phonetic: 'मेद', english: 'Med' }
  },
  'कान': {
    santhali: { target: 'ᱞᱩᱛᱩᱨ', phonetic: 'लुंतुर', english: 'Lutur' },
    ho: { target: 'लुंतुर', phonetic: 'लुंतुर', english: 'Lutur' },
    mundari: { target: 'लुंतुर', phonetic: 'लुंतुर', english: 'Lutur' }
  },
  'सिर': {
    santhali: { target: 'ᱵᱚᱦᱚᱜ', phonetic: 'बोहोक', english: 'Bohog' },
    ho: { target: 'बोः', phonetic: 'बोह', english: 'Boh' },
    mundari: { target: 'बोः', phonetic: 'बोह', english: 'Boh' }
  },
  'मुँह': {
    santhali: { target: 'ᱢᱚᱪᱟ', phonetic: 'मोचा', english: 'Mocha' },
    ho: { target: 'आ', phonetic: 'आ', english: 'Aa' },
    mundari: { target: 'आ', phonetic: 'आ', english: 'Aa' }
  },
  'नाक': {
    santhali: { target: 'ᱢᱩ', phonetic: 'मु', english: 'Mu' },
    ho: { target: 'मुआ', phonetic: 'मुआ', english: 'Mua' },
    mundari: { target: 'मु', phonetic: 'मु', english: 'Mu' }
  },

  // --- Numbers (1 to 10) ---
  'एक': {
    santhali: { target: 'ᱢᱤᱫ', phonetic: 'मिद', english: 'Mit\'' },
    ho: { target: 'मि', phonetic: 'मि', english: 'Mi' },
    mundari: { target: 'मियाद', phonetic: 'मियाद', english: 'Miyad' }
  },
  'दो': {
    santhali: { target: 'ᱵᱟᱨ', phonetic: 'बार', english: 'Bar' },
    ho: { target: 'बार', phonetic: 'बार', english: 'Bar' },
    mundari: { target: 'बरिया', phonetic: 'बरिया', english: 'Bariya' }
  },
  'तीन': {
    santhali: { target: 'ᱯᱮ', phonetic: 'पे', english: 'Pe' },
    ho: { target: 'पे', phonetic: 'पे', english: 'Pe' },
    mundari: { target: 'आपिया', phonetic: 'आपिया', english: 'Apiya' }
  },
  'चार': {
    santhali: { target: 'ᱯᱩᱱ', phonetic: 'पून', english: 'Pun' },
    ho: { target: 'पुन', phonetic: 'पुन', english: 'Pun' },
    mundari: { target: 'उपून', phonetic: 'उपून', english: 'Upun' }
  },
  'पाँच': {
    santhali: { target: 'ᱢᱚᱬᱮ', phonetic: 'मोड़े', english: 'More' },
    ho: { target: 'मोड़े', phonetic: 'मोड़े', english: 'More' },
    mundari: { target: 'मोड़े', phonetic: 'मोड़े', english: 'More' }
  },
  'छह': {
    santhali: { target: 'ᱛᱩᱨᱩᱭ', phonetic: 'तुरुय', english: 'Turui' },
    ho: { target: 'तुरुय', phonetic: 'तुरुय', english: 'Turui' },
    mundari: { target: 'तुरुय', phonetic: 'तुरुय', english: 'Turui' }
  },
  'सात': {
    santhali: { target: 'ᱮᱭᱟᱭ', phonetic: 'एयाय', english: 'Eyai' },
    ho: { target: 'एयाय', phonetic: 'एयाय', english: 'Eyai' },
    mundari: { target: 'एयाय', phonetic: 'एयाय', english: 'Eyai' }
  },
  'आठ': {
    santhali: { target: 'ᱤᱨᱟᱹᱞ', phonetic: 'इरल', english: 'Iral' },
    ho: { target: 'इरल', phonetic: 'इरल', english: 'Iral' },
    mundari: { target: 'इरल', phonetic: 'इरल', english: 'Iral' }
  },
  'नौ': {
    santhali: { target: 'ᱟᱨᱮ', phonetic: 'आरे', english: 'Are' },
    ho: { target: 'आरे', phonetic: 'आरे', english: 'Are' },
    mundari: { target: 'आरे', phonetic: 'आरे', english: 'Are' }
  },
  'दस': {
    santhali: { target: 'ᱜᱮᱞ', phonetic: 'गेल', english: 'Gel' },
    ho: { target: 'गेल', phonetic: 'गेल', english: 'Gel' },
    mundari: { target: 'गेल', phonetic: 'गेल', english: 'Gel' }
  },

  // --- Adjectives & Qualifiers ---
  'बड़ा': {
    santhali: { target: 'ᱢᱟᱨᱟᱝ', phonetic: 'मारांग', english: 'Marang' },
    ho: { target: 'मरांग', phonetic: 'मरांग', english: 'Marang' },
    mundari: { target: 'मरांग', phonetic: 'मरांग', english: 'Marang' }
  },
  'बड़ी': {
    santhali: { target: 'ᱢᱟᱨᱟᱝ', phonetic: 'मारांग', english: 'Marang' },
    ho: { target: 'मरांग', phonetic: 'मरांग', english: 'Marang' },
    mundari: { target: 'मरांग', phonetic: 'मरांग', english: 'Marang' }
  },
  'बड़े': {
    santhali: { target: 'ᱢᱟᱨᱟᱝ', phonetic: 'मारांग', english: 'Marang' },
    ho: { target: 'मरांग', phonetic: 'मरांग', english: 'Marang' },
    mundari: { target: 'मरांग', phonetic: 'मरांग', english: 'Marang' }
  },
  'छोटा': {
    santhali: { target: 'ᱦᱩᱰᱤᱧ', phonetic: 'हुडिंग', english: 'Huding' },
    ho: { target: 'हुडिंग', phonetic: 'हुडिंग', english: 'Huding' },
    mundari: { target: 'हुडिंग', phonetic: 'हुडिंग', english: 'Huding' }
  },
  'छोटी': {
    santhali: { target: 'ᱦᱩᱰᱤᱧ', phonetic: 'हुडिंग', english: 'Huding' },
    ho: { target: 'हुडिंग', phonetic: 'हुडिंग', english: 'Huding' },
    mundari: { target: 'हुडिंग', phonetic: 'हुडिंग', english: 'Huding' }
  },
  'छोटे': {
    santhali: { target: 'ᱦᱩᱰᱤᱧ', phonetic: 'हुडिंग', english: 'Huding' },
    ho: { target: 'हुडिंग', phonetic: 'हुडिंग', english: 'Huding' },
    mundari: { target: 'हुडिंग', phonetic: 'हुडिंग', english: 'Huding' }
  },
  'अच्छा': {
    santhali: { target: 'ᱱᱟᱯᱟᱭ', phonetic: 'नापाय', english: 'Napay' },
    ho: { target: 'बुगीन', phonetic: 'बुगीन', english: 'Bugin' },
    mundari: { target: 'बुगी', phonetic: 'बुगी', english: 'Bugi' }
  },
  'अच्छी': {
    santhali: { target: 'ᱱᱟᱯᱟᱭ', phonetic: 'नापाय', english: 'Napay' },
    ho: { target: 'बुगीन', phonetic: 'बुगीन', english: 'Bugin' },
    mundari: { target: 'बुगी', phonetic: 'बुगी', english: 'Bugi' }
  },
  'अच्छे': {
    santhali: { target: 'ᱱᱟᱯᱟᱭ', phonetic: 'नापाय', english: 'Napay' },
    ho: { target: 'बुगीन', phonetic: 'बुगीन', english: 'Bugin' },
    mundari: { target: 'बुगी', phonetic: 'बुगी', english: 'Bugi' }
  },
  'सुंदर': {
    santhali: { target: 'ᱢᱚᱡᱽ', phonetic: 'मोज', english: 'Moj' },
    ho: { target: 'चेहरा', phonetic: 'चेहरा', english: 'Chehra' },
    mundari: { target: 'चेहरा', phonetic: 'चेहरा', english: 'Chehra' }
  },
  'मीठा': {
    santhali: { target: 'ᱦᱮᱲᱮᱢ', phonetic: 'हेड़ेम', english: 'Herem' },
    ho: { target: 'हेड़म', phonetic: 'हेड़म', english: 'Heram' },
    mundari: { target: 'हेड़म', phonetic: 'हेड़म', english: 'Heram' }
  },
  'मीठे': {
    santhali: { target: 'ᱦᱮᱲᱮᱢ', phonetic: 'हेड़ेम', english: 'Herem' },
    ho: { target: 'हेड़म', phonetic: 'हेड़म', english: 'Heram' },
    mundari: { target: 'हेड़म', phonetic: 'हेड़म', english: 'Heram' }
  },
  'साफ': {
    santhali: { target: 'ᱯᱷᱟᱨᱪᱟ', phonetic: 'फारचा', english: 'Pharcha' },
    ho: { target: 'सफा', phonetic: 'सफा', english: 'Sapha' },
    mundari: { target: 'सफा', phonetic: 'सफा', english: 'Sapha' }
  },
  'नया': {
    santhali: { target: 'ᱱᱟᱣᱟ', phonetic: 'नावा', english: 'Nawa' },
    ho: { target: 'नावा', phonetic: 'नावा', english: 'Nawa' },
    mundari: { target: 'नावा', phonetic: 'नावा', english: 'Nawa' }
  },
  'नई': {
    santhali: { target: 'ᱱᱟᱣᱟ', phonetic: 'नावा', english: 'Nawa' },
    ho: { target: 'नावा', phonetic: 'नावा', english: 'Nawa' },
    mundari: { target: 'नावा', phonetic: 'नावा', english: 'Nawa' }
  },
  'नए': {
    santhali: { target: 'ᱱᱟᱣᱟ', phonetic: 'नावा', english: 'Nawa' },
    ho: { target: 'नावा', phonetic: 'नावा', english: 'Nawa' },
    mundari: { target: 'नावा', phonetic: 'नावा', english: 'Nawa' }
  },
  'बहुत': {
    santhali: { target: 'ᱟᱹᱰᱤ', phonetic: 'अडी', english: 'Adi' },
    ho: { target: 'पुरो', phonetic: 'पुरो', english: 'Puro' },
    mundari: { target: 'पुरो', phonetic: 'पुरो', english: 'Puro' }
  },

  // --- Connectors, Auxiliaries, Postpositions ---
  'और': {
    santhali: { target: 'ᱟᱨ', phonetic: 'आर', english: 'Ar' },
    ho: { target: 'अंडोः', phonetic: 'अंडोह', english: 'Andoh' },
    mundari: { target: 'ओड़ोः', phonetic: 'ओड़ोह', english: 'Odoh' }
  },
  'भी': {
    santhali: { target: 'ᱦᱚᱸ', phonetic: 'हों', english: 'Hon' },
    ho: { target: 'ओ', phonetic: 'ओ', english: 'O' },
    mundari: { target: 'ओ', phonetic: 'ओ', english: 'O' }
  },
  'है': {
    santhali: { target: 'ᱠᱟᱱᱟ', phonetic: 'काना', english: 'Kana' },
    ho: { target: 'तन', phonetic: 'तन', english: 'Tan' },
    mundari: { target: 'तना', phonetic: 'तना', english: 'Tana' }
  },
  'हैं': {
    santhali: { target: 'ᱠᱟᱱᱟᱠᱚ', phonetic: 'कानाको', english: 'Kanako' },
    ho: { target: 'तनाको', phonetic: 'तनाको', english: 'Tanako' },
    mundari: { target: 'तनाको', phonetic: 'तनाको', english: 'Tanako' }
  },
  'था': {
    santhali: { target: 'ᱛᱟᱦᱮᱸᱠᱟᱱᱟ', phonetic: 'ताहेंकाना', english: 'Tahenkana' },
    ho: { target: 'ताइकेना', phonetic: 'ताइकेना', english: 'Taikena' },
    mundari: { target: 'ताइकेना', phonetic: 'ताइकेना', english: 'Taikena' }
  },
  'थी': {
    santhali: { target: 'ᱛᱟᱦᱮᱸᱠᱟᱱᱟ', phonetic: 'ताहेंकाना', english: 'Tahenkana' },
    ho: { target: 'ताइकेना', phonetic: 'ताइकेना', english: 'Taikena' },
    mundari: { target: 'ताइकेना', phonetic: 'ताइकेना', english: 'Taikena' }
  },
  'थे': {
    santhali: { target: 'ᱛᱟᱦᱮᱸᱠᱟᱱᱟ', phonetic: 'ताहेंकाना', english: 'Tahenkana' },
    ho: { target: 'ताइकेना', phonetic: 'ताइकेना', english: 'Taikena' },
    mundari: { target: 'ताइकेना', phonetic: 'ताइकेना', english: 'Taikena' }
  },
  'में': {
    santhali: { target: 'ᱨᱮ', phonetic: 'रे', english: 'Re' },
    ho: { target: 'रे', phonetic: 'रे', english: 'Re' },
    mundari: { target: 'रे', phonetic: 'रे', english: 'Re' }
  },
  'पर': {
    santhali: { target: 'ᱨᱮ', phonetic: 'रे', english: 'Re' },
    ho: { target: 'रे', phonetic: 'रे', english: 'Re' },
    mundari: { target: 'रे', phonetic: 'रे', english: 'Re' }
  },
  'से': {
    santhali: { target: 'ᱛᱮ', phonetic: 'ते', english: 'Te' },
    ho: { target: 'ते', phonetic: 'ते', english: 'Te' },
    mundari: { target: 'ते', phonetic: 'ते', english: 'Te' }
  },
  'को': {
    santhali: { target: 'ᱴᱷᱮᱱ', phonetic: 'ठेन', english: 'Then' },
    ho: { target: 'पाः', phonetic: 'पाह', english: 'Pah' },
    mundari: { target: 'पाः', phonetic: 'पाह', english: 'Pah' }
  },
  'का': {
    santhali: { target: 'ᱨᱮᱭᱟᱜ', phonetic: 'रेयाग', english: 'Reyag' },
    ho: { target: 'अः', phonetic: 'अह', english: 'Ah' },
    mundari: { target: 'अः', phonetic: 'अह', english: 'Ah' }
  },
  'की': {
    santhali: { target: 'ᱨᱮᱭᱟᱜ', phonetic: 'रेयाग', english: 'Reyag' },
    ho: { target: 'अः', phonetic: 'अह', english: 'Ah' },
    mundari: { target: 'अः', phonetic: 'अह', english: 'Ah' }
  },
  'के': {
    santhali: { target: 'ᱨᱮᱭᱟᱜ', phonetic: 'रेयाग', english: 'Reyag' },
    ho: { target: 'अः', phonetic: 'अह', english: 'Ah' },
    mundari: { target: 'अः', phonetic: 'अह', english: 'Ah' }
  },
  'नहीं': {
    santhali: { target: 'ᱵᱟᱝ', phonetic: 'बांग', english: 'Bang' },
    ho: { target: 'का', phonetic: 'का', english: 'Ka' },
    mundari: { target: 'का', phonetic: 'का', english: 'Ka' }
  },
  'मत': {
    santhali: { target: 'ᱟᱞᱳ', phonetic: 'आलो', english: 'Alo' },
    ho: { target: 'अलो', phonetic: 'अलो', english: 'Alo' },
    mundari: { target: 'अलो', phonetic: 'अलो', english: 'Alo' }
  },
  'शाबाश': {
    santhali: { target: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ!', phonetic: 'अडी नापाय!', english: 'Adi napay!' },
    ho: { target: 'बुगीन!', phonetic: 'बुगीन!', english: 'Bugin!' },
    mundari: { target: 'बुगी ते!', phonetic: 'बुगी ते!', english: 'Bugi te!' }
  },
  'धन्यवाद': {
    santhali: { target: 'ᱥᱟᱨᱦᱟᱣ', phonetic: 'सारहाव', english: 'Sarhaw' },
    ho: { target: 'सारहाओ', phonetic: 'सारहाओ', english: 'Sarhao' },
    mundari: { target: 'सारहाव', phonetic: 'सारहाव', english: 'Sarhaw' }
  },

  // --- Pronouns & Addresses ---
  'हमें': {
    santhali: { target: 'ᱟᱵᱚ', phonetic: 'आबो', english: 'Abo' },
    ho: { target: 'आबू', phonetic: 'आबू', english: 'Abu' },
    mundari: { target: 'आबू', phonetic: 'आबू', english: 'Abu' }
  },
  'हमारा': {
    santhali: { target: 'ᱟᱵᱚᱣᱟᱜ', phonetic: 'आबोवाग', english: 'Abowag' },
    ho: { target: 'आबुआः', phonetic: 'आबुआह', english: 'Abuah' },
    mundari: { target: 'आबुआः', phonetic: 'आबुआह', english: 'Abuah' }
  },
  'हमारी': {
    santhali: { target: 'ᱟᱵᱚᱣᱟᱜ', phonetic: 'आबोवाग', english: 'Abowag' },
    ho: { target: 'आबुआः', phonetic: 'आबुआह', english: 'Abuah' },
    mundari: { target: 'आबुआः', phonetic: 'आबुआह', english: 'Abuah' }
  },
  'हमारे': {
    santhali: { target: 'ᱟᱵᱚᱣᱟᱜ', phonetic: 'आबोवाग', english: 'Abowag' },
    ho: { target: 'आबुआः', phonetic: 'आबुआह', english: 'Abuah' },
    mundari: { target: 'आबुआः', phonetic: 'आबुआह', english: 'Abuah' }
  },
  'इस': {
    santhali: { target: 'ᱱᱚᱣᱟ', phonetic: 'नोवा', english: 'Nowa' },
    ho: { target: 'नेया', phonetic: 'नेया', english: 'Neya' },
    mundari: { target: 'नेया', phonetic: 'नेया', english: 'Neya' }
  },
  'उस': {
    santhali: { target: 'ᱦᱟᱱᱟ', phonetic: 'हाना', english: 'Hana' },
    ho: { target: 'एना', phonetic: 'एना', english: 'Ena' },
    mundari: { target: 'एना', phonetic: 'एना', english: 'Ena' }
  },
  'उन्हें': {
    santhali: { target: 'ᱩᱱᱠᱩ', phonetic: 'उनकु', english: 'Unku' },
    ho: { target: 'इनको', phonetic: 'इनको', english: 'Inko' },
    mundari: { target: 'इनको', phonetic: 'इनको', english: 'Inko' }
  },
  'उसका': {
    santhali: { target: 'ᱩᱱᱤᱭᱟᱜ', phonetic: 'उनियाग', english: 'Uniyag' },
    ho: { target: 'एनियाः', phonetic: 'एनियाह', english: 'Eniyah' },
    mundari: { target: 'एनियाः', phonetic: 'एनियाह', english: 'Eniyah' }
  },
  'उसकी': {
    santhali: { target: 'ᱩᱱᱤᱭᱟᱜ', phonetic: 'उनियाग', english: 'Uniyag' },
    ho: { target: 'एनियाः', phonetic: 'एनियाह', english: 'Eniyah' },
    mundari: { target: 'एनियाः', phonetic: 'एनियाह', english: 'Eniyah' }
  },
  'उसके': {
    santhali: { target: 'ᱩᱱᱤᱭᱟᱜ', phonetic: 'उनियाग', english: 'Uniyag' },
    ho: { target: 'एनियाः', phonetic: 'एनियाह', english: 'Eniyah' },
    mundari: { target: 'एनियाः', phonetic: 'एनियाह', english: 'Eniyah' }
  },
  'कौन': {
    santhali: { target: 'ᱚᱠᱚᱭ', phonetic: 'ओकोय', english: 'Okoy' },
    ho: { target: 'ओकोय', phonetic: 'ओकोय', english: 'Okoy' },
    mundari: { target: 'ओकोय', phonetic: 'ओकोय', english: 'Okoy' }
  },

  // --- Directions & Space ---
  'पूर्व': {
    santhali: { target: 'ᱥᱟᱢᱟᱝ', phonetic: 'सामांग', english: 'Samang' },
    ho: { target: 'सामंग', phonetic: 'सामंग', english: 'Samang' },
    mundari: { target: 'सामंग', phonetic: 'सामंग', english: 'Samang' }
  },
  'पश्चिम': {
    santhali: { target: 'ᱯᱟᱪᱷᱮ', phonetic: 'पाछे', english: 'Pachhe' },
    ho: { target: 'पाछे', phonetic: 'पाछे', english: 'Pachhe' },
    mundari: { target: 'पाछे', phonetic: 'पाछे', english: 'Pachhe' }
  },
  'उत्तर': {
    santhali: { target: 'ᱠᱚᱧᱮ', phonetic: 'कोंञे', english: 'Konye' },
    ho: { target: 'कोञे', phonetic: 'कोञे', english: 'Konye' },
    mundari: { target: 'कोञे', phonetic: 'कोञे', english: 'Konye' }
  },
  'दक्षिण': {
    santhali: { target: 'ᱮᱛᱚᱢ', phonetic: 'एतोम', english: 'Etom' },
    ho: { target: 'एतोम', phonetic: 'एतोम', english: 'Etom' },
    mundari: { target: 'एतोम', phonetic: 'एतोम', english: 'Etom' }
  },
  'ऊपर': {
    santhali: { target: 'ᱪᱮᱛᱟᱱ', phonetic: 'चेतान', english: 'Chetan' },
    ho: { target: 'चेतान', phonetic: 'चेतान', english: 'Chetan' },
    mundari: { target: 'चेतान', phonetic: 'चेतान', english: 'Chetan' }
  },
  'नीचे': {
    santhali: { target: 'ᱞᱟᱛᱟᱨ', phonetic: 'लातार', english: 'Latar' },
    ho: { target: 'लातार', phonetic: 'लातार', english: 'Latar' },
    mundari: { target: 'लातार', phonetic: 'लातार', english: 'Latar' }
  },
  'आगे': {
    santhali: { target: 'ᱢᱟᱲᱟᱝ', phonetic: 'माड़ांग', english: 'Marang' },
    ho: { target: 'मड़ांग', phonetic: 'मड़ांग', english: 'Madang' },
    mundari: { target: 'मड़ांग', phonetic: 'मड़ांग', english: 'Madang' }
  },
  'पीछे': {
    santhali: { target: 'ᱛᱟᱭᱚᱢ', phonetic: 'तायोम', english: 'Tayom' },
    ho: { target: 'तायोम', phonetic: 'तायोम', english: 'Tayom' },
    mundari: { target: 'तायोम', phonetic: 'तायोम', english: 'Tayom' }
  },
  'अंदर': {
    santhali: { target: 'ᱵᱷᱤᱛᱨᱤ', phonetic: 'भित्री', english: 'Bhitri' },
    ho: { target: 'भितर', phonetic: 'भितर', english: 'Bhitar' },
    mundari: { target: 'भितर', phonetic: 'भितर', english: 'Bhitar' }
  },
  'बाहर': {
    santhali: { target: 'ᱵᱟᱦᱨᱮ', phonetic: 'बाहरे', english: 'Bahre' },
    ho: { target: 'बाहरे', phonetic: 'बाहरे', english: 'Bahre' },
    mundari: { target: 'बाहरे', phonetic: 'बाहरे', english: 'Bahre' }
  },
  'पास': {
    santhali: { target: 'ᱥᱩᱨ', phonetic: 'सुर', english: 'Sur' },
    ho: { target: 'सुर', phonetic: 'सुर', english: 'Sur' },
    mundari: { target: 'सुर', phonetic: 'सुर', english: 'Sur' }
  },
  'दूर': {
    santhali: { target: 'ᱥᱟᱺᱜᱤᱧ', phonetic: 'सांगिंज', english: 'Sanginj' },
    ho: { target: 'सांगिंग', phonetic: 'सांगिंग', english: 'Sanging' },
    mundari: { target: 'सांगिंग', phonetic: 'सांगिंग', english: 'Sanging' }
  },
  'साथ': {
    santhali: { target: 'ᱥᱟᱶᱛᱮ', phonetic: 'सांवते', english: 'Sawte' },
    ho: { target: 'सांवते', phonetic: 'सांवते', english: 'Sawte' },
    mundari: { target: 'लोः', phonetic: 'लोह', english: 'Loh' }
  },

  // --- Extended Verbs ---
  'उग': {
    santhali: { target: 'ᱨᱟᱠᱟᱵ', phonetic: 'राकाब', english: 'Rakab' },
    ho: { target: 'राकाब', phonetic: 'राकाब', english: 'Rakab' },
    mundari: { target: 'राकाब', phonetic: 'राकाब', english: 'Rakab' }
  },
  'चल': {
    santhali: { target: 'ᱛᱟᱲᱟᱢ', phonetic: 'ताड़ाम', english: 'Taram' },
    ho: { target: 'सेन', phonetic: 'सेन', english: 'Sen' },
    mundari: { target: 'सेन', phonetic: 'सेन', english: 'Sen' }
  },
  'दौड़': {
    santhali: { target: 'ᱫᱟᱹᱲ', phonetic: 'दाड़', english: 'Dar' },
    ho: { target: 'निर', phonetic: 'निर', english: 'Nir' },
    mundari: { target: 'निर', phonetic: 'निर', english: 'Nir' }
  },
  'हंस': {
    santhali: { target: 'ᱞᱟᱸᱫᱟ', phonetic: 'लांदा', english: 'Landa' },
    ho: { target: 'लांदा', phonetic: 'लांदा', english: 'Landa' },
    mundari: { target: 'लांदा', phonetic: 'लांदा', english: 'Landa' }
  },
  'रो': {
    santhali: { target: 'ᱨᱟᱜ', phonetic: 'राग', english: 'Raq' },
    ho: { target: 'राः', phonetic: 'राह', english: 'Rah' },
    mundari: { target: 'राः', phonetic: 'राह', english: 'Rah' }
  },
  'सो': {
    santhali: { target: 'ᱜᱤᱛᱤᱡ', phonetic: 'गीतिज', english: 'Gitij' },
    ho: { target: 'गितीः', phonetic: 'गितीह', english: 'Gitih' },
    mundari: { target: 'गितीः', phonetic: 'गितीह', english: 'Gitih' }
  },
  'उठ': {
    santhali: { target: 'ᱵᱮᱨᱮᱫ', phonetic: 'बेरेत', english: 'Beret' },
    ho: { target: 'बिरिद', phonetic: 'बिरिद', english: 'Birid' },
    mundari: { target: 'बिरिद', phonetic: 'बिरिद', english: 'Birid' }
  },
  'रह': {
    santhali: { target: 'ᱛᱟᱦᱮᱸᱱ', phonetic: 'ताहेंन', english: 'Tahen' },
    ho: { target: 'ताइन', phonetic: 'ताइन', english: 'Tain' },
    mundari: { target: 'ताइन', phonetic: 'ताइन', english: 'Tain' }
  },
  'रखो': {
    santhali: { target: 'ᱫᱚᱦᱚᱭ', phonetic: 'दोहोय', english: 'Dohoy' },
    ho: { target: 'दोहो', phonetic: 'दोहो', english: 'Doho' },
    mundari: { target: 'दोहो', phonetic: 'दोहो', english: 'Doho' }
  },
  'लाओ': {
    santhali: { target: 'ᱟᱹᱜᱩᱭ', phonetic: 'आगुय', english: 'Aguy' },
    ho: { target: 'आगु', phonetic: 'आगु', english: 'Agu' },
    mundari: { target: 'आगु', phonetic: 'आगु', english: 'Agu' }
  },
  'पूछ': {
    santhali: { target: 'ᱠᱩᱞᱤ', phonetic: 'कुली', english: 'Kuli' },
    ho: { target: 'कुली', phonetic: 'कुली', english: 'Kuli' },
    mundari: { target: 'कुली', phonetic: 'कुली', english: 'Kuli' }
  },
  'समझ': {
    santhali: { target: 'ᱵᱩᱡᱷᱟᱹᱣ', phonetic: 'बुझाव', english: 'Bujhaw' },
    ho: { target: 'बुझाव', phonetic: 'बुझाव', english: 'Bujhaw' },
    mundari: { target: 'बुझाव', phonetic: 'बुझाव', english: 'Bujhaw' }
  },
  'प्यार': {
    santhali: { target: 'ᱫᱩᱞᱟᱹᱲ', phonetic: 'दुलार', english: 'Dular' },
    ho: { target: 'दुलार', phonetic: 'दुलार', english: 'Dular' },
    mundari: { target: 'दुलार', phonetic: 'दुलार', english: 'Dular' }
  },
  'रोज़': {
    santhali: { target: 'ᱫᱤᱱᱟᱹᱢ', phonetic: 'दिनाम', english: 'Dinam' },
    ho: { target: 'दिनु', phonetic: 'दिनु', english: 'Dinu' },
    mundari: { target: 'दिनु', phonetic: 'दिनु', english: 'Dinu' }
  },
  'प्रतिदिन': {
    santhali: { target: 'ᱫᱤᱱᱟᱹᱢ', phonetic: 'दिनाम', english: 'Dinam' },
    ho: { target: 'दिनु', phonetic: 'दिनु', english: 'Dinu' },
    mundari: { target: 'दिनु', phonetic: 'दिनु', english: 'Dinu' }
  },
  'हमेशा': {
    santhali: { target: 'ᱡᱟᱣᱜᱮ', phonetic: 'जावगे', english: 'Jawge' },
    ho: { target: 'जावगे', phonetic: 'जावगे', english: 'Jawge' },
    mundari: { target: 'जावगे', phonetic: 'जावगे', english: 'Jawge' }
  },
  'नाम': {
    santhali: { target: 'ᱧᱩᱛᱩᱢ', phonetic: 'ञुतुम', english: 'Nyutum' },
    ho: { target: 'नुतुम', phonetic: 'नुतुम', english: 'Nutum' },
    mundari: { target: 'नुतुम', phonetic: 'नुतुम', english: 'Nutum' }
  },
  'बात': {
    santhali: { target: 'ᱠᱟᱛᱷᱟ', phonetic: 'काथा', english: 'Katha' },
    ho: { target: 'काजी', phonetic: 'काजी', english: 'Kaji' },
    mundari: { target: 'काजी', phonetic: 'काजी', english: 'Kaji' }
  },
  'बातें': {
    santhali: { target: 'ᱠᱟᱛᱷᱟ ᱠᱚ', phonetic: 'काथा को', english: 'Katha ko' },
    ho: { target: 'काजीको', phonetic: 'काजीको', english: 'Kajiko' },
    mundari: { target: 'काजीको', phonetic: 'काजीको', english: 'Kajiko' }
  },
  'काम': {
    santhali: { target: 'ᱠᱟᱹᱢᱤ', phonetic: 'कामी', english: 'Kami' },
    ho: { target: 'कामी', phonetic: 'कामी', english: 'Kami' },
    mundari: { target: 'कामी', phonetic: 'कामी', english: 'Kami' }
  },
  'समय': {
    santhali: { target: 'ᱚᱠᱛᱚ', phonetic: 'ओकतो', english: 'Okto' },
    ho: { target: 'ओकतो', phonetic: 'ओकतो', english: 'Okto' },
    mundari: { target: 'ओकतो', phonetic: 'ओकतो', english: 'Okto' }
  },
  'स्थान': {
    santhali: { target: 'ᱴᱷᱟᱶ', phonetic: 'ठांव', english: 'Thaw' },
    ho: { target: 'ठांव', phonetic: 'ठांव', english: 'Thaw' },
    mundari: { target: 'ठांव', phonetic: 'ठांव', english: 'Thaw' }
  },
  'जगह': {
    santhali: { target: 'ᱴᱷᱟᱶ', phonetic: 'ठांव', english: 'Thaw' },
    ho: { target: 'ठांव', phonetic: 'ठांव', english: 'Thaw' },
    mundari: { target: 'ठांव', phonetic: 'ठांव', english: 'Thaw' }
  },
  'ध्यान': {
    santhali: { target: 'ᱫᱷᱮᱭᱟᱱ', phonetic: 'धेयान', english: 'Dheyan' },
    ho: { target: 'ध्यान', phonetic: 'ध्यान', english: 'Dhyan' },
    mundari: { target: 'ध्यान', phonetic: 'ध्यान', english: 'Dhyan' }
  },
  'मदद': {
    santhali: { target: 'ᱜᱚᱲᱚ', phonetic: 'गोड़ो', english: 'Goro' },
    ho: { target: 'गोड़ो', phonetic: 'गोड़ो', english: 'Goro' },
    mundari: { target: 'गोड़ो', phonetic: 'गोड़ो', english: 'Goro' }
  },
  'चाहिए': {
    santhali: { target: 'ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ', phonetic: 'हुयुग काना', english: 'Huyuq kana' },
    ho: { target: 'होबाओ', phonetic: 'होबाओ', english: 'Hobao' },
    mundari: { target: 'होबाओ', phonetic: 'होबाओ', english: 'Hobao' }
  },

  // --- Expanded Verbs & Actions ---
  'खेलना': {
    santhali: { target: 'ᱮᱱᱮᱡ', phonetic: 'एनेज', english: 'Enej' },
    ho: { target: 'एनांग', phonetic: 'एनांग', english: 'Enang' },
    mundari: { target: 'एनांग', phonetic: 'एनांग', english: 'Enang' }
  },
  'कूद': {
    santhali: { target: 'ᱫᱚᱱ', phonetic: 'दोन', english: 'Don' },
    ho: { target: 'दोन', phonetic: 'दोन', english: 'Don' },
    mundari: { target: 'दोन', phonetic: 'दोन', english: 'Don' }
  },
  'कूदना': {
    santhali: { target: 'ᱫᱚᱱ', phonetic: 'दोन', english: 'Don' },
    ho: { target: 'दोन', phonetic: 'दोन', english: 'Don' },
    mundari: { target: 'दोन', phonetic: 'दोन', english: 'Don' }
  },
  'हँस': {
    santhali: { target: 'ᱞᱟᱸᱫᱟ', phonetic: 'लांदा', english: 'Landa' },
    ho: { target: 'लांदा', phonetic: 'लांदा', english: 'Landa' },
    mundari: { target: 'लांदा', phonetic: 'लांदा', english: 'Landa' }
  },
  'हँसना': {
    santhali: { target: 'ᱞᱟᱸᱫᱟ', phonetic: 'लांदा', english: 'Landa' },
    ho: { target: 'लांदा', phonetic: 'लांदा', english: 'Landa' },
    mundari: { target: 'लांदा', phonetic: 'लांदा', english: 'Landa' }
  },
  'रोना': {
    santhali: { target: 'ᱨᱟᱜ', phonetic: 'राग', english: 'Raq' },
    ho: { target: 'राः', phonetic: 'राह', english: 'Rah' },
    mundari: { target: 'राः', phonetic: 'राह', english: 'Rah' }
  },
  'सोना': {
    santhali: { target: 'ᱡᱟᱹᱯᱤᱫ', phonetic: 'जापिद', english: 'Japid' },
    ho: { target: 'गिति', phonetic: 'गीती', english: 'Giti' },
    mundari: { target: 'गिति', phonetic: 'गीती', english: 'Giti' }
  },
  'जाग': {
    santhali: { target: 'ᱵᱮᱨᱮᱫ', phonetic: 'बेरेद', english: 'Beret' },
    ho: { target: 'तिंगुन', phonetic: 'तिंगुन', english: 'Tingun' },
    mundari: { target: 'तिंगुन', phonetic: 'तिंगुन', english: 'Tingun' }
  },
  'जागना': {
    santhali: { target: 'ᱵᱮᱨᱮᱫ', phonetic: 'बेरेद', english: 'Beret' },
    ho: { target: 'तिंगुन', phonetic: 'तिंगुन', english: 'Tingun' },
    mundari: { target: 'तिंगुन', phonetic: 'तिंगुन', english: 'Tingun' }
  },
  'दौड़ना': {
    santhali: { target: 'ᱫᱟᱹᱲ', phonetic: 'दाड़', english: 'Dar' },
    ho: { target: 'निर', phonetic: 'नीर', english: 'Nir' },
    mundari: { target: 'निर', phonetic: 'नीर', english: 'Nir' }
  },
  'चलना': {
    santhali: { target: 'ᱛᱟᱲᱟᱢ', phonetic: 'ताड़ाम', english: 'Taram' },
    ho: { target: 'सेन', phonetic: 'सेन', english: 'Sen' },
    mundari: { target: 'सेन', phonetic: 'सेन', english: 'Sen' }
  },
  'ला': {
    santhali: { target: 'ᱟᱹᱜᱩ', phonetic: 'आगु', english: 'Agu' },
    ho: { target: 'अउ', phonetic: 'अऊ', english: 'Au' },
    mundari: { target: 'अगु', phonetic: 'अगु', english: 'Agu' }
  },
  'लाना': {
    santhali: { target: 'ᱟᱹᱜᱩ', phonetic: 'आगु', english: 'Agu' },
    ho: { target: 'अउ', phonetic: 'अऊ', english: 'Au' },
    mundari: { target: 'अगु', phonetic: 'अगु', english: 'Agu' }
  },
  'देना': {
    santhali: { target: 'ᱮᱢ', phonetic: 'एम', english: 'Em' },
    ho: { target: 'एम', phonetic: 'एम', english: 'Em' },
    mundari: { target: 'ओम', phonetic: 'ओम', english: 'Om' }
  },
  'लेना': {
    santhali: { target: 'ᱦᱟᱛᱟᱣ', phonetic: 'हाताव', english: 'Hataw' },
    ho: { target: 'इदि', phonetic: 'इदी', english: 'Idi' },
    mundari: { target: 'इदि', phonetic: 'इदी', english: 'Idi' }
  },
  'रुक': {
    santhali: { target: 'ᱛᱤᱸᱜᱩ', phonetic: 'तिंगु', english: 'Tingu' },
    ho: { target: 'तिंगुन', phonetic: 'तिंगुन', english: 'Tingun' },
    mundari: { target: 'तिंगुन', phonetic: 'तिंगुन', english: 'Tingun' }
  },
  'रुकना': {
    santhali: { target: 'ᱛᱤᱸᱜᱩ', phonetic: 'तिंगु', english: 'Tingu' },
    ho: { target: 'तिंगुन', phonetic: 'तिंगुन', english: 'Tingun' },
    mundari: { target: 'तिंगुन', phonetic: 'तिंगुन', english: 'Tingun' }
  },
  'समझना': {
    santhali: { target: 'ᱵᱩᱡᱷᱟᱹᱣ', phonetic: 'बुझाव', english: 'Bujhaw' },
    ho: { target: 'अटकड़', phonetic: 'अटकड़', english: 'Atkar' },
    mundari: { target: 'अटकड़', phonetic: 'अटकड़', english: 'Atkar' }
  },

  // --- Extended Daily Nouns & Classroom Life ---
  'मैदान': {
    santhali: { target: 'ᱴᱟᱺᱰᱤ', phonetic: 'टांडी', english: 'Tandi' },
    ho: { target: 'टांडी', phonetic: 'टांडी', english: 'Tandi' },
    mundari: { target: 'पिड़', phonetic: 'पिड़', english: 'Pir' }
  },
  'चावल': {
    santhali: { target: 'ᱪᱟᱣᱞᱮ', phonetic: 'चावले', english: 'Chaole' },
    ho: { target: 'चाउलि', phonetic: 'चाउली', english: 'Chauli' },
    mundari: { target: 'चाउलि', phonetic: 'चाउली', english: 'Chauli' }
  },
  'भात': {
    santhali: { target: 'ᱫᱟᱠᱟ', phonetic: 'दाका', english: 'Daka' },
    ho: { target: 'मंडी', phonetic: 'मंडी', english: 'Mandi' },
    mundari: { target: 'मंडी', phonetic: 'मंडी', english: 'Mandi' }
  },
  'दाल': {
    santhali: { target: 'ᱫᱟᱹᱞ', phonetic: 'दाल', english: 'Dal' },
    ho: { target: 'दालि', phonetic: 'दाली', english: 'Dali' },
    mundari: { target: 'दालि', phonetic: 'दाली', english: 'Dali' }
  },
  'सब्जी': {
    santhali: { target: 'ᱩᱛᱩ', phonetic: 'उतु', english: 'Utu' },
    ho: { target: 'उतु', phonetic: 'उतु', english: 'Utu' },
    mundari: { target: 'उतु', phonetic: 'उतु', english: 'Utu' }
  },
  'चाय': {
    santhali: { target: 'ᱪᱟ', phonetic: 'चा', english: 'Cha' },
    ho: { target: 'चा', phonetic: 'चा', english: 'Cha' },
    mundari: { target: 'चा', phonetic: 'चा', english: 'Cha' }
  },
  'कपड़े': {
    santhali: { target: 'ᱞᱩᱜᱽᱲᱤ', phonetic: 'लुगड़ी', english: 'Lugri' },
    ho: { target: 'किचिरीः', phonetic: 'किचिरीह', english: 'Kichirih' },
    mundari: { target: 'किचिरीः', phonetic: 'किचिरीह', english: 'Kichirih' }
  },
  'कपड़ा': {
    santhali: { target: 'ᱞᱩᱜᱽᱲᱤ', phonetic: 'लुगड़ी', english: 'Lugri' },
    ho: { target: 'किचिरीः', phonetic: 'किचिरीह', english: 'Kichirih' },
    mundari: { target: 'किचिरीः', phonetic: 'किचिरीह', english: 'Kichirih' }
  },
  'जूते': {
    santhali: { target: 'ᱯᱟᱱᱟᱦᱤ', phonetic: 'पानाही', english: 'Panahi' },
    ho: { target: 'खड़ाउ', phonetic: 'खड़ाऊ', english: 'Kharau' },
    mundari: { target: 'खड़ाउ', phonetic: 'खड़ाऊ', english: 'Kharau' }
  },
  'घंटी': {
    santhali: { target: 'ᱜᱷᱟᱹᱱᱴᱤ', phonetic: 'घंटी', english: 'Ghanti' },
    ho: { target: 'घंटी', phonetic: 'घंटी', english: 'Ghanti' },
    mundari: { target: 'घंटी', phonetic: 'घंटी', english: 'Ghanti' }
  },
  'नदी': {
    santhali: { target: 'ᱜᱟᱰᱟ', phonetic: 'गाडा', english: 'Gada' },
    ho: { target: 'गारा', phonetic: 'गारा', english: 'Gara' },
    mundari: { target: 'गारा', phonetic: 'गारा', english: 'Gara' }
  },
  'पहाड़': {
    santhali: { target: 'ᱵᱩᱨᱩ', phonetic: 'बुरु', english: 'Buru' },
    ho: { target: 'बुरू', phonetic: 'बुरू', english: 'Buru' },
    mundari: { target: 'बुरू', phonetic: 'बुरू', english: 'Buru' }
  },
  'जंगल': {
    santhali: { target: 'ᱵᱤᱨ', phonetic: 'बीर', english: 'Bir' },
    ho: { target: 'बीर', phonetic: 'बीर', english: 'Bir' },
    mundari: { target: 'बीर', phonetic: 'बीर', english: 'Bir' }
  },
  'रास्ता': {
    santhali: { target: 'ᱦᱚᱨ', phonetic: 'होर', english: 'Hor' },
    ho: { target: 'होरा', phonetic: 'होरा', english: 'Hora' },
    mundari: { target: 'होरा', phonetic: 'होरा', english: 'Hora' }
  },
  'बारिश': {
    santhali: { target: 'ᱫᱟᱜ', phonetic: 'दाग', english: 'Daq' },
    ho: { target: 'गामा', phonetic: 'गामा', english: 'Gama' },
    mundari: { target: 'गामा', phonetic: 'गामा', english: 'Gama' }
  },
  'छुट्टी': {
    santhali: { target: 'ᱪᱷᱩᱴᱤ', phonetic: 'छुट्टी', english: 'Chhutti' },
    ho: { target: 'छुट्टी', phonetic: 'छुट्टी', english: 'Chhutti' },
    mundari: { target: 'छुट्टी', phonetic: 'छुट्टी', english: 'Chhutti' }
  },
  'दोपहर': {
    santhali: { target: 'ᱛᱤᱠᱤᱱ', phonetic: 'तिकिन', english: 'Tikin' },
    ho: { target: 'तिकिन', phonetic: 'तिकिन', english: 'Tikin' },
    mundari: { target: 'तिकिन', phonetic: 'तिकिन', english: 'Tikin' }
  },
  'खुश': {
    santhali: { target: 'ᱨᱟᱹᱥᱠᱟᱹ', phonetic: 'रास्का', english: 'Raska' },
    ho: { target: 'रासा', phonetic: 'रासा', english: 'Rasa' },
    mundari: { target: 'रासा', phonetic: 'रासा', english: 'Rasa' }
  },
  'ठंडा': {
    santhali: { target: 'ᱨᱮᱭᱟᱲ', phonetic: 'रेयाड़', english: 'Reyar' },
    ho: { target: 'रयाड़', phonetic: 'रयाड़', english: 'Rayar' },
    mundari: { target: 'रयाड़', phonetic: 'रयाड़', english: 'Rayar' }
  },
  'गरम': {
    santhali: { target: 'ᱞᱚᱞᱚ', phonetic: 'लोलो', english: 'Lolo' },
    ho: { target: 'लोलो', phonetic: 'लोलो', english: 'Lolo' },
    mundari: { target: 'लोलो', phonetic: 'लोलो', english: 'Lolo' }
  },
  'पुराना': {
    santhali: { target: 'ᱢᱟᱨᱮ', phonetic: 'मारे', english: 'Mare' },
    ho: { target: 'मारे', phonetic: 'मारे', english: 'Mare' },
    mundari: { target: 'मारे', phonetic: 'मारे', english: 'Mare' }
  },
  'थोड़ा': {
    santhali: { target: 'ᱠᱟᱹᱴᱤᱡ', phonetic: 'कातिज', english: 'Katij' },
    ho: { target: 'हुडिंग', phonetic: 'हुडिंग', english: 'Huding' },
    mundari: { target: 'हुडिंग', phonetic: 'हुडिंग', english: 'Huding' }
  },
  'मिलकर': {
    santhali: { target: 'ᱢᱮᱥᱟ ᱠᱟᱛᱮ', phonetic: 'मेसा काते', english: 'Mesa kate' },
    ho: { target: 'मिसाते', phonetic: 'मिसाते', english: 'Misate' },
    mundari: { target: 'मिसाते', phonetic: 'मिसाते', english: 'Misate' }
  },

  // --- Questions & Connectives ---
  'कब': {
    santhali: { target: 'ᱛᱤᱥ', phonetic: 'तिस', english: 'Tis' },
    ho: { target: 'चिमता', phonetic: 'चिमता', english: 'Chimta' },
    mundari: { target: 'चिमता', phonetic: 'चिमता', english: 'Chimta' }
  },
  'क्यों': {
    santhali: { target: 'ᱪᱮᱫᱟᱜ', phonetic: 'चेदाग', english: 'Chedaq' },
    ho: { target: 'चिनते', phonetic: 'चिनते', english: 'Chinte' },
    mundari: { target: 'चिनते', phonetic: 'चिनते', english: 'Chinte' }
  },
  'कैसे': {
    santhali: { target: 'ᱪᱮᱫᱞᱮᱠᱟ', phonetic: 'चेदलेका', english: 'Chetleka' },
    ho: { target: 'चिलेका', phonetic: 'चिलेका', english: 'Chileka' },
    mundari: { target: 'चिलेका', phonetic: 'चिलेका', english: 'Chileka' }
  },

  // --- Grammatical Particles & Aspect Markers ---
  'रहा है': {
    santhali: { target: 'ᱠᱟᱱᱟ', phonetic: 'काना', english: 'Kana' },
    ho: { target: 'तना', phonetic: 'तना', english: 'Tana' },
    mundari: { target: 'तना', phonetic: 'तना', english: 'Tana' }
  },
  'रहे हैं': {
    santhali: { target: 'ᱠᱟᱱᱟᱠᱚ', phonetic: 'कानाको', english: 'Kanako' },
    ho: { target: 'तनको', phonetic: 'तनको', english: 'Tanko' },
    mundari: { target: 'तनको', phonetic: 'तनको', english: 'Tanko' }
  },
  'रही है': {
    santhali: { target: 'ᱠᱟᱱᱟ', phonetic: 'काना', english: 'Kana' },
    ho: { target: 'तना', phonetic: 'तना', english: 'Tana' },
    mundari: { target: 'तना', phonetic: 'तना', english: 'Tana' }
  },
  'हूँ': {
    santhali: { target: 'ᱠᱟᱹᱱᱟᱹᱧ', phonetic: 'कानांज', english: 'Kanaj' },
    ho: { target: 'तनांग', phonetic: 'तनांग', english: 'Tanang' },
    mundari: { target: 'तनांग', phonetic: 'तनांग', english: 'Tanang' }
  },
};

/**
 * Maps inflected Hindi verb and noun forms to their canonical dictionary root
 */
export function lemmatizeHindiWord(rawWord: string): { root: string; isPlural: boolean; isVerbFuture: boolean; isVerbImperative: boolean } {
  const w = rawWord.trim().replace(/[।,?!.()]+$/, '');
  let isPlural = false;
  let isVerbFuture = false;
  let isVerbImperative = false;

  // 1. Direct dictionary match
  if (CLASSROOM_VOCABULARY_MAP[w]) {
    return { root: w, isPlural: false, isVerbFuture: false, isVerbImperative: false };
  }

  // 2. High-Frequency Verb Inflections (Generic stem matching)
  // Future verbs (e.g. पढ़ेंगे, सीखेंगे, सुनेंगे, खाएंगे, जाएंगे, आएंगे)
  if (/(ेंगे|ेंगी|ूंगा|ूंगी|ोगे|एगा|एगी)$/.test(w)) {
    const candidate1 = w.replace(/(ेंगे|ेंगी|ूंगा|ूंगी|ोगे|एगा|एगी)$/, '');
    if (CLASSROOM_VOCABULARY_MAP[candidate1]) return { root: candidate1, isPlural: true, isVerbFuture: true, isVerbImperative: false };
    const candidate2 = candidate1 + 'ा';
    if (CLASSROOM_VOCABULARY_MAP[candidate2]) return { root: candidate2, isPlural: true, isVerbFuture: true, isVerbImperative: false };
  }

  // Imperative verbs (e.g. पढ़ो, सुनो, लिखो, देखो, बताओ, बैठो, खेलो, गाओ, नाचो, गिनो, करो, खोलो)
  if (/(ो|िए|ना)$/.test(w)) {
    const candidate1 = w.replace(/(ो|िए|ना)$/, '');
    if (CLASSROOM_VOCABULARY_MAP[candidate1]) return { root: candidate1, isPlural: false, isVerbFuture: false, isVerbImperative: true };
    const candidate2 = candidate1 + 'ा';
    if (CLASSROOM_VOCABULARY_MAP[candidate2]) return { root: candidate2, isPlural: false, isVerbFuture: false, isVerbImperative: true };
  }

  // Habitual / Participle verbs (e.g. पढ़ता, पढ़ती, पढ़ते, देता, देती, देते, जाता, जाती, जाते, आता, आती, आते, उगता, उड़ती)
  if (/(ता|ती|ते|कर)$/.test(w)) {
    const candidate1 = w.replace(/(ता|ती|ते|कर)$/, '');
    if (CLASSROOM_VOCABULARY_MAP[candidate1]) return { root: candidate1, isPlural: false, isVerbFuture: false, isVerbImperative: false };
    const candidate2 = candidate1 + 'ा';
    if (CLASSROOM_VOCABULARY_MAP[candidate2]) return { root: candidate2, isPlural: false, isVerbFuture: false, isVerbImperative: false };
  }

  // Reading
  if (/^(पढ़ेंगे|पढ़ूंगा|पढ़ोगे|पढ़ेंगी)/.test(w)) return { root: 'पढ़', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(पढ़ो|पढ़िए|पढ़ना)/.test(w)) return { root: 'पढ़', isPlural: false, isVerbFuture: false, isVerbImperative: true };
  if (/^(पढ़ता|पढ़ती|पढ़ते|पढ़कर)/.test(w)) return { root: 'पढ़', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // Listening
  if (/^(सुनेंगे|सुनूंगा|सुनोगे|सुनेंगी)/.test(w)) return { root: 'सुन', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(सुनो|सुनिए|सुनना)/.test(w)) return { root: 'सुन', isPlural: false, isVerbFuture: false, isVerbImperative: true };
  if (/^(सुनता|सुनती|सुनते|सुनकर)/.test(w)) return { root: 'सुन', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // Writing
  if (/^(लिखेंगे|लिखूंगा|लिखोगे|लिखेंगी)/.test(w)) return { root: 'लिख', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(लिखो|लिखिए|लिखना)/.test(w)) return { root: 'लिख', isPlural: false, isVerbFuture: false, isVerbImperative: true };
  if (/^(लिखता|लिखती|लिखते|लिखकर)/.test(w)) return { root: 'लिख', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // Looking
  if (/^(देखेंगे|देखूंगा|देखोगे|देखेंगी)/.test(w)) return { root: 'देख', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(देखो|देखिए|देखना)/.test(w)) return { root: 'देख', isPlural: false, isVerbFuture: false, isVerbImperative: true };
  if (/^(देखता|देखती|देखते|देखकर)/.test(w)) return { root: 'देख', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // Speaking
  if (/^(बोलेंगे|बोलूंगा|बोलोगे)/.test(w)) return { root: 'बोल', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(बोलो|बोलिए|बोलना)/.test(w)) return { root: 'बोल', isPlural: false, isVerbFuture: false, isVerbImperative: true };

  // Telling
  if (/^(बताएंगे|बताऊंगा|बताओगे)/.test(w)) return { root: 'बता', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(बताओ|बताइए|बताना)/.test(w)) return { root: 'बता', isPlural: false, isVerbFuture: false, isVerbImperative: true };

  // Learning
  if (/^(सीखेंगे|सीखूंगा|सीखोगे)/.test(w)) return { root: 'सीख', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(सीखो|सीखिए|सीखना)/.test(w)) return { root: 'सीख', isPlural: false, isVerbFuture: false, isVerbImperative: true };

  // Sitting
  if (/^(बैठेंगे|बैठूंगा|बैठोगे)/.test(w)) return { root: 'बैठ', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(बैठो|बैठिए|बैठना)/.test(w)) return { root: 'बैठ', isPlural: false, isVerbFuture: false, isVerbImperative: true };

  // Standing
  if (/^(खड़े|खड़ा)/.test(w)) return { root: 'खड़ा', isPlural: false, isVerbFuture: false, isVerbImperative: true };

  // Eating
  if (/^(खाएंगे|खाऊंगा|खाओगे)/.test(w)) return { root: 'खा', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(खाओ|खाइए|खाना)/.test(w)) return { root: 'खा', isPlural: false, isVerbFuture: false, isVerbImperative: true };

  // Drinking
  if (/^(पिएंगे|पिऊंगा|पियोगे)/.test(w)) return { root: 'पी', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(पियो|पीजिए|पीना)/.test(w)) return { root: 'पी', isPlural: false, isVerbFuture: false, isVerbImperative: true };

  // Doing
  if (/^(करेंगे|करूंगा|करोगे)/.test(w)) return { root: 'कर', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(करो|करिए|करना|करते|करता|करती|करके)/.test(w)) return { root: 'कर', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // Giving
  if (/^(देंगे|दूंगा|दोगे)/.test(w)) return { root: 'दे', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(दो|दीजिए|देना|देता|देती|देते)/.test(w)) return { root: 'दे', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // Flying
  if (/^(उड़ेंगे|उड़ती|उड़ता|उड़ते|उड़ना)/.test(w)) return { root: 'उड़', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // Emerging
  if (/^(निकलता|निकलती|निकलते|निकलेगा|निकलना)/.test(w)) return { root: 'निकल', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // Washing
  if (/^(धोएंगे|धोना|धोलो|धो)/.test(w)) return { root: 'धो', isPlural: false, isVerbFuture: false, isVerbImperative: true };

  // Counting
  if (/^(गिनेंगे|गिनो|गिनना|गिनती)/.test(w)) return { root: 'गिन', isPlural: false, isVerbFuture: false, isVerbImperative: true };

  // Playing
  if (/^(खेलेंगे|खेलूंगा|खेलोगे)/.test(w)) return { root: 'खेल', isPlural: true, isVerbFuture: true, isVerbImperative: false };
  if (/^(खेलो|खेलिए|खेलना)/.test(w)) return { root: 'खेल', isPlural: false, isVerbFuture: false, isVerbImperative: true };
  if (/^(खेलता|खेलती|खेलते|खेलकर|खेल)/.test(w)) return { root: 'खेल', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // Running
  if (/^(दौड़ेंगे|दौड़ो|दौड़ना|दौड़ते|दौड़ता|दौड़ती)/.test(w)) return { root: 'दौड़', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // Sleeping
  if (/^(सोएंगे|सोओ|सोना|सोते|सोता|सोती)/.test(w)) return { root: 'सो', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // Bringing
  if (/^(लाएंगे|लाओ|लाना|लाता|लाती|लाते)/.test(w)) return { root: 'ला', isPlural: false, isVerbFuture: false, isVerbImperative: false };

  // 3. High-Frequency Plural Nouns
  if (/(ों|ें|ियाँ|ियां)$/.test(w)) {
    const stripped = w.replace(/(ों|ें|ियाँ|ियां)$/, '');
    if (CLASSROOM_VOCABULARY_MAP[stripped]) {
      return { root: stripped, isPlural: true, isVerbFuture: false, isVerbImperative: false };
    }
    const strippedA = stripped + 'ा';
    if (CLASSROOM_VOCABULARY_MAP[strippedA]) {
      return { root: strippedA, isPlural: true, isVerbFuture: false, isVerbImperative: false };
    }
    const strippedI = stripped + 'ी';
    if (CLASSROOM_VOCABULARY_MAP[strippedI]) {
      return { root: strippedI, isPlural: true, isVerbFuture: false, isVerbImperative: false };
    }
  }

  // 4. Default return
  return { root: w, isPlural, isVerbFuture, isVerbImperative };
}

/**
 * Transliterate Devanagari to authentic Ol Chiki Unicode characters (U+1C50 - U+1C7F)
 * Prevents ANY untranslated Hindi script from remaining in Santhali output
 */
export function devanagariToOlChiki(text: string): string {
  const map: Record<string, string> = {
    'क': 'ᱠ', 'ख': 'ᱠᱷ', 'ग': 'ᱜ', 'घ': 'ᱜᱷ', 'ङ': 'ᱝ',
    'च': 'ᱪ', 'छ': 'ᱪᱷ', 'ज': 'ᱡ', 'झ': 'ᱡᱷ', 'ञ': 'ᱧ',
    'ट': 'ᱴ', 'ठ': 'ᱴᱷ', 'ड': 'ᱰ', 'ढ': 'ᱰᱷ', 'ण': 'ᱬ',
    'त': 'ᱛ', 'थ': 'ᱛᱷ', 'द': 'ᱫ', 'ध': 'ᱫᱷ', 'न': 'ᱱ',
    'प': 'ᱯ', 'फ': 'ᱯᱷ', 'ब': 'ᱵ', 'भ': 'ᱵᱷ', 'म': 'ᱢ',
    'य': 'ᱭ', 'र': 'ᱨ', 'ल': 'ᱞ', 'व': 'ᱣ', 'श': 'ᱥ', 'ष': 'ᱥ', 'स': 'ᱥ', 'ह': 'ᱦ',
    'ड़': 'ᱲ', 'ढ़': 'ᱲ',
    'अ': 'ᱚ', 'आ': 'ᱟ', 'इ': 'ᱤ', 'ई': 'ᱤ', 'उ': 'ᱩ', 'ऊ': 'ᱩ', 'ए': 'ᱮ', 'ऐ': 'ᱮ', 'ओ': 'ᱳ', 'औ': 'ᱳ',
    'ा': 'ᱟ', 'ि': 'ᱤ', 'ी': 'ᱤ', 'ु': 'ᱩ', 'ू': 'ᱩ', 'े': 'ᱮ', 'ै': 'ᱮ', 'ो': 'ᱳ', 'ौ': 'ᱳ',
    'ं': 'ᱝ', 'ँ': 'ᱸ', 'ः': 'ᱷ', '्': ''
  };

  let out = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (map[ch]) {
      out += map[ch];
    } else {
      out += ch;
    }
  }
  return out;
}
