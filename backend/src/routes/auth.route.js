import express from 'express';
import { forgotPassword, resetPassword, login, register } from '../controller/auth.controller.js';

const router = express.Router();

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

// Route pour l'envoi d'un email de réinitialisation du mot de passe
router.post('/forgot-password', forgotPassword);

// Route pour la réinitialisation du mot de passe via un token
router.post('/reset-password/:token', resetPassword);

export default router;
