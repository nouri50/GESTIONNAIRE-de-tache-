import React, { useState } from 'react';
import { changePassword } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/background.css';
import '../styles/ChangePasswordPage.css';

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

    try {
      await changePassword({ currentPassword, newPassword });
      setMessage('Mot de passe modifié avec succès.');
      navigate('/profil'); // Redirection vers la page de profil après succès
    } catch (error) {
      setMessage('Erreur lors du changement de mot de passe.');
    }
  };

  return (
    <div className="change-password-page">
      <h1>Changer le mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mot de passe actuel</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            data-testid="current-password-input"
          />
        </div>
        <div>
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            data-testid="new-password-input"
          />
        </div>
        <div>
          <label>Confirmer le nouveau mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            data-testid="confirm-password-input"
          />
        </div>
        <button type="submit" data-testid="change-password-button">Changer le mot de passe</button>
      </form>
      {message && <p data-testid="password-message">{message}</p>}
    </div>
  );
};

export default ChangePasswordPage;
