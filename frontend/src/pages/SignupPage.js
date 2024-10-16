import React, { useState } from 'react';
import { signup } from '../utils/api';
import '../styles/SignupPage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        password,
      };

      // Vérifiez que les données sont bien un objet JSON
      console.log('Données envoyées:', JSON.stringify(userData));

      await signup(userData);
      window.location.href = '/login'; // Redirection vers la page de connexion après succès
    } catch (err) {
      setError("Erreur lors de l'inscription, veuillez réessayer.");
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          id="signup-email"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          id="signup-password"
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignupPage;
