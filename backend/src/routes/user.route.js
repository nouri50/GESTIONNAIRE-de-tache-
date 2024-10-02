import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controller/task.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getTasks);                  // Récupérer toutes les tâches
router.post('/', authMiddleware, createTask);               // Créer une nouvelle tâche
router.put('/:id', authMiddleware, updateTask);             // Mettre à jour une tâche
router.delete('/:id', authMiddleware, deleteTask);          // Supprimer une tâche

export default router;




