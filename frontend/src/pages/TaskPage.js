import React, { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../utils/api';  // Import correct
import '../styles/TaskPage.css';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = await addTask({ title: taskTitle });
    setTasks([...tasks, newTask]);
    setTaskTitle('');
  };

  return (
    <div>
      <h1>Tâches</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={taskTitle} 
          onChange={(e) => setTaskTitle(e.target.value)} 
          placeholder="Nouvelle tâche" 
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
