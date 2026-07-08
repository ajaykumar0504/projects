import React, { useState } from 'react';

function SessionRecordings() {
  // Mock data array simulating items retrieved from your platform storage/database
  const [recordings, setRecordings] = useState([
    { id: "REC-8291", name: "Advanced Strength & Conditioning", duration: "45 mins", date: "2026-07-01" },
    { id: "REC-4412", name: "Cardio Endurance Masterclass", duration: "30 mins", date: "2026-07-04" },
    { id: "REC-9034", name: "Flexibility & Deep Yoga Flow", duration: "60 mins", date: "2026-07-06" }
  ]);

  const [activePlayback, setActivePlayback] = useState(null);

  // Action Handlers
  const handlePlay = (sessionName) => {
    setActivePlayback(`Now streaming playback wrapper for: "${sessionName}"...`);
    // Clear playback message after 4 seconds
    setTimeout(() => setActivePlayback(null), 4000);
  };

  const handleDownload = (id) => {
    alert(`📥 Simulating secure download pipeline for recording asset: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(`Are you sure you want to permanently delete recording ${id}?`);
    if (confirmed) {
      setRecordings(recordings.filter(rec => rec.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerArea}>
        <h2 style={styles.mainTitle}>📹 Session Recordings Archive</h2>
        <p style={styles.subtitle}>Review, manage, and distribute recorded physical training assets</p>
      </div>

      {/* Video Playback Simulation Banner */}
      {activePlayback && (
        <div style={styles.playbackBanner}>
          <span style={styles.spinner}>▶️</span> {activePlayback}
        </div>
      )}

      {/* Conditional Layout: Empty State vs Recording Cards Grid */}
      {recordings.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No session recordings found in the repository. Use your upload tools to add logs.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {recordings.map((recording) => (
            <div key={recording.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.idBadge}>{recording.id}</span>
                <span style={styles.dateLabel}>{recording.date}</span>
              </div>
              
              <h3 style={styles.sessionName}>{recording.name}</h3>
              <p style={styles.metaText}>⏱️ <strong>Duration:</strong> {recording.duration}</p>

              <hr style={styles.divider} />

              <div style={styles.buttonGroup}>
                <button 
                  onClick={() => handlePlay(recording.name)} 
                  style={{ ...styles.btn, ...styles.btnPlay }}
                >
                  Play
                </button>
                <button 
                  onClick={() => handleDownload(recording.id)} 
                  style={{ ...styles.btn, ...styles.btnDownload }}
                >
                  Download
                </button>
                <button 
                  onClick={() => handleDelete(recording.id)} 
                  style={{ ...styles.btn, ...styles.btnDelete }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Scoped component design tokens 
const styles = {
  container: { padding: '40px 24px', backgroundColor: '#f8fafc', minHeight: '100vh' },
  headerArea: { marginBottom: '32px', textAlign: 'left' },
  mainTitle: { margin: '0 0 8px 0', fontSize: '1.8rem', color: '#0f172a' },
  subtitle: { margin: '0', color: '#64748b', fontSize: '1rem' },
  playbackBanner: { backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '14px 20px', borderRadius: '8px', marginBottom: '24px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' },
  card: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  idBadge: { backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600', letterSpacing: '0.5px' },
  dateLabel: { color: '#94a3b8', fontSize: '0.82rem' },
  sessionName: { margin: '0 0 8px 0', fontSize: '1.2rem', color: '#1e293b', lineHeight: '1.4' },
  metaText: { color: '#475569', fontSize: '0.9rem', margin: '0 0 16px 0' },
  divider: { border: '0', height: '1px', backgroundColor: '#f1f5f9', margin: '0 0 16px 0' },
  buttonGroup: { display: 'flex', gap: '10px', marginTop: 'auto' },
  btn: { flex: 1, padding: '10px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' },
  btnPlay: { backgroundColor: '#2563eb', color: '#ffffff' },
  btnDownload: { backgroundColor: '#f1f5f9', color: '#334155' },
  btnDelete: { backgroundColor: '#fef2f2', color: '#dc2626' },
  emptyState: { textAlign: 'center', padding: '48px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#64748b' }
};

export default SessionRecordings;