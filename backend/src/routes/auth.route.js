import express from 'express';
import { register, login } from '../controller/auth.controller.js'; // Assurez-vous du bon chemin vers le contrôleur
import { validateRegister } from '../middleware/authValidator.js';

const router = express.Router();

// Route d'inscription
router.post('/register', validateRegister, register);

// Route de connexion
router.post('/login', login);

export default router;
