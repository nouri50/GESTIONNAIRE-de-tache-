import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api'; // Assurez-vous que cette fonction est correctement définie dans votre API
import '../styles/LoginPage.css';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';
const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Réinitialise les messages d'erreur

    try {
      const response = await login({ email, password });

      // Vérifie que la réponse contient un token
      if (response && response.token) {
        const token = response.token;
        console.log("Token reçu:", token);

        // Stocke le token dans localStorage
        localStorage.setItem('token', token);

        // Met à jour l'état de connexion
        setIsLoggedIn(true);

        // Redirection vers la page d'accueil
        navigate('/home');
      } else {
        console.error("Token invalide :", response);
        setErrorMessage("Token invalide. Impossible de se connecter.");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la connexion. Veuillez vérifier vos informations.");
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Affiche les messages d'erreur */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
};

export default LoginPage;
