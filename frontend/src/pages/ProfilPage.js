import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';  // Assurez-vous que cette fonction existe et est bien importée
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css'; 
import '../styles/ProfilPage.css'; // Pour les styles spécifiques à cette page
import { useNavigate } from 'react-router-dom';

const ProfilPage = () => {
  const [profile, setProfile] = useState({
    email: 'Chargement...', // Valeurs par défaut en cas de problème de récupération
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Pour la redirection

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);  // Mettre à jour le profil si la récupération est réussie
        setErrorMessage('');  // Réinitialiser le message d'erreur
      } catch (error) {
        setErrorMessage('Impossible de récupérer les informations du profil.');  // En cas d'erreur
      }
    };
    fetchProfile();
  }, []);

  const handlePasswordChange = () => {
    navigate('/change-password'); // Rediriger vers la page de modification de mot de passe
  };

  return (
    <div className="page-container">  {/* Ajout d'un conteneur de page */}
      <div className="main-content">
        <h1>Profil Utilisateur</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Affiche le message d'erreur si présent */}
        <div>
          <label>Email: </label>
          <p>{profile.email}</p> {/* Affiche l'email même en cas d'erreur */}
        </div>
        <button className="change-password-btn" onClick={handlePasswordChange}>
          Modifier le mot de passe
        </button>
      </div>
    </div>
  );
};

export default ProfilPage;
