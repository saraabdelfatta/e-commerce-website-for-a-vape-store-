import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import '../styles/style.css';
import '../styles/admin-fix.css';

export const AdminLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adminDarkMode')) || false;
    } catch {
      return false;
    }
  });

  // Apply/remove dark class on html element when in admin routes
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('adminDarkMode', JSON.stringify(darkMode));

    // Cleanup: remove dark class when leaving admin section
    return () => {
      html.classList.remove('dark');
    };
  }, [darkMode]);

  return (
    <div className="admin-dashboard-wrapper">
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
        {/* Overlay for mobile sidebar */}
        {sidebarToggle && (
          <div
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setSidebarToggle(false)}
          />
        )}

        <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          <Header
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <main className="flex-1">
            <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
