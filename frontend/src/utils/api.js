import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Importation correcte

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Vérification de l'expiration du token
const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);  // Appel correct à jwtDecode
      const currentTime = Date.now() / 1000;  // Temps actuel en secondes

      if (decodedToken.exp < currentTime) {
        alert('Votre session a expiré. Veuillez vous reconnecter.');
        localStorage.removeItem('token');
        window.location.href = '/login';  // Redirection vers la page de connexion
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du token :', error);
      localStorage.removeItem('token');
      window.location.href = '/login';  // Redirection vers la page de connexion
    }
  }
};

// Interception pour ajouter le token d'authentification
// Interception pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Token envoyé:', token);  // Loguez le token envoyé
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.error('Token manquant');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});




// Récupérer toutes les tâches
export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches', error);
    throw error;
  }
};

// Mettre à jour une tâche
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche', error);
    throw error;
  }
};

// Supprimer une tâche



// Supprimer une tâche
export const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}`);
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
    console.log('Réponse de la connexion:', response.data); // Log de la réponse
    return response.data;  // Retourne les données de connexion (y compris le token)
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};

// ==================== Profil Utilisateur ====================

// Récupérer le profil utilisateur
export const getUserProfile = async () => {
  try {
    const response = await api.get('/profile');
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

// Fonction pour supprimer un utilisateur avec vérification du mot de passe
export const deleteUserWithPasswordCheck = async (userId, password) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/users/delete-with-password`,
      { userId, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
