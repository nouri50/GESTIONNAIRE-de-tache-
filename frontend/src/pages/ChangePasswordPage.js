import React, { useState } from 'react';
import { changePassword } from '../utils/api'; // Assurez-vous que cette fonction est bien définie
import { useNavigate } from 'react-router-dom';
import '../styles/ChangePasswordPage.css';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';


const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    if (newPassword.length < 6 || newPassword.length > 15) {
      setMessage('Le mot de passe doit contenir entre 6 et 15 caractères.');
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setMessage('Mot de passe modifié avec succès.');
      navigate('/profil');
    } catch (error) {
      setMessage('Erreur lors du changement de mot de passe. Veuillez vérifier vos informations.');
    }
  };

  return (
    <div className="change-password-page">
      <h1 data-cy="change-password-title">Changer le mot de passe</h1>
      <form onSubmit={handleSubmit} className="change-password-form">
        <div>
          <label>Mot de passe actuel</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            data-cy="current-password"
          />
        </div>
        <div>
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            data-cy="new-password"
          />
        </div>
        <div>
          <label>Confirmer le nouveau mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            data-cy="confirm-password"
          />
        </div>
        <button type="submit" data-cy="change-password-button">Changer le mot de passe</button>
      </form>
      {message && <p className="message" data-cy="change-password-message">{message}</p>}
    </div>
  );
};

export default ChangePasswordPage;