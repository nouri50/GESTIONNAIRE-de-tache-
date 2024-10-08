import express from 'express';
import { getAllUsers, updateUser, deleteUser, getUserProfile } from '../controller/user.controller.js';
import { deleteOwnAccount } from '../controller/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour récupérer le profil utilisateur (nécessite une authentification)
router.get('/profile', authMiddleware, getUserProfile);

// Route pour récupérer tous les utilisateurs (nécessite une authentification)
router.get('/users', authMiddleware, getAllUsers);

// Route pour mettre à jour un utilisateur (nécessite une authentification)
router.put('/users/:id', authMiddleware, updateUser);

// Route pour supprimer un utilisateur (nécessite une authentification)
router.delete('/users/:id', authMiddleware, deleteUser);

// Route pour supprimer le compte de l'utilisateur connecté (nécessite une authentification)
router.delete('/profile/delete', authMiddleware, deleteOwnAccount);

export default router;
