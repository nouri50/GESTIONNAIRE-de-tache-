import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
 // Assurez-vous que jwtDecode est bien importé
import axios from 'axios';
import '../styles/TaskPage.css';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/background.css';

const TaskPage = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  // Gestion de la modification des champs du formulaire
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token non trouvé. Veuillez vous connecter.');
      }

      // Décodage du token pour obtenir l'ID utilisateur
      const decodedToken = jwtDecode(token);
      console.log("Token décodé : ", decodedToken); // Vérifiez le contenu du token
      const userId = decodedToken.userId || decodedToken.id || decodedToken.sub; // Assurez-vous que la bonne clé est utilisée

      if (!userId) {
        throw new Error("L'ID de l'utilisateur est introuvable dans le token.");
      }

      // Ajoutez un log pour voir les données de la tâche qui vont être envoyées
      console.log("Données de la tâche avant l'envoi :", { ...task, userId });

      // Ajout de la tâche avec axios
      const response = await axios.post(
        'http://localhost:5001/api/tasks',
        { ...task, userId },
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

      // Redirection après un délai
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