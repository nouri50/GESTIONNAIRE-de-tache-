import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TaskPage.css';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/background.css';
import { jwtDecode } from 'jwt-decode';


const TaskPage = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token non trouvé. Veuillez vous connecter.');
      }

      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const userId = decodedToken.user_id || decodedToken.id || decodedToken.sub;
      if (!userId) {
        throw new Error("L'ID de l'utilisateur est introuvable dans le token.");
      }

      const response = await axios.post(
        'http://localhost:5001/api/tasks',
        { ...task, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Tâche ajoutée :', response.data);
      setMessage('Tâche ajoutée avec succès.');
      setMessageType('success');

      setTimeout(() => {
        navigate('/gestion-taches');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche', error);
      setMessage('Erreur lors de l\'ajout de la tâche : ' + (error.response?.data?.message || error.message));
      setMessageType('error');
    }
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
