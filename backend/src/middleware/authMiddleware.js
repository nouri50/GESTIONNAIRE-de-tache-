import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Récupérer le token après "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Ajouter l'utilisateur décodé à la requête
    next();  // Passer à l'étape suivante
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

export default authMiddleware;
