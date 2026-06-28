import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

export const Admin404 = () => {
  return (
    <div className="admin-dashboard-wrapper">
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900 px-6">
        <div className="text-center">
          <h1 className="mb-4 text-8xl font-bold text-gray-800 dark:text-white/90">404</h1>
          <p className="mb-6 text-lg text-gray-500 dark:text-gray-400">Oops! The page you're looking for doesn't exist.</p>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white hover:bg-brand-600"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin404;
