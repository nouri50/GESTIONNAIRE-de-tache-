import axios from 'axios';

// Configuration de l'instance Axios
const api = axios.create({
  baseURL: 'http://localhost:5001/api',  // URL de base de l'API backend
});


// ==================== Gestion des Tâches ====================

export const getTasks = async () => {
  try {
    const response = await api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches', error);
    throw error;
  }
};

export const addTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la tâche', error);
    throw error;
  }
};

// Ajouter ici les fonctions deleteTask et updateTask
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche', error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche', error);
    throw error;
  }
};

// ==================== Gestion des Utilisateurs ====================

export const getUsers = async () => {
  try {
    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedData, {
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

// ==================== Vérification du Mot de Passe ====================


// Vérification du mot de passe


export const verifyPassword = async (password) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.post('/auth/verify-password', { password }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.isValid;
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe:', error);
    throw error;
  }
};




// ==================== Gestion du Profil ====================

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur:', error);
    throw error;
  }
};

// ==================== Authentification ====================

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;  // Assurez-vous que le token est bien renvoyé ici
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};


export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.put('/auth/change-password', passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    throw error;
  }
};
export const deleteUserWithAdminPasswordCheck = async ({ targetUserId, adminPassword }) => {
  try {
    const response = await api.post('/users/delete', {
      targetUserId,
      adminPassword,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur avec vérification admin:', error);
    throw error;
  }
};
