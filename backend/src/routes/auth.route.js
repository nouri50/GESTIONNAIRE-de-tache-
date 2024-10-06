import express from 'express';
import { forgotPassword, resetPassword, login, register } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/login', login);
router.post('/register', register);

export default router;
