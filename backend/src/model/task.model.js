import { DataTypes } from 'sequelize';
<<<<<<< HEAD
import sequelize from '../config/db.config.js'; // Chemin correct vers db.config.js

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
    }
=======
import sequelize from '../config/db.config.js';

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
>>>>>>> main
});

export default Task;
