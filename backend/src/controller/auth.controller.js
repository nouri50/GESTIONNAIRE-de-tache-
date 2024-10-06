import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../model/user.model.js';
import { sendResetEmail } from '../utils/mailer.js'; // Correct import

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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "Inscription réussie", user: newUser });
  } catch (error) {
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

// Changement de mot de passe
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (newPassword.length < 6 || newPassword.length > 15) {
    return res.status(400).json({ message: "Le nouveau mot de passe doit contenir entre 6 et 15 caractères." });
  }

  try {
    const user = await User.findByPk(req.user.id);
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(400).json({ message: "L'ancien mot de passe est incorrect." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ message: "Mot de passe modifié avec succès." });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du changement de mot de passe.' });
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
        resetPasswordExpires: { $gt: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Token invalide ou expiré.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (error) {
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
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    await user.save();

    await sendResetEmail(user.email, resetLink);

    res.status(200).json({ message: 'Un email de réinitialisation a été envoyé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
  }
};
