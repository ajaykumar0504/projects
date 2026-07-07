import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import TrainerDashboard from './pages/TrainerDashboard'; // Yesterday's task
import RecordingDashboard from './pages/RecordingDashboard'; // Today's task

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        
        {/* Navigation Bar to switch between tasks easily */}
        <nav style={styles.navBar}>
          <div style={styles.logo}>👨 Trainer Workspace</div>
          <div style={styles.linksRow}>
            <Link to="/trainer/dashboard" style={styles.navLink}>🔴 Live Sessions Task</Link>
            <Link to="/trainer/recordings" style={styles.navLink}>📹 Upload Recordings Task</Link>
          </div>
        </nav>

        {/* Dynamic Route Viewports */}
        <Routes>
          {/* Automatically open yesterday's task first */}
          <Route path="/" element={<Navigate to="/trainer/dashboard" replace />} />

          {/* Both Task Paths Live Safely Side-by-Side */}
          <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
          <Route path="/trainer/recordings" element={<RecordingDashboard />} />
        </Routes>

      </div>
    </Router>
  );
}

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
    gap: '20px',
  },
  navLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.92rem',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.2s',
    border: '1px solid transparent',
  },
};

export default App;