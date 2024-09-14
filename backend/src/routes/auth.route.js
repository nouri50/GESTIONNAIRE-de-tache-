import express from 'express';
<<<<<<< HEAD
import { register, login } from '../controller/auth.controller.js'; // Assurez-vous du bon chemin vers le contrôleur
import { validateRegister } from '../middleware/authValidator.js';

const router = express.Router();

// Route d'inscription
router.post('/register', validateRegister, register);

// Route de connexion
router.post('/login', login);
=======
import { getTasks, createTask, updateTask, deleteTask } from '../controller/task.controller.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
>>>>>>> dev

export default router;
