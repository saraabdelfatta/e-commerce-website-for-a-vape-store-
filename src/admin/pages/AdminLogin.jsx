import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/style.css';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError]             = useState('');
  const [darkMode, setDarkMode]       = useState(() => {
    try { return JSON.parse(localStorage.getItem('adminDarkMode')) || false; }
    catch { return false; }
  });

  useEffect(() => {
    const html = document.documentElement;
    darkMode ? html.classList.add('dark') : html.classList.remove('dark');
    localStorage.setItem('adminDarkMode', JSON.stringify(darkMode));
    return () => html.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    if (sessionStorage.getItem('adminLoggedIn') === 'true')
      navigate('/admin/dashboard', { replace: true });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (email.trim() && password) {
      sessionStorage.setItem('adminLoggedIn', 'true');
      sessionStorage.setItem('adminUserEmail', email.trim());
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Please enter both an email address and a password.');
    }
  };

  const brand      = '#3B82F6';
  const brandHover = '#2563EB';

  /* Inline styles reused across multiple elements */
  const inputStyle = {
    display: 'block',
    width: '100%',
    height: '52px',
    padding: '0 16px',
    fontSize: '15px',
    border: '1.5px solid #D1D5DB',
    borderRadius: '10px',
    background: 'transparent',
    color: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
    direction: 'ltr',
  };

  return (
    /* Force LTR on the entire page regardless of global dir */
    <div dir="ltr" style={{ minHeight: '100vh', background: '#fff', display: 'flex' }}>

      {/* ── LEFT FORM PANEL ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 0',
        background: '#fff',
      }}>

        {/* Back link */}
        <div style={{ padding: '0 48px', marginBottom: '48px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '14px', color: '#6B7280', textDecoration: 'none',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.7083 5L7.5 10.2083L12.7083 15.4167" />
            </svg>
            Back to website
          </Link>
        </div>

        {/* Card — centred vertically & horizontally */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 48px',
        }}>
          <div style={{ width: '100%', maxWidth: '440px' }}>

            {/* Heading */}
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
              Sign In
            </h1>
            <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '36px' }}>
              Enter your email and password to sign in.
            </p>

            {/* Error */}
            {error && (
              <div style={{
                marginBottom: '24px', padding: '12px 16px', borderRadius: '10px',
                background: '#FEF2F2', border: '1px solid #FECACA',
                fontSize: '14px', color: '#DC2626',
              }}>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Email */}
              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                  Email <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="info@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e)  => (e.target.style.borderColor = brand)}
                  onBlur={(e)   => (e.target.style.borderColor = '#D1D5DB')}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                  Password <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ ...inputStyle, paddingRight: '48px' }}
                    onFocus={(e)  => (e.target.style.borderColor = brand)}
                    onBlur={(e)   => (e.target.style.borderColor = '#D1D5DB')}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: '14px', top: '50%',
                      transform: 'translateY(-50%)', cursor: 'pointer', color: '#9CA3AF',
                    }}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="#9CA3AF" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.63803 3.57709C4.34513 3.2842 3.87026 3.2842 3.57737 3.57709C3.28447 3.86999 3.28447 4.34486 3.57737 4.63775L4.85323 5.91362C3.74609 6.84199 2.89363 8.06395 2.4155 9.45936C2.3615 9.61694 2.3615 9.78801 2.41549 9.94558C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C11.255 15.3619 12.4422 15.0737 13.4994 14.5598L15.3625 16.4229C15.6554 16.7158 16.1302 16.7158 16.4231 16.4229C16.716 16.13 16.716 15.6551 16.4231 15.3622L4.63803 3.57709ZM12.3608 13.4212L10.4475 11.5079C10.3061 11.5423 10.1584 11.5606 10.0064 11.5606H9.99151C8.96527 11.5606 8.13333 10.7286 8.13333 9.70237C8.13333 9.5461 8.15262 9.39434 8.18895 9.24933L5.91885 6.97923C5.03505 7.69015 4.34057 8.62704 3.92328 9.70247C4.86803 12.1373 7.23361 13.8619 10.0002 13.8619C10.8326 13.8619 11.6287 13.7058 12.3608 13.4212ZM16.0771 9.70249C15.7843 10.4569 15.3552 11.1432 14.8199 11.7311L15.8813 12.7925C16.6329 11.9813 17.2187 11.0143 17.5849 9.94561C17.6389 9.78803 17.6389 9.61696 17.5849 9.45938C16.5055 6.30925 13.5184 4.04303 10.0002 4.04303C9.13525 4.04303 8.30244 4.17999 7.52218 4.43338L8.75139 5.66259C9.1556 5.58413 9.57311 5.54303 10.0002 5.54303C12.7667 5.54303 15.1323 7.26768 16.0771 9.70249Z" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="#9CA3AF" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.0002 13.8619C7.23361 13.8619 4.86803 12.1372 3.92328 9.70241C4.86804 7.26761 7.23361 5.54297 10.0002 5.54297C12.7667 5.54297 15.1323 7.26762 16.0771 9.70243C15.1323 12.1372 12.7667 13.8619 10.0002 13.8619ZM10.0002 4.04297C6.48191 4.04297 3.49489 6.30917 2.4155 9.4593C2.3615 9.61687 2.3615 9.78794 2.41549 9.94552C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C13.5184 15.3619 16.5055 13.0957 17.5849 9.94555C17.6389 9.78797 17.6389 9.6169 17.5849 9.45932C16.5055 6.30919 13.5184 4.04297 10.0002 4.04297ZM9.99151 7.84413C8.96527 7.84413 8.13333 8.67606 8.13333 9.70231C8.13333 10.7286 8.96527 11.5605 9.99151 11.5605H10.0064C11.0326 11.5605 11.8646 10.7286 11.8646 9.70231C11.8646 8.67606 11.0326 7.84413 10.0064 7.84413H9.99151Z" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                style={{
                  width: '100%', height: '52px', borderRadius: '10px',
                  background: brand, color: '#fff', fontSize: '16px',
                  fontWeight: 600, border: 'none', cursor: 'pointer',
                  transition: 'background 0.15s', marginTop: '4px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = brandHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = brand)}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── RIGHT HERO PANEL (desktop only) ── */}
      <div style={{
        display: 'none',
        width: '50%',
        background: brand,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        padding: '48px',
      }}
        className="lg-hero-panel"
      >
        <span style={{ fontSize: '40px', fontWeight: 800, color: '#fff', letterSpacing: '6px' }}>
          VAPECAIRO
        </span>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: '280px', lineHeight: 1.6 }}>
          Admin Dashboard — Manage your store with ease
        </p>
      </div>

      {/* ── DARK MODE TOGGLE ── */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 50,
          width: '56px', height: '56px', borderRadius: '50%',
          background: brand, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', transition: 'background 0.15s',
          boxShadow: '0 4px 12px rgba(59,130,246,0.4)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = brandHover)}
        onMouseLeave={(e) => (e.currentTarget.style.background = brand)}
      >
        <svg width="22" height="22" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.4547 11.97C15.9437 14.7607 13.2277 16.9586 10.0003 16.9586 6.15734 16.9586 3.04199 13.8433 3.04199 10.0003 3.04199 6.77289 5.23988 4.05695 8.22173 3.27114 4.21532 4.77574 1.54199 8.07486 1.54199 12.0003 1.54199 16.6717 5.32892 20.4586 10.0003 20.4586 13.9257 20.4586 17.2249 17.7853 18.1799 14.1611L17.4547 11.97Z" />
        </svg>
      </button>

      {/* Inline style to show the hero panel on large screens */}
      <style>{`
        @media (min-width: 1024px) {
          .lg-hero-panel { display: flex !important; }
        }
        * { box-sizing: border-box; }
        input::placeholder { color: #9CA3AF; }
        input:focus { box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
      `}</style>
    </div>
  );
};

export default AdminLogin;