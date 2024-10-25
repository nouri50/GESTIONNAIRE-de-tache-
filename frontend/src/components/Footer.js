import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; 
import '../styles/background.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        <Link to="/conditionlegal">Politique de confidentialité</Link> | 
        <Link to="/conditionlegal"> Conditions de service</Link> | 
        <Link to="/contactez_moi">Contact</Link>
      </p>
    </footer>
  );
};

export default Footer;
