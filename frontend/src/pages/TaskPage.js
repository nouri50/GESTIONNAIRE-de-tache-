import React, { useState } from 'react';
import { addTask } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/TaskPage.css';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/background.css';

const TaskPage = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // Ajouter un état pour le type de message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage("Token non trouvé. Veuillez vous connecter.");
      setMessageType("error");
      return;
    }

    try {
      await addTask(task);
      setMessage('Tâche ajoutée avec succès.');
      setMessageType('success');
      setTimeout(() => {
        navigate('/gestion-taches');
      }, 2000);
    } catch (error) {
      setMessage("Erreur lors de l'ajout de la tâche.");
      setMessageType("error");
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <h1>Ajouter une tâche</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={task.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
          />
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminée</option>
          </select>
          <button type="submit">Ajouter Tâche</button>
        </form>
        {message && (
          <p className={messageType === 'success' ? 'success-message' : 'error-message'}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
