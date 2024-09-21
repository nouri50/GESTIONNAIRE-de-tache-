import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../utils/api'; // Assurez-vous que ces fonctions existent dans votre API
import '../styles/Header.css';
import '../styles/Footer.css';  // Assure-toi que ce chemin est correct  // Assure-toi que ce chemin est correct
import '../styles/UserManagementPage.css';
import '../styles/background.css'; // Assure-toi que ce chemin est correct
const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fonction pour récupérer les utilisateurs lors du chargement de la page
    const fetchUsers = async () => {
      try {
        const usersList = await getUsers(); // Récupère la liste des utilisateurs via l'API
        setUsers(usersList);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId); // Suppression de l'utilisateur via l'API
      setUsers(users.filter(user => user.id !== userId)); // Mise à jour de la liste après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  // Filtrer les utilisateurs en fonction de la recherche
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-page">
      <h1>Liste des utilisateurs</h1>

      {/* Barre de recherche */}
      <div className="search-container">
        <input
          type="text"
          placeholder="recherche"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>chercher</button>
      </div>

      {/* Tableau des utilisateurs */}
      <table>
        <thead>
          <tr>
            <th>mail</th>
            <th>mot de passe</th>
            <th>role</th>
            <th>statut</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>********</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => console.log('Modifier', user.id)}>
                  <img src="edit-icon.png" className="edit-icon" alt="modifier" />
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  <img src="delete-icon.png" className="delete-icon" alt="supprimer" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <a href="#">&#60; Previous</a>
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">&#62; Next</a>
      </div>
    </div>
  );
};

export default UserManagementPage;
