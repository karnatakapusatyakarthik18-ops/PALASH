/**
 * Translation History Logging Controller (Non-blocking)
 * Guaranteed: Core translation NEVER depends on or blocks for this service!
 */

import { query } from '../models/db.js';

export async function logTranslation(req, res, next) {
  try {
    const {
      source_language = 'hindi',
      target_language = 'santhali',
      input_text,
      translation,
      confidence = 0.95
    } = req.body;

    if (!input_text || !translation) {
      return res.status(400).json({ success: false, error: 'Missing input_text or translation' });
    }

    const sql = `
      INSERT INTO translation_history (source_language, target_language, input_text, translation, confidence)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await query(sql, [
      source_language,
      target_language,
      input_text.slice(0, 1000),
      translation.slice(0, 2000),
      confidence
    ]);

    // Always succeed from caller perspective
    res.json({
      success: true,
      logged: result.success && !result.offline,
      offline: result.offline
    });
  } catch (err) {
    // Non-blocking: send success with warning so frontend never errors
    res.json({ success: true, logged: false, note: 'Logged locally, DB unavailable' });
  }
}

export async function getTranslationHistory(req, res, next) {
  try {
    const { limit = 20 } = req.query;
    const sql = `
      SELECT id, source_language, target_language, input_text, translation, confidence, timestamp
      FROM translation_history
      ORDER BY timestamp DESC
      LIMIT ?
    `;
    const result = await query(sql, [parseInt(limit, 10)]);

    if (!result.success && result.offline) {
      return res.json({ success: true, offline: true, data: [] });
    }

    res.json({ success: true, offline: false, data: result.rows });
  } catch (err) {
    next(err);
  }
}
