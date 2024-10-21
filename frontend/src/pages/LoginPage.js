import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/background.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // Remplacez par la bonne URL selon votre backend
      const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      if (response && response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
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
