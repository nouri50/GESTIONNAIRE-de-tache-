// backend/src/middleware/authValidator.js
import { body, validationResult } from 'express-validator';

// Validation pour l'inscription
export const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Veuillez fournir une adresse email valide.'),
  
  body('password')
    .isLength({ min: 6, max: 15 })
    .withMessage('Le mot de passe doit contenir entre 6 et 15 caractères.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation pour la connexion
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Veuillez fournir une adresse email valide.'),
  
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
