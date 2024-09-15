import 'dotenv/config'; // Charger les variables d'environnement
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.route.js'; // Corriger ici pour 'routes'
import taskRoutes from './routes/task.route.js'; // Corriger ici pour 'routes'

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Exemple de route d'accueil
app.get('/', (req, res) => {
  res.send('API Gestionnaire de Tâches');
});

// Utiliser les routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Démarrage du serveur backend
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Le serveur backend tourne sur le port ${PORT}`);
});

export default app;
