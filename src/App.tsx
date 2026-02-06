import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

// Import pages
import Landing from './pages/Landing';
import Market from './pages/Market';
import CreatorProfile from './pages/CreatorProfile';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import HowItWorks from './pages/HowItWorks';

import TikTokFeed from './pages/demo/TikTokFeed';
import TikTokProfile from './pages/demo/TikTokProfile';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Demo Flow Routes (Full Screen, No Layout) */}
          <Route path="/demo/feed" element={<TikTokFeed />} />
          <Route path="/demo/profile" element={<TikTokProfile />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/market" element={<Market />} />
            <Route path="/creator/:id" element={<CreatorProfile />} />
            <Route path="/auth" element={<Auth />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
