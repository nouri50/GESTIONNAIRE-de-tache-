import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getUserProfile } from '../utils/api';
import '../styles/ProfilPage.css'; 
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';
const ProfilPage = () => {
  const [profile, setProfile] = useState({
    email: 'Chargement...', 
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data); 
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Impossible de récupérer les informations du profil.');
      }
    };
    fetchProfile();
  }, []);

  const handlePasswordChange = () => {
    navigate('/change-password'); 
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">Profil Utilisateur</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <div className="profile-field">
        <label className="profile-label">Email :</label>
        <input
          type="text"
          value={profile.email}
          className="profile-input"
          readOnly
        />
      </div>

      <div className="profile-field">
        <label className="profile-label">Mot de passe :</label>
      </div>

      <div className="center-content">
        <button
          className="modify-password-button"
          onClick={handlePasswordChange}
        >
          Modifier le mot de passe
        </button>
      </div>
    </div>
  );
};

export default ProfilPage;
