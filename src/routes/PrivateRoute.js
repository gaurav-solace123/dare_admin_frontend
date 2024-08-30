import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('email');
  const location = useLocation(); // Get current path
  
  if (!isAuthenticated) {
    localStorage.setItem('lastPath', location.pathname); // Save current path to localStorage
    return <Navigate to="/auth/login" />;
  }

  return element;
};

export default PrivateRoute;
