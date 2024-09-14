import { DataTypes } from 'sequelize';
<<<<<<< HEAD
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
=======
import sequelize from '../config/db.config.js';

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
>>>>>>> dev
});

export default User;
