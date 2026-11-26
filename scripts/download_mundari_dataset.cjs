const https = require('https');
const fs = require('fs');
const path = require('path');

const URL = 'https://raw.githubusercontent.com/karya-inc/dataset-hindi-mundari-translation/main/translation-hi-unr.tsv';
const OUTPUT_RAW = path.join(__dirname, '..', 'datasets', 'hindi_mundari_corpus_raw.tsv');

console.log('Downloading Hindi-Mundari translation dataset from:', URL);

https.get(URL, (res) => {
  if (res.statusCode === 301 || res.statusCode === 302) {
    console.log('Redirecting to:', res.headers.location);
    https.get(res.headers.location, handleResponse);
  } else {
    handleResponse(res);
  }
}).on('error', (err) => {
  console.error('Download error:', err.message);
});

function handleResponse(res) {
  if (res.statusCode !== 200) {
    console.error('Failed to download. Status code:', res.statusCode);
    return;
  }
  let data = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Downloaded bytes:', data.length);
    fs.writeFileSync(OUTPUT_RAW, data, 'utf8');
    const lines = data.trim().split(/\r?\n/);
    console.log('Total translation pairs downloaded:', lines.length);
    console.log('Sample pairs:');
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      console.log(`[${i+1}] ${lines[i]}`);
    }
  });
}
