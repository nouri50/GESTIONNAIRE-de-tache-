import User from '../model/user.model.js';  // Importer le modèle utilisateur


export const getUserProfile = async (req, res) => {
    try {
        // Récupérer l'utilisateur à partir de l'ID inclus dans le token JWT
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        // Retourner les informations de l'utilisateur
        res.json({
            id: user.id,
            email: user.email
        });
    } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du profil utilisateur.' });
    }
};
