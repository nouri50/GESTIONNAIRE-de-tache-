import express from 'express';
import { login, register } from '../controller/auth.controller.js';  // Importer les contrôleurs login et register

const router = express.Router();

// Route pour la connexion
router.post('/login', login);

// Route pour l'enregistrement
router.post('/register', register);

export default router;
