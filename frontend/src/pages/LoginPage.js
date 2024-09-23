import React, { useState } from 'react';
import { login } from '../utils/api';  // Import correct
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate
import '../styles/background.css'; // Import du style pour le background
import '../styles/Header.css';
import '../styles/Footer.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialisation du hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      console.log("Connexion réussie");
      navigate('/'); // Redirection vers la page d'accueil après la connexion
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur est survenue lors de la connexion.");
    }
  };
  
  return (
    <div className="page-container"> {/* Application du background */}
      <div className="main-content">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Mot de passe" 
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

