import React, { useEffect, useState } from 'react';
import { getUserProfile, deleteUser } from '../utils/api';
import '../styles/ProfilPage.css';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
      } catch (error) {
        setErrorMessage("Erreur lors de la récupération des informations de l'utilisateur.");
      }
    };
    fetchUserProfile();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user.id);
      setSuccessMessage("Compte supprimé avec succès.");
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression du compte.");
    }
  };

  return (
    <div className="profile-container">
      <h1>Profil Utilisateur</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="profile-info">
        <p><span className="info-label">Email:</span> {user.email}</p>
        <p><span className="info-label">Statut:</span> {user.status}</p>
        <p><span className="info-label">Rôle:</span> {user.role}</p>
      </div>
      <button className="profile-button change-password-button">Modifier le mot de passe</button>
      <button className="profile-button delete-account-button" onClick={handleDeleteAccount}>Supprimer le compte</button>
    </div>
  );
};

export default ProfilePage;

