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
    const user = await User.findByPk(req.user.id); // Trouve l'utilisateur connecté
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await user.destroy(); // Supprime l'utilisateur de la base de données
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

    // Mise à jour des champs
    user.email = email || user.email;
    user.role = role || user.role;
    user.status = status || user.status;

    await user.save();
    res.status(200).json({ message: 'Utilisateur modifié avec succès.', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification de l\'utilisateur.' });
  }
};

export const deleteUserWithPasswordCheck = async (req, res) => {
  const { userId, password } = req.body;
  const loggedInUserId = req.user.id;

  try {
    // Trouver l'utilisateur connecté
    const loggedInUser = await User.findByPk(loggedInUserId);
    if (!loggedInUser) {
      return res.status(404).json({ message: 'Utilisateur connecté non trouvé.' });
    }

    // Vérifier si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, loggedInUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Trouver l'utilisateur à supprimer
    const userToDelete = await User.findByPk(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'Utilisateur à supprimer non trouvé.' });
    }

    // Vérifier le statut de l'utilisateur avant suppression
    if (userToDelete.status !== 'active') {
      return res.status(400).json({ message: 'Impossible de supprimer un utilisateur inactif.' });
    }

    await userToDelete.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur.' });
  }
};
