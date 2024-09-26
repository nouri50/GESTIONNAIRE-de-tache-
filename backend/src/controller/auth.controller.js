import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const register = async (req, res) => {
  const { email, password } = req.body;

  // Vérification du mot de passe
  if (password.length < 6 || password.length > 15) {
    return res.status(400).json({ message: "Le mot de passe doit contenir entre 6 et 15 caractères." });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hash du mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = await User.create({ email, password: hashedPassword });
    
    res.status(201).json({ message: "Inscription réussie", user: newUser });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur lors de l'inscription. Veuillez réessayer plus tard." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
};
