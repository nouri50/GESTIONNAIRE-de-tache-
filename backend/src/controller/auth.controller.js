import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Op } from 'sequelize'; // Import de Op pour les opérateurs Sequelize
import User from '../model/user.model.js';
import { sendResetEmail } from '../utils/mailer.js'; // Correct import

// Inscription

// Inscription
export const register = async (req, res) => {
  const { email, password } = req.body;
  if (password.length < 6 || password.length > 15) {
    return res.status(400).json({ message: "Le mot de passe doit contenir entre 6 et 15 caractères." });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Créer un nouvel utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    // Générer un token JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Renvoyer le token et les informations de l'utilisateur
    res.status(201).json({ message: "Inscription réussie", token, user: newUser });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
};


// Connexion
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
};

// Réinitialiser mot de passe
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Token invalide ou expiré.' });
    }

    // Mettre à jour le mot de passe
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
  console.log('Requête reçue pour réinitialisation de mot de passe pour : ', email);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Définir l'expiration à 1 heure à partir de l'heure actuelle (en UTC)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 heure

    await user.save();

    console.log('Envoi de l\'email à :', email);
    await sendResetEmail(user.email, resetLink);
    console.log('Email envoyé avec succès');

    res.status(200).json({ message: 'Un email de réinitialisation a été envoyé.' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
  }
};
