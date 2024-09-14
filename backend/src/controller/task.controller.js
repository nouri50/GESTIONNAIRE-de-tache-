import Task from '../model/task.model.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Échec de la récupération des tâches' });
  }
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = await Task.create({ title, description, userId: req.user.id });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Échec de la création de la tâche' });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (task.userId !== req.user.id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Échec de la mise à jour de la tâche' });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (task.userId !== req.user.id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }
    await task.destroy();
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Échec de la suppression de la tâche' });
  }
};
