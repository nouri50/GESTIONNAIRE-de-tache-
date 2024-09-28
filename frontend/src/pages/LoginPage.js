import React, { useState } from 'react';
import { login } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/background.css';
import '../styles/LoginPage.css';

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login({ email, password });
      localStorage.setItem('token', token); // Stocker le token
      setIsLoggedIn(true); // Mettre à jour l'état de connexion
      navigate('/home'); // Redirection vers la page d'accueil
    } catch (error) {
      setErrorMessage('Erreur lors de la connexion.');
    }
  };

  return (
    <div className="login-page">
      <h1>Connexion</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-testid="email-input"
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            data-testid="password-input"
          />
        </div>
        <button type="submit" data-testid="login-button">Connexion</button>
      </form>
    </div>
  );
};

export default LoginPage;
