// Importer Sequelize depuis le package sequelize
import { Sequelize } from 'sequelize';
import 'dotenv/config';  // Charger les variables d'environnement depuis le fichier .env

<<<<<<< HEAD
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

=======
// Créer une instance de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306,  // Si le port est différent, utilisez celui dans .env
  logging: false,  // Désactiver les logs SQL
});

// Tester la connexion à la base de données
>>>>>>> main
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
  })
  .catch(err => {
<<<<<<< HEAD
    console.error('Impossible de se connecter à la base de données:', err);
  });

export default sequelize;
=======
    console.error('Impossible de se connecter à la base de données :', err);
  });

export default sequelize;


  
>>>>>>> main
