import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; 
import '../styles/background.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        <Link to="/legal">Politique de confidentialité</Link> | 
        <Link to="/legal"> Conditions de service</Link> | 
        <Link to="/contact">Contact</Link>
      </p>
    </footer>
  );
};

export default Footer;
