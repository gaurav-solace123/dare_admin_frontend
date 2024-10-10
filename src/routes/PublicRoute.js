import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('email'); // Get authentication status from localStorage

  return isAuthenticated ? element : <Navigate to="/dashboard" />;
};

export default PublicRoute;                                                                                                                                               