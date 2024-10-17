import express from 'express';
import { getAllUsers, updateUser,deleteUser,getUserProfile,deleteOwnAccount,deleteUserWithPasswordCheck } from '../controller/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour récupérer le profil utilisateur (nécessite une authentification)
router.get('/profile', authMiddleware, getUserProfile);

// Route pour récupérer tous les utilisateurs (nécessite une authentification)
router.get('/', authMiddleware, getAllUsers); // Utiliser '/' au lieu de '/users'

// Route pour mettre à jour un utilisateur (nécessite une authentification)
router.put('/:id', authMiddleware, updateUser); // Utiliser '/:id' au lieu de '/users/:id'

// Route pour supprimer un utilisateur (nécessite une authentification)
router.delete('/:id', authMiddleware, deleteUser); // Utiliser '/:id' au lieu de '/users/:id'

// Route pour supprimer le compte de l'utilisateur connecté (nécessite une authentification)
router.delete('/profile/delete', authMiddleware, deleteOwnAccount);

// Route pour supprimer un utilisateur avec vérification du mot de passe
router.post('/delete-with-password', authMiddleware, deleteUserWithPasswordCheck);

export default router;
