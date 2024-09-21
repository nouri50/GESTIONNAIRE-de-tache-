import React, { useState } from 'react';
import axios from 'axios';
import '../styles/background.css'; // Import du style pour le background
import '../styles/Header.css';
import '../styles/Footer.css';
const TaskPage = () => {
  const [task, setTask] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Si un token est requis
        }
      });
      console.log('Tâche ajoutée avec succès', response.data);
      setMessage('Tâche ajoutée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche', error);
      setMessage('Erreur lors de l\'ajout de la tâche');
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
    <div className="page-container"> {/* Application du background */}
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
          <button type="submit">Ajouter Tâche</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default TaskPage;
