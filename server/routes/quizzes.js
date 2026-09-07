import express from 'express';
import {
  getQuizzes,
  getQuizWithQuestions,
  createQuiz,
  submitQuizResult
} from '../controllers/quizController.js';
import { validateQuizResult } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getQuizzes);
router.get('/:id', getQuizWithQuestions);
router.post('/', createQuiz);
router.post('/results', validateQuizResult, submitQuizResult);

export default router;
