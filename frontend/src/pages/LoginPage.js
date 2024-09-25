import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour la redirection après connexion réussie
import { login } from '../utils/api'; // Import de la fonction de connexion
import '../styles/LoginPage.css'; // Le fichier CSS pour le style de la page
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';
import '../styles/SignupPage.css';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // Stocker les messages d'erreur
  const [successMessage, setSuccessMessage] = useState('');  // Stocker le message de succès

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');  // Réinitialiser les messages avant la tentative de connexion
    setSuccessMessage('');

    try {
      const response = await login({ email, password });
      setSuccessMessage('Connexion réussie ! Redirection vers la page d\'accueil...');  // Message de succès
      // Redirection vers la page d'accueil après un court délai
      setTimeout(() => {
        window.location.href = '/home';
      }, 2000);  // Délai de 2 secondes avant la redirection
    } catch (error) {
      // Vérifier si une réponse est reçue et afficher des messages spécifiques
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === 'Email incorrect') {
          setErrorMessage('L\'adresse e-mail est incorrecte. Veuillez réessayer.');
        } else if (error.response.data.message === 'Mot de passe incorrect') {
          setErrorMessage('Le mot de passe est incorrect. Veuillez réessayer.');
        } else {
          setErrorMessage('Email ou mot de passe incorrect. Veuillez vérifier vos informations.');
        }
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    }
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Mot de passe" 
            required
          />
          <button type="submit">Se connecter</button>
        </form>
        {/* Afficher le message de succès ou d'erreur sous le formulaire */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
