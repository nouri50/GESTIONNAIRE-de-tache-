import { listen } from './Apppp'; // Importer la logique d'application à partir de app.js
const port = process.env.PORT || 5000;

// Lancer le serveur
listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});
