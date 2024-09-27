import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api'; // Assurez-vous que cette fonction est bien définie
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css'; 
import '../styles/LoginPage.css';


const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(''); 
  const [passwordError, setPasswordError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setEmailError('');
    setPasswordError('');
  
    if (!email) {
      setEmailError("L'email est requis.");
      return;
    }
  
    if (!password) {
      setPasswordError("Le mot de passe est requis.");
      return;
    }
  
    try {
      const response = await login({ email, password });
      const token = response.token; // Assurez-vous de récupérer uniquement le token de la réponse
  
      if (token) {
        console.log("Token reçu:", token);
        localStorage.setItem('token', token); // Stocker le token correctement
        setIsLoggedIn(true); 
        navigate('/home'); 
      } else {
        setErrorMessage("Token non reçu. Veuillez réessayer.");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la connexion. Veuillez vérifier vos informations.");
    }
  };
  

  return (
    <div className="login-page"> {/* Utilisation des classes CSS */}
      <div className="login-form">
        <h1>Connexion</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>} 
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>} 
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>} 
          </div>
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
