import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Stocker les informations de l'utilisateur décodé dans la requête
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};

export default authMiddleware;
