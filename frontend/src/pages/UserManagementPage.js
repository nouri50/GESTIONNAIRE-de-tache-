import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../utils/api'; // Assurez-vous que ces fonctions existent dans votre API
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
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    email: '',
    role: '',
    status: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await getUsers(); // Récupère la liste des utilisateurs via l'API
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
      await deleteUser(userToDelete.id); // Suppression de l'utilisateur via l'API
      setUsers(users.filter(user => user.id !== userToDelete.id)); // Mise à jour de la liste après suppression
      setSuccessMessage('Ce compte a été bien supprimé');
      setShowDeleteModal(false);
      setPassword(''); // Réinitialiser le mot de passe
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      setErrorMessage('Erreur lors de la suppression de l\'utilisateur.');
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

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setUpdatedUser({
      email: user.email,
      role: user.role || '', // Utiliser une chaîne vide au lieu de null
      status: user.status || '' // Utiliser une chaîne vide au lieu de null
    });
  };

  const handleSave = async () => {
    try {
      await updateUser(editingUserId, updatedUser); // Mettre à jour l'utilisateur via l'API
      setSuccessMessage('Utilisateur modifié avec succès');
      setEditingUserId(null); // Sortir du mode édition
    } catch (error) {
      console.error('Erreur lors de la modification de l\'utilisateur:', error);
      setErrorMessage('Erreur lors de la modification de l\'utilisateur.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Filtrer les utilisateurs en fonction de la recherche
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-page">
      <h1>Liste des utilisateurs</h1>

      {errorMessage && <p className="error-message" data-cy="user-error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message" data-cy="user-success-message">{successMessage}</p>}

      {/* Barre de recherche */}
      <div className="search-container" data-cy="user-search-container">
        <input
          type="text"
          placeholder="Rechercher"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-cy="user-search-input"
        />
        <button data-cy="user-search-button">Chercher</button>
      </div>

      {/* Tableau des utilisateurs */}
      <table>
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
            <tr key={user.id} data-cy={`user-row-${user.id}`}>
              <td>{editingUserId === user.id ? (
                <input
                  type="text"
                  value={updatedUser.email}
                  name="email"
                  onChange={handleChange}
                  data-cy={`user-email-input-${user.id}`}
                />
              ) : (
                user.email
              )}</td>
              <td>{editingUserId === user.id ? (
                <select
                  value={updatedUser.role}
                  name="role"
                  onChange={handleChange}
                  data-cy={`user-role-select-${user.id}`}
                >
                  <option value="">Sélectionner un rôle</option>
                  <option value="admin">Admin</option>
                  <option value="user">Utilisateur</option>
                </select>
              ) : (
                user.role
              )}</td>
              <td>{editingUserId === user.id ? (
                <select
                  value={updatedUser.status}
                  name="status"
                  onChange={handleChange}
                  data-cy={`user-status-select-${user.id}`}
                >
                  <option value="">Sélectionner un statut</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              ) : (
                user.status
              )}</td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button onClick={handleSave} data-cy={`user-save-button-${user.id}`}>Enregistrer</button>
                    <button onClick={() => setEditingUserId(null)} data-cy={`user-cancel-button-${user.id}`}>Annuler</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)} data-cy={`user-edit-button-${user.id}`}>
                      <img src={edit} className="edit-icon" alt="modifier" />
                    </button>
                    <button onClick={() => openDeleteModal(user)} data-cy={`user-delete-button-${user.id}`}>
                      <img src={effacer} className="delete-icon" alt="supprimer" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale de suppression */}
      {showDeleteModal && (
        <div className="delete-modal" data-cy="user-delete-modal">
          <div className="modal-content">
            <h3>Suppression</h3>
            <p>Voulez-vous supprimer ce compte ? Si oui, saisissez votre mot de passe.</p>
            <input
              type="password"
              placeholder="Saisir votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-cy="user-password-input"
            />
            <button onClick={handleDelete} data-cy="user-delete-confirm-button">Confirmer</button>
            <button onClick={closeDeleteModal} data-cy="user-delete-cancel-button">Annuler</button>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
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
