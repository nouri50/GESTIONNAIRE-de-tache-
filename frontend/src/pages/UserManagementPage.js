import React, { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUserWithPasswordCheck } from '../utils/api.js';
import editIcon from '../image/edit.png'; // Import de l'icône d'édition
import deleteIcon from '../image/effacer.png'; // Import de l'icône de suppression
import '../styles/UserManagementPage.css';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/background.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedRole, setEditedRole] = useState('');
  const [editedStatus, setEditedStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
    try {
      const response = await deleteUserWithPasswordCheck({
        adminPassword,
        id: selectedUserId,
      });

      console.log('Utilisateur supprimé:', response);
      setSuccessMessage("Utilisateur supprimé avec succès.");
      setUsers(users.filter((user) => user.id !== selectedUserId));
      closeDeleteModal();
    } catch (error) {
      console.error('Erreur lors de la suppression avec mot de passe:', error);
      setErrorMessage(error.response?.data?.message || 'Erreur lors de la suppression avec mot de passe.');
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

  // Fonction de recherche
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Gestion des utilisateurs</h1>
      {errorMessage && <p className="error-message" data-testid="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message" data-testid="success-message">{successMessage}</p>}
      
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
        data-testid="search-bar"
      />

      <table data-testid="user-table">
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
              <tr key={user.id} data-testid={`user-row-${user.id}`}>
                <td data-testid={`user-id-${user.id}`}>{user.id}</td>
                <td data-testid={`user-email-${user.id}`}>{user.email}</td>
                <td data-testid={`user-role-${user.id}`}>{user.role}</td>
                <td data-testid={`user-status-${user.id}`}>{user.status}</td>
                <td>
                  <img
                    src={editIcon}
                    alt="Éditer"
                    className="icon"
                    data-testid={`edit-icon-user-${user.id}`}
                    onClick={() => openEditModal(user)}
                  />
                  <img
                    src={deleteIcon}
                    alt="Supprimer"
                    className="icon"
                    data-testid={`delete-icon-user-${user.id}`}
                    onClick={() => openDeleteModal(user.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-results" data-testid="no-users">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="modal" data-testid="delete-modal">
          <div className="modal-content">
            <h2>Mot de passe administrateur requis</h2>
            <input
              type="password"
              placeholder="Mot de passe administrateur"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              data-testid="admin-password-input"
            />
            <button className="confirm-button" data-testid="confirm-delete-button" onClick={handleDeleteUser}>Confirmer la suppression</button>
            <button className="cancel-button" data-testid="cancel-delete-button" onClick={closeDeleteModal}>Annuler</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal" data-testid="edit-modal">
          <div className="modal-content">
            <h2>Modifier l'utilisateur</h2>
            <input
              type="email"
              placeholder="Email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              data-testid="edit-email-input"
            />
            <select
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
              data-testid="edit-role-select"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              data-testid="edit-status-select"
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
            <button className="confirm-button" data-testid="confirm-edit-button" onClick={handleEditUser}>Enregistrer les modifications</button>
            <button className="cancel-button" data-testid="cancel-edit-button" onClick={closeEditModal}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
