import React, { useState } from 'react';
import '../styles/background.css'; // Import du style pour le background

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Un email avec un lien de réinitialisation a été envoyé.');
      } else {
        setMessage('Erreur lors de l\'envoi de l\'email.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      setMessage('Erreur lors de l\'envoi de l\'email.');
    }
  };

  return (
    <div className="page-container"> {/* Application du background */}
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
