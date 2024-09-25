import React, { useState } from 'react';
import { login } from '../utils/api';  // Import correct
import '../styles/background.css'; 
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';
import '../styles/SignupPage.css';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Ajout d'un état pour les erreurs
  const [passwordError, setPasswordError] = useState(''); // Erreur spécifique pour le mot de passe

  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage('Tous les champs sont obligatoires.');
      return false;
    }
    if (password.length < 6 || password.length > 15) {
      setPasswordError('Le mot de passe doit contenir entre 6 et 15 caractères.');
      return false;
    }
    setErrorMessage('');
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Valide le formulaire avant la soumission

    try {
      await login({ email, password });
      console.log("Connexion réussie");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage("Le mot de passe ou l'email est incorrect."); // Mettre à jour l'erreur
    }
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <input 
            id="login-email"  // Ajout de l'id pour le champ email
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
          />
          <input 
            id="login-password"  // Ajout de l'id pour le champ mot de passe
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Mot de passe" 
          />
          <button id="login-button" type="submit">Se connecter</button>
        </form>

        {/* Afficher les messages d'erreur en fonction des cas */}
        {errorMessage && (
          <div id="error-message" className="error-message">  {/* Ajout d'un id pour le message d'erreur */}
            {errorMessage}
          </div>
        )}
        {passwordError && (
          <div id="password-error" className="error-message">  {/* Ajout d'un id pour le message d'erreur sur le mot de passe */}
            {passwordError}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
