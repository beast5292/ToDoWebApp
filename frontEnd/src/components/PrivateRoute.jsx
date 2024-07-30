// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('user'); // Check if user is authenticated

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;