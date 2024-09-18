import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Fonction pour enregistrer un nouvel utilisateur
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Utilisateur déjà existant' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel utilisateur
    const newUser = await User.create({ email, password: hashedPassword });

    // Génération d'un token JWT
    const token = jwt.sign({ userId: newUser.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Envoie du token en réponse
    res.status(201).json({ token });
  } catch (error) {
    console.error('Erreur lors de l\'inscription', error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' });
  }
};

// Fonction pour la connexion
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
  }
};
