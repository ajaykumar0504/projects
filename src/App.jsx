import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import TrainerDashboard from './pages/TrainerDashboard';
import SessionRecordings from './pages/SessionRecordings';
import SessionManagement from './pages/SessionManagement'; // Today's new task

function App() {
  // Shared state managing your session recordings list in memory
  const [recordings, setRecordings] = useState([
    { id: "REC-8291", name: "Advanced Strength & Conditioning", duration: "45 mins", date: "2026-07-01" },
    { id: "REC-4412", name: "Cardio Endurance Masterclass", duration: "30 mins", date: "2026-07-04" },
    { id: "REC-9034", name: "Flexibility & Deep Yoga Flow", duration: "60 mins", date: "2026-07-06" }
  ]);

  // Handler to inject a newly uploaded recording asset card into the array
  const handleAddNewRecording = (newRecording) => {
    setRecordings((prevRecordings) => [newRecording, ...prevRecordings]);
  };

  return (
    <Router>
      <div style={styles.appContainer}>

        {/* Global Navigation Bar */}
        <nav style={styles.navBar}>
          <div style={styles.logo}>🏋️‍♂️ Trainer Workspace</div>
          <div style={styles.linksRow}>
            <Link to="/trainer/dashboard" style={styles.navLink}>🔴 Live Dashboard</Link>
            <Link to="/trainer/sessions" style={styles.navLink}>🗓️ Session Management</Link>
            <Link to="/trainer/recordings" style={styles.navLink}>📹 Recording Archive</Link>
          </div>
        </nav>

        {/* Dynamic Navigation Viewports */}
        <Routes>
          {/* Automatic redirection route to fallback cleanly onto dashboard */}
          <Route path="/" element={<Navigate to="/trainer/dashboard" replace />} />
          
          {/* Main workspace view routes */}
          <Route 
            path="/trainer/dashboard" 
            element={<TrainerDashboard onUploadRecording={handleAddNewRecording} />} 
          />
          <Route 
            path="/trainer/sessions" 
            element={<SessionManagement />} 
          />
          <Route 
            path="/trainer/recordings" 
            element={<SessionRecordings recordings={recordings} setRecordings={setRecordings} />} 
          />

          {/* Catch-all global route */}
          <Route path="*" element={<Navigate to="/trainer/dashboard" replace />} />
        </Routes>

      </div>
    </Router>
  );
}

// Global UI Layout Design Tokens
const styles = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '1.1rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  linksRow: {
    display: 'flex',
    gap: '12px',
  },
  navLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    padding: '8px 14px',
    borderRadius: '6px',
    transition: 'all 0.2s',
  },
};

export default App;