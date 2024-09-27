import User from '../model/user.model.js';  // Importer le modèle utilisateur

// Contrôleur pour récupérer le profil utilisateur
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // L'utilisateur connecté est récupéré depuis le middleware d'authentification
    const user = await User.findByPk(userId); // Rechercher l'utilisateur dans la base de données
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.json({ email: user.email, id: user.id }); // Envoyer les informations du profil
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du profil." });
  }
};