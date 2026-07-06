import React, { useState } from 'react';
import CreateSessionModal from '../components/CreateSessionModal';

const TrainerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Base dashboard container initialization with mock scheduled classes
  const [sessions, setSessions] = useState([
    { id: 'room-849204', batch: 'AI & Machine Learning - Batch A', date: '2026-07-10', time: '10:00', notified: false },
    { id: 'room-310492', batch: 'Full Stack Web Dev - Batch B', date: '2026-07-12', time: '14:30', notified: true }
  ]);

  const handleCreateSession = (newSession) => {
    setSessions((prevSessions) => [newSession, ...prevSessions]);
  };

  const handleNotifyStudents = (sessionId, batchName) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === sessionId ? { ...session, notified: true } : session
      )
    );
    alert(`📬 Notification broadcast dispatched successfully to all students registered in: ${batchName}`);
  };

  const handleStartSession = (roomId) => {
    alert(`📡 Establishing connection socket link...\nRouting Trainer into Live Classroom Environment [ID: ${roomId}]`);
    // Example deployment extension line: window.location.href = `/classroom/${roomId}`;
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Header Context Action Bar */}
      <header style={styles.topActionBar}>
        <div>
          <h1 style={styles.mainHeading}>Trainer Administration Center</h1>
          <p style={styles.subText}>Create, deploy, and manage live streaming whiteboard classrooms.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} style={styles.createButton}>
          ➕ Create Live Session
        </button>
      </header>

      <hr style={styles.divider} />

      {/* Main Container Layout Display Grid */}
      <main style={styles.contentSection}>
        <h2 style={styles.sectionTitle}>Upcoming Scheduled Classes</h2>
        
        {sessions.length === 0 ? (
          <div style={styles.emptyStateCard}>
            <p>No interactive sessions found. Click "+ Create Live Session" to get started.</p>
          </div>
        ) : (
          <div style={styles.sessionGrid}>
            {sessions.map((session) => (
              <div key={session.id} style={styles.sessionCard}>
                <div style={styles.cardHeader}>
                  <span style={styles.roomIdBadge}>🆔 {session.id}</span>
                  <span style={{
                    ...styles.statusDot,
                    backgroundColor: session.notified ? '#28a745' : '#ffc107'
                  }} />
                </div>
                
                <h3 style={styles.batchTitle}>{session.batch}</h3>
                
                <div style={styles.dateTimeContainer}>
                  <p style={styles.dateTimeText}>📅 <strong>Date:</strong> {session.date}</p>
                  <p style={styles.dateTimeText}>⏰ <strong>Time:</strong> {session.time}</p>
                </div>

                <div style={styles.cardActions}>
                  {session.notified ? (
                    <button disabled style={styles.disabledBadge}>
                      ✓ Students Notified
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleNotifyStudents(session.id, session.batch)} 
                      style={styles.notifyButton}
                    >
                      🔔 Notify Students
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleStartSession(session.id)} 
                    style={styles.startButton}
                  >
                    🖥️ Start Classroom
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Reusable Form Overlay Component Injection */}
      <CreateSessionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreateSession={handleCreateSession}
      />
    </div>
  );
};

const styles = {
  dashboardContainer: { padding: '40px max(5%, 20px)', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' },
  topActionBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' },
  mainHeading: { margin: 0, fontSize: '2rem', color: '#212529', fontWeight: '700' },
  subText: { margin: '5px 0 0 0', color: '#6c757d', fontSize: '1rem' },
  createButton: { padding: '12px 24px', backgroundColor: '#198754', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  divider: { border: 0, height: '1px', backgroundColor: '#dee2e6', margin: '30px 0' },
  contentSection: { display: 'flex', flexDirection: 'column', gap: '20px' },
  sectionTitle: { fontSize: '1.4rem', color: '#495057', margin: 0 },
  emptyStateCard: { padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '10px', border: '1px dashed #ced4da', color: '#6c757d' },
  sessionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' },
  sessionCard: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e9ecef', display: 'flex', flexDirection: 'column', gap: '15px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  roomIdBadge: { backgroundColor: '#e8f0fe', color: '#1a73e8', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' },
  statusDot: { width: '10px', height: '10px', borderRadius: '50%' },
  batchTitle: { margin: 0, fontSize: '1.2rem', color: '#212529', fontWeight: '600' },
  dateTimeContainer: { backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '5px' },
  dateTimeText: { margin: 0, fontSize: '0.9rem', color: '#495057' },
  cardActions: { display: 'flex', gap: '10px', marginTop: 'auto' },
  notifyButton: { flex: 1, padding: '10px', backgroundColor: '#fff', color: '#0d6efd', border: '1px solid #0d6efd', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
  disabledBadge: { flex: 1, padding: '10px', backgroundColor: '#e2e3e5', color: '#383d41', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', textAlign: 'center' },
  startButton: { flex: 1, padding: '10px', backgroundColor: '#0d6efd', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }
};

export default TrainerDashboard; 