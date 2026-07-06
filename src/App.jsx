import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TrainerDashboard from './pages/TrainerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Automatically forwards anyone opening the app straight to today's task */}
        <Route path="/" element={<Navigate to="/trainer/dashboard" replace />} />

        {/* Today's Core Task Route */}
        <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;