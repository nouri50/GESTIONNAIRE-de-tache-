import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../utils/api'; // Importer la fonction corrigée
import '../styles/TaskPage.css';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';

const TaskPage = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // Ajout d'un état pour le type de message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask(task); // Appel de la fonction pour ajouter la tâche
      setMessage('Tâche ajoutée avec succès.');
      setMessageType('success');
      setTimeout(() => {
        navigate('/gestion-taches'); // Redirige après ajout
      }, 2000);
    } catch (error) {
      setMessage('Erreur lors de l\'ajout de la tâche.');
      setMessageType('error');
    }
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
        {message && (
          <p
            data-cy="task-message"
            className={messageType === 'success' ? 'success-message' : 'error-message'}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
