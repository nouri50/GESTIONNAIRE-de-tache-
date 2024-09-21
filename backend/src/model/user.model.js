import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';  // Assure-toi que la connexion à la DB est correcte

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;

