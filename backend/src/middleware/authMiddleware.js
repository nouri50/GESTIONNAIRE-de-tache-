import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Token invalide
            }
            req.user = user; // Sauvegarde les infos du token dans req.user
            next();
        });
    } else {
        res.sendStatus(401); // Pas de token trouvé
    }
};

export default authMiddleware;

