import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/TaskPage.css';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';
const TaskPage = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const addTask = async (taskData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token non trouvé. Veuillez vous connecter.');
      }

      const response = await axios.post('http://localhost:5001/api/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Tâche ajoutée :', response.data);
      setMessage('Tâche ajoutée avec succès.');
      setTimeout(() => {
        navigate('/gestion-taches');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche', error);
      setMessage('Erreur lors de l\'ajout de la tâche.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container" data-cy="task-page">
      <div className="main-content">
        <h1 data-cy="task-page-title">Ajouter une tâche</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={task.title}
            onChange={handleChange}
            required
            data-cy="task-title-input"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            data-cy="task-description-input"
          />
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            required
            data-cy="task-status-select"
          >
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminée</option>
          </select>
          <button type="submit" data-cy="task-submit-button">Ajouter Tâche</button>
        </form>
        {message && <p data-cy="task-message">{message}</p>}
      </div>
    </div>
  );
};

export default TaskPage;
