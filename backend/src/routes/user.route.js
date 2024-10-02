import express from 'express';
import { getAllUsers, getUserProfile } from '../controller/user.controller.js'; 
import { updateUser } from '../controller/user.controller.js'; // Assurez-vous que cette fonction est définie
import authMiddleware from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get('/users', authMiddleware, getAllUsers); // Route protégée par authMiddleware

// Route pour récupérer le profil utilisateur
router.get('/profile', authMiddleware, getUserProfile);




// Route pour mettre à jour un utilisateur
router.put('/users/:id', authMiddleware, updateUser);





export default router;
