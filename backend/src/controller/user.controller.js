import User from '../model/user.model.js';

// Fonction pour récupérer tous les utilisateurs


// backend/src/controller/user.controller.js
export const getAllUsers = async (req, res) => {
  console.log('Requête reçue pour récupérer tous les utilisateurs');
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

// backend/src/controller/user.controller.js


// Fonction pour supprimer un utilisateur
export const deleteUser = async (req, res) => {
  const userId = req.params.id; // Récupère l'ID de l'utilisateur depuis les paramètres de la requête
  try {
    const user = await User.findByPk(userId); // Recherche l'utilisateur par son ID
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await user.destroy(); // Supprime l'utilisateur
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil utilisateur.' });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { email, role, status } = req.body; // Assurez-vous que ces champs existent dans la requête

  try {
    const user = await User.findByPk(userId); // Cherchez l'utilisateur par ID

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Mettez à jour les champs de l'utilisateur
    user.email = email || user.email;
    user.role = role || user.role;
    user.status = status || user.status;

    await user.save(); // Sauvegardez les modifications

    res.status(200).json({ message: 'Utilisateur modifié avec succès.', user });
  } catch (error) {
    console.error('Erreur lors de la modification de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la modification de l\'utilisateur.' });
  }
};