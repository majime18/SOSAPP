
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { useSOSTrigger } from './hooks/useSOSTrigger';
import { DistributionGuidePage } from './pages/DistributionGuidePage';

function App() {
  const { handleScreenTap, BlackScreenComponent, isListening } = useSOSTrigger();

  return (
    <Router>
      <div 
        className="min-h-screen bg-gradient-to-br from-red-50 to-white"
        onClick={handleScreenTap}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/distribution-guide" element={<DistributionGuidePage />} />
        </Routes>
        <BlackScreenComponent />
        {isListening && (
          <div 
            className="fixed bottom-4 right-4 h-4 w-4 bg-green-500 rounded-full animate-pulse" 
            title="Voice activation listening"
          ></div>
        )}
      </div>
    </Router>
  );
}

export default App;
