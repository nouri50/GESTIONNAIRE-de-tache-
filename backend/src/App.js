import 'dotenv/config'; // Charger les variables d'environnement
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise'; // Utilisation de mysql2 avec promesses
import authRoutes from './routes/authRoutes'; // Routes d'authentification
import taskRoutes from './routes/taskRoutes'; // Routes des tâches

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

// Connexion à la base de données avant de démarrer le serveur
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Le serveur backend tourne sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur lors de la connexion à la base de données :', err);
  });

export default app;

