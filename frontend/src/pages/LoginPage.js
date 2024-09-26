import React, { useState } from 'react';
import { login } from '../utils/api';
import { useNavigate } from 'react-router-dom';  // Import correct
import '../styles/background.css'; 
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';
import '../styles/LoginPage.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(''); // État pour le message d'erreur
  const [loginSuccess, setLoginSuccess] = useState(''); // État pour le message de succès
  const navigate = useNavigate(); // Utilisé pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(''); // Réinitialiser les erreurs
    setLoginSuccess('');

    try {
      const response = await login({ email, password });
      if (response.token) {
        setLoginSuccess('Connexion réussie !'); // Afficher le message de succès
        setTimeout(() => {
          navigate('/home'); // Rediriger vers la page d'accueil après 2 secondes
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError('Email ou mot de passe incorrect.');
      } else {
        setLoginError('Erreur lors de la connexion. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="login-page">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          data-testid="email-input"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          data-testid="password-input"
          required
        />
        <button type="submit" data-testid="login-button">
          Se connecter
        </button>
      </form>

      {loginError && (
        <div className="error-message" data-testid="login-error">
          {loginError}
        </div>
      )}
      {loginSuccess && (
        <div className="success-message" data-testid="login-success">
          {loginSuccess}
        </div>
      )}
    </div>
  );
};

export default LoginPage;