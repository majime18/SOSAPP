
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { FloatingSOSButton } from './components/FloatingSOSButton';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <FloatingSOSButton />
      </div>
    </Router>
  );
}

export default App;
