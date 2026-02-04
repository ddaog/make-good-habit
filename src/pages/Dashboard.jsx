import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHabitStore } from '../context/HabitStore';
import { Plus, TrendingUp, Zap, FlaskConical, CheckCircle2, XCircle, RotateCcw, Edit2 } from 'lucide-react';

export default function Dashboard() {
    const { targetHabit, logs, activeExperiment, completeExperiment, experimentStats, incrementSuccess, incrementFailure } = useHabitStore();
    const navigate = useNavigate();

    const logCount = logs.length;
    // Simple "streak" logic: count logs for now, or successful conversions later
    const streak = logs.filter(l => l.actionTaken === 'good').length;
    const successCount = experimentStats?.successCount || 0;



    const handleExperimentComplete = (success) => {
        if (success) {
            incrementSuccess();
            // If they reached 3 successes, then it's a "Real Success"
            if (successCount + 1 >= 3) {
                const result = completeExperiment(true);
                navigate('/success');
            } else {
                // Just log the success and keep experimenting
                // Ideally we should log a "success" event here without closing the experiment, 
                // but for this prototype, we'll keep the experiment active until 3 hits.
                // We need a visual feedback for the partial success.
            }
        } else {
            incrementFailure();
            // New UX: failures trigger observation
            navigate('/log-urge');
        }
    };

    return (
        <div className="container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', margin: 0 }}>대시보드</h1>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>환영합니다.</p>
                </div>
                <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Zap size={16} color="var(--color-accent)" />
                    <span style={{ fontWeight: 'bold' }}>{streak}</span>
                </div>
            </header>

            {/* Hero Card for Current Habit */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-panel"
                style={{ padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(20,20,25,0.8) 0%, rgba(30,30,40,0.4) 100%)' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.4rem', margin: 0 }}>
                        {activeExperiment ? activeExperiment.name : (targetHabit?.name || "목표 없음")}
                    </h2>
                    <span style={{ background: 'rgba(109, 93, 252, 0.2)', color: '#b65dfc', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem' }}>진행 중</span>
                </div>
                <p style={{ marginBottom: '1.5rem' }}>
                    {activeExperiment ? "현재 실험 중인 대체 행동입니다" : `목표: ${targetHabit?.target || "없음"}`}
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div
                        onClick={() => navigate('/log-history')}
                        style={{ flex: 1, cursor: 'pointer' }}
                    >
                        <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '4px', display: 'flex', alignItems: 'center' }}>
                            로그 기록 <Edit2 size={12} style={{ marginLeft: '4px', opacity: 0.5 }} />
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{logCount}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '4px' }}>상태</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {activeExperiment ? '실험 중' : '추적 중'}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Experiment Active Card */}
            {activeExperiment && (
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="glass-panel"
                    style={{
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        border: '1px solid var(--color-accent)',
                        background: 'rgba(109, 93, 252, 0.05)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                        <FlaskConical size={20} color="var(--color-accent)" />
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>테스트: {activeExperiment.name}</h3>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.3rem', opacity: 0.8 }}>
                            <span>성공 횟수</span>
                            <span>{successCount} / 3</span>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', height: '8px', overflow: 'hidden', marginBottom: '0.8rem' }}>
                            <div style={{ width: `${(successCount / 3) * 100}%`, height: '100%', background: '#2ecc71', transition: 'width 0.3s ease' }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', opacity: 0.7 }}>
                            <span>전체 시도: {(experimentStats?.successCount || 0) + (experimentStats?.failureCount || 0)}회</span>
                            <span style={{ color: '#ff6b6b' }}>실패: {experimentStats?.failureCount || 0}회</span>
                        </div>
                    </div>

                    <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>다음에 욕구를 느낄 때 이 행동을 시도해보세요. 효과가 있었나요?</p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => handleExperimentComplete(true)}
                            className="btn-primary"
                            style={{ flex: 1, padding: '0.8rem', fontSize: '0.9rem', background: 'rgba(46, 204, 113, 0.2)', border: '1px solid #2ecc71', color: '#2ecc71', boxShadow: 'none' }}
                        >
                            <CheckCircle2 size={18} style={{ marginRight: '5px', verticalAlign: 'text-bottom' }} /> 효과 있음
                        </button>
                        <button
                            onClick={() => handleExperimentComplete(false)}
                            className="btn-secondary"
                            style={{ flex: 1, padding: '0.8rem', fontSize: '0.9rem', color: '#e74c3c', borderColor: '#e74c3c' }}
                        >
                            <XCircle size={18} style={{ marginRight: '5px', verticalAlign: 'text-bottom' }} /> 효과 없음
                        </button>
                    </div>
                </motion.div>
            )}





            {/* Action Area */}
            <h3 style={{ marginBottom: '1rem' }}>Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                    className="glass-panel"
                    onClick={() => navigate('/log-urge')}
                    style={{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        cursor: 'pointer',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ background: 'var(--gradient-primary)', borderRadius: '50%', padding: '0.8rem' }}>
                        <Plus size={24} color="white" />
                    </div>
                    <span style={{ fontWeight: '600' }}>욕구 기록</span>
                </button>

                <button
                    className="glass-panel"
                    onClick={() => navigate('/experiment-history')}
                    style={{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        cursor: 'pointer',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ background: 'rgba(109, 93, 252, 0.2)', borderRadius: '50%', padding: '0.8rem' }}>
                        <TrendingUp size={24} color="var(--color-accent)" />
                    </div>
                    <span style={{ fontWeight: '500' }}>실험 기록</span>
                </button>
            </div>

            {/* Restart Onboarding FAB */}
            <button
                onClick={() => navigate('/onboarding/concept')}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.7)',
                    zIndex: 100
                }}
                title="무엇인지 다시 보기"
            >
                <RotateCcw size={24} />
            </button>
        </div>
    );
}
