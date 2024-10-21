import { jwtDecode } from 'jwt-decode'; // Correction de l'import
import Task from '../model/task.model.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const user_id = req.user.id;  // Utilisez `user_id` ici pour correspondre à la base de données

    const newTask = await Task.create({
      title,
      description,
      status,
      user_id,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la tâche' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // Assurez-vous que l'ID utilisateur est bien extrait
    const tasks = await Task.findAll({
      where: {
        user_id: userId, // Utilisez `user_id` ici
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches.' });
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
    if (task.user_id !== req.user.id) {
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
    if (task.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }
    await task.destroy();
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    console.error('Erreur lors de la suppression de la tâche:', err);
    res.status(500).json({ error: 'Échec de la suppression de la tâche' });
  }
};
