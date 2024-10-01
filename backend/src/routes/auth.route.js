// backend/src/routes/auth.route.js
import express from 'express';
import { login, register } from '../controller/auth.controller.js';
import { validateRegister, validateLogin } from '../middleware/authValidator.js';

const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);

export default router;
