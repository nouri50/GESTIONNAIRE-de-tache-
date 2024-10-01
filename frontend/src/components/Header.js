import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../image/taches.png';
import '../styles/Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Suppression du token lors de la déconnexion
    setIsLoggedIn(false); // Mise à jour de l'état de connexion
    navigate('/login'); // Redirection vers la page de connexion
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <nav className="nav">
        <div className={`burger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-list ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/home">Accueil</Link></li>
          <li><Link to="/tache">Tâches</Link></li>
          <li><Link to="/gestion-utilisateur">Gestion des utilisateurs</Link></li>
          <li><Link to="/profil">Profil</Link></li>
          {isLoggedIn ? (
            <li><button onClick={handleLogout}>Déconnexion</button></li>
          ) : (
            <li><Link to="/login">Connexion</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
