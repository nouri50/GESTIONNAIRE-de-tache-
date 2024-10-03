import { Sequelize } from 'sequelize';
import 'dotenv/config';  // Charger les variables d'environnement depuis le fichier .env

// Créer une instance de Sequelize avec les informations de connexion de .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306,  // Utilisez le port défini dans .env ou 3306 par défaut
  logging: (msg) => console.log(msg),  // Activez les logs SQL pour déboguer en cas de besoin
});

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données :', err);
  });

export default sequelize;
