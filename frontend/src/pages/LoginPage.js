import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';


const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Requête d'authentification
      const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      if (response && response.data.token) {
        localStorage.setItem('token', response.data.token); 
        setIsLoggedIn(true); 
        setLoading(false);
        setSuccessMessage("Connexion réussie ! Redirection...");
        navigate('/home'); 
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
      {/* Messages de succès et d'erreur sous le bouton */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <Link to="/forgot-password" className="forgot-password-link">Mot de passe perdu ?</Link>
      <Link to="/signup" className="signup-link">Créer un compte</Link>
    </div>
  );
};

export default LoginPage;
