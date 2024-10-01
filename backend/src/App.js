import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js'; // Assurez-vous que vous avez bien importé les routes utilisateur
import authRoutes from './routes/auth.route.js'; // Importer vos routes d'authentification
const app = express();

app.use(express.json());
app.use(cors());

// Utiliser les routes utilisateur sous /api
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
