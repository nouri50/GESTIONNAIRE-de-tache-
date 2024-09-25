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
  const [message, setMessage] = useState(''); // Pour stocker les messages de succès ou d'erreur
  const navigate = useNavigate(); // Utilisé pour rediriger après inscription

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Réinitialiser le message avant chaque tentative
    setMessage('');

    try {
      const response = await signup({ email, password });
      // Si l'inscription réussit, afficher un message et rediriger vers la page de connexion
      setMessage('Inscription réussie. Redirection vers la page de connexion...');
      setTimeout(() => {
        navigate('/login'); // Redirection vers la page de connexion après 2 secondes
      }, 2000);
    } catch (error) {
      // En cas d'échec, afficher un message d'erreur
      setMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
      console.error('Erreur lors de l\'inscription', error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Inscription</h1>
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
          <button type="submit">S'inscrire</button>
        </form>
        {/* Affichage du message de succès ou d'erreur */}
        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
