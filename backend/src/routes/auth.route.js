import express from 'express';
import { login, register} from '../controller/auth.controller.js'; // Importer les contrôleurs d'authentification
import authMiddleware from '../middleware/authMiddleware.js'; // Importer le middleware d'authentification

const router = express.Router();

// Route d'inscription
router.post('/register', register);

// Route de connexion
router.post('/login', login);


export default router;
