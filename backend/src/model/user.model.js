import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js'; // Assurez-vous que ce chemin est correct

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
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true, // Peut être nul si aucun token n'est généré
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true, // Peut être nul si aucun token n'est généré
  }
}, {
  timestamps: true, // Active les champs timestamps (created_at, updated_at)
  createdAt: 'created_at', // Mapping du nom de la colonne pour createdAt
  updatedAt: 'updated_at', // Mapping du nom de la colonne pour updatedAt
});

export default User;
