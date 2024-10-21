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
import LegalPage from './pages/LegalPage';
import Contact from './pages/Contact';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AboutPage from './pages/En savoir plus';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifiez si le token est dans le localStorage et mettez à jour l'état de connexion
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/profil"
          element={isLoggedIn ? <ProfilPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/tache"
          element={isLoggedIn ? <TaskPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/gestion-taches"
          element={isLoggedIn ? <TaskManagementPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/gestion-utilisateur"
          element={isLoggedIn ? <UserManagementPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/en savoir plus" element={<AboutPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
