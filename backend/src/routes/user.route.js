import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controller/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour obtenir tous les utilisateurs
router.get('/users', authMiddleware, getAllUsers);

// Autres routes (pour la mise à jour et suppression des utilisateurs)
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;
