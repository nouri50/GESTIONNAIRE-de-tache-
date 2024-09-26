import React, { useEffect, useState } from 'react'; // Assurez-vous d'importer useEffect et useState
import { Link, useNavigate } from 'react-router-dom'; // Importation de useNavigate pour rediriger
import logo from '../image/taches.png';
import '../styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // État de connexion
  const navigate = useNavigate(); // Utilisé pour rediriger

  useEffect(() => {
    // Logique pour vérifier si l'utilisateur est connecté et mettre à jour l'état
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Si un token est présent, l'utilisateur est connecté
    }
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'une seule fois, au montage du composant

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token lors de la déconnexion
    setIsLoggedIn(false);  // Déconnexion de l'utilisateur
    navigate('/home'); // Redirection vers la page d'accueil après déconnexion
    console.log('Déconnexion réussie');
  };

  const handleLogin = () => {
    navigate('/login'); // Redirection vers la page de connexion
  };

  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li><Link to="/home" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
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
