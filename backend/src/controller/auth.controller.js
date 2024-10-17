import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // Utilisez directement 'crypto' intégré dans Node.js
import { Op } from 'sequelize'; // Import de Op pour les opérateurs Sequelize
import User from '../model/user.model.js';
import { sendResetEmail } from '../utils/mailer.js'; // Correct import

// Inscription
// Contrôleur pour l'inscription d'un utilisateur
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe sont requis' });
    }

    console.log('Données reçues :', req.body);

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Utilisateur existe déjà' });
    }

    // Hacher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Mot de passe haché');

    // Créer un nouvel utilisateur
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'Utilisateur créé', user });
  } catch (error) {
    console.error('Erreur interne :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Expiration du token
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
};
// Connexion

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
