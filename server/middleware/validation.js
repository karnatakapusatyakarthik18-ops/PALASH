/**
 * Lightweight Input Validation Middleware
 */

export function validateUser(req, res, next) {
  const { name, role } = req.body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, error: 'ValidationError', message: 'Name is required' });
  }
  if (role && !['teacher', 'student', 'admin'].includes(role)) {
    return res.status(400).json({ success: false, error: 'ValidationError', message: 'Role must be teacher, student, or admin' });
  }
  next();
}

export function validateLesson(req, res, next) {
  const { title, language_code, content } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ success: false, error: 'ValidationError', message: 'Lesson title is required' });
  }
  if (!language_code || typeof language_code !== 'string') {
    return res.status(400).json({ success: false, error: 'ValidationError', message: 'Language code is required' });
  }
  if (!content) {
    return res.status(400).json({ success: false, error: 'ValidationError', message: 'Lesson content is required' });
  }
  next();
}

export function validateVocabulary(req, res, next) {
  const { source_word, target_word, target_language } = req.body;
  if (!source_word || !target_word || !target_language) {
    return res.status(400).json({
      success: false,
      error: 'ValidationError',
      message: 'source_word, target_word, and target_language are required'
    });
  }
  next();
}

export function validateQuizResult(req, res, next) {
  const { student_id, quiz_id, score } = req.body;
  if (student_id === undefined || quiz_id === undefined || score === undefined) {
    return res.status(400).json({
      success: false,
      error: 'ValidationError',
      message: 'student_id, quiz_id, and score are required'
    });
  }
  next();
}
