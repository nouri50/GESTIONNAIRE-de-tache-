import React from 'react';
import '../styles/LegalPage.css'; // Assure-toi de créer un fichier CSS correspondant
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';
const LegalPage = () => {
  return (
    <div className="legal-page">
      <h1>Politique de confidentialité</h1>
      <p>
        Votre confidentialité est importante pour nous. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre service de gestion des tâches.
      </p>
      <h2>1. Collecte des informations</h2>
      <p>
        Nous collectons des informations lorsque vous créez un compte, utilisez notre application ou interagissez avec nos services. Ces informations incluent votre nom, votre adresse e-mail et toute autre information pertinente liée à votre utilisation de notre service.
      </p>
      <h2>2. Utilisation des informations</h2>
      <p>
        Les informations collectées sont utilisées pour améliorer votre expérience, fournir des fonctionnalités personnalisées, et maintenir la sécurité et la fonctionnalité de notre service.
      </p>

      <h1>Conditions de service</h1>
      <p>
        En utilisant notre service de gestion des tâches, vous acceptez les termes et conditions suivants.
      </p>
      <h2>1. Utilisation autorisée</h2>
      <p>
        Vous acceptez d'utiliser le service uniquement à des fins légales et conformément à nos politiques. Vous ne devez pas utiliser le service pour des activités illégales ou nuisibles.
      </p>
      <h2>2. Propriété intellectuelle</h2>
      <p>
        Le contenu et les logiciels associés à notre service sont protégés par des droits d'auteur. Vous acceptez de ne pas copier, distribuer ou modifier ce contenu sans autorisation préalable.
      </p>
      <h2>3. Limitation de responsabilité</h2>
      <p>
        Nous ne sommes pas responsables des dommages ou pertes liés à l'utilisation de notre service, sauf dans les cas où la loi l'exige expressément.
      </p>
    </div>
  );
};

export default LegalPage;
