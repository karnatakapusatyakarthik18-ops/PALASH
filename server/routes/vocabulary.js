import express from 'express';
import { getVocabulary, addVocabulary } from '../controllers/vocabularyController.js';
import { validateVocabulary } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getVocabulary);
router.post('/', validateVocabulary, addVocabulary);

export default router;
