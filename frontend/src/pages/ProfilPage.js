import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilPage.css'; // Assurez-vous que le fichier CSS est lié

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
        setErrorMessage('Votre session a expiré. Veuillez vous reconnecter.');
        setTimeout(() => {
          navigate('/login'); // Redirige vers la page de connexion après 3 secondes
        }, 3000);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handlePasswordChange = () => {
    navigate('/change-password'); // Redirige vers la page de modification de mot de passe
  };

  return (
    <div className="profile-page">
      <h1>Profil Utilisateur</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {profile ? (
        <div className="profile-info">
          <label>Email:</label>
          <p>{profile.email}</p>
          <button onClick={handlePasswordChange}>Modifier le mot de passe</button>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default ProfilPage;
