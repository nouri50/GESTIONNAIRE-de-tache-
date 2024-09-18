import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTasks, updateTask } from './api'; // API pour récupérer et mettre à jour une tâche

const EditTaskPage = () => {
  const { taskId } = useParams(); // Récupérer l'ID de la tâche depuis l'URL
  const [task, setTask] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les détails de la tâche lors du montage du composant
    const fetchTask = async () => {
      const tasks = await getTasks();
      const taskToEdit = tasks.find(task => task.id === parseInt(taskId));
      setTask(taskToEdit);
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(taskId, task);
    navigate('/manage-tasks'); // Redirige vers la gestion des tâches après mise à jour
  };

  return (
    <div>
      <h1>Modifier la Tâche</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditTaskPage;
