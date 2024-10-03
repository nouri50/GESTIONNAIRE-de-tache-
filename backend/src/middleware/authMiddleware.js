import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Récupère le token JWT dans l'en-tête Authorization

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Vérifie et décode le token
    req.user = decoded;  // Ajoute l'utilisateur décodé à la requête
    next();  // Passe au contrôleur suivant
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide.' });
  }
};

export default authMiddleware;
