import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';  // Assurez-vous que cette fonction existe et est bien importée
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css'; // Assure-t
const ProfilPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();  // Supposons que c'est votre fonction d'API
        setUser(userProfile);
      } catch (error) {
        setError(error);
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Profil de l'utilisateur</h1>
      <p>Nom : {user.name}</p>
      <p>Email : {user.email}</p>
    </div>
  );
};

export default ProfilPage;
