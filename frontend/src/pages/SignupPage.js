import React, { useState } from 'react';
import '../styles/SignupPage.css';
import '../styles/Footer.css';
import '../styles/background.css';
import '../styles/Header.css';


const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Logic for handling signup
    console.log("Inscription réussie");
  };

  return (
    <div className="signup-container">
      <form id="signup-form" onSubmit={handleSignup}>
        <h1>Créer un compte</h1>
        <div className="form-group">
          <label htmlFor="signup-email">Email :</label>
          <input
            type="email"
            id="signup-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Mot de passe :</label>
          <input
            type="password"
            id="signup-password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="signup-submit">S'inscrire</button>
      </form>
      <a href="/login" className="already-member-link">Déjà membre ? Connectez-vous ici</a>
    </div>
  );
};

export default SignupPage;
