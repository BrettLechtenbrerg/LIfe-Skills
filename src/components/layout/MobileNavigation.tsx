import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state } = useApp();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/lifeskills', label: 'Life Skills', icon: '🎯' },
    { path: '/progress', label: 'Progress', icon: '📊' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-martial-gold rounded-full flex items-center justify-center">
              <span className="text-martial-black font-bold text-sm">
                {state.studio?.branding?.name?.charAt(0) || 'P'}
              </span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 truncate">
                {state.studio?.branding?.name || 'Life Skills'}
              </h1>
              {state.user && (
                <p className="text-xs text-gray-600 truncate">
                  Welcome, {state.user.name}
                </p>
              )}
            </div>
          </div>
          
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white w-64 h-full shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-martial-gold to-yellow-500 p-6 text-martial-black">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-xl">Menu</h2>
                  <p className="text-sm opacity-80">Navigate your training</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="py-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-6 py-4 text-lg font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-martial-gold bg-opacity-10 text-martial-black border-r-4 border-martial-gold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Info */}
            {state.user && (
              <div className="absolute bottom-0 left-0 right-0 bg-gray-50 p-6 border-t">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-martial-gold rounded-full flex items-center justify-center">
                    <span className="text-martial-black font-bold">
                      {state.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{state.user.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{state.user.role}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar (Alternative Mobile Nav) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <nav className="flex justify-around py-2">
          {navigationItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 text-center transition-colors ${
                isActive(item.path)
                  ? 'text-martial-gold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileNavigation;