
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilPage from './pages/ProfilPage';
import SignupPage from './pages/SignupPage';
import TaskManagementPage from './pages/TaskManagementPage';
import TaskPage from './pages/TaskPage';
import UserManagementPage from './pages/UserManagementPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import conditionlegal from './pages/LegalPage';
import contactez_moi from './pages/Contact';
import LegalPage from './pages/LegalPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier si un token existe dans le localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/profil" element={isLoggedIn ? <ProfilPage /> : <Navigate to="/login" />} />
        <Route path="/tache" element={isLoggedIn ? <TaskPage /> : <Navigate to="/login" />} />
        <Route path="/gestion-taches" element={isLoggedIn ? <TaskManagementPage /> : <Navigate to="/login" />} />
        <Route path="/gestion-utilisateur" element={isLoggedIn ? <UserManagementPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/conditionlegal" element={<LegalPage />} />
        <Route path="/contactez_moi" element={<contactez_moi />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
