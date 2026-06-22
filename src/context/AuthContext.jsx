// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('adminAuth');
    setIsAuthenticated(stored === 'true');
  }, []);

  /**
   * Login function.
   * Currently accepts any non-empty username + password (placeholder until DB is ready).
   * Returns false if credentials are invalid so the UI can show an error.
   */
  const login = (username, password) => {
    if (username && password) {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      navigate('/admin', { replace: true });
      return true;
    } else {
      return false;
    }
  };

  /**
   * Logout — sends the owner back to the admin login page, NOT the storefront.
   */
  const logout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    navigate('/admin/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
