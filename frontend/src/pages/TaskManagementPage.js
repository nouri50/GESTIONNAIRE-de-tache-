import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask, updateTask } from '../utils/api';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/background.css';
import '../styles/TaskManagementPage.css';
import edit from '../image/edit.png';
import effacer from '../image/effacer.png';

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    description: '',
    status: ''
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksList = await getTasks();
        setTasks(tasksList);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
        setErrorMessage('Erreur lors de la récupération des tâches.');
      }
    };
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTask({
      title: task.title,
      description: task.description,
      status: task.status
    });
  };

  const handleSave = async () => {
    try {
      await updateTask(editingTaskId, updatedTask);
      setTasks(tasks.map(task => (task.id === editingTaskId ? { ...task, ...updatedTask } : task)));
      setEditingTaskId(null);
    } catch (error) {
      console.error('Erreur lors de la modification de la tâche:', error);
      setErrorMessage('Erreur lors de la modification de la tâche.');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      setErrorMessage('Erreur lors de la suppression de la tâche.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  return (
    <div className="user-management-page">
      <h1>Gestion des Tâches</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    name="title"
                    value={updatedTask.title}
                    onChange={handleChange}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <textarea
                    name="description"
                    value={updatedTask.description}
                    onChange={handleChange}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <select
                    name="status"
                    value={updatedTask.status}
                    onChange={handleChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  task.status
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <>
                    <button onClick={handleSave}>Enregistrer</button>
                    <button onClick={() => setEditingTaskId(null)}>Annuler</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(task)}>
                      <img src={edit} alt="Modifier" />
                    </button>
                    <button onClick={() => handleDelete(task.id)}>
                      <img src={effacer} alt="Supprimer" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManagementPage;
