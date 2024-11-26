import React, { createContext, useState, useContext } from 'react';

// Create a Context for roles
const RoleContext = createContext();

// RoleContextProvider component to provide role data to the entire app
export const RoleContextProvider = ({ children }) => {
  // Sample initial roles (You can replace this with an API call)
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
    { id: 3, name: 'Viewer', permissions: ['Read'] },
  ]);

  // Add a new role
  const addRole = (role) => {
    setRoles((prevRoles) => [...prevRoles, role]);
  };

  // Update an existing role
  const updateRole = (updatedRole) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === updatedRole.id ? { ...role, ...updatedRole } : role
      )
    );
  };

  // Delete a role
  const deleteRole = (id) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
  };

  // Provide the roles and management functions to children
  return (
    <RoleContext.Provider value={{ roles, addRole, updateRole, deleteRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom hook to use the RoleContext
export const useRoleContext = () => {
  return useContext(RoleContext);
};
