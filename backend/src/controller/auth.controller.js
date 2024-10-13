import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

// Inscription
export const register = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // Générer un token JWT
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    // Répondre avec le token et l'utilisateur
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
};

// Connexion
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifiez si l'utilisateur existe
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    // Répondre avec le token
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};
