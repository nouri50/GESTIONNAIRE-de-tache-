import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as apiLogin } from '../utils/api';
import { AuthContext } from '../context/AuthContext'; // Assurez-vous que le chemin est correct// Vérifiez que le chemin est correct
import '../styles/LoginPage.css';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/background.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Utilisation correcte du contexte

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await apiLogin({ email, password });
      if (response && response.token) {
        login(response.token); // Utilisez la fonction `login` du contexte
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
        <button type="submit">Connexion</button>
      </form>
      <Link to="/signup" className="signup-link">Créer un compte</Link>
    </div>
  );
};

export default LoginPage;
