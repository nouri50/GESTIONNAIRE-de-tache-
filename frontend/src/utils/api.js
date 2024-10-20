import axios from 'axios';
import jwtDecode from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    if (!config.url.includes('/auth/register') && !config.url.includes('/auth/login')) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Token envoyé:', token);
      } else {
        console.warn('Token manquant');
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// ==================== Gestion des Tâches ====================

// Ajouter une nouvelle tâche
export const addTask = async (taskData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token non trouvé. Veuillez vous connecter.");
    }

    const response = await api.post('/tasks', taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la tâche', error);
    throw error;
  }
};




// Récupérer toutes les tâches

// Récupérer toutes les tâches
export const getTasks = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token non trouvé. Veuillez vous connecter.");
    }

    const response = await api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches', error);
    throw error;
  }
};

// Mettre à jour une tâche
export const updateTask = async (taskId, taskData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token non trouvé. Veuillez vous connecter.");
    }

    const response = await api.put(`/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche', error);
    throw error;
  }
};

// Supprimer une tâche
export const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token non trouvé. Veuillez vous connecter.");
    }

    await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche', error);
    throw error;
  }
};

// ==================== Gestion des Utilisateurs ====================

// Récupérer tous les utilisateurs
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs', error);
    throw error;
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    throw error;
  }
};

// Supprimer un utilisateur
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur', error);
    throw error;
  }
};

// ==================== Authentification ====================

// Inscription
export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription', error);
    throw error;
  }
};

// Connexion//
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};
// ==================== Profil Utilisateur ====================

// Récupérer le profil utilisateur
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur', error);
    throw error;
  }
};

// Changer le mot de passe
export const changePassword = async (passwordData) => {
  try {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe', error);
    throw error;
  }
};

// Supprimer un utilisateur avec vérification du mot de passe
export const deleteUserWithPasswordCheck = async (data) => {
  const token = localStorage.getItem('token');
  return await axios.post(
    'http://localhost:5001/api/users/delete-with-password',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

