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

let db; // Déclaration de la connexion MySQL

// Fonction asynchrone pour la connexion à MySQL
async function connectToDatabase() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'task_management'
    });
    console.log('Connecté à MySQL');
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1); // Quitter l'application en cas d'erreur critique
  }
}

// Exemple de route d'accueil
app.get('/', (req, res) => {
  res.send('API Gestionnaire de Tâches');
});

// Utiliser les routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Démarrage du serveur backend
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

