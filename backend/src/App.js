// backend/src/app.js
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js'; // Importez correctement les routes des utilisateurs
import authRoutes from './routes/auth.route.js'; // Importez correctement les routes d'authentification

const app = express();
app.use(express.json());
app.use(cors());

/ Utiliser les routes utilisateur sous /api
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes); // Route pour l'authentification

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
