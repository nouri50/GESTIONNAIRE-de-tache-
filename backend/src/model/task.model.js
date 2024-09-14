<<<<<<< HEAD
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Remplacez par le bon chemin de la configuration de votre base de données

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Task;
=======
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js'; // Assurez-vous que le chemin est correct

// Définition du modèle Task
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Task;
>>>>>>> dev
