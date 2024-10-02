import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Récupère le token depuis le header
  
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie et décode le token
    req.user = decoded; // Associe les données décodées à req.user
    next();
  } catch (error) {
    console.error('Token invalide :', error);
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

export default authMiddleware;
