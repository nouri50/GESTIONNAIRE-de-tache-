import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = express.Router();

// Route d'inscription
router.post('/register', register);

// Route de connexion
router.post('/login', login);

export default router;
