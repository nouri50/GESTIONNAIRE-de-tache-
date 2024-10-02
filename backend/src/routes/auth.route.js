import express from 'express';
import { login, register } from '../controller/auth.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes d'authentification
router.post('/login', login);
router.post('/register', register);

export default router;
