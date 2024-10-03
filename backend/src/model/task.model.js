import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

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
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    allowNull: true,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'tasks',  // Assurez-vous que Sequelize utilise la bonne table
  timestamps: true,    // Active les timestamps
  createdAt: 'created_at',  // Correspondance avec la colonne de la DB
  updatedAt: 'updated_at',  // Correspondance avec la colonne de la DB
});

export default Task;
