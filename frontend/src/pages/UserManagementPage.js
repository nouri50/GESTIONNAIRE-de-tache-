import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../utils/api';
import '../styles/Header.css';
import '../styles/Footer.css';  
import '../styles/UserManagementPage.css';
import '../styles/background.css'; 
import edit from '../image/edit.png';
import effacer from '../image/effacer.png';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [password, setPassword] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await getUsers();
        setUsers(usersList);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setErrorMessage('Erreur lors de la récupération des utilisateurs.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (password === '') {
      alert("Veuillez saisir votre mot de passe.");
      return;
    }
    
    try {
      await deleteUser(userToDelete.id);
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setSuccessMessage('Ce compte a été bien supprimé');
      setShowDeleteModal(false);
      setPassword('');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      setErrorMessage('Erreur lors de la suppression de l\'utilisateur.');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUserRole(user.role);
    setUserStatus(user.status);
  };

  const handleUpdate = async () => {
    try {
      await updateUser(editingUser.id, { role: userRole, status: userStatus });
      setSuccessMessage('Utilisateur mis à jour avec succès');
      setEditingUser(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      setErrorMessage('Erreur lors de la mise à jour de l\'utilisateur.');
    }
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPassword('');
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-page" xpath="//*[@id='user-management-page']">
      <h1>Liste des utilisateurs</h1>

      {errorMessage && <p className="error-message" xpath="//*[@id='error-message']">{errorMessage}</p>}
      {successMessage && <p className="success-message" xpath="//*[@id='success-message']">{successMessage}</p>}

      {/* Barre de recherche */}
      <div className="search-container" xpath="//*[@id='search-container']">
        <input
          type="text"
          placeholder="Rechercher"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          xpath="//*[@id='search-input']"
        />
        <button xpath="//*[@id='search-button']">Chercher</button>
      </div>

      {/* Tableau des utilisateurs */}
      <table xpath="//*[@id='user-table']">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td xpath={`//*[@id='user-email-${user.id}']`}>{user.email}</td>
              <td xpath={`//*[@id='user-role-${user.id}']`}>{user.role}</td>
              <td xpath={`//*[@id='user-status-${user.id}']`}>{user.status}</td>
              <td>
                <button onClick={() => handleEdit(user)} xpath={`//*[@id='edit-button-${user.id}']`}>
                  <img src={edit} className="edit-icon" alt="modifier" />
                </button>
                <button onClick={() => openDeleteModal(user)} xpath={`//*[@id='delete-button-${user.id}']`}>
                  <img src={effacer} className="delete-icon" alt="supprimer" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulaire de modification */}
      {editingUser && (
        <div className="edit-form" xpath="//*[@id='edit-form']">
          <h3>Modifier Utilisateur</h3>
          <div>
            <label>Email: </label>
            <input type="text" value={editingUser.email} readOnly xpath="//*[@id='edit-email']" />
          </div>
          <div>
            <label>Rôle: </label>
            <select value={userRole} onChange={(e) => setUserRole(e.target.value)} xpath="//*[@id='edit-role']">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label>Statut: </label>
            <select value={userStatus} onChange={(e) => setUserStatus(e.target.value)} xpath="//*[@id='edit-status']">
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
          <button onClick={handleUpdate} xpath="//*[@id='update-button']">Valider</button>
        </div>
      )}

      {/* Modale de suppression */}
      {showDeleteModal && (
        <div className="delete-modal" xpath="//*[@id='delete-modal']">
          <div className="modal-content" xpath="//*[@id='modal-content']">
            <h3>Suppression</h3>
            <p>Voulez-vous supprimer ce compte ? Si oui, saisissez votre mot de passe.</p>
            <input
              type="password"
              placeholder="Saisir votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              xpath="//*[@id='password-input']"
            />
            <button onClick={handleDelete} xpath="//*[@id='confirm-delete-button']">Confirmer</button>
            <button onClick={closeDeleteModal} xpath="//*[@id='cancel-delete-button']">Annuler</button>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination" xpath="//*[@id='pagination']">
        <a href="#">&#60; Précédent</a>
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">Suivant &#62;</a>
      </div>
    </div>
  );
};

export default UserManagementPage;
