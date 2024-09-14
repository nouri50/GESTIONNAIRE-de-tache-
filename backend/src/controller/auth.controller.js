import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';  // Vérifiez que le chemin est correct

// Fonction d'enregistrement d'un nouvel utilisateur
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);

        // Création du nouvel utilisateur
        const newUser = await User.create({ email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: "Échec de l'enregistrement de l'utilisateur" });
    }
};

// Fonction de connexion d'un utilisateur existant
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Rechercher l'utilisateur par e-mail
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Email ou mot de passe invalide' });
        }

        // Vérifier si le mot de passe est correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Email ou mot de passe invalide' });
        }

        // Générer un jeton JWT
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Échec de la connexion' });
    }
};
