import Task from '../model/task.model.js';
import { jwtDecode } from 'jwt-decode'; // Import correct

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Vérifiez si l'utilisateur est bien extrait du token par authMiddleware
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "L'ID de l'utilisateur est requis pour créer une tâche." });
    }

    const userId = req.user.id;
    const task = await Task.create({ title, description, status, userId });
    res.status(201).json(task);
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la tâche' });
  }
};



export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    if (task.userId !== req.user.id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la tâche:', err);
    res.status(500).json({ error: 'Échec de la mise à jour de la tâche' });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    if (task.userId !== req.user.id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }
    await task.destroy();
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    console.error('Erreur lors de la suppression de la tâche:', err);
    res.status(500).json({ error: 'Échec de la suppression de la tâche' });
  }
};
