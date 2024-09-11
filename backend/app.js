require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion à MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à MySQL');
  }
});

// Exemple de route
app.get('/', (req, res) => {
  res.send('API Gestionnaire de Tâches');
});

// Démarrer le serveur backend
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur backend tourne sur le port ${PORT}`);
});
