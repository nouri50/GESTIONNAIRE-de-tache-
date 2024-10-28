import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';
import '../styles/ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      setIsSuccess(false);
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:5001/api/auth/reset-password/${token}`, {
        newPassword,
      });
  
      if (response.status === 200) {
        setMessage('Votre mot de passe a été réinitialisé avec succès.');
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage('Erreur lors de la réinitialisation du mot de passe.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Erreur lors de la réinitialisation :', error);
      setMessage('Erreur lors de la réinitialisation du mot de passe.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <h2>Réinitialisation du mot de passe</h2>
        <form onSubmit={handleSubmit}>
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
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Réinitialiser le mot de passe</button>
        </form>
        {message && (
          <p className={isSuccess ? 'success-message' : 'error-message'}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
