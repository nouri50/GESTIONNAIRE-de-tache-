import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('Aucun token trouvé');  // Log si aucun token n'est trouvé
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Utilisateur authentifié :', req.user);  // Log l'utilisateur authentifié
    next();
  } catch (error) {
    console.log('Token invalide :', error);  // Log si le token est invalide
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

export default authMiddleware;
