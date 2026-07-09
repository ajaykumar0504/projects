import React, { useState } from 'react';

function SessionManagement() {
  // 1. Initial State for Mock Classroom Data Elements
  const [sessions, setSessions] = useState([
    { id: "SESS-401", name: "Python", trainer: "Ajay", date: "2026-07-10", time: "09:00 AM", duration: "45 mins", status: "Upcoming", description: "Heavy compound lifting fundamentals." },
    { id: "SESS-402", name: "DBMS", trainer: "Vijay", date: "2026-07-09", time: "11:00 AM", duration: "30 mins", status: "Live", description: "Heart-rate optimization training session." },
    { id: "SESS-403", name: "JavaScript", trainer: "Manoj", date: "2026-07-08", time: "04:30 PM", duration: "60 mins", status: "Completed", description: "Deep stretching and stabilizer engagement." }
  ]);

  // UI Control states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  
  // Modal tracking states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [joinedRoom, setJoinedRoom] = useState(null);

  // Form input fields tracking
  const [formData, setFormData] = useState({ name: '', trainer: '', date: '', time: '', duration: '', description: '', status: 'Upcoming' });

  // 2. Action Handlers
  const handleOpenCreateModal = () => {
    setEditingSession(null);
    setFormData({ name: '', trainer: '', date: '', time: '', duration: '', description: '', status: 'Upcoming' });
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (session) => {
    setEditingSession(session.id);
    setFormData(session);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingSession) {
      // Update existing record mapping
      setSessions(sessions.map(s => s.id === editingSession ? { ...formData, id: editingSession } : s));
    } else {
      // Append a fresh unique custom entry
      const newSession = {
        ...formData,
        id: `SESS-${Math.floor(1000 + Math.random() * 9000)}`
      };
      setSessions([newSession, ...sessions]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Permanently remove session ${id}?`)) {
      setSessions(sessions.filter(s => s.id !== id));
      if (joinedRoom && joinedRoom.id === id) setJoinedRoom(null);
    }
  };

  const handleJoinClassroom = (session) => {
    setJoinedRoom(session);
  };

  // 3. Search and Filtering Execution Engine Pipeline
  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || session.status === statusFilter;
    const matchesDate = !dateFilter || session.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div style={styles.container}>
      {/* Page Title Header Row */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.mainTitle}>🗓️ Session Management Panel</h2>
          <p style={styles.subtitle}>Create, update schedules, and track live virtual lecture feeds</p>
        </div>
        <button onClick={handleOpenCreateModal} style={styles.addBtn}>+ Add New Session</button>
      </div>

      {/* 🖥️ VIRTUAL CLASSROOM STREAM PIPELINE OVERLAY */}
      {joinedRoom && (
        <div style={styles.classroomOverlay}>
          <div style={styles.classroomHeader}>
            <span style={styles.livePulse}>● SIMULATING LIVE VIRTUAL CLASSROOM</span>
            <button onClick={() => setJoinedRoom(null)} style={styles.leaveRoomBtn}>🚪 Leave Room</button>
          </div>
          <div style={styles.classroomStage}>
            <h3>🎥 {joinedRoom.name}</h3>
            <p>Led by Trainer: <strong>{joinedRoom.trainer}</strong> | Room Connection Protocol Active</p>
            <div style={styles.avatarFeedSim}>[ Web Cam Stream Matrix Simulation Active ]</div>
          </div>
        </div>
      )}

      {/* 🔍 SEARCH AND CONTROLS SECTION */}
      <div style={styles.controlsBar}>
        <input 
          type="text" placeholder="🔍 Search by Session Name..." 
          value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={styles.searchInput}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={styles.selectInput}>
          <option value="All">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Live">Live</option>
          <option value="Completed">Completed</option>
        </select>
        <input 
          type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} style={styles.dateInput}
        />
      </div>

      {/* 📇 SESSION LIST CARDS RENDERING GRID */}
      {filteredSessions.length === 0 ? (
        <div style={styles.emptyState}>No matching scheduled sessions found in filters.</div>
      ) : (
        <div style={styles.grid}>
          {filteredSessions.map(session => (
            <div key={session.id} style={styles.card}>
              <div style={styles.cardTopRow}>
                <span style={styles.idBadge}>{session.id}</span>
                <span style={{ 
                  ...styles.statusTag, 
                  backgroundColor: session.status === 'Live' ? '#fef2f2' : session.status === 'Upcoming' ? '#eff6ff' : '#f0fdf4',
                  color: session.status === 'Live' ? '#dc2626' : session.status === 'Upcoming' ? '#2563eb' : '#16a34a'
                }}>
                  {session.status}
                </span>
              </div>

              <h3 style={styles.sessionTitleText}>{session.name}</h3>
              <p style={styles.metaDataText}>👤 <strong>Trainer:</strong> {session.trainer}</p>
              <p style={styles.metaDataText}>📅 <strong>Schedule:</strong> {session.date} at {session.time}</p>
              <p style={styles.metaDataText}>⏱️ <strong>Length:</strong> {session.duration}</p>
              <p style={styles.descText}>{session.description}</p>

              <div style={styles.cardActionFooter}>
                <button 
                  onClick={() => handleJoinClassroom(session)} 
                  disabled={session.status === 'Completed'}
                  style={{ ...styles.actionBtn, ...styles.joinBtn, opacity: session.status === 'Completed' ? 0.4 : 1 }}
                >
                  Join Room
                </button>
                <button onClick={() => handleOpenEditModal(session)} style={{ ...styles.actionBtn, ...styles.editBtn }}>Edit</button>
                <button onClick={() => handleDelete(session.id)} style={{ ...styles.actionBtn, ...styles.deleteBtn }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📝 SAVE / UPDATE POPUP FORM CONTAINER MODAL */}
      {isFormOpen && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalBox}>
            <h3 style={{ margin: '0 0 16px 0' }}>{editingSession ? '✏️ Edit Session Parameters' : '➕ Schedule New Session'}</h3>
            <form onSubmit={handleFormSubmit}>
              <input type="text" placeholder="Session Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={styles.formField} />
              <input type="text" placeholder="Trainer Name" required value={formData.trainer} onChange={e => setFormData({ ...formData, trainer: e.target.value })} style={styles.formField} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} style={styles.formField} />
                <input type="text" placeholder="Time (e.g. 10:00 AM)" required value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} style={styles.formField} />
              </div>
              <input type="text" placeholder="Duration (e.g. 45 mins)" required value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} style={styles.formField} />
              
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={styles.formField}>
                <option value="Upcoming">Upcoming</option>
                <option value="Live">Live</option>
                <option value="Completed">Completed</option>
              </select>

              <textarea placeholder="Description notes..." rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={styles.formField}></textarea>

              <div style={styles.modalActionButtonsRow}>
                <button type="button" onClick={() => setIsFormOpen(false)} style={styles.formCancelBtn}>Cancel</button>
                <button type="submit" style={styles.formSaveBtn}>Save Layout Config</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Complete Component Style Guide Token Blocks
const styles = {
  container: { padding: '40px 24px', backgroundColor: '#f8fafc', minHeight: '90vh' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  mainTitle: { margin: '0 0 4px 0', fontSize: '1.75rem', color: '#0f172a' },
  subtitle: { margin: '0', color: '#64748b', fontSize: '0.95rem' },
  addBtn: { padding: '12px 24px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  
  controlsBar: { display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' },
  searchInput: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 2, minWidth: '200px' },
  selectInput: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1 },
  dateInput: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1 },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' },
  card: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  cardTopRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' },
  idBadge: { fontWeight: '700', fontSize: '0.8rem', color: '#64748b', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' },
  statusTag: { padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700' },
  sessionTitleText: { margin: '0 0 12px 0', fontSize: '1.25rem', color: '#1e293b' },
  metaDataText: { margin: '0 0 6px 0', fontSize: '0.88rem', color: '#475569' },
  descText: { margin: '12px 0', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', flexGrow: 1 },
  
  cardActionFooter: { display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #f1f5f9' },
  actionBtn: { padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', border: 'none', cursor: 'pointer', flex: 1 },
  joinBtn: { backgroundColor: '#1091b9', color: '#fff' },
  editBtn: { backgroundColor: '#f1f5f9', color: '#334155' },
  deleteBtn: { backgroundColor: '#fef2f2', color: '#dc6c26' },

  classroomOverlay: { backgroundColor: '#0f172a', borderRadius: '12px', padding: '20px', marginBottom: '32px', border: '2px solid #10b981' },
  classroomHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' },
  livePulse: { color: '#108cb9', fontWeight: '700', fontSize: '0.8rem' },
  leaveRoomBtn: { backgroundColor: '#ef4444', color: '#fff', padding: '4px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  classroomStage: { textAlign: 'center', color: '#fff', padding: '24px 0' },
  avatarFeedSim: { backgroundColor: '#020617', margin: '16px auto 0 auto', padding: '40px', maxWidth: '400px', color: '#475569', borderRadius: '8px', border: '1px dashed #334155' },

  modalBackdrop: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 },
  modalBox: { backgroundColor: '#fff', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '460px' },
  formField: { width: '100%', padding: '10px', marginBottom: '14px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' },
  modalActionButtonsRow: { display: 'flex', justifyContent: 'flex-end', gap: '12px' },
  formCancelBtn: { padding: '10px 16px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  formSaveBtn: { padding: '10px 16px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '40px', color: '#64748b', backgroundColor: '#fff', borderRadius: '12px', border: '1px dashed #cbd5e1' }
};

export default SessionManagement;