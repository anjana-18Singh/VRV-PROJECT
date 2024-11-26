import React, { createContext, useState, useContext } from 'react';

// Create a Context for users
const UserContext = createContext();

// UserContextProvider component to provide user data to the entire app
export const UserContextProvider = ({ children }) => {
  // Sample initial users (You can replace this with an API call)
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'Viewer', status: 'Active' },
  ]);

  // Add a new user
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  // Update an existing user
  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };

  // Delete a user
  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // Toggle the status of a user (Active/Inactive)
  const toggleUserStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
      )
    );
  };

  // Provide the users and management functions to children
  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, toggleUserStatus }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
