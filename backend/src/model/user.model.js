import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';  // Assurez-vous que le fichier db.config.js existe

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
