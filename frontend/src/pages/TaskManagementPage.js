import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask } from './api'; // Assure-toi que les fonctions API sont bien définies

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // Pour naviguer vers la page de modification

  useEffect(() => {
    // Récupérer les tâches dès que la page est chargée
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches', error);
      }
    };
    fetchTasks();
  }, []);

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`); // Redirige vers la page de modification d'une tâche spécifique
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId)); // Mettre à jour la liste après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
    }
  };

  return (
    <div>
      <h1>Gestion des Tâches</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleEdit(task.id)}>Modifier</button>
            <button onClick={() => handleDelete(task.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManagementPage;
