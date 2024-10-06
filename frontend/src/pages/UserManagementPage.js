import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, updateUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/UserManagementPage.css"; // Importation du CSS mis à jour
import edit from "../image/edit.png";
import effacer from "../image/effacer.png";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    email: "",
    role: "",
    status: "",
  });
  const [password, setPassword] = useState(""); // Ajout de l'état pour le mot de passe
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const fetchUsers = async () => {
        try {
          const usersList = await getUsers();
          setUsers(usersList);
        } catch (error) {
          setErrorMessage("Erreur lors de la récupération des utilisateurs.");
        }
      };
      fetchUsers();
    }
  }, [navigate]);

  const handleEdit = (user) => {
    setEditingUserId(user.id); // Activer le mode édition pour cet utilisateur
    setUpdatedUser({
      email: user.email,
      role: user.role || "",
      status: user.status || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUser(editingUserId, updatedUser);
      setSuccessMessage("Utilisateur mis à jour avec succès");
      setEditingUserId(null); // Sortir du mode édition après sauvegarde
    } catch (error) {
      setErrorMessage("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };

  // Ouvre la modale de confirmation de suppression
  const openDeleteModal = (user) => {
    setUserToDelete(user); // Stocker l'utilisateur à supprimer
    setShowDeleteModal(true); // Afficher la modale de suppression
  };

  // Ferme la modale de confirmation de suppression
  const closeDeleteModal = () => {
    setShowDeleteModal(false); // Fermer la modale
    setUserToDelete(null); // Réinitialiser l'utilisateur à supprimer
    setPassword(""); // Réinitialiser le mot de passe après fermeture
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userToDelete.id);
      setUsers(users.filter((user) => user.id !== userToDelete.id)); // Supprimer l'utilisateur de la liste
      setSuccessMessage("Utilisateur supprimé avec succès.");
      closeDeleteModal(); // Fermer la modale de suppression
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-page" data-cy="user-management-page">
      <h1 data-cy="page-title">Liste des utilisateurs</h1>

      {/* Barre de recherche */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-cy="search-input"
        />
        <button className="search-button" data-cy="search-button">
          Chercher
        </button>
      </div>

      {errorMessage && (
        <p className="error-message" data-cy="error-message">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="success-message" data-cy="success-message">
          {successMessage}
        </p>
      )}


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
          {filteredUsers.map((user) => (
            <tr key={user.id} data-cy={`user-row-${user.id}`}>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                    data-cy={`edit-email-${user.id}`}
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
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner un rôle</option>
                    <option value="admin">Admin</option>
                    <option value="user">Utilisateur</option>
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
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner un statut</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                ) : (
                  user.status
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      data-cy={`save-user-${user.id}`}
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setEditingUserId(null)}
                      data-cy={`cancel-edit-${user.id}`}
                    >
                      
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(user)}
                      data-cy={`edit-user-${user.id}`}
                    >
                      <img src={edit} alt="Modifier" className="icon" />{" "}
                      Modifier
                    </button>
                    <button
                      onClick={() => openDeleteModal(user)}
                      data-cy={`delete-user-${user.id}`}
                    >
                      <img src={effacer} alt="Supprimer" className="icon" />{" "}
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale de confirmation de suppression */}
      {showDeleteModal && (
        <div className="modal" data-cy="delete-modal">
          <div className="modal-content">
            <h3>Confirmer la suppression</h3>
            <p>
              Voulez-vous vraiment supprimer l'utilisateur{" "}
              {userToDelete?.email} ?
            </p>
            
            {/* Ajout du champ pour saisir le mot de passe */}
            <input
              type="password"
              placeholder="Saisissez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Mettre à jour l'état du mot de passe
              data-cy="password-input"
              className="password-input"
            />

            <button
              onClick={handleDelete}
              data-cy="confirm-delete"
              disabled={!password}  // Désactiver le bouton si le mot de passe n'est pas saisi
            >
              Confirmer
            </button>
            <button onClick={closeDeleteModal} data-cy="cancel-delete">
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
