import axios from 'axios';  // Importer axios une seule fois

// Configurer l'instance Axios avec l'URL de base de l'API
const api = axios.create({
  baseURL: 'http://localhost:5001/api',  // Assurez-vous que l'URL du backend est correcte
});

// ==================== Gestion des Tâches ====================

// Fonction pour récupérer toutes les tâches
export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches', error);
    throw error;
  }
};

// Fonction pour ajouter une nouvelle tâche
export const addTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la tâche', error);
    throw error;
  }
};

// Fonction pour mettre à jour une tâche
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche', error);
    throw error;
  }
};

// Fonction pour supprimer une tâche
export const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}`);
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche', error);
    throw error;
  }
};

// ==================== Gestion des Utilisateurs ====================


// Récupérer la liste des utilisateurs
export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des utilisateurs.');
  }
};

// Suppression d'un utilisateur
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5001/api/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de l\'utilisateur.');
  }
};

// Mise à jour d'un utilisateur
// utils/api.js
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:5001/api/users/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    throw error;
  }
};



// ==================== Authentification ====================

// Fonction pour se connecter
export const signup = async (userData) => {
  try {
    const response = await axios.post('http://localhost:5001/api/auth/register', userData);
    return response.data;  // Retourne les données du backend, y compris le message de succès
  } catch (error) {
    throw error;  // Rejette l'erreur pour être gérée dans le frontend
  }
};

// Fonction pour se connecter
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    console.log('Réponse de la connexion:', response.data); // Log pour vérifier la réponse
    return response.data;  // Assurez-vous que le token est bien renvoyé ici
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};



// ==================== Profil Utilisateur ====================

// Fonction pour obtenir le profil utilisateur
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');  // Récupérer le token JWT stocké dans localStorage
    const response = await api.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,  // Envoyer le token JWT dans l'en-tête Authorization
      },
    });
    return response.data;  // Retourne les données du profil utilisateur
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur', error);
    throw error;
  }
};


export const changePassword = async (passwordData) => {
  const token = localStorage.getItem('token');
  console.log('Token envoyé pour changement de mot de passe:', token); // Log du token envoyé
  const response = await api.put('/auth/change-password', passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

