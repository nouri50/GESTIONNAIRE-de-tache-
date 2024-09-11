import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/taches.png';
import 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État de connexion

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);  // L'utilisateur est déconnecté
    console.log('Déconnexion réussie');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);  // L'utilisateur est connecté
    console.log('Connexion réussie');
  };

  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
          <li><Link to="/tache" onClick={() => setMenuOpen(false)}>Tâches</Link></li>
          <li><Link to="/gestion-utilisateur" onClick={() => setMenuOpen(false)}>Gestion des utilisateurs</Link></li>
          <li><Link to="/profil" onClick={() => setMenuOpen(false)}>Profil</Link></li>
          {/* Bouton qui change en fonction de l'état de connexion */}
          {isLoggedIn ? (
            <li><button className="logout-button" onClick={handleLogout}>Déconnexion</button></li>
          ) : (
            <li><button className="login-button" onClick={handleLogin}>Connexion</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;



