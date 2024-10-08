import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Stocke les informations décodées du token dans req.user
    next();  // Continue avec l'exécution de la prochaine fonction middleware
  } catch (error) {
    res.status(400).json({ message: 'Token invalide.' });
  }
};

export default authMiddleware;
