import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';
import '../styles/profilepage.css';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';

const ProfilPage = () => {
  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        setErrorMessage('Erreur lors de la récupération du profil utilisateur.');
      }
    };
    fetchProfile();
  }, []);

  const handlePasswordChange = () => {
    navigate('/change-password');
  };

  return (
    <div className="profile-page">
      <h1 data-cy="profile-title">Profil Utilisateur</h1>
      {errorMessage && <p className="error-message" data-cy="profile-error">{errorMessage}</p>}
      {profile ? (
        <div className="profile-info">
          <label>Email:</label>
          <p data-cy="profile-email">{profile.email}</p>
          <button 
            onClick={handlePasswordChange} 
            data-cy="profile-change-password-button"
          >
            Modifier le mot de passe
          </button>
        </div>
      ) : (
        <p data-cy="profile-loading">Chargement...</p>
      )}
    </div>
  );
};

export default ProfilPage;
