import React, { useState } from 'react';
import UploadRecordingModal from '../components/UploadRecordingModal';

function RecordingDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Starting placeholder logs array state
  const [recordings, setRecordings] = useState([
    {
      id: 'REC-849201',
      sessionType: 'Full-Stack Web Development',
      title: 'Lecture 01: React Context API Systems',
      fileName: 'context_api_core_session.mp4',
      duration: '01:15:22',
      uploadedAt: '7/5/2026',
    },
    {
      id: 'REC-310492',
      sessionType: 'Data Structures & Algorithms',
      title: 'Workshop: Graph Traversal Optimization Rules',
      fileName: 'dsa_graphs_bfs_dfs.mp4',
      duration: '52:40',
      uploadedAt: '7/6/2026',
    },
  ]);

  // Callback to append newly generated files dynamically
  const handleAddRecording = (newRec) => {
    setRecordings([newRec, ...recordings]);
  };

  return (
    <div style={styles.dashboardContainer}>
      
      {/* HEADER BAR SECTION */}
      <header style={styles.headerBar}>
        <div>
          <h2 style={styles.mainTitle}>Recording Administration Desk</h2>
          <p style={styles.subtitle}>Upload, track, and publish video lectures for active student streams.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          style={styles.uploadTriggerBtn}
        >
          ➕ Upload Recording
        </button>
      </header>

      {/* DASHBOARD GRID CONTENT */}
      <main style={styles.mainContentLayout}>
        <div style={styles.tableCard}>
          <h4 style={styles.tableCardTitle}>Uploaded Lecture Inventories ({recordings.length})</h4>
          
          {recordings.length === 0 ? (
            <div style={styles.emptyState}>No session recordings uploaded yet today. Click "+ Upload Recording" above to start.</div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Recording ID</th>
                    <th style={styles.th}>Session Group</th>
                    <th style={styles.th}>Lecture / Seminar Title</th>
                    <th style={styles.th}>File Reference</th>
                    <th style={styles.th}>Duration</th>
                    <th style={styles.th}>Date Uploaded</th>
                  </tr>
                </thead>
                <tbody>
                  {recordings.map((rec) => (
                    <tr key={rec.id} style={styles.trRow}>
                      <td style={{ ...styles.td, fontWeight: 'bold', color: '#2563eb' }}>{rec.id}</td>
                      <td style={styles.td}><span style={styles.badge}>{rec.sessionType}</span></td>
                      <td style={{ ...styles.td, color: '#1e293b', fontWeight: '500' }}>{rec.title}</td>
                      <td style={{ ...styles.td, color: '#64748b', fontSize: '0.85rem' }}>🎬 {rec.fileName}</td>
                      <td style={{ ...styles.td, fontWeight: '500' }}>⏱️ {rec.duration}</td>
                      <td style={styles.td}>{rec.uploadedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* MODAL WINDOW SYSTEM POPUP */}
      <UploadRecordingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={handleAddRecording}
      />
    </div>
  );
}

const styles = {
  dashboardContainer: {
    padding: '30px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    border: '1px solid #e2e8f0',
    marginBottom: '24px',
  },
  mainTitle: {
    margin: 0,
    fontSize: '1.4rem',
    color: '#0f172a',
  },
  subtitle: {
    margin: '4px 0 0 0',
    color: '#64748b',
    fontSize: '0.9rem',
  },
  uploadTriggerBtn: {
    backgroundColor: '#25d7eb',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  mainContentLayout: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)',
  },
  tableCard: {
    padding: '24px',
  },
  tableCardTitle: {
    margin: '0 0 20px 0',
    fontSize: '1.05rem',
    color: '#334155',
    fontWeight: '600',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '14px 16px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    borderBottom: '2px solid #e2e8f0',
  },
  td: {
    padding: '16px',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '0.92rem',
    color: '#334155',
  },
  trRow: {
    transition: 'background-color 0.2s',
    backgroundColor: '#ffffff',
  },
  badge: {
    backgroundColor: '#eff6ff',
    color: '#d81d1d',
    padding: '4px 10px',
    borderRadius: '50px',
    fontSize: '0.8rem',
    fontWeight: '500',
    border: '1px solid #bfdbfe',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#64748b',
    fontSize: '0.95rem',
  },
};

export default RecordingDashboard;