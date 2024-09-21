import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';  // Import des routes d'authentification
import userRoutes from './routes/user.route.js';  // Import des routes utilisateurs

const app = express();

// Configurer CORS pour autoriser les requêtes provenant de localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',  // Autoriser uniquement les requêtes de localhost:3000
  credentials: true,
}));

// Activer l'analyse des données JSON dans les requêtes
app.use(express.json());

// Test temporaire pour vérifier que la route /api/auth fonctionne
app.use('/api/auth', (req, res) => {
  res.send('Route API Auth active');
});

// Définir les autres routes pour l'authentification et les utilisateurs
app.use('/api/auth', authRoutes);  // Route pour l'authentification
app.use('/api/user', userRoutes);  // Route pour les utilisateurs

// Démarrage du serveur backend sur le port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur backend tourne sur le port ${PORT}`);
});
