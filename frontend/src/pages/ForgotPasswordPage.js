import React, { useState } from 'react';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css'; 
import '../styles/ForgotPasswordPage.css'; 

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Un email de réinitialisation a été envoyé.');
      } else {
        setMessage('Erreur lors de l\'envoi de l\'email.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête', error);
      setMessage('Erreur lors de la requête.');
    }
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <h2>Mot de passe oublié</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            required
          />
          <button type="submit">Envoyer un lien de réinitialisation</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
