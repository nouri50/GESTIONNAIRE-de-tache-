import React from 'react';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/AboutPage.css'; // Crée un fichier de style spécifique pour cette page

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>En savoir plus</h1>
      <section className="about-content">
        <p>
          Bienvenue sur notre gestionnaire de tâches, un projet conçu pour simplifier la gestion des activités
          quotidiennes grâce à une interface intuitive et moderne.
        </p>
        <h2>Objectif du projet</h2>
        <p>
          Ce gestionnaire de tâches a été développé dans le cadre de mon <strong>projet de validation de titre professionnel de développeur web</strong>.
          L'objectif principal est de proposer une solution simple et efficace pour organiser et suivre les tâches
          quotidiennes de manière claire et accessible.
        </p>
        <h2>Pourquoi ce projet ?</h2>
        <p>
          Ce projet a été conçu pour répondre à un besoin réel d'organisation dans un environnement de travail ou
          personnel. L'interface est pensée pour être à la fois facile à prendre en main et efficace, permettant à
          l'utilisateur de gérer ses tâches rapidement et sereinement.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
