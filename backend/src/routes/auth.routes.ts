
import { Router } from 'express';
import { registerStudent, registerStaff, login, verifyStudent } from '../controllers/auth.controller';

const router = Router();

// Login
router.post('/login', login);

// Register Student
router.post('/verify-student', verifyStudent);
router.post('/register/student', registerStudent);

// Register Staff
router.post('/register/staff', registerStaff);

export default router;
