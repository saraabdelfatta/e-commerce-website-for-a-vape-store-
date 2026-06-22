import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/admin.css';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    // Simulate a brief loading state for polish
    setTimeout(() => {
      const success = login(username.trim(), password.trim());
      if (success === false) {
        setError('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Logo */}
        <div className="admin-login-logo">
          <span className="logo-crown">👑</span>
          <div className="logo-brand">
            VAPE<span>CAIRO</span>
          </div>
        </div>
        <p className="admin-login-subtitle">Owner Dashboard</p>

        <h1 className="admin-login-title">Sign in to your panel</h1>

        {/* Error Banner */}
        {error && (
          <div className="admin-login-error" role="alert">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-field">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              className="admin-field-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              className="admin-field-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? 'Signing in…' : '🔐 Sign In'}
          </button>
        </form>

        <hr className="admin-divider" />

        <Link to="/" className="admin-back-link">
          <span>←</span> Back to Website
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
