import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import LoadingSpinner from '../common/LoadingSpinner';
import { useApp } from '../../contexts/AppContext';

const Layout: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navigation />
      </div>
      
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      <main className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {state.loading && <LoadingSpinner />}
        {state.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {state.error}
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;