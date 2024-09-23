import express from 'express';
import { getUserProfile } from '../controller/user.controller.js';
import authenticateJWT from '../middleware/authenticateJWT.js';

const router = express.Router();

// Appliquer le middleware à cette route
router.get('/profile', authenticateJWT, getUserProfile);

export default router;
