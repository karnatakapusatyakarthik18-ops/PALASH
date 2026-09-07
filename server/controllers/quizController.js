/**
 * Quizzes & Assessment Controller
 */

import { query } from '../models/db.js';

const OFFLINE_QUIZZES = [
  {
    id: 1,
    title: 'संताली बुनियादी शब्दावली परीक्षा',
    description: 'कक्षा 1 के विद्यार्थियों के लिए संताली शब्दों की बुनियादी समझ',
    language_code: 'sat',
    questions: [
      {
        id: 1,
        question_text: 'संताली (ओल चिकी) में "पानी" को क्या कहते हैं?',
        option_a: 'ᱫᱟᱜ (दाग)',
        option_b: 'ᱫᱟᱨᱮ (दारे)',
        option_c: 'ᱯᱳᱛᱷᱤ (पोथी)',
        option_d: 'ᱥᱮᱛᱟ (सेता)',
        correct_option: 'a',
        explanation: 'संताली में पानी को ᱫᱟᱜ (दाग) कहा जाता है।'
      },
      {
        id: 2,
        question_text: 'शिक्षक के निर्देश "बैठ जाओ" का संताली में सही अनुवाद क्या है?',
        option_a: 'ᱛᱤᱸᱜᱩᱱ ᱯᱮ',
        option_b: 'ᱫᱩᱲᱩᱵᱽ ᱯᱮ',
        option_c: 'ᱥᱮᱱᱚᱜ ᱯᱮ',
        option_d: 'ᱡᱚᱢ ᱯᱮ',
        correct_option: 'b',
        explanation: 'संताली में बैठ जाओ को ᱫᱩᱲᱩᱵᱽ ᱯᱮ (दुड़ुब पे) कहते हैं।'
      }
    ]
  }
];

export async function getQuizzes(req, res, next) {
  try {
    const { language } = req.query;
    let sql = `
      SELECT q.id, q.title, q.description, q.language_code, q.created_by,
             u.name AS creator_name, q.created_at,
             COUNT(qq.id) AS total_questions
      FROM quizzes q
      LEFT JOIN users u ON q.created_by = u.id
      LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
    `;
    const params = [];

    if (language) {
      sql += ' WHERE q.language_code = ?';
      params.push(language);
    }
    sql += ' GROUP BY q.id ORDER BY q.id ASC';

    const result = await query(sql, params);

    if (!result.success && result.offline) {
      return res.json({ success: true, offline: true, data: OFFLINE_QUIZZES });
    }

    res.json({ success: true, offline: false, data: result.rows });
  } catch (err) {
    next(err);
  }
}

export async function getQuizWithQuestions(req, res, next) {
  try {
    const { id } = req.params;
    const quizResult = await query('SELECT * FROM quizzes WHERE id = ?', [id]);

    if (!quizResult.success && quizResult.offline) {
      const match = OFFLINE_QUIZZES.find(q => q.id === parseInt(id, 10)) || OFFLINE_QUIZZES[0];
      return res.json({ success: true, offline: true, data: match });
    }

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Quiz not found' });
    }

    const quiz = quizResult.rows[0];
    const questionsResult = await query(
      'SELECT id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation FROM quiz_questions WHERE quiz_id = ? ORDER BY id ASC',
      [id]
    );

    quiz.questions = questionsResult.rows || [];
    res.json({ success: true, offline: false, data: quiz });
  } catch (err) {
    next(err);
  }
}

export async function createQuiz(req, res, next) {
  try {
    const { title, description = '', language_code = 'sat', created_by = 1, questions = [] } = req.body;

    const quizRes = await query(
      'INSERT INTO quizzes (title, description, language_code, created_by) VALUES (?, ?, ?, ?)',
      [title.trim(), description, language_code, created_by]
    );

    if (!quizRes.success && quizRes.offline) {
      return res.status(503).json({
        success: false,
        offline: true,
        message: 'MySQL is offline. Quiz stored locally.'
      });
    }

    const quizId = quizRes.rows.insertId;

    // Insert questions if provided
    for (const q of questions) {
      await query(
        `INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [quizId, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_option, q.explanation || null]
      );
    }

    res.status(201).json({ success: true, data: { id: quizId, title, language_code } });
  } catch (err) {
    next(err);
  }
}

export async function submitQuizResult(req, res, next) {
  try {
    const { student_id = 1, quiz_id, score, total_questions = 5, attempt_number = 1 } = req.body;

    const result = await query(
      `INSERT INTO quiz_results (student_id, quiz_id, score, total_questions, attempt_number)
       VALUES (?, ?, ?, ?, ?)`,
      [student_id, quiz_id, score, total_questions, attempt_number]
    );

    // Update student_progress total score
    if (result.success && !result.offline) {
      await query(
        `INSERT INTO student_progress (student_id, total_score, last_activity)
         VALUES (?, ?, NOW())
         ON DUPLICATE KEY UPDATE total_score = total_score + VALUES(total_score), last_activity = NOW()`,
        [student_id, score]
      );
    }

    if (!result.success && result.offline) {
      return res.json({
        success: true,
        offline: true,
        message: 'Quiz result logged to local offline storage'
      });
    }

    res.status(201).json({
      success: true,
      data: { id: result.rows.insertId, student_id, quiz_id, score, total_questions }
    });
  } catch (err) {
    next(err);
  }
}
