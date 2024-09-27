import express from 'express';
import { login, register, changePassword } from '../controller/auth.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour s'inscrire
router.post('/register', register);

// Route pour se connecter
router.post('/login', login);

// Route pour changer le mot de passe
router.put('/change-password', authMiddleware, changePassword);

export default router;
