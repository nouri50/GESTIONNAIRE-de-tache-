import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/api'; // Assurez-vous que cette fonction est définie
import '../styles/LoginPage.css'; // Assurez-vous de créer ce fichier CSS
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
    setErrorMessage('');

    try {
      const response = await login({ email, password });
      if (response && response.token) {
        localStorage.setItem('token', response.token); // Stocke le token
        setIsLoggedIn(true);
        navigate('/home'); // Redirection vers la page d'accueil
      } else {
        setErrorMessage("Impossible de se connecter.");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la connexion. Veuillez vérifier vos informations.");
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          data-testid="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Mot de passe</label>
        <input
          type="password"
          data-testid="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" data-testid="login-submit">Connexion</button>
      </form>
      <Link to="/signup" className="signup-link" data-testid="signup-link">Créer un compte</Link>
    </div>
  );
};

export default LoginPage;
