import React from 'react';
import '../styles/TaskPage.css';


const TaskPage = () => {
  return (
    <div className="task-page-container">
    <h1>Gestion des tâches</h1>
    <div className="task-list">
      <input type="text" placeholder="Tâche 1" />
      <button>Modifier</button>
      <button>Supprimer</button>
  
      <input type="text" placeholder="Tâche 2" />
      <button>Modifier</button>
      <button>Supprimer</button>
  
      <input type="text" placeholder="Tâche 3" />
      <button>Modifier</button>
      <button>Supprimer</button>
    </div>
  
    <button className="add-task-button">Ajouter une nouvelle tâche</button>
  </div>
  

  );
};

export default TaskPage;
