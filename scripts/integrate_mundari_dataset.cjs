const fs = require('fs');
const path = require('path');

// 1. New Mundari vocabulary items to add to src/nlp/lexicons/mundari.ts
const NEW_MUNDARI_VOCAB = `
  // --- Kaggle Hindi-Mundari Corpus Additions (haradibots / IIT Kharagpur & Karya) ---
  {
    id: 'mun_friend_songe',
    hindi: 'दोस्त',
    targetText: 'सोङगे',
    devanagariPhonetic: 'सोङ्गे',
    englishPhonetic: 'Songe',
    category: 'family',
    nipunLakshya: 'L1',
    exampleHindi: 'वह मेरा सच्चा दोस्त है',
    exampleTarget: 'इनिः आञाः सोङगे तानाएः',
    exampleDevanagari: 'इनिः आञाः सोङ्गे तानाएः'
  },
  {
    id: 'mun_jungle_bir',
    hindi: 'जंगल',
    targetText: 'बिर',
    devanagariPhonetic: 'बिर',
    englishPhonetic: 'Bir',
    category: 'nature',
    nipunLakshya: 'L1',
    exampleHindi: 'वहाँ घने जंगल थे',
    exampleTarget: 'एनताः बेसे बिर ताइकेना',
    exampleDevanagari: 'एनताः बेसे बिर ताइकेना'
  },
  {
    id: 'mun_house_oda',
    hindi: 'घर',
    targetText: 'ओड़ाः',
    devanagariPhonetic: 'ओड़ाः',
    englishPhonetic: 'Oda:',
    category: 'classroom',
    nipunLakshya: 'L1',
    exampleHindi: 'घर बार सब सुरक्षित है',
    exampleTarget: 'ओड़ाः दुआर सोबेन बुगिगे मेनाः',
    exampleDevanagari: 'ओड़ाः दुआर सोबेन बुगिगे मेनाः'
  },
  {
    id: 'mun_good_bugina',
    hindi: 'अच्छा',
    targetText: 'बुगिना',
    devanagariPhonetic: 'बुगिना',
    englishPhonetic: 'Bugina',
    category: 'feelings',
    nipunLakshya: 'L1',
    exampleHindi: 'यह काम बहुत अच्छा है',
    exampleTarget: 'ने कामि ओड़ोःगे बुगिना',
    exampleDevanagari: 'ने कामि ओड़ोःगे बुगिना'
  },
  {
    id: 'mun_work_kami',
    hindi: 'काम',
    targetText: 'कामि',
    devanagariPhonetic: 'कामि',
    englishPhonetic: 'Kami',
    category: 'actions',
    nipunLakshya: 'L1',
    exampleHindi: 'उसी से मेरा काम चलता है',
    exampleTarget: 'एना ते गे आञाः कामि चालाओआ',
    exampleDevanagari: 'एना ते गे आञाः कामि चालाओआ'
  },
  {
    id: 'mun_talk_jagar',
    hindi: 'बातचीत',
    targetText: 'जागार',
    devanagariPhonetic: 'जागार',
    englishPhonetic: 'Jagar',
    category: 'actions',
    nipunLakshya: 'L1',
    exampleHindi: 'आपस में बात की जा रही है',
    exampleTarget: 'आपान लोः जागार होबाओताना',
    exampleDevanagari: 'आपान लोः जागार होबाओताना'
  },
  {
    id: 'mun_laugh_landa',
    hindi: 'हँसना',
    targetText: 'लानदा',
    devanagariPhonetic: 'लानदा',
    englishPhonetic: 'Landa',
    category: 'feelings',
    nipunLakshya: 'L1',
    exampleHindi: 'बच्चे हँस रहे हैं',
    exampleTarget: 'होनको लानदातानाको',
    exampleDevanagari: 'होनको लानदातानाको'
  },
  {
    id: 'mun_joy_rasika',
    hindi: 'खुशी',
    targetText: 'रासिका',
    devanagariPhonetic: 'रासिका',
    englishPhonetic: 'Rasika',
    category: 'feelings',
    nipunLakshya: 'L1',
    exampleHindi: 'बच्चे मौज और खुशी में हैं',
    exampleTarget: 'होनको रासिकाते मेनाःकोवा',
    exampleDevanagari: 'होनको रासिकाते मेनाःकोवा'
  },
  {
    id: 'mun_village_hatu',
    hindi: 'गाँव',
    targetText: 'हातु',
    devanagariPhonetic: 'हातु',
    englishPhonetic: 'Hatu',
    category: 'nature',
    nipunLakshya: 'L1',
    exampleHindi: 'हमारा गाँव बहुत सुंदर है',
    exampleTarget: 'आलेआः हातु बेसे मेनाः',
    exampleDevanagari: 'आलेआः हातु बेसे मेनाः'
  },
  {
    id: 'mun_river_gada',
    hindi: 'नदी',
    targetText: 'गाड़ा',
    devanagariPhonetic: 'गाड़ा',
    englishPhonetic: 'Gada',
    category: 'nature',
    nipunLakshya: 'L1',
    exampleHindi: 'नदी में साफ़ पानी बहता है',
    exampleTarget: 'गाड़ा रे सोबेन दाः हेसेरताना',
    exampleDevanagari: 'गाड़ा रे सोबेन दाः हेसेरताना'
  },
  {
    id: 'mun_rain_gama',
    hindi: 'बारिश',
    targetText: 'गामा',
    devanagariPhonetic: 'गामा',
    englishPhonetic: 'Gama',
    category: 'nature',
    nipunLakshya: 'L1',
    exampleHindi: 'आज तेज बारिश हो रही है',
    exampleTarget: 'तिसिन गामाताना',
    exampleDevanagari: 'तिसिन गामाताना'
  },
  {
    id: 'mun_sun_singi',
    hindi: 'सूरज',
    targetText: 'सिंगी',
    devanagariPhonetic: 'सिंगी',
    englishPhonetic: 'Singi',
    category: 'nature',
    nipunLakshya: 'L1',
    exampleHindi: 'सुबह सूरज उगता है',
    exampleTarget: 'सेताः सिंगी ओड़ोःओताना',
    exampleDevanagari: 'सेताः सिंगी ओड़ोःओताना'
  },
  {
    id: 'mun_moon_chandu',
    hindi: 'चाँद',
    targetText: 'चांदु',
    devanagariPhonetic: 'चांदु',
    englishPhonetic: 'Chandu',
    category: 'nature',
    nipunLakshya: 'L1',
    exampleHindi: 'रात में चाँद चमकता है',
    exampleTarget: 'निदा चांदु जुलुःतानाएः',
    exampleDevanagari: 'निदा चांदु जुलुःतानाएः'
  },
  {
    id: 'mun_food_mandi',
    hindi: 'खाना',
    targetText: 'मांडी',
    devanagariPhonetic: 'मांडी',
    englishPhonetic: 'Mandi',
    category: 'needs',
    nipunLakshya: 'L1',
    exampleHindi: 'समय पर खाना खाओ',
    exampleTarget: 'सोमाए रे मांडी जोमेपे',
    exampleDevanagari: 'सोमाए रे मांडी जोमेपे'
  },
  {
    id: 'mun_milk_towa',
    hindi: 'दूध',
    targetText: 'तोवा',
    devanagariPhonetic: 'तोवा',
    englishPhonetic: 'Towa',
    category: 'needs',
    nipunLakshya: 'L1',
    exampleHindi: 'गाय हमें मीठा दूध देती है',
    exampleTarget: 'गई अबुके तोवा एमाबुवा',
    exampleDevanagari: 'गई अबुके तोवा एमाबुवा'
  },
  {
    id: 'mun_school_iskul',
    hindi: 'स्कूल',
    targetText: 'इसकुल',
    devanagariPhonetic: 'इसकुल',
    englishPhonetic: 'Iskul',
    category: 'classroom',
    nipunLakshya: 'L1',
    exampleHindi: 'बच्चे रोज स्कूल जाते हैं',
    exampleTarget: 'होनको दिनाम इसकुल सेनतानाको',
    exampleDevanagari: 'होनको दिनाम इसकुल सेनतानाको'
  },
  {
    id: 'mun_study_padao',
    hindi: 'पढ़ना',
    targetText: 'पाड़ाओ',
    devanagariPhonetic: 'पाड़ाओ',
    englishPhonetic: 'Padao',
    category: 'classroom',
    nipunLakshya: 'L1',
    exampleHindi: 'उन्होंने अपनी पढ़ाई पूरी कर ली',
    exampleTarget: 'इनिः आएः पाड़ाओ चाबाकेदाएः',
    exampleDevanagari: 'इनिः आएः पाड़ाओ चाबाकेदाएः'
  },
  {
    id: 'mun_write_ol',
    hindi: 'लिखना',
    targetText: 'ओल',
    devanagariPhonetic: 'ओल',
    englishPhonetic: 'Ol',
    category: 'classroom',
    nipunLakshya: 'L1',
    exampleHindi: 'स्लेट पर सुंदर लिखो',
    exampleTarget: 'स्लेट रे बुगिते ओलमे',
    exampleDevanagari: 'स्लेट रे बुगिते ओलमे'
  },
  {
    id: 'mun_see_nel',
    hindi: 'देखना',
    targetText: 'नेल',
    devanagariPhonetic: 'नेल',
    englishPhonetic: 'Nel',
    category: 'actions',
    nipunLakshya: 'L1',
    exampleHindi: 'किताब में चित्र देखो',
    exampleTarget: 'पोथी रे मुरुद नेलमे',
    exampleDevanagari: 'पोथी रे मुरुद नेलमे'
  },
  {
    id: 'mun_come_hiju',
    hindi: 'आना',
    targetText: 'हिजूः',
    devanagariPhonetic: 'हिजूः',
    englishPhonetic: 'Hiju:',
    category: 'actions',
    nipunLakshya: 'L1',
    exampleHindi: 'कक्षा के अंदर आओ',
    exampleTarget: 'कक्षा बितार हिजूःमे',
    exampleDevanagari: 'कक्षा बितार हिजूःमे'
  },
  {
    id: 'mun_go_sen',
    hindi: 'जाना',
    targetText: 'सेन',
    devanagariPhonetic: 'सेन',
    englishPhonetic: 'Sen',
    category: 'actions',
    nipunLakshya: 'L1',
    exampleHindi: 'अपने घर जाओ',
    exampleTarget: 'आपान ओड़ाः सेनमे',
    exampleDevanagari: 'आपान ओड़ाः सेनमे'
  },
  {
    id: 'mun_yes_he',
    hindi: 'हाँ',
    targetText: 'हेए',
    devanagariPhonetic: 'हेए',
    englishPhonetic: "He'e",
    category: 'conversation',
    nipunLakshya: 'L1'
  },
  {
    id: 'mun_no_ka',
    hindi: 'नहीं',
    targetText: 'का',
    devanagariPhonetic: 'का',
    englishPhonetic: 'Ka',
    category: 'conversation',
    nipunLakshya: 'L1'
  },
  {
    id: 'mun_what_chana',
    hindi: 'क्या',
    targetText: 'चानाः',
    devanagariPhonetic: 'चानाः',
    englishPhonetic: 'Chana:',
    category: 'questions',
    nipunLakshya: 'L1',
    exampleHindi: 'यह क्या है?',
    exampleTarget: 'नेआ चानाः ताना?',
    exampleDevanagari: 'नेआ चानाः ताना?'
  },
  {
    id: 'mun_how_chilka',
    hindi: 'कैसे',
    targetText: 'चिलका',
    devanagariPhonetic: 'चिलका',
    englishPhonetic: 'Chilka',
    category: 'questions',
    nipunLakshya: 'L1',
    exampleHindi: 'आप कैसे हैं?',
    exampleTarget: 'अम चिलका मेनामा?',
    exampleDevanagari: 'अम चिलका मेनामा?'
  },
  {
    id: 'mun_where_okota',
    hindi: 'कहाँ',
    targetText: 'ओकोताः',
    devanagariPhonetic: 'ओकोताः',
    englishPhonetic: 'Okota:',
    category: 'questions',
    nipunLakshya: 'L1',
    exampleHindi: 'तुम्हारा घर कहाँ है?',
    exampleTarget: 'अमाः ओड़ाः ओकोताः मेनाः?',
    exampleDevanagari: 'अमाः ओड़ाः ओकोताः मेनाः?'
  },
  {
    id: 'mun_who_okoe',
    hindi: 'कौन',
    targetText: 'ओकोए',
    devanagariPhonetic: 'ओकोए',
    englishPhonetic: 'Okoe',
    category: 'questions',
    nipunLakshya: 'L1',
    exampleHindi: 'वहाँ कौन खड़ा है?',
    exampleTarget: 'एनताः ओकोए तिंगुनतानाएः?',
    exampleDevanagari: 'एनताः ओकोए तिंगुनतानाएः?'
  },
  {
    id: 'mun_why_chikate',
    hindi: 'क्यों',
    targetText: 'चिकाते',
    devanagariPhonetic: 'चिकाते',
    englishPhonetic: 'Chikate',
    category: 'questions',
    nipunLakshya: 'L1'
  },
  {
    id: 'mun_help_ranabal',
    hindi: 'मदद',
    targetText: 'रानाबाल',
    devanagariPhonetic: 'रानाबाल',
    englishPhonetic: 'Ranabal',
    category: 'needs',
    nipunLakshya: 'L1',
    exampleHindi: 'मेरी मदद करो',
    exampleTarget: 'आञाः रानाबाल रिकाएपे',
    exampleDevanagari: 'आञाः रानाबाल रिकाएपे'
  },
  {
    id: 'mun_life_jinid',
    hindi: 'जिंदगी',
    targetText: 'जिनिद',
    devanagariPhonetic: 'जिनिद',
    englishPhonetic: 'Jinid',
    category: 'feelings',
    nipunLakshya: 'L1'
  },
  {
    id: 'mun_all_sobena',
    hindi: 'सब कुछ',
    targetText: 'सोबेनाः',
    devanagariPhonetic: 'सोबेनाः',
    englishPhonetic: 'Sobena:',
    category: 'classroom',
    nipunLakshya: 'L1'
  }
`;

// 2. Update src/nlp/lexicons/mundari.ts
const MUNDARI_TS_PATH = path.join(__dirname, '..', 'src', 'nlp', 'lexicons', 'mundari.ts');
let mundariTsContent = fs.readFileSync(MUNDARI_TS_PATH, 'utf8');

// Insert before the closing bracket '];'
if (!mundariTsContent.includes('mun_friend_songe')) {
  mundariTsContent = mundariTsContent.replace(/\s*\];\s*$/, `${NEW_MUNDARI_VOCAB}\n];\n`);
  fs.writeFileSync(MUNDARI_TS_PATH, mundariTsContent, 'utf8');
  console.log('Updated src/nlp/lexicons/mundari.ts with new Kaggle vocabulary!');
} else {
  console.log('src/nlp/lexicons/mundari.ts already contains Kaggle vocabulary.');
}

// 3. Update database/seed.sql with additional Mundari vocabulary and lesson
const SEED_SQL_PATH = path.join(__dirname, '..', 'database', 'seed.sql');
let seedContent = fs.readFileSync(SEED_SQL_PATH, 'utf8');

const MUNDARI_SEED_ADDITIONS = `
-- Additional Mundari Vocabulary from Kaggle Haradibots Dataset
INSERT INTO \`vocabulary\` (\`source_language\`, \`target_language\`, \`source_word\`, \`target_word\`, \`phonetic\`, \`category\`, \`example_sentence\`) VALUES
('hindi', 'mundari', 'दोस्त', 'सोङगे', 'सोङ्गे', 'family', 'इनिः आञाः सोङगे तानाएः (वह मेरा दोस्त है)'),
('hindi', 'mundari', 'जंगल', 'बिर', 'बिर', 'nature', 'एनताः बेसे बिर ताइकेना (वहाँ घने जंगल थे)'),
('hindi', 'mundari', 'घर', 'ओड़ाः', 'ओड़ाः', 'classroom', 'ओड़ाः दुआर सोबेन बुगिगे मेनाः (घर द्वार सब ठीक है)'),
('hindi', 'mundari', 'अच्छा', 'बुगिना', 'बुगिना', 'feelings', 'ने कामि ओड़ोःगे बुगिना (यह काम और भी अच्छा है)'),
('hindi', 'mundari', 'काम', 'कामि', 'कामि', 'actions', 'एना ते गे आञाः कामि चालाओआ (उसी से मेरा काम चलता है)'),
('hindi', 'mundari', 'बातचीत', 'जागार', 'जागार', 'actions', 'आपान लोः जागार होबाओताना (बातचीत हो रही है)'),
('hindi', 'mundari', 'गाँव', 'हातु', 'हातु', 'nature', 'आलेआः हातु बेसे मेनाः (हमारा गाँव सुंदर है)'),
('hindi', 'mundari', 'नदी', 'गाड़ा', 'गाड़ा', 'nature', 'गाड़ा रे सोबेन दाः हेसेरताना (नदी में पानी बहता है)'),
('hindi', 'mundari', 'बारिश', 'गामा', 'गामा', 'nature', 'तिसिन गामाताना (आज बारिश हो रही है)'),
('hindi', 'mundari', 'सूरज', 'सिंगी', 'सिंगी', 'nature', 'सेताः सिंगी ओड़ोःओताना (सुबह सूरज उगता है)'),
('hindi', 'mundari', 'चाँद', 'चांदु', 'चांदु', 'nature', 'निदा चांदु जुलुःतानाएः (रात में चाँद चमकता है)'),
('hindi', 'mundari', 'खाना', 'मांडी', 'मांडी', 'needs', 'सोमाए रे मांडी जोमेपे (समय पर खाना खाओ)'),
('hindi', 'mundari', 'दूध', 'तोवा', 'तोवा', 'needs', 'गई अबुके तोवा एमाबुवा (गाय दूध देती है)'),
('hindi', 'mundari', 'स्कूल', 'इसकुल', 'इसकुल', 'classroom', 'होनको दिनाम इसकुल सेनतानाको (बच्चे रोज स्कूल जाते हैं)'),
('hindi', 'mundari', 'पढ़ना', 'पाड़ाओ', 'पाड़ाओ', 'classroom', 'इनिः आएः पाड़ाओ चाबाकेदाएः (उसने पढ़ाई पूरी की)'),
('hindi', 'mundari', 'लिखना', 'ओल', 'ओल', 'classroom', 'स्लेट रे बुगिते ओलमे (स्लेट पर अच्छा लिखो)'),
('hindi', 'mundari', 'क्या', 'चानाः', 'चानाः', 'questions', 'नेआ चानाः ताना? (यह क्या है?)'),
('hindi', 'mundari', 'कहाँ', 'ओकोताः', 'ओकोताः', 'questions', 'अमाः ओड़ाः ओकोताः मेनाः? (तुम्हारा घर कहाँ है?)'),
('hindi', 'mundari', 'कैसे', 'चिलका', 'चिलका', 'questions', 'अम चिलका मेनामा? (आप कैसे हैं?)')
ON DUPLICATE KEY UPDATE \`target_word\` = VALUES(\`target_word\`);
`;

if (!seedContent.includes('mun_friend_songe') && !seedContent.includes('आलेआः हातु')) {
  seedContent += '\n' + MUNDARI_SEED_ADDITIONS;
  fs.writeFileSync(SEED_SQL_PATH, seedContent, 'utf8');
  console.log('Updated database/seed.sql with rich Mundari vocabulary!');
} else {
  console.log('database/seed.sql already updated.');
}

console.log('Integration completed successfully.');
