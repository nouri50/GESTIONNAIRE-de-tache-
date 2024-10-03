import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTasks, updateTask } from '../utils/api';
import '../styles/Header.css';
import '../styles/Footer.css'; 
import '../styles/background.css';

const EditTaskPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const tasks = await getTasks();
        const taskToEdit = tasks.find(task => task.id === parseInt(taskId));
        if (taskToEdit) {
          setTask(taskToEdit);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la tâche :', error);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(taskId, task);
      navigate('/gestion-taches');  // Redirection après mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
    }
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <h1>Modifier la Tâche</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Titre de la tâche :
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description :
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Enregistrer</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditTaskPage;
