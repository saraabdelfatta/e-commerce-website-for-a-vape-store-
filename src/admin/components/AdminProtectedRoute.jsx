import React from 'react';
import { Navigate } from 'react-router-dom';

export const AdminProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('adminLoggedIn') === 'true';

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
