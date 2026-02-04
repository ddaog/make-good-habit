import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, Calendar } from 'lucide-react';
import { useHabitStore } from '../context/HabitStore';

export default function ExperimentHistory() {
    const { experimentHistory } = useHabitStore();
    const navigate = useNavigate();

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
                    <h1 style={{ fontSize: '1.5rem', margin: 0 }}>실험 기록</h1>
                </div>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {experimentHistory.length === 0 ? (
                    <p style={{ opacity: 0.6, textAlign: 'center', marginTop: '2rem' }}>아직 완료된 실험이 없습니다.</p>
                ) : (
                    experimentHistory.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel"
                            style={{ padding: '1.2rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: exp.success ? '#2ecc71' : '#e74c3c' }}>
                                    {exp.name}
                                </h3>
                                {exp.success ? (
                                    <CheckCircle2 size={20} color="#2ecc71" />
                                ) : (
                                    <XCircle size={20} color="#e74c3c" />
                                )}
                            </div>

                            <div style={{ fontSize: '0.85rem', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Calendar size={14} />
                                <span>
                                    {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
                                </span>
                            </div>

                            <div style={{ marginTop: '0.8rem', fontSize: '0.9rem' }}>
                                <span style={{
                                    padding: '4px 10px',
                                    borderRadius: '8px',
                                    background: exp.success ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)',
                                    color: exp.success ? '#2ecc71' : '#e74c3c'
                                }}>
                                    {exp.success ? '성공' : '실패'}
                                </span>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
