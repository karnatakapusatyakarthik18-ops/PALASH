// PALASH Vani - Node.js Dataset Ingestion & Validation Pipeline
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const datasetsDir = path.join(__dirname, '..', 'datasets');

console.log('='.repeat(60));
console.log('PALASH Vani: Validating Kaggle Datasets');
console.log('='.repeat(60));

const files = [
  'kaggle_ol_chiki_alphabet.json',
  'kaggle_indic_parallel_corpus.json',
  'kaggle_storyweaver_tales.json'
];

let allValid = true;

for (const file of files) {
  const filePath = path.join(datasetsDir, file);
  if (fs.existsSync(filePath)) {
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const keys = Object.keys(content);
      console.log(`✅ [OK] ${file}: Valid JSON (${keys.join(', ')})`);
    } catch (err) {
      console.error(`❌ [ERROR] ${file}: Invalid JSON -`, err.message);
      allValid = false;
    }
  } else {
    console.warn(`⚠️ [MISSING] ${file}`);
    allValid = false;
  }
}

if (allValid) {
  console.log('\nAll Kaggle datasets successfully verified and ready for client-side use.');
} else {
  console.error('\nSome datasets had errors.');
}
console.log('='.repeat(60));
