import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controller/task.controller.js'; // Assurez-vous que ce chemin est correct
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// Routes des tâches
router.get('/', authMiddleware, getTasks);                  // Récupérer toutes les tâches
router.post('/', authMiddleware, createTask);  // Utilisez authMiddleware pour protéger cette route

router.put('/:id', authMiddleware, updateTask);             // Mettre à jour une tâche existante par ID
router.delete('/:id', authMiddleware, deleteTask);          // Supprimer une tâche par ID

export default router;
