import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css'; 
import '../styles/homepage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="main-content">
        <h1>Bienvenue sur le Gestionnaire de Tâches</h1>
        <p>Gérez vos tâches facilement et efficacement.</p>

        <div className="dashboard">
          {/* Première colonne contenant 2 boutons */}
          <div className="dashboard-column">
            <button className="dashboard-btn" onClick={() => navigate('/profil')}>
              Profil
            </button>
            <button className="dashboard-btn" onClick={() => navigate('/tache')}>
              Mes Tâches
            </button>
          </div>

          {/* Deuxième colonne contenant 2 boutons */}
          <div className="dashboard-column">
            <button className="dashboard-btn" onClick={() => navigate('/gestion-utilisateur')}>
              Gestion des utilisateurs
            </button>
            <button className="dashboard-btn" onClick={() => navigate('/gestion-taches')}>
              Gestion des taches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
