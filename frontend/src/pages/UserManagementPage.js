import React, { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUserWithPasswordCheck } from '../utils/api.js';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/UserManagementPage.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedRole, setEditedRole] = useState('');
  const [editedStatus, setEditedStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        setErrorMessage('Erreur lors de la récupération des utilisateurs.');
      }
    };
    fetchUsers();
  }, []);

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setAdminPassword('');
    setErrorMessage('');
  };

  const handleDeleteUser = async () => {
    if (!adminPassword) {
      setErrorMessage('Veuillez entrer le mot de passe.');
      return;
    }
    try {
      const response = await deleteUserWithPasswordCheck(selectedUserId, adminPassword);
      setSuccessMessage(response.message);
      setErrorMessage('');
      setShowDeleteModal(false);
      setUsers(users.filter((user) => user.id !== selectedUserId));
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erreur lors de la suppression.');
    }
  };

  const openEditModal = (user) => {
    setSelectedUserId(user.id);
    setEditedEmail(user.email);
    setEditedRole(user.role);
    setEditedStatus(user.status);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditedEmail('');
    setEditedRole('');
    setEditedStatus('');
    setErrorMessage('');
  };

  const handleEditUser = async () => {
    try {
      const response = await updateUser(selectedUserId, {
        email: editedEmail,
        role: editedRole,
        status: editedStatus,
      });
      setSuccessMessage(response.message);
      setErrorMessage('');
      setShowEditModal(false);
      setUsers(users.map((user) =>
        user.id === selectedUserId ? { ...user, email: editedEmail, role: editedRole, status: editedStatus } : user
      ));
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erreur lors de la modification.');
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Gestion des utilisateurs</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <input
        type="text"
        className="search-input"
        placeholder="Rechercher un utilisateur..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <FaEdit
                    className="icon"
                    onClick={() => openEditModal(user)}
                  />
                  <FaTrash
                    className="icon"
                    onClick={() => openDeleteModal(user.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-results">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Mot de passe administrateur requis</h2>
            <input
              type="password"
              placeholder="Mot de passe administrateur"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button className="confirm-button" onClick={handleDeleteUser}>Confirmer la suppression</button>
            <button className="cancel-button" onClick={closeDeleteModal}>Annuler</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modifier l'utilisateur</h2>
            <input
              type="email"
              placeholder="Email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <select
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
            <button className="confirm-button" onClick={handleEditUser}>Enregistrer les modifications</button>
            <button className="cancel-button" onClick={closeEditModal}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
