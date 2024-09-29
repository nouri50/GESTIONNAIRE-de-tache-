import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../utils/api'; // Assurez-vous que cette fonction est bien définie
import '../styles/ChangePasswordPage.css';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // Message de retour (succès ou erreur)
  const navigate = useNavigate(); // Pour rediriger après succès

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification si le nouveau mot de passe est identique à l'ancien
    if (newPassword === currentPassword) {
      setMessage("Le nouveau mot de passe doit être différent de l'ancien mot de passe.");
      return;
    }

    // Vérification si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    // Vérification de la longueur du nouveau mot de passe
    if (newPassword.length < 6 || newPassword.length > 15) {
      setMessage("Le nouveau mot de passe doit contenir entre 6 et 15 caractères.");
      return;
    }

    try {
      const response = await changePassword({ currentPassword, newPassword });
      if (response.message === "Mot de passe modifié avec succès.") {
        setMessage("Mot de passe modifié avec succès.");
        navigate('/profil'); // Redirection vers la page de profil après succès
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage("Erreur lors du changement de mot de passe. Veuillez vérifier vos informations.");
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
            data-testid="current-password-input"  // Ajout du data-testid pour le test
          />
        </div>
        <div>
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            data-testid="new-password-input"  // Ajout du data-testid pour le test
          />
        </div>
        <div>
          <label>Confirmer le nouveau mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            data-testid="confirm-password-input"  // Ajout du data-testid pour le test
          />
        </div>
        <button type="submit" data-testid="submit-button">Changer le mot de passe</button> {/* Ajout du data-testid pour le bouton */}
      </form>
      {message && <p className="message" data-testid="message">{message}</p>} {/* Affichage du message d'erreur ou de succès */}
    </div>
  );
};

export default ChangePasswordPage;
