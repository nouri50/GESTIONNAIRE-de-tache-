import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Créer une nouvelle instance Sequelize avec les informations de connexion
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Vérifier la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

export default sequelize;


  