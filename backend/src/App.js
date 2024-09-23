import express from 'express';
import cors from 'cors';
import morgan from 'morgan';  // Importer Morgan pour les logs des requêtes HTTP
import authRoutes from './routes/auth.route.js';  // Importer les routes d'authentification

const app = express();

// Utiliser Morgan pour logguer les requêtes HTTP
app.use(morgan('dev'));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Routes d'authentification

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});
