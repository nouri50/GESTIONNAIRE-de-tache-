import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask } from '../utils/api';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css'; 

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getTasks(token);
        setTasks(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches', error);
        setErrorMessage("Erreur lors de la récupération des tâches");
      }
    };
    fetchTasks();
  }, []);

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await deleteTask(taskId, token);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
      setErrorMessage('Erreur lors de la suppression de la tâche');
    }
  };

  return (
    <div>
      <h1>Gestion des Tâches</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
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
