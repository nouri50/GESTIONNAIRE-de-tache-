import 'dotenv/config'; // Charger les variables d'environnement (dotenv en import direct)
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise'; // Utilisation de mysql2 avec promesses

const app = express();
app.use(cors());
app.use(bodyParser.json());

let db; // Déclaration de la connexion MySQL

// Fonction asynchrone pour la connexion à MySQL
async function connectToDatabase() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('Connecté à MySQL');
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1); // Quitter l'application en cas d'erreur critique
  }
}

// Exemple de route
app.get('/', (req, res) => {
  res.send('API Gestionnaire de Tâches');
});

// Exemple d'une route asynchrone avec une requête à MySQL
app.get('/tasks', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM tasks'); // Requête MySQL
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
  }
});

// Démarrage du serveur backend
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectToDatabase(); // Attendre la connexion avant de démarrer le serveur
  console.log(`Le serveur backend tourne sur le port ${PORT}`);
});
