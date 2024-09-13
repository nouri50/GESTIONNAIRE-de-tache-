const express = require('express');
const authController = require('../controllers/authController');
const authValidator = require('../middleware/authValidator');

const router = express.Router();

// Route d'inscription avec validation
router.post('/register', authValidator.validateRegister, authController.register);

// Route de connexion (vous pouvez ajouter une validation ici aussi)
router.post('/login', authController.login);

module.exports = router;


