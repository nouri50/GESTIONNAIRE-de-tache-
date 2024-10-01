// backend/src/controller/user.controller.js

import User from '../model/user.model.js';

// Fonction pour obtenir tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Récupération de tous les utilisateurs depuis la base de données
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

// Fonction pour obtenir le profil d'un utilisateur
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); // Récupération du profil de l'utilisateur connecté
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil utilisateur.' });
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Récupération de l'utilisateur à mettre à jour
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    const { role, status } = req.body; // Récupération des données envoyées dans le corps de la requête
    user.role = role;
    user.status = status;

    await user.save(); // Sauvegarde des modifications
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Récupération de l'utilisateur à supprimer
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    await user.destroy(); // Suppression de l'utilisateur
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};

