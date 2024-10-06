import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChangePasswordPage from './pages/ChangePasswordPage';
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
import ResetPasswordPage from './pages/ResetPasswordPage'; // Ajoute cette ligne pour importer la page légale
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Footer />
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tache" element={<TaskPage />} />
        <Route path="/gestion-taches" element={<TaskManagementPage />} />
        <Route path="/gestion-utilisateur" element={<UserManagementPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/About" element={<AboutPage />} /> 
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
