import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHabitStore } from '../context/HabitStore';
import { Plus, TrendingUp, Zap, CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';

export default function Dashboard() {
    const { targetHabit, logs, activeExperiment, completeExperiment, experimentStats, incrementSuccess, incrementFailure, userProfile } = useHabitStore();
    const navigate = useNavigate();

    const logCount = logs.length;
    const streak = logs.filter(l => l.actionTaken === 'good').length;
    const successCount = experimentStats?.successCount || 0;

    const handleExperimentComplete = (success) => {
        if (success) {
            incrementSuccess();
            if (successCount + 1 >= 3) {
                completeExperiment(true);
                navigate('/success');
            }
        } else {
            incrementFailure();
            navigate('/log-urge');
        }
    };

    return (
        <div className="container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', margin: 0 }}>대시보드</h1>
                    <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>작은 변화가 큰 습관을 만듭니다.</p>
                </div>
                <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Zap size={16} color="var(--color-accent)" />
                    <span style={{ fontWeight: 'bold' }}>{streak}</span>
                </div>
            </header>

            {/* Hero Card: Behavior Swap Visualization */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-panel"
                style={{ padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(30,30,40,0.8) 0%, rgba(20,20,25,0.6) 100%)' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ background: 'rgba(109, 93, 252, 0.2)', color: '#b65dfc', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>현재 실험 중</span>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>전체 로그: {logCount}</div>
                </div>

                <div className="behavior-swap-container" style={{ margin: '0 0 1.5rem 0' }}>
                    <div className="behavior-item" style={{ opacity: 0.6, background: 'rgba(255, 255, 255, 0.02)' }}>
                        <XCircle color="#ff6b6b" size={18} />
                        <div style={{ flex: 1 }}>
                            <span style={{ fontSize: '0.7rem', opacity: 0.6, display: 'block' }}>기존 습관</span>
                            <span style={{ fontWeight: '500', textDecoration: 'line-through' }}>{userProfile.currentLife || targetHabit?.name || "기존 습관"}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', margin: '-8px 0', zIndex: 1 }}>
                        <div style={{ background: 'var(--color-bg)', padding: '4px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <ArrowRight size={16} style={{ opacity: 0.3 }} />
                        </div>
                    </div>

                    <div className="behavior-item" style={{ border: '1px solid var(--color-accent)', background: 'rgba(109, 93, 252, 0.08)' }}>
                        <CheckCircle2 color="var(--color-accent)" size={18} />
                        <div style={{ flex: 1 }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: 'bold', display: 'block' }}>새로운 행동</span>
                            <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{activeExperiment?.name || targetHabit?.target || "실험 없음"}</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', opacity: 0.8 }}>
                    <span>실험 성공 횟수</span>
                    <span style={{ fontWeight: 'bold' }}>{successCount} / 3</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', height: '6px', overflow: 'hidden', marginTop: '8px' }}>
                    <div style={{ width: `${(successCount / 3) * 100}%`, height: '100%', background: 'var(--gradient-primary)', transition: 'width 0.4s ease' }} />
                </div>
            </motion.div>

            {/* Experiment Quick Actions */}
            {activeExperiment && (
                <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.8, textAlign: 'center' }}>욕구가 올 때 새로운 행동을 하셨나요? 효과는 어땠나요?</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => handleExperimentComplete(true)}
                            className="btn-primary"
                            style={{ flex: 1, padding: '1rem', fontSize: '0.95rem', background: 'rgba(46, 204, 113, 0.1)', border: '1px solid #2ecc71', color: '#2ecc71', boxShadow: 'none' }}
                        >
                            효과 있음
                        </button>
                        <button
                            onClick={() => handleExperimentComplete(false)}
                            className="btn-secondary"
                            style={{ flex: 1, padding: '1rem', fontSize: '0.95rem', color: '#ff6b6b', borderColor: '#ff6b6b' }}
                        >
                            효과 없음
                        </button>
                    </div>
                </div>
            )}

            {/* Navigation Grid */}
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', opacity: 0.8 }}>나의 기록</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    className="glass-panel"
                    onClick={() => navigate('/log-urge')}
                    style={{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.8rem',
                        border: '1px solid rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ background: 'var(--gradient-primary)', borderRadius: '50%', padding: '0.6rem' }}>
                        <Plus size={20} color="white" />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>과정 기록</span>
                </button>

                <button
                    className="glass-panel"
                    onClick={() => navigate('/experiment-history')}
                    style={{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.8rem',
                        border: '1px solid rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ background: 'rgba(109, 93, 252, 0.15)', borderRadius: '50%', padding: '0.6rem' }}>
                        <TrendingUp size={20} color="var(--color-accent)" />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>실험 기록</span>
                </button>
            </div>

            {/* Restart FAB */}
            <button
                onClick={() => navigate('/onboarding/concept')}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(20, 20, 25, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.5)',
                    zIndex: 100
                }}
                title="온보딩 다시보기"
            >
                <RotateCcw size={20} />
            </button>
        </div>
    );
}
