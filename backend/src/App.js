// app.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.route.js'; // Utilisation du bon chemin pour 'auth.route.js'
import taskRoutes from './routes/task.route.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});

