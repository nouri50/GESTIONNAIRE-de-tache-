import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate
import '../styles/TaskPage.css'; 
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/background.css';
const TaskPage = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook pour rediriger

  const addTask = async (taskData) => {
    try {
      const token = localStorage.getItem('token');  // Récupère le token JWT
      if (!token) {
        throw new Error('Token non trouvé. Veuillez vous connecter.');
      }

      const response = await axios.post('http://localhost:5001/api/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Envoie le token dans l'en-tête Authorization
          'Content-Type': 'application/json',
        },
      });
      console.log('Tâche ajoutée :', response.data);
      setMessage('Tâche ajoutée avec succès.');
      
      // Rediriger vers la page du menu (par exemple, gestion des tâches) après 2 secondes
      setTimeout(() => {
        navigate('/gestion-taches'); // Changez cette route selon votre configuration de page de menu
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
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default TaskPage;
