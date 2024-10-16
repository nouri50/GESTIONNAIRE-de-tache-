import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'; // Importer body-parser pour traiter les requêtes JSON

dotenv.config();
const app = express();

// Middleware body-parser pour traiter les requêtes en JSON
app.use(bodyParser.json()); // Utilisé pour traiter les requêtes POST/PUT avec un corps JSON
app.use(bodyParser.urlencoded({ extended: true })); // Pour traiter les requêtes envoyant des données encodées en URL

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre frontend
  credentials: true,
}));

// Définition des routes
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import tasksRoutes from './routes/task.route.js';

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

// Middleware pour les erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Ressource non trouvée" });
});

// Middleware pour gérer les erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
