import express from 'express';
import { forgotPassword, resetPassword, login, register } from '../controller/auth.controller.js';
import { deleteOwnAccount } from '../controller/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Assure-toi que cet import est bien présent
const router = express.Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/login', login);
router.post('/register', register);

// Route pour que l'utilisateur connecté puisse supprimer son propre compte



export default router;
