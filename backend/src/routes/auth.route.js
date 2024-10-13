import express from 'express';
import { login, register, forgotPassword, resetPassword, verifyPassword } from '../controller/auth.controller.js';
import { validateLogin, validateRegister } from '../middleware/authValidator.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/verify-password', authMiddleware, verifyPassword);

export default router;
