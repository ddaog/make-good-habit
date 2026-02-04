import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trash2, Edit2, Check, X } from 'lucide-react';
import { useHabitStore } from '../context/HabitStore';

export default function LogHistory() {
    const { logs, deleteLog, updateLog } = useHabitStore();
    const navigate = useNavigate();
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const handleEditClick = (log) => {
        setEditingId(log.id);
        setEditForm(log);
    };

    const handleUpdate = () => {
        updateLog(editingId, editForm);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteLog(id);
        }
    };

    return (
        <div className="container">
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, marginRight: '1rem' }}
                >
                    <ArrowLeft size={24} />
                </button>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '1.5rem', margin: 0 }}>기록 내역</h1>
                </div>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {logs.length === 0 ? (
                    <p style={{ opacity: 0.6, textAlign: 'center', marginTop: '2rem' }}>아직 기록이 없습니다.</p>
                ) : (
                    logs.map((log) => (
                        <motion.div
                            key={log.id}
                            layout
                            className="glass-panel"
                            style={{ padding: '1rem', position: 'relative' }}
                        >
                            {editingId === log.id ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <input
                                        className="input-field"
                                        value={editForm.trigger}
                                        onChange={(e) => setEditForm({ ...editForm, trigger: e.target.value })}
                                        placeholder="신호 (Trigger)"
                                    />
                                    <input
                                        className="input-field"
                                        value={editForm.mood}
                                        onChange={(e) => setEditForm({ ...editForm, mood: e.target.value })}
                                        placeholder="감정 (Mood)"
                                    />
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        <button className="btn-primary" onClick={handleUpdate} style={{ padding: '0.5rem', fontSize: '0.8rem' }}>
                                            <Check size={16} style={{ marginRight: '4px' }} /> 저장
                                        </button>
                                        <button className="btn-secondary" onClick={() => setEditingId(null)} style={{ padding: '0.5rem', fontSize: '0.8rem' }}>
                                            <X size={16} style={{ marginRight: '4px' }} /> 취소
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '4px' }}>
                                                {new Date(log.timestamp).toLocaleString()}
                                            </div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{log.trigger}</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--color-accent)' }}>{log.mood}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={() => handleEditClick(log)}
                                                style={{ background: 'none', border: 'none', color: 'white', opacity: 0.6, cursor: 'pointer' }}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(log.id)}
                                                style={{ background: 'none', border: 'none', color: '#ff6b6b', opacity: 0.8, cursor: 'pointer' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
