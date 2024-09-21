import express from 'express';
import { getUserProfile } from '../controller/user.controller.js';  // Importer le contrôleur getUserProfile

const router = express.Router();

// Route pour récupérer le profil utilisateur
router.get('/profile', getUserProfile);

export default router;
