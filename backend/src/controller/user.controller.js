import bcrypt from 'bcryptjs';
import User from '../model/user.model.js';
import { validationResult } from 'express-validator';

// Fonction pour récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

// Fonction pour supprimer son propre compte
export const deleteOwnAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Compte supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du compte :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du compte.' });
  }
};

// Fonction pour supprimer un utilisateur (par admin)
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};

// Fonction pour récupérer le profil utilisateur
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil utilisateur.' });
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.params.id;
  const { email, role, status } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    user.email = email || user.email;
    user.role = role || user.role;
    user.status = status || user.status;

    await user.save();
    res.status(200).json({ message: 'Utilisateur modifié avec succès.', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification de l\'utilisateur.' });
  }
};

// Fonction pour supprimer un utilisateur avec vérification du mot de passe


// Fonction pour supprimer un utilisateur avec vérification du mot de passe
export const deleteUserWithPasswordCheck = async (req, res) => {
  const { userId, password } = req.body; // Le mot de passe doit être passé dans la requête
  const loggedInUserId = req.user.id;    // ID de l'utilisateur connecté via le token JWT

  try {
    const userToDelete = await User.findByPk(userId);
    const loggedInUser = await User.findByPk(loggedInUserId);

    if (!userToDelete) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérification du mot de passe pour tous les utilisateurs (admin ou non)
    const isPasswordValid = await bcrypt.compare(password, loggedInUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Suppression de l'utilisateur après validation du mot de passe
    await userToDelete.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });

  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};

// Fonction pour supprimer un utilisateur avec vérification du mot de passe admin
export const deleteUserWithAdminPasswordCheck = async (req, res) => {
  const { userId, adminPassword } = req.body;  // Mot de passe de l'administrateur entré

  try {
    const admin = await User.findByPk(req.user.id);  // Trouver l'admin connecté

    // Vérification si l'utilisateur connecté est bien un administrateur
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: 'Accès interdit. Seul un administrateur peut supprimer des comptes.' });
    }

    // Vérification du mot de passe de l'administrateur
    const isPasswordValid = await bcrypt.compare(adminPassword, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe administrateur incorrect.' });
    }

    // Si le mot de passe est valide, supprimer l'utilisateur
    const userToDelete = await User.findByPk(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    await userToDelete.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};