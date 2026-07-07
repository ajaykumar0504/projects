import React, { useState } from 'react';

function UploadRecordingModal({ isOpen, onClose, onUploadSuccess }) {
  const [sessionType, setSessionType] = useState('');
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- Validation Rules ---
    if (!sessionType) return setError('Please select a session type.');
    if (!title.trim()) return setError('Please enter a recording title.');
    if (!videoFile) return setError('Please select a video file to upload.');
    if (!duration.trim()) return setError('Please specify the recording duration.');

    // --- Mock Data Generator ---
    const mockRecordingId = `REC-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const newRecording = {
      id: mockRecordingId,
      sessionType,
      title: title.trim(),
      fileName: videoFile.name,
      duration: duration.trim(),
      uploadedAt: new Date().toLocaleDateString(),
    };

    // Trigger success callback to append state dynamically
    onUploadSuccess(newRecording);

    // Reset Form Fields
    setSessionType('');
    setTitle('');
    setVideoFile(null);
    setDuration('');
    
    // Close the Modal automatically
    onClose();
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>📹 Upload New Recording Session</h3>
          <button onClick={onClose} style={styles.closeHeaderBtn}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.modalBody}>
          {error && <div style={styles.errorAlert}>⚠️ {error}</div>}

          {/* 1. Session Dropdown */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Session Type *</label>
            <select 
              value={sessionType} 
              onChange={(e) => setSessionType(e.target.value)}
              style={styles.input}
            >
              <option value="">-- Select Active Course / Session --</option>
              <option value="Full-Stack Web Development">Full-Stack Web Development</option>
              <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
              <option value="UI/UX Design Masterclass">UI/UX Design Masterclass</option>
              <option value="Cloud Architecture (AWS)">Cloud Architecture (AWS)</option>
            </select>
          </div>

          {/* 2. Recording Title Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Recording Title *</label>
            <input 
              type="text" 
              placeholder="e.g., Lecture 04: MongoDB Integration Patterns"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* 3. Upload Video Field */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Upload Video File (.mp4, .mkv) *</label>
            <input 
              type="file" 
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              style={styles.fileInput}
            />
            {videoFile && <p style={styles.fileTargetName}>Selected: 📄 {videoFile.name}</p>}
          </div>

          {/* 4. Duration Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Duration *</label>
            <input 
              type="text" 
              placeholder="e.g., 01:24:15 or 45 mins"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonActionRow}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn}>
              Publish & Upload Recording
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(3px)',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    width: '90%',
    maxWidth: '500px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    animation: 'fadeIn 0.2s ease-out',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 24px',
    borderBottom: '1px solid #eef2f5',
    backgroundColor: '#f8f9fa',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.15rem',
    color: '#1e293b',
    fontWeight: '600',
  },
  closeHeaderBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.6rem',
    cursor: 'pointer',
    color: '#94a3b8',
  },
  modalBody: {
    padding: '24px',
  },
  errorAlert: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '0.9rem',
    border: '1px solid #fca5a5',
  },
  inputGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '0.88rem',
    fontWeight: '500',
    color: '#475569',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    color: '#334155',
    boxSizing: 'border-box',
    outline: 'none',
  },
  fileInput: {
    width: '100%',
    padding: '8px 10px',
    borderRadius: '6px',
    border: '1px dashed #cbd5e1',
    backgroundColor: '#f8fafc',
    cursor: 'pointer',
  },
  fileTargetName: {
    margin: '6px 0 0 0',
    fontSize: '0.82rem',
    color: '#0284c7',
    fontWeight: '500',
  },
  buttonActionRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '26px',
  },
  cancelBtn: {
    padding: '10px 18px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#64748b',
    cursor: 'pointer',
    fontWeight: '500',
  },
  submitBtn: {
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2585eb',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

export default UploadRecordingModal;