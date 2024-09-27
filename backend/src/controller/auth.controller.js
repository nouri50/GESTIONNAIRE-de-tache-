import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

// Inscription
export const register = async (req, res) => {
  const { email, password } = req.body;

  console.log('Inscription :', email); // Log de l'email reçu

  // Vérification du mot de passe
  if (password.length < 6 || password.length > 15) {
    return res.status(400).json({ message: "Le mot de passe doit contenir entre 6 et 15 caractères." });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('Utilisateur déjà existant');
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    
    console.log('Inscription réussie pour', email);
    res.status(201).json({ message: "Inscription réussie", user: newUser });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur lors de l'inscription. Veuillez réessayer plus tard." });
  }
};

// Connexion
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérification si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Vérification du mot de passe avec bcrypt (assurez-vous que c'est la méthode correcte)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Si tout est correct, générez le token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Le token expire en 1 heure
    });

    // Envoyer le token au client
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
};


// Changement de mot de passe
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  console.log('Changement de mot de passe pour :', req.user.email);

  if (newPassword.length < 6 || newPassword.length > 15) {
    console.log('Mot de passe non valide');
    return res.status(400).json({ message: "Le mot de passe doit contenir entre 6 et 15 caractères." });
  }

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      console.log('Mot de passe actuel incorrect');
      return res.status(400).json({ message: "Le mot de passe actuel est incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    console.log('Mot de passe changé pour :', req.user.email);
    res.status(200).json({ message: "Mot de passe modifié avec succès." });
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe :", error);
    res.status(500).json({ message: "Erreur lors du changement de mot de passe." });
  }
};
