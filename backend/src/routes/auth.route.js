import express from 'express';
import { forgotPassword, resetPassword, login, register } from '../controller/auth.controller.js';
import { deleteOwnAccount } from '../controller/user.controller.js';
const router = express.Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/login', login);
router.post('/register', register);

// Route pour que l'utilisateur connecté puisse supprimer son propre compte
router.delete('/profile/delete', authMiddleware, deleteOwnAccount);


export default router;
