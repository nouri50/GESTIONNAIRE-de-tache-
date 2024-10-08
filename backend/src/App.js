import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import tasksRoutes from './routes/task.route.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Route pour vérifier l'heure du serveur
app.get('/time', (req, res) => {
  const serverTime = new Date().toLocaleString();
  res.send(`Heure actuelle du serveur : ${serverTime}`);
});

// Définition des routes
app.use('/api', userRoutes);  
app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
