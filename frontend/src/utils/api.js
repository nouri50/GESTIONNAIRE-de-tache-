import axios from 'axios';
import jwtDecode from 'jwt-decode'; // Utilisation de l'importation correcte

// Création d'une instance axios pour l'API
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un token automatiquement aux requêtes
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

// Ajouter une tâche
export const addTask = async (taskData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token non trouvé. Veuillez vous connecter.');
  }

  try {
    const response = await axios.post('http://localhost:5001/api/tasks', taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
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
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token non trouvé. Veuillez vous connecter.");
    }

    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`, // Assurez-vous que le token est bien présent ici
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs', error);
    throw error;
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (userId, updatedData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token non trouvé. Veuillez vous connecter.");
    }

    const response = await axios.put(`http://localhost:5001/api/users/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token ici
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    throw error;
  }
};

// Supprimer un utilisateur
export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token non trouvé. Veuillez vous connecter.');
    }
    
    const response = await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

// Connexion
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

// ==================== Réinitialisation du mot de passe ====================

// Oubli de mot de passe (envoyer l'email de réinitialisation)
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation du mot de passe', error);
    throw error;
  }
};

// Réinitialisation du mot de passe (après réception du token)
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post(`/auth/reset-password/${token}`, { newPassword });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe', error);
    throw error;
  }
};

// ==================== Profil Utilisateur ====================

// Récupérer le profil utilisateur
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token non trouvé. Veuillez vous connecter.');
    }

    const response = await axios.get('http://localhost:5001/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // Assurez-vous que le token est bien présent ici
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur', error);
    throw error;
  }
};


export const changePassword = async (passwordData) => {
  try {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe', error);
    throw error;
  }
};

export const deleteUserWithPasswordCheck = async (data) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("Token non trouvé. Veuillez vous connecter.");
  }
  
  try {
    const response = await api.post('/users/delete-with-password', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression avec vérification du mot de passe', error);
    throw error;
  }
};
