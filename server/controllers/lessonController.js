/**
 * MTB-MLE Lesson Management Controller
 */

import { query } from '../models/db.js';

// Fallback lesson templates when MySQL is offline
const OFFLINE_LESSONS = [
  {
    id: 1,
    title: 'पाठ १: वर्णमाला एवं शुरुआती शब्द (Alphabet & First Words)',
    description: 'संताली ओल चिकी लिपि के मूल अक्षर और रोज़मर्रा के शब्द',
    language_code: 'sat',
    content: JSON.stringify({
      intro: 'आज हम ओल चिकी वर्णमाला के मूल अक्षर सीखेंगे।',
      letters: ['ᱚ', 'ᱛ', 'ᱜ', 'ᱝ', 'ᱞ'],
      words: [{ word: 'ᱫᱟᱜ', meaning: 'पानी' }, { word: 'ᱫᱟᱨᱮ', meaning: 'पेड़' }]
    }),
    created_by: 1
  },
  {
    id: 2,
    title: 'पाठ २: कक्षा निर्देश एवं बातचीत (Classroom Instructions)',
    description: 'शिक्षक द्वारा कक्षा में दिए जाने वाले बुनियादी निर्देश',
    language_code: 'sat',
    content: JSON.stringify({
      instructions: [
        { hindi: 'बैठ जाओ', tribal: 'ᱫᱩᱲᱩᱵᱽ ᱯᱮ', phonetic: 'दुड़ुब पे' },
        { hindi: 'किताब खोलो', tribal: 'ᱯᱳᱛᱷᱤ ᱯᱷᱟᱲᱟᱣ ᱯᱮ', phonetic: 'पोथी फाड़ाव पे' }
      ]
    }),
    created_by: 1
  },
  {
    id: 3,
    title: 'पाठ १: हो भाषा में दैनिक शब्द (Daily Words in Ho)',
    description: 'वारंग क्षिति और देवनागरी में हो भाषा की शब्दावली',
    language_code: 'hoc',
    content: JSON.stringify({
      intro: 'हो भाषा में पानी और पेड़ जैसे दैनिक शब्दों का अभ्यास।',
      words: [{ word: 'दाः', warang: '𑢼𑢡𑣄', meaning: 'पानी' }, { word: 'दारू', meaning: 'पेड़' }]
    }),
    created_by: 1
  },
  {
    id: 4,
    title: 'पाठ १: मुण्डारी परिवेश एवं प्रकृति (Mundari Nature Words)',
    description: 'मुण्डारी भाषा में प्रकृति और पशु-पक्षियों के नाम',
    language_code: 'unr',
    content: JSON.stringify({
      intro: 'मुण्डारी भाषा में हमारे आसपास की प्रकृति को जानें।',
      words: [{ word: 'दारू', meaning: 'पेड़' }, { word: 'हाकु', meaning: 'मछली' }]
    }),
    created_by: 1
  }
];

export async function getLessons(req, res, next) {
  try {
    const { language } = req.query;
    let sql = `
      SELECT l.id, l.title, l.description, l.language_code, l.content, l.created_by,
             u.name AS creator_name, l.created_at, l.updated_at
      FROM lessons l
      LEFT JOIN users u ON l.created_by = u.id
    `;
    const params = [];

    if (language) {
      sql += ' WHERE l.language_code = ?';
      params.push(language);
    }
    sql += ' ORDER BY l.id ASC';

    const result = await query(sql, params);

    if (!result.success && result.offline) {
      const filtered = language 
        ? OFFLINE_LESSONS.filter(l => l.language_code === language)
        : OFFLINE_LESSONS;
      return res.json({ success: true, offline: true, data: filtered });
    }

    res.json({ success: true, offline: false, data: result.rows });
  } catch (err) {
    next(err);
  }
}

export async function getLessonById(req, res, next) {
  try {
    const { id } = req.params;
    const sql = `
      SELECT l.id, l.title, l.description, l.language_code, l.content, l.created_by,
             u.name AS creator_name, l.created_at, l.updated_at
      FROM lessons l
      LEFT JOIN users u ON l.created_by = u.id
      WHERE l.id = ?
    `;
    const result = await query(sql, [id]);

    if (!result.success && result.offline) {
      const match = OFFLINE_LESSONS.find(l => l.id === parseInt(id, 10));
      if (!match) return res.status(404).json({ success: false, error: 'NotFound', message: 'Lesson not found' });
      return res.json({ success: true, offline: true, data: match });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Lesson not found' });
    }

    res.json({ success: true, offline: false, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

export async function createLesson(req, res, next) {
  try {
    const { title, description = '', language_code, content, created_by = 1 } = req.body;
    const contentStr = typeof content === 'object' ? JSON.stringify(content) : content;

    const sql = `
      INSERT INTO lessons (title, description, language_code, content, created_by)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await query(sql, [title.trim(), description, language_code, contentStr, created_by]);

    if (!result.success && result.offline) {
      return res.status(503).json({
        success: false,
        offline: true,
        message: 'MySQL is offline. Lesson saved to local state only.'
      });
    }

    res.status(201).json({
      success: true,
      data: { id: result.rows.insertId, title, description, language_code, created_by }
    });
  } catch (err) {
    next(err);
  }
}

export async function updateLesson(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, language_code, content } = req.body;

    const contentStr = content ? (typeof content === 'object' ? JSON.stringify(content) : content) : null;
    const sql = `
      UPDATE lessons 
      SET title = COALESCE(?, title),
          description = COALESCE(?, description),
          language_code = COALESCE(?, language_code),
          content = COALESCE(?, content)
      WHERE id = ?
    `;
    const result = await query(sql, [title, description, language_code, contentStr, id]);

    if (!result.success && result.offline) {
      return res.status(503).json({
        success: false,
        offline: true,
        message: 'MySQL is offline. Update saved locally only.'
      });
    }

    res.json({ success: true, message: 'Lesson updated successfully' });
  } catch (err) {
    next(err);
  }
}

export async function deleteLesson(req, res, next) {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM lessons WHERE id = ?';
    const result = await query(sql, [id]);

    if (!result.success && result.offline) {
      return res.status(503).json({
        success: false,
        offline: true,
        message: 'MySQL is offline. Delete performed locally only.'
      });
    }

    res.json({ success: true, message: 'Lesson deleted successfully' });
  } catch (err) {
    next(err);
  }
}
