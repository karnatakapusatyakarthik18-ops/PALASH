/**
 * User, Teacher & Student Management Controller
 */

import { query } from '../models/db.js';

export async function getAllUsers(req, res, next) {
  try {
    const { role } = req.query;
    let sql = 'SELECT id, name, role, email, phone, created_at, updated_at FROM users';
    const params = [];

    if (role) {
      sql += ' WHERE role = ?';
      params.push(role);
    }
    sql += ' ORDER BY id ASC';

    const result = await query(sql, params);
    if (!result.success && result.offline) {
      // Offline fallback: Return built-in sample user profiles
      return res.json({
        success: true,
        offline: true,
        data: [
          { id: 1, name: 'अनिता मुर्मू (Anita Murmu)', role: 'teacher', email: 'anita.murmu@jharkhand.edu.in' },
          { id: 2, name: 'बिरसा सोरेन (Birsa Soren)', role: 'student', email: 'birsa.soren@student.palash.org' }
        ]
      });
    }

    return res.json({ success: true, offline: false, data: result.rows });
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const { name, role = 'student', email = null, phone = null } = req.body;
    const sql = 'INSERT INTO users (name, role, email, phone) VALUES (?, ?, ?, ?)';
    const result = await query(sql, [name.trim(), role, email, phone]);

    if (!result.success && result.offline) {
      return res.status(503).json({
        success: false,
        offline: true,
        message: 'Database is offline. Changes saved locally only.'
      });
    }

    res.status(201).json({
      success: true,
      data: { id: result.rows.insertId, name, role, email, phone }
    });
  } catch (err) {
    next(err);
  }
}

export async function getTeachers(req, res, next) {
  try {
    const sql = `
      SELECT t.id, t.user_id, u.name, u.email, u.phone, t.school_name, t.district, 
             t.qualification, t.primary_language, t.target_tribal_language, t.created_at
      FROM teachers t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.id ASC
    `;
    const result = await query(sql);

    if (!result.success && result.offline) {
      return res.json({
        success: true,
        offline: true,
        data: [
          {
            id: 1,
            user_id: 1,
            name: 'अनिता मुर्मू (Anita Murmu)',
            school_name: 'उत्क्रमित प्राथमिक विद्यालय, शिकारीपाड़ा',
            district: 'Dumka',
            qualification: 'B.Ed, MTB-MLE Certified',
            primary_language: 'hindi',
            target_tribal_language: 'santhali'
          }
        ]
      });
    }

    res.json({ success: true, offline: false, data: result.rows });
  } catch (err) {
    next(err);
  }
}

export async function getStudentsByTeacher(req, res, next) {
  try {
    const { id } = req.params;
    // Look up students for teacher's school or all students
    const sql = `
      SELECT s.id, s.user_id, u.name, s.roll_number, s.grade_level, s.native_language, s.school_name,
             p.lessons_completed, p.total_score, p.vocabulary_learned, p.last_activity
      FROM students s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN student_progress p ON s.id = p.student_id
      ORDER BY s.id ASC
    `;
    const result = await query(sql);

    if (!result.success && result.offline) {
      return res.json({
        success: true,
        offline: true,
        data: [
          {
            id: 1,
            user_id: 2,
            name: 'बिरसा सोरेन (Birsa Soren)',
            roll_number: 'ROLL-01',
            grade_level: 'कक्षा 1 (Grade 1)',
            native_language: 'santhali',
            school_name: 'उत्क्रमित प्राथमिक विद्यालय, शिकारीपाड़ा',
            lessons_completed: 2,
            total_score: 95,
            vocabulary_learned: 12
          }
        ]
      });
    }

    res.json({ success: true, offline: false, data: result.rows });
  } catch (err) {
    next(err);
  }
}
