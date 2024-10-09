import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../utils/api'; 
import '../styles/SignupPage.css'; 
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await signup({ email, password });
      if (response && response.message === "Inscription réussie") {
        setSuccessMessage("Inscription réussie. Redirection vers la page de connexion...");
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setErrorMessage(response.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de l'inscription. Veuillez vérifier vos informations.");
    }
  };

  return (
    <div className="signup-container">
      <h1 data-testid="signup-title">Inscription</h1>
      {errorMessage && <p data-testid="error-message" className="error-message">{errorMessage}</p>}
      {successMessage && <p data-testid="success-message" className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-testid="email-input"  // Ajout du data-testid pour faciliter les tests
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          data-testid="password-input"  // Ajout du data-testid pour faciliter les tests
        />
        <button type="submit" data-testid="signup-button">S'inscrire</button>
      </form>
      <Link to="/login" className="login-link" data-testid="login-link">
        Déjà un compte ? Se connecter
      </Link>
    </div>
  );
};

export default SignupPage;
