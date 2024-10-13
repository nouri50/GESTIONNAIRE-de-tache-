import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Op } from 'sequelize'; // Import de Op pour les opérateurs Sequelize
import User from '../model/user.model.js';
import { sendResetEmail } from '../utils/mailer.js'; // Correct import

// Inscription

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hachage du mot de passe avant de créer l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ 
      email, 
      password: hashedPassword, 
      role: 'user', 
      status: 'active' // Défaut pour le statut
    });

    // Générer un token JWT
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Réponse réussie avec le token et les infos utilisateur
    return res.status(201).json({ 
      message: "Inscription réussie", 
      token, 
      user: { 
        id: newUser.id, 
        email: newUser.email 
      } 
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
};

// Fonction de connexion
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Comparer le mot de passe entré avec le mot de passe haché dans la base de données
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT si la vérification réussit
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
};


// Réinitialiser le mot de passe
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const user = await User.findOne({ where: { resetPasswordToken: token, resetPasswordExpires: { [Op.gt]: Date.now() } } });
    if (!user) {
      return res.status(400).json({ message: 'Token invalide ou expiré.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe :', error);
    res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe.' });
  }
};

// Fonction pour gérer l'oubli de mot de passe
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure

    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendResetEmail(user.email, resetLink);
    res.status(200).json({ message: 'Email de réinitialisation envoyé.' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
  }
};

// Fonction pour vérifier le mot de passe
export const verifyPassword = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    res.status(200).json({ isValid: true });
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};