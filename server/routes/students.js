import express from 'express';
import { getStudentProgress, updateProgress } from '../controllers/progressController.js';

const router = express.Router();

router.get('/:id/progress', getStudentProgress);
router.post('/progress', updateProgress);

export default router;
