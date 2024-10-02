import User from '../model/user.model.js';

// Fonction pour récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Exemple de récupération des utilisateurs
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

// Fonction pour récupérer le profil de l'utilisateur connecté
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); // Utilisation de l'ID de l'utilisateur provenant du middleware
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json(user);
  } catch (error) {
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