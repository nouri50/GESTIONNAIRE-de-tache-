import express from 'express';
import { login, getUserProfile } from '../controller/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login); // Route publique pour la connexion
router.get('/profile', authMiddleware, getUserProfile); // Route protégée pour récupérer le profil utilisateur

export default router;
