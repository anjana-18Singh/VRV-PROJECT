//import React, { useState, useEffect } from 'react';
import './App.css';  // Import your global styles
import { UserContextProvider } from './contexts/UserContext';
import { RoleContextProvider } from './contexts/RoleContext';
import UserList from './components/UserList';
import RoleList from './components/RoleList';


const App = () => {
  return (
    <RoleContextProvider>
      <UserContextProvider>
        <div className="App">
          <h1>RBAC Dashboard</h1>
          <UserList />  {/* Display user-related UI here */}
          <RoleList />  {/* Display role-related UI here */}
        </div>
      </UserContextProvider>
    </RoleContextProvider>
  );
};

export default App;
