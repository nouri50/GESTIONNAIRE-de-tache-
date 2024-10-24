import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      // Requête d'authentification
      const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      if (response && response.data.token) {
        localStorage.setItem('token', response.data.token); // Enregistrer le token dans localStorage
        setIsLoggedIn(true); // Mettre à jour l'état de connexion
        setLoading(false);
        navigate('/home'); // Redirection vers la page d'accueil
      } else {
        setErrorMessage("Impossible de se connecter.");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Email ou mot de passe incorrect.");
      } else {
        setErrorMessage("Erreur lors de la connexion. Veuillez vérifier vos informations.");
      }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion en cours...' : 'Connexion'}
        </button>
      </form>
      <Link to="/forgot-password" className="forgot-password-link">Mot de passe perdu ?</Link>
      <Link to="/signup" className="signup-link">Créer un compte</Link>
    </div>
  );
};

export default LoginPage;
