import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Tu peux utiliser axios ou fetch pour faire des requêtes HTTP

const ProfilPage = () => {
  // États pour stocker les informations de l'utilisateur
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null); // État pour gérer les erreurs éventuelles

  // Récupérer les informations de l'utilisateur à partir de l'API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Remplace '/api/user/profile' par l'URL correcte de ton backend
        const userData = response.data;

        // Mise à jour des états avec les données récupérées
        setUsername(userData.username || ''); // Parfois les données peuvent être nulles, donc on protège avec une valeur par défaut
        setEmail(userData.email || '');
        setStatus(userData.status || '');
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        setError('Impossible de charger les informations du profil.');
      }
    };

    fetchUserProfile();
  }, []); // Le tableau vide [] signifie que l'effet se produit seulement une fois au chargement

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profil-container">
      <h1>Mon Profil</h1>
      <div className="profil-details">
        <label>Nom d'utilisateur:</label>
        <input
          type="text"
          value={username} // Affiche la valeur dynamique
          readOnly // Désactiver la modification
          className="profil-input"
        />
        <label>Email:</label>
        <input
          type="email"
          value={email} // Affiche la valeur dynamique
          readOnly // Désactiver la modification
          className="profil-input"
        />
        <label>Statut:</label>
        <input
          type="text"
          value={status} // Affiche la valeur dynamique
          readOnly // Désactiver la modification
          className="profil-input"
        />
        <button className="edit-button" disabled>
          Modifier le profil
        </button>
      </div>
    </div>
  );
};

export default ProfilPage;
