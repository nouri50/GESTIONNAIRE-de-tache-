import express from 'express';
import { getUserProfile } from '../controller/user.controller.js'; // Assurez-vous que cette importation est correcte
import authMiddleware from '../middleware/authMiddleware.js'; // Importer authMiddleware

const router = express.Router();

// Route protégée pour obtenir le profil de l'utilisateur
router.get('/profile', authMiddleware, getUserProfile); // Utilisation d'authMiddleware ici

export default router;
