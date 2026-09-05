# PALASH Vani - Kaggle & Indic NLP Datasets Pipeline

This directory contains processed tribal language datasets sourced from **Kaggle Open Datasets**, **AI4Bharat**, and **Pratham StoryWeaver**, curated specifically for primary school MTB-MLE classrooms in Jharkhand.

---

## 1. Datasets Included

| File | Source | Description | Records | License |
| :--- | :--- | :--- | :--- | :--- |
| `kaggle_ol_chiki_alphabet.json` | Kaggle (`ai4bharat/ol-chiki-ocr`) | Complete 30 Ol Chiki alphabets, 10 digits, IPA phonetic transcriptions, Hindi/English transliterations, and glyph meanings. | 40 items | CC-BY-4.0 |
| `kaggle_indic_parallel_corpus.json` | Kaggle (`ai4bharat/indic-corpus`) | Parallel alignment of primary school commands and NIPUN Bharat FLN competencies in Hindi, Santhali (Ol Chiki + Devanagari), Ho, and Mundari. | 24 pairs | CC-BY-4.0 |
| `kaggle_storyweaver_tales.json` | Kaggle (`prathambooks/storyweaver`) | Graded bilingual reading folk tales for Grade 1-3 tribal learners with synchronized moral takeaways. | Multi-story | CC-BY-4.0 |

---

## 2. Ingestion Pipeline Scripts

* **`scripts/pull_kaggle_datasets.py`**: Python script using `kagglehub` and Kaggle API to automate downloading, tokenization, filtering for child-friendly FLN vocabulary, and JSON schema export.
* **`scripts/pull_datasets.mjs`**: Lightweight Node.js dataset validator and processor.

---

## 3. Academic & Institutional Citations
1. **AI4Bharat / IIT Madras**: IndicCorp: A Large Multilingual Parallel Corpus for Indian Languages.
2. **Pratham Books StoryWeaver**: Multilingual Children's Graded Reader Open Datasets.
3. **JCERT Ranchi**: Primary school bilingual primers (*Gyanodaya*, *Udaan*).
4. **CIIL Mysuru**: Central Institute of Indian Languages Austroasiatic linguistic lexicons.
