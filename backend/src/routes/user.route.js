// backend/src/routes/user.route.js
import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controller/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Middleware d'authentification

const router = express.Router();

// Récupérer tous les utilisateurs
router.get('/users', authMiddleware, getAllUsers);

// Mettre à jour un utilisateur
router.put('/users/:id', authMiddleware, updateUser);

// Supprimer un utilisateur
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;
