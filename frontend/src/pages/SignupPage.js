import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour la redirection après inscription réussie
import { signup } from '../utils/api'; // Import de la fonction d'inscription
import '../styles/SignupPage.css'; // Le fichier CSS pour le style de la page
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Ajout d'un état pour les erreurs
  const [passwordError, setPasswordError] = useState(''); // Erreur spécifique pour le mot de passe
  const [successMessage, setSuccessMessage] = useState(''); // Message de succès

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
      await signup({ email, password });
      setSuccessMessage("Inscription réussie !");  // Affiche un message de succès
      setErrorMessage('');
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setErrorMessage("Cette adresse email est déjà utilisée."); // Mettre à jour l'erreur en cas d'échec
      setSuccessMessage('');
    }
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
          <input 
            id="signup-email"  // Ajout de l'id pour le champ email
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
          />
          <input 
            id="signup-password"  // Ajout de l'id pour le champ mot de passe
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Mot de passe" 
          />
          <button id="signup-button" type="submit">S'inscrire</button>
        </form>

        {/* Afficher les messages d'erreur en fonction des cas */}
        {errorMessage && (
          <div id="signup-error-message" className="error-message">  {/* Ajout d'un id pour le message d'erreur */}
            {errorMessage}
          </div>
        )}
        {passwordError && (
          <div id="signup-password-error" className="error-message">  {/* Ajout d'un id pour le message d'erreur sur le mot de passe */}
            {passwordError}
          </div>
        )}
        {successMessage && (
          <div id="signup-success-message" className="success-message">  {/* Ajout d'un id pour le message de succès */}
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;