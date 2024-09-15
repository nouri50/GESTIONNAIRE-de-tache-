import React, { useState } from 'react';
import {signup} from '../utils/api';  // Import correct

import '../styles/SignupPage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ email, password });
    // Rediriger après l'inscription
  };

  return (
    <div>
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
  );
};

export default SignupPage;
