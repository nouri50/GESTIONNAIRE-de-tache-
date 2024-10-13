import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import bcrypt from 'bcrypt';

// Définition du modèle User
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
    defaultValue: 'user',
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active', // Par défaut, tous les utilisateurs sont "actifs"
  },
}, {
  timestamps: false,  // Active les champs createdAt et updatedAt
});

// Ajouter une méthode pour vérifier le mot de passe
User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);  // Comparaison synchrone avec le mot de passe haché
};

// Avant de créer ou mettre à jour un utilisateur, hache le mot de passe
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

export default User;
