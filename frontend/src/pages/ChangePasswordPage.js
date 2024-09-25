import React, { useState } from 'react';
import { changePassword } from '../utils/api';  // Assurez-vous que l'API pour changer le mot de passe est définie
import '../styles/ChangePasswordPage.css';  // Importer un fichier CSS spécifique pour le style de la page

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');  // Message pour informer l'utilisateur (succès ou erreur)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });  // Appel API pour changer le mot de passe
      setMessage("Mot de passe modifié avec succès.");
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe', error);
      setMessage("Échec du changement de mot de passe. Veuillez vérifier vos informations.");
    }
  };

  return (
    <div className="change-password-page">
      <h1>Changer le mot de passe</h1>
      <form onSubmit={handleSubmit} className="change-password-form">
        <div>
          <label>Mot de passe actuel</label>
          <input 
            type="password" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Nouveau mot de passe</label>
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Confirmer le nouveau mot de passe</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Changer le mot de passe</button>
      </form>
      {message && <p className="message">{message}</p>}  {/* Affiche le message en cas d'erreur ou de succès */}
    </div>
  );
};

export default ChangePasswordPage;
