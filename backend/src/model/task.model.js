import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';  // Assurez-vous que le chemin vers votre configuration de DB est correct

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
    allowNull: false,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',  // Mappe à la colonne 'user_id' dans la base de données
  }
}, {
  timestamps: true,  // Active la gestion automatique de created_at et updated_at
});

export default Task;  // Exporter le modèle comme export par défaut
