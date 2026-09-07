import express from 'express';
import { getStudentProgress, updateProgress } from '../controllers/progressController.js';
import { submitQuizResult } from '../controllers/quizController.js';
import { validateQuizResult } from '../middleware/validation.js';

const router = express.Router();

router.get('/students/:id', getStudentProgress);
router.post('/update', updateProgress);
router.post('/quiz-results', validateQuizResult, submitQuizResult);

export default router;
