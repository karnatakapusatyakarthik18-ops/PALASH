import express from 'express';
import { logTranslation, getTranslationHistory } from '../controllers/translationController.js';

const router = express.Router();

router.post('/translation-history', logTranslation);
router.get('/translation-history', getTranslationHistory);

export default router;
