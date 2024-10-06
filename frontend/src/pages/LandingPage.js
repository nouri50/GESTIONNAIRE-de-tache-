import React from 'react';
import { Link } from 'react-router-dom'; // Import du composant Link
import '../styles/LandingPage.css';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Gérez vos tâches facilement et efficacement</h1>
      <div className="paragraph-container">
        <p>
          Un outil simple pour vous aider à organiser et suivre vos tâches facilement. 
          Gagnez du temps et restez productif !
        </p>
      </div>
      <div className="buttons-container">
        {/* Bouton redirigeant vers la page d'inscription */}
        <Link to="/signup">
          <button className="start-button">Commencer</button>
        </Link>
        <Link to="/About">
        <button className="learn-more-button">En savoir plus</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
