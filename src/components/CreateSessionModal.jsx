import React, { useState } from 'react';

const CreateSessionModal = ({ isOpen, onClose, onCreateSession }) => {
  const [batch, setBatch] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  // Mock batch names for the target class dropdown selection
  const mockBatches = [
    'AI & Machine Learning - Batch A',
    'Full Stack Web Dev - Batch B',
    'Data Science Core - Batch C',
    'UI/UX Design Masterclass'
  ];

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!batch || !date || !time) {
      setError('Please fill out all session fields.');
      return;
    }

    setError('');
    
    // Generate a secure, randomized mock Room ID configuration
    const generatedRoomId = `room-${Math.floor(100000 + Math.random() * 900000)}`;

    // Forward the compiled data structure up to the parent page state
    onCreateSession({
      id: generatedRoomId,
      batch,
      date,
      time,
      notified: false
    });

    // Reset fields and clear modal state overlay
    setBatch('');
    setDate('');
    setTime('');
    onClose();
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Setup New Live Session</h2>
          <button onClick={onClose} style={styles.closeXButton}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.formLayout}>
          {error && <div style={styles.errorText}>{error}</div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Target Batch</label>
            <select 
              value={batch} 
              onChange={(e) => setBatch(e.target.value)}
              style={styles.inputStyle}
            >
              <option value="">-- Choose an active batch --</option>
              {mockBatches.map((b, idx) => (
                <option key={idx} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Scheduled Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              style={styles.inputStyle}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Scheduled Start Time</label>
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              style={styles.inputStyle}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            🚀 Generate Meeting & Append
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eef2f5',
    paddingBottom: '10px'
  },
  modalTitle: { margin: 0, fontSize: '1.4rem', color: '#1a1d20' },
  closeXButton: { background: 'none', border: 'none', fontSize: '1.6rem', cursor: 'pointer', color: '#6c757d' },
  formLayout: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '0.9rem', fontWeight: '600', color: '#495057' },
  inputStyle: { padding: '10px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '1rem' },
  errorText: { color: '#dc3545', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '6px', fontSize: '0.9rem' },
  submitButton: { padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#0d6efd', color: '#fff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: 'background-color 0.2s' }
};

export default CreateSessionModal;