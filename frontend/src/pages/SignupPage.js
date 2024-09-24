import React, { useState } from 'react';
import '../styles/SignupPage.css'; // Assure-toi que le chemin est correct
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';
const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logique pour envoyer les données d'inscription à l'API
    try {
      // Appel à l'API ici
      console.log("Inscription réussie");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
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
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Mot de passe" 
          />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
