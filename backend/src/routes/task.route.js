import express from 'express';
<<<<<<< HEAD
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';


const router = express.Router();

=======
import { getTasks, createTask, updateTask, deleteTask } from '../controller/task.controller.js';

const router = express.Router();

// Routes pour la gestion des tâches
>>>>>>> dev
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
