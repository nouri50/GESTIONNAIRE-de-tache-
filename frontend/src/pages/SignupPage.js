import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import { signup } from '../utils/api'; // Import de la fonction signup
import '../styles/SignupPage.css'; // Assurez-vous d'importer le fichier CSS
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Réinitialisation des erreurs
    setEmailError('');
    setPasswordError('');

    // Validation du mot de passe et de l'email
    if (password.length < 6 || password.length > 15) {
      setPasswordError('Le mot de passe doit contenir entre 6 et 15 caractères.');
      return;
    }

    if (!email.includes('@')) {
      setEmailError('Veuillez entrer un email valide.');
      return;
    }

    try {
      await signup({ email, password });
      setMessage('Inscription réussie. Redirection vers la page de connexion...');
      setTimeout(() => {
        navigate('/login');  // Redirection vers la page de connexion après 2 secondes
      }, 2000);
    } catch (error) {
      setMessage("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            data-testid="signup-email"
          />
          {/* Message d'erreur pour l'email */}
          {emailError && <div className="error-message" data-testid="email-error">{emailError}</div>}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            data-testid="signup-password"
          />
          {/* Message d'erreur pour le mot de passe */}
          {passwordError && <div className="error-message" data-testid="password-error">{passwordError}</div>}

          <button type="submit" data-testid="signup-submit">S'inscrire</button>
        </form>
        {/* Affichage du message de succès ou d'erreur */}
        {message && <div className="status-message" data-testid="status-message">{message}</div>}
      </div>
    </div>
  );
};

export default SignupPage;
