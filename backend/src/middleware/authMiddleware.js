import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Récupérer le token JWT
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Vérifier le token
    req.user = decoded;  // Stocker les infos de l'utilisateur dans req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide.' });
  }
};
