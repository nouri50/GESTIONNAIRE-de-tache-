import User from '../model/user.model.js';  // Importer le modèle utilisateur

// Contrôleur pour récupérer le profil utilisateur
export const getUserProfile = async (req, res) => {
  try {
    console.log('Requête reçue pour le profil utilisateur');

    // Vérifie si l'utilisateur est correctement extrait du token
    if (!req.user) {
      console.error('Utilisateur non trouvé dans le token');
      return res.status(401).json({ message: 'Non authentifié' });
    }

    console.log(`Requête pour l'utilisateur ID: ${req.user.id}`);
    const user = await User.findByPk(req.user.id, { attributes: ['id', 'email'] });

    if (!user) {
      console.log('Utilisateur non trouvé dans la base de données');
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    console.log('Profil utilisateur récupéré avec succès');
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
