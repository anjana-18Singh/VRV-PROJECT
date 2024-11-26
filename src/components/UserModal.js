import React, { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';

const UserModal = ({ selectedUser, setIsModalOpen,onSave }) => {
  const { addUser, updateUser } = useUserContext();
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    role: 'Viewer',
    status: 'Active',
  });

  useEffect(() => {
    if (selectedUser) {
      setUserData(selectedUser);
    } else {
    setUserData({
      id: '',
      name: '',
      email: '',
      role: 'Viewer',
      status: 'Active',
    }); // Default values for adding new user
  }
},[selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      updateUser(userData);
    } else {
      addUser({ ...userData, id: Date.now() });  // Using Date.now() as a unique ID
    }
    setIsModalOpen(false);
  };

  return (
    <div className="modal">
    <form onSubmit={handleSubmit}>
      <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Role:
        <select
          name="role"
          value={userData.role}
          onChange={handleInputChange}
          required
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
      </label>
      <label>
        Status:
        <select
          name="status"
          value={userData.status}
          onChange={handleInputChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>
      <div className="modal-actions">
            <button type="submit">{selectedUser ? 'Update User' : 'Add User'}</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
  );
};

export default UserModal;


