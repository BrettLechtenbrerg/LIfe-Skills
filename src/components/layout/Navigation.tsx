import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const Navigation: React.FC = () => {
  const { state } = useApp();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/lifeskills', label: 'Life Skills', icon: '🥋' },
    { path: '/progress', label: 'Progress', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🥋</span>
            <h1 className="text-xl font-bold text-gray-900">
              {state.studio?.branding.name || 'Life Skills Training'}
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-2">
            {state.user && (
              <div className="text-sm">
                <span className="text-gray-600">Welcome, </span>
                <span className="font-medium text-gray-900">{state.user.name}</span>
              </div>
            )}
            <div className="w-8 h-8 bg-martial-gold rounded-full flex items-center justify-center">
              <span className="text-martial-black font-medium text-sm">
                {state.user?.name.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;