import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import '../styles/LoginPage.css'; // Importer le CSS spécifique à la page de connexion
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Réinitialise les messages d'erreur

    try {
      const response = await login({ email, password });

      if (response && response.token) {
        const token = response.token;
        console.log("Token reçu:", token);
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        setErrorMessage("Token invalide. Impossible de se connecter.");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la connexion. Veuillez vérifier vos informations.");
    }
  };

  return (
    <div className="login-page">
      <h1 data-cy="login-title">Connexion</h1>
      {errorMessage && <p className="login-error" data-cy="login-error">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-field">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Connexion</button>
        <p className="forgot-password" onClick={() => navigate('/forgot-password')}>
          Mot de passe oublié ?
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
