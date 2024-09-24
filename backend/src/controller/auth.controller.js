import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Vérifier si l'utilisateur existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = await User.create({ email, password: hashedPassword });

        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
