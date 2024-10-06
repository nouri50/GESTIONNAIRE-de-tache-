import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../utils/api';
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import '../styles/UserManagementPage.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const fetchUsers = async () => {
        try {
          const usersList = await getUsers();
          setUsers(usersList);
        } catch (error) {
          setErrorMessage('Erreur lors de la récupération des utilisateurs.');
        }
      };
      fetchUsers();
    }
  }, [navigate]);

  return (
    <div className="user-management-page" data-cy="user-management-page">
      <h1 data-cy="page-title">Liste des utilisateurs</h1>

      {errorMessage && <p className="error-message" data-cy="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message" data-cy="success-message">{successMessage}</p>}

      {users.length === 0 && !errorMessage && <p data-cy="no-users-message">Aucun utilisateur trouvé.</p>}

      {/* Tableau des utilisateurs */}
      <table data-cy="users-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} data-cy={`user-row-${user.id}`}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button
                  onClick={() => handleEdit(user)}
                  data-cy={`edit-user-${user.id}`}
                >
                  Modifier
                </button>
                <button
                  onClick={() => openDeleteModal(user)}
                  data-cy={`delete-user-${user.id}`}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
