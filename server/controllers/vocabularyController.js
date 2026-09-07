/**
 * Supplementary Indigenous Vocabulary Controller
 * Note: Database vocabulary does NOT replace local core translation datasets.
 */

import { query } from '../models/db.js';

const OFFLINE_VOCAB = [
  { id: 1, source_language: 'hindi', target_language: 'santhali', source_word: 'पानी', target_word: 'ᱫᱟᱜ', phonetic: 'दाग', category: 'needs' },
  { id: 2, source_language: 'hindi', target_language: 'santhali', source_word: 'किताब', target_word: 'ᱯᱳᱛᱷᱤ', phonetic: 'पोथी', category: 'classroom' },
  { id: 3, source_language: 'hindi', target_language: 'santhali', source_word: 'पेड़', target_word: 'ᱫᱟᱨᱮ', phonetic: 'दारे', category: 'nature' },
  { id: 4, source_language: 'hindi', target_language: 'ho', source_word: 'पानी', target_word: 'दाः', phonetic: 'दाह', category: 'needs' },
  { id: 5, source_language: 'hindi', target_language: 'ho', source_word: 'किताब', target_word: 'पोथी', phonetic: 'पोथी', category: 'classroom' },
  { id: 6, source_language: 'hindi', target_language: 'mundari', source_word: 'पानी', target_word: 'दाः', phonetic: 'दाह', category: 'needs' },
  { id: 7, source_language: 'hindi', target_language: 'mundari', source_word: 'किताब', target_word: 'पोथी', phonetic: 'पोथी', category: 'classroom' }
];

export async function getVocabulary(req, res, next) {
  try {
    const { target_language, category } = req.query;
    let sql = 'SELECT id, source_language, target_language, source_word, target_word, phonetic, category, example_sentence, created_at FROM vocabulary';
    const params = [];
    const conditions = [];

    if (target_language) {
      conditions.push('target_language = ?');
      params.push(target_language.toLowerCase());
    }
    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY id ASC';

    const result = await query(sql, params);

    if (!result.success && result.offline) {
      let filtered = OFFLINE_VOCAB;
      if (target_language) {
        filtered = filtered.filter(v => v.target_language === target_language.toLowerCase());
      }
      if (category) {
        filtered = filtered.filter(v => v.category === category);
      }
      return res.json({ success: true, offline: true, data: filtered });
    }

    res.json({ success: true, offline: false, data: result.rows });
  } catch (err) {
    next(err);
  }
}

export async function addVocabulary(req, res, next) {
  try {
    const {
      source_language = 'hindi',
      target_language,
      source_word,
      target_word,
      phonetic = null,
      category = 'general',
      example_sentence = null
    } = req.body;

    const sql = `
      INSERT INTO vocabulary (source_language, target_language, source_word, target_word, phonetic, category, example_sentence)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await query(sql, [
      source_language.toLowerCase(),
      target_language.toLowerCase(),
      source_word.trim(),
      target_word.trim(),
      phonetic,
      category,
      example_sentence
    ]);

    if (!result.success && result.offline) {
      return res.status(503).json({
        success: false,
        offline: true,
        message: 'MySQL is offline. Word added to local memory only.'
      });
    }

    res.status(201).json({
      success: true,
      data: { id: result.rows.insertId, source_word, target_word, target_language }
    });
  } catch (err) {
    next(err);
  }
}
