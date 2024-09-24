import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import { sequelize } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors()); // Autoriser CORS

// Routes
app.use('/api/auth', authRoutes);

// Test de la base de données
sequelize.sync().then(() => {
    console.log('Base de données synchronisée');
}).catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});

