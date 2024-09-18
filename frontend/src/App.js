import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChangePasswordPage from './pages/ChangePasswordPage';
import EditTaskPage from './pages/EditTaskPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilPage from './pages/ProfilPage';
import SignupPage from './pages/SignupPage';
import TaskManagementPage from './pages/TaskManagementPage';
import TaskPage from './pages/TaskPage';
import UserManagementPage from './pages/UserManagementPage';
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage'; // Page pour gérer les erreurs 404

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} /> {/* Redirige vers la landing page */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tache" element={<TaskPage />} /> {/* Page de création de tâches */}
        <Route path="/gestion-taches" element={<TaskManagementPage />} /> {/* Page de gestion des tâches */}
        <Route path="/modifier-tache/:taskId" element={<EditTaskPage />} /> {/* Page pour modifier une tâche */}
        <Route path="/gestion-utilisateur" element={<UserManagementPage />} /> {/* Page de gestion des utilisateurs */}
        <Route path="/profil" element={<ProfilPage />} /> {/* Page de profil */}
        <Route path="/login" element={<LoginPage />} /> {/* Page de login */}
        <Route path="/signup" element={<SignupPage />} /> {/* Page d'inscription */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Page de mot de passe oublié */}
        <Route path="/change-password" element={<ChangePasswordPage />} /> {/* Page pour changer le mot de passe */}
        <Route path="*" element={<NotFoundPage />} /> {/* Route 404 */}
      </Routes>
    </Router>
  );
};

export default App;

