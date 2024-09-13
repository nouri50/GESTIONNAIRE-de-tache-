import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; 
import LandingPage from './pages/LandingPage';
import TaskPage from './pages/TaskPage'; 
import UserManagementPage from './pages/UserManagementPage';
import ProfilPage from './pages/ProfilPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // Import de ForgotPasswordPage

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tache" element={<TaskPage />} />
          <Route path="/gestion-utilisateurs" element={<UserManagementPage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/changer-mot-de-passe" element={<ChangePasswordPage />} />
          <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} /> {/* Route ajoutée */}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;



