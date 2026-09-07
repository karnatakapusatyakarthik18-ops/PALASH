import express from 'express';
import { getAllUsers, createUser } from '../controllers/userController.js';
import { validateUser } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', validateUser, createUser);

export default router;
