import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controller/task.controller.js';

const router = express.Router();

// Routes pour la gestion des tâches
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
