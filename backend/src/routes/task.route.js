import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controller/task.controller.js'; // Assurez-vous que ce chemin est correct

const router = express.Router();

// Routes des tâches
router.get('/', getTasks);                  // Récupérer toutes les tâches
router.post('/', createTask);               // Créer une nouvelle tâche
router.put('/:id', updateTask);             // Mettre à jour une tâche existante par ID
router.delete('/:id', deleteTask);          // Supprimer une tâche par ID

export default router;
