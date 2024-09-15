import { DataTypes } from 'sequelize';
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
});

export default Task;
