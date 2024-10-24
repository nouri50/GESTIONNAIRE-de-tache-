import express from 'express';
import { getAllUsers, updateUser, deleteUser, getUserProfile, deleteOwnAccount, deleteUserWithPasswordCheck } from '../controller/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour récupérer le profil de l'utilisateur connecté (nécessite une authentification)
router.get('/profile', authMiddleware, getUserProfile);

// Route pour récupérer tous les utilisateurs (nécessite une authentification et un rôle admin par exemple)
router.get('/', authMiddleware, getAllUsers); 

// Route pour mettre à jour un utilisateur spécifique (nécessite une authentification)
router.put('/:id', authMiddleware, updateUser); 

// Route pour supprimer un utilisateur spécifique (nécessite une authentification)
router.delete('/:id', authMiddleware, deleteUser); 

// Route pour supprimer le compte de l'utilisateur connecté (nécessite une authentification)
router.delete('/profile/delete', authMiddleware, deleteOwnAccount);

// Route pour supprimer un utilisateur en vérifiant son mot de passe (nécessite une authentification)
router.post('/delete-with-password', authMiddleware, deleteUserWithPasswordCheck);

export default router;
