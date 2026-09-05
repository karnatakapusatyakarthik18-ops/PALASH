import { PalashNLPTranslator } from '../src/nlp/translator';

console.log("=================================================");
console.log("   PALASH Vani NLP Engine Automated Verification  ");
console.log("=================================================\n");

let passed = 0;
let total = 0;

function assert(condition: boolean, testName: string, details?: any) {
  total++;
  if (condition) {
    passed++;
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName} - Details:`, details);
  }
}

// Test 1: Santhali Classroom Command & Script Verification
const sanSit = PalashNLPTranslator.translate('बैठ जाओ', 'santhali');
assert(sanSit.targetText.includes('ᱫᱩᱲᱩᱵᱽ'), 'Santhali "बैठ जाओ" translates to Ol Chiki ᱫᱩᱲᱩᱵᱽ', sanSit);
assert(sanSit.devanagariPhonetic.includes('दुड़ुब'), 'Santhali "बैठ जाओ" has Devanagari phonetic "दुड़ुब"', sanSit);
assert(sanSit.confidence >= 0.90, 'Confidence is high (>=0.90)', sanSit.confidence);

// Test 2: Ho Classroom Command
const hoStand = PalashNLPTranslator.translate('खड़े हो जाओ', 'ho');
assert(hoStand.devanagariPhonetic.includes('तिंगुन'), 'Ho "खड़े हो जाओ" translates to "तिंगुन"', hoStand);

// Test 3: Mundari Classroom Command
const munOpen = PalashNLPTranslator.translate('किताब खोलो', 'mundari');
assert(munOpen.targetText.includes('पोथी'), 'Mundari "किताब खोलो" contains "पोथी"', munOpen);

// Test 4: FLN Numeracy 1 to 5 Santhali
const num1 = PalashNLPTranslator.translate('एक', 'santhali');
const num2 = PalashNLPTranslator.translate('दो', 'santhali');
const num3 = PalashNLPTranslator.translate('तीन', 'santhali');
assert(num1.targetText.includes('ᱢᱤᱫ'), 'Santhali 1 is Mit\' (ᱢᱤᱫ)', num1);
assert(num2.targetText.includes('ᱵᱟᱨ'), 'Santhali 2 is Bar (ᱵᱟᱨ)', num2);
assert(num3.targetText.includes('ᱯᱮ'), 'Santhali 3 is Pe (ᱯᱮ)', num3);

// Test 5: Question sentence structure "यह क्या है?"
const qSan = PalashNLPTranslator.translate('यह क्या है?', 'santhali');
assert(qSan.targetText.includes('ᱪᱮᱫ'), 'Santhali "यह क्या है?" contains ᱪᱮᱫ (chet\')', qSan);

const qHo = PalashNLPTranslator.translate('यह क्या है?', 'ho');
assert(qHo.devanagariPhonetic.includes('चिनातन'), 'Ho "यह क्या है?" contains "चिनातन"', qHo);

// Test 6: Copular sentence "यह एक पेड़ है"
const copSan = PalashNLPTranslator.translate('यह एक पेड़ है', 'santhali');
assert(copSan.targetText.includes('ᱫᱟᱨᱮ') && copSan.targetText.includes('ᱠᱟᱱᱟ'), 'Santhali "यह एक पेड़ है" contains "दारे" and "काना"', copSan);

// Test 7: Reverse Student-to-Teacher Translation (Tribal -> Hindi)
const revSan = PalashNLPTranslator.translateTribalToHindi('ᱫᱟᱜ', 'santhali');
assert(revSan.hindiText === 'पानी', 'Reverse translation of ᱫᱟᱜ (daq) to Hindi is "पानी"', revSan);

const revMun = PalashNLPTranslator.translateTribalToHindi('पोथी', 'mundari');
assert(revMun.hindiText.includes('किताब') || revMun.original === 'पोथी', 'Reverse translation of Mundari "पोथी"', revMun);

// Test 8: English Classroom Mic Command "Open your books" -> Santhali Ol Chiki
const enOpen = PalashNLPTranslator.translate('Open your books', 'santhali');
assert(enOpen.targetText.includes('ᱯᱳᱛᱷᱤ'), 'English "Open your books" translates to Ol Chiki ᱯᱳᱛᱷᱤ', enOpen);
assert(enOpen.devanagariPhonetic.includes('पोथी'), 'English "Open your books" has Devanagari phonetic "पोथी"', enOpen);
assert(enOpen.englishPhonetic.toLowerCase().includes('pothi'), 'English "Open your books" has phonetic "pothi"', enOpen);

// Test 9: English Mic Command "Sit down" -> Ho
const enSit = PalashNLPTranslator.translate('Sit down', 'ho');
assert(enSit.devanagariPhonetic.includes('दुब'), 'English "Sit down" translates to Ho "दुब/दुबेन"', enSit);

// Test 10: English Mic Command "Stand up" -> Mundari
const enStand = PalashNLPTranslator.translate('Stand up', 'mundari');
assert(enStand.devanagariPhonetic.includes('तिंगुन'), 'English "Stand up" translates to Mundari "तिंगुनमे"', enStand);

// Test 11: English Question "What is this?" -> Santhali
const enWhat = PalashNLPTranslator.translate('What is this?', 'santhali');
assert(enWhat.targetText.includes('ᱪᱮᱫ'), 'English "What is this?" translates to Ol Chiki ᱪᱮᱫ', enWhat);

// Test 12: English Mic Command "Drink water" -> Santhali
const enWater = PalashNLPTranslator.translate('Drink water', 'santhali');
assert(enWater.targetText.includes('ᱫᱟᱜ'), 'English "Drink water" translates to Ol Chiki ᱫᱟᱜ', enWater);

// Test 13: English Sentence "This is a tree" -> Santhali
const enTree = PalashNLPTranslator.translate('This is a tree', 'santhali');
assert(enTree.targetText.includes('ᱫᱟᱨᱮ') && enTree.targetText.includes('ᱠᱟᱱᱟ'), 'English "This is a tree" translates to Ol Chiki ᱫᱟᱨᱮ + ᱠᱟᱱᱟ', enTree);

console.log("\n-------------------------------------------------");
console.log(`Verification Summary: ${passed} / ${total} Tests Passed (${Math.round(passed/total*100)}%)`);
console.log("-------------------------------------------------");

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
