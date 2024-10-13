import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, updateUser, verifyPassword } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/UserManagementPage.css"; 
import editIcon from "../image/edit.png";  // Importez l'icône de modification
import deleteIcon from "../image/effacer.png";  // Importez l'icône de suppression

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    email: "",
    role: "",
    status: "",
  });
  const [password, setPassword] = useState("");  // Pour stocker le mot de passe pour la vérification
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);  // Pour afficher la modale de mot de passe
  const [userToDelete, setUserToDelete] = useState(null);  // Utilisateur en attente de suppression
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await getUsers();
        setUsers(usersList);
      } catch (error) {
        setErrorMessage("Erreur lors de la récupération des utilisateurs.");
      }
    };
    fetchUsers();
  }, []);

  // Gestion de l'édition d'un utilisateur
  const handleEditClick = (user) => {
    setEditingUserId(user.id);  // Passer en mode édition pour l'utilisateur sélectionné
    setUpdatedUser({
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      await updateUser(editingUserId, updatedUser);  // Appel API pour mettre à jour l'utilisateur
      setUsers(users.map((user) => 
        user.id === editingUserId ? { ...user, ...updatedUser } : user
      ));  // Mettre à jour l'utilisateur localement
      setSuccessMessage("Utilisateur mis à jour avec succès.");
      setEditingUserId(null);  // Sortir du mode édition
    } catch (error) {
      setErrorMessage("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);  // Stocker l'utilisateur à supprimer
    setShowPasswordModal(true);  // Afficher la modale pour la saisie du mot de passe
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);  // Mettre à jour l'état du mot de passe
  };

  const handleDeleteConfirm = async () => {
    try {
      const isPasswordValid = await verifyPassword(password);
      
      if (!isPasswordValid) {
        setErrorMessage("Mot de passe incorrect.");
        return;
      }

      // Si le mot de passe est correct, supprimer l'utilisateur
      await deleteUser(userToDelete.id);
      setUsers(users.filter((user) => user.id !== userToDelete.id));  // Supprimer l'utilisateur de la liste
      setSuccessMessage("Utilisateur supprimé avec succès.");
      setShowPasswordModal(false);  // Fermer la modale après suppression
      setPassword("");  // Réinitialiser le mot de passe
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-page">
      <h1>Gestion des utilisateurs</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <table className="users-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUserId === user.id ? (
                  <input 
                    type="text" 
                    name="email" 
                    value={updatedUser.email} 
                    onChange={handleUpdateChange} 
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <select
                    name="role"
                    value={updatedUser.role}
                    onChange={handleUpdateChange}
                  >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <select
                    name="status"
                    value={updatedUser.status}
                    onChange={handleUpdateChange}
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                ) : (
                  user.status
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <button onClick={handleSaveEdit}>
                    <img src={editIcon} alt="Enregistrer" className="icon" /> Enregistrer
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(user)}>
                    <img src={editIcon} alt="Modifier" className="icon" /> Éditer
                  </button>
                )}
                <button onClick={() => handleDeleteClick(user)}>
                  <img src={deleteIcon} alt="Supprimer" className="icon" /> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale pour la saisie du mot de passe avant suppression */}
      {showPasswordModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirmer la suppression</h3>
            <p>
              Veuillez saisir votre mot de passe pour confirmer la suppression
              de l'utilisateur {userToDelete?.email}.
            </p>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Mot de passe"
            />
            <button onClick={handleDeleteConfirm}>Confirmer</button>
            <button onClick={() => setShowPasswordModal(false)}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
