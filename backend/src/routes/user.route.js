// backend/src/routes/user.route.js
import express from 'express';
import { getAllUsers, updateUser, deleteUser, getUserProfile } from '../controller/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile); // Route pour récupérer le profil utilisateur
router.get('/users', getAllUsers);                      // Route pour récupérer tous les utilisateurs
router.put('/users/:id', authMiddleware, updateUser);    // Route pour mettre à jour un utilisateur
router.delete('/users/:id', authMiddleware, deleteUser); // Route pour supprimer un utilisateur

export default router;
