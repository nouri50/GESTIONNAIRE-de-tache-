import User from '../model/user.model.js';  // Importer le modèle utilisateur
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Contrôleur pour la connexion
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Tentative de connexion avec email: ${email}`); // Log lors de la connexion

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Mot de passe incorrect');
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(`Connexion réussie, token généré: ${token}`); // Log du token généré
    res.json({ token });
  } catch (error) {
    console.error('Erreur serveur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Contrôleur pour récupérer le profil utilisateur
export const getUserProfile = async (req, res) => {
  try {
    console.log(`Requête reçue pour obtenir le profil de l'utilisateur avec ID: ${req.user.id}`);

    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email']  // Sélectionnez uniquement les champs nécessaires
    });

    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    console.log('Profil utilisateur trouvé et retourné :', user);
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
