import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    console.log('Redirection vers la page d\'inscription');
    navigate('/signup');
  };

  const handleLearnMore = () => {
    console.log('En savoir plus cliqué');
    // Ajoute une logique ici si nécessaire pour en savoir plus
  };

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
        <button className="start-button" onClick={handleStart}>Commencer</button>
        <button className="learn-more-button" onClick={handleLearnMore}>En savoir plus</button>
      </div>
    </div>
  );
};

export default LandingPage;
