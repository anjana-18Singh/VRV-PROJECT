import React, { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import UserModal from './UserModal';

const UserList = () => {
  const { users, addUser, deleteUser } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    setIsModalOpen(true);
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  return (
    <div>
      <h1>User Management</h1>
      <button onClick={handleAddUser}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <UserModal user={selectedUser} onClose={() => setIsModalOpen(false)} onSave={addUser} />}
    </div>
  );
};

export default UserList;
