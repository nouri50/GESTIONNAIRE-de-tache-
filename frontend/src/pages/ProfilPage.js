import React, { useEffect, useState } from 'react';
import { getUserProfile, deleteUser } from '../utils/api'; // Assurez-vous d'avoir cette fonction dans votre API
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilPage.css'; // Fichier CSS pour la page de profil
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';

const ProfilPage = () => {
  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // État pour afficher le modal
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

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(profile.id); // Supprime l'utilisateur par son ID
      navigate('/signup'); // Redirige après suppression
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
          <button onClick={handlePasswordChange}>Modifier le mot de passe</button>
          <button onClick={() => setShowModal(true)} className="delete-account-btn">
            Supprimer le compte
          </button>
        </div>
      ) : (
        <p>Chargement...</p>
      )}

      {/* Modal pour la suppression de compte */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
            <div className="modal-buttons">
              <button onClick={handleDeleteAccount} className="confirm-delete" data-testid="confirm-delete-button">
                Supprimer
              </button>
              <button onClick={() => setShowModal(false)} className="cancel-delete" data-testid="cancel-delete-button">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilPage;
