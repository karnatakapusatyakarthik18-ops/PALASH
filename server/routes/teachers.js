import express from 'express';
import { getTeachers, getStudentsByTeacher } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getTeachers);
router.get('/:id/students', getStudentsByTeacher);

export default router;
