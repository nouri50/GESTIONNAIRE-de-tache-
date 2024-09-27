import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  console.log('Token reçu:', token); // Log du token pour voir ce qui est envoyé

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log('Token invalide');
        return res.sendStatus(403); // Token invalide
      }
      req.user = user; // Ajoute les infos de l'utilisateur au request
      next();
    });
  } else {
    console.log('Aucun token trouvé');
    res.sendStatus(401); // Pas de token trouvé
  }
};

export default authMiddleware;
