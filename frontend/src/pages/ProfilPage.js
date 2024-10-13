import React, { useEffect, useState } from 'react';
import { getUserProfile, deleteUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilPage.css';

const ProfilPage = () => {
  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage('Votre session a expiré. Veuillez vous reconnecter.');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else if (error.response && error.response.status === 404) {
          setErrorMessage('Profil utilisateur non trouvé.');
        } else {
          setErrorMessage('Une erreur est survenue lors de la récupération du profil.');
        }
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(profile.id);
      navigate('/signup');
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression du compte.");
    }
  };

  return (
    <div className="profile-page">
      <h1>Profil Utilisateur</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {profile ? (
        <div className="profile-info">
          <label>Email:</label>
          <p>{profile.email}</p>
          <button onClick={() => navigate('/change-password')}>Modifier le mot de passe</button>
          <button onClick={() => setShowModal(true)} className="delete-account-btn">
            Supprimer le compte
          </button>
        </div>
      ) : (
        <p>Chargement...</p>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
            <div className="modal-buttons">
              <button onClick={handleDeleteAccount} className="confirm-delete">Supprimer</button>
              <button onClick={() => setShowModal(false)} className="cancel-delete">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilPage;
