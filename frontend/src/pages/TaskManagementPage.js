import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask, updateTask } from '../utils/api';
import '../styles/Header.css';
import '../styles/Footer.css'; 
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
    status: 'pending' // Valeur par défaut en cas d'édition
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskList = await getTasks();
        setTasks(taskList);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
        setErrorMessage('Erreur lors de la récupération des tâches.');
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      setErrorMessage('Erreur lors de la suppression de la tâche.');
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTask({
      title: task.title,
      description: task.description || '',
      status: task.status || 'pending'
    });
  };

  const handleSave = async () => {
    try {
      await updateTask(editingTaskId, updatedTask);
      setEditingTaskId(null);
    } catch (error) {
      console.error('Erreur lors de la modification de la tâche:', error);
      setErrorMessage('Erreur lors de la modification de la tâche.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  return (
    <div className="task-management-page">
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
                    value={updatedTask.title}
                    name="title"
                    onChange={handleChange}
                    data-testid={`task-title-input-${task.id}`} 
                    // XPath: //table/tbody/tr[1]/td[1]/input
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <textarea
                    value={updatedTask.description}
                    name="description"
                    onChange={handleChange}
                    data-testid={`task-desc-input-${task.id}`} 
                    // XPath: //table/tbody/tr[1]/td[2]/textarea
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <select
                    value={updatedTask.status}
                    name="status"
                    onChange={handleChange}
                    data-testid={`task-status-select-${task.id}`} 
                    // XPath: //table/tbody/tr[1]/td[3]/select
                  >
                    <option value="pending">En attente</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Complété</option>
                  </select>
                ) : (
                  task.status === 'pending'
                    ? 'En attente'
                    : task.status === 'in_progress'
                    ? 'En cours'
                    : 'Complété'
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      data-testid={`task-save-button-${task.id}`} 
                      // XPath: //table/tbody/tr[1]/td[4]/button[1]
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setEditingTaskId(null)}
                      data-testid={`task-cancel-button-${task.id}`} 
                      // XPath: //table/tbody/tr[1]/td[4]/button[2]
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(task)}
                      data-testid={`task-edit-button-${task.id}`} 
                      // XPath: //table/tbody/tr[1]/td[4]/button[1]
                    >
                      <img src={edit} className="edit-icon" alt="Modifier" />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      data-testid={`task-delete-button-${task.id}`} 
                      // XPath: //table/tbody/tr[1]/td[4]/button[2]
                    >
                      <img src={effacer} className="delete-icon" alt="Supprimer" />
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
