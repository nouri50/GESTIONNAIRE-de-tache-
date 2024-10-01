import React, { useState } from 'react';
import { changePassword } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/ChangePasswordPage.css';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === currentPassword) {
      setErrorMessage("Le nouveau mot de passe ne doit pas être identique à l'ancien.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    if (newPassword.length < 6 || newPassword.length > 15) {
      setErrorMessage("Le mot de passe doit contenir entre 6 et 15 caractères.");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setErrorMessage("Mot de passe modifié avec succès.");
      navigate('/profil');
    } catch (error) {
      setErrorMessage("Erreur lors du changement de mot de passe. Veuillez vérifier vos informations.");
    }
  };

  return (
    <div className="change-password-page">
      <h1 data-cy="change-password-title">Changer le mot de passe</h1>
      {errorMessage && <p className="change-password-error" data-cy="change-password-error">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="change-password-field">
          <label>Mot de passe actuel</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="change-password-field">
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="change-password-field">
          <label>Confirmer le nouveau mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="change-password-button">Changer le mot de passe</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
