// backend/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Vérification si le token est présent

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérification du token JWT
    req.user = decoded; // Stockage des informations utilisateur dans la requête
    next(); // Poursuivre l'exécution si tout est bon
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

export default authMiddleware;
