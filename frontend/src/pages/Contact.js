import React from 'react';
import '../styles/Contact.css'; // Assurez-vous de créer ce fichier CSS

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contactez-nous</h1>
      <p>Pour toute question ou demande d'information, vous pouvez nous contacter à l'adresse suivante :</p>
      <p>Email: <a href="mailto:contact@fictifemail.com">contact@fictifemail.com</a></p>
      <p>Nous vous répondrons dans les plus brefs délais.</p>
    </div>
  );
};

export default Contact;
