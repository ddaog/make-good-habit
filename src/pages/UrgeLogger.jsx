import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHabitStore } from '../context/HabitStore';
import { ArrowLeft, MapPin, Smile, Clock } from 'lucide-react';

export default function UrgeLogger() {
    const navigate = useNavigate();
    const { addLog } = useHabitStore();

    const [trigger, setTrigger] = useState('');
    const [mood, setMood] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLog = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            trigger,
            mood,
            location,
            actionTaken: 'logged', // default
        };
        addLog(newLog);
        navigate('/experiment/proposal'); // Navigate to new proposal after observation
    };

    return (
        <div className="container">
            <header style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, marginRight: '1rem' }}
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 style={{ fontSize: '1.5rem', margin: 0 }}>실패의 순간 관찰하기</h1>
                </div>
                <p style={{ opacity: 0.8, fontSize: '0.9rem', lineHeight: '1.5', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>💡 왜 관찰하나요?</span><br />
                    실험이 효과가 없었다면, 그 순간의 상황과 감정을 기록해보세요.
                    패턴을 발견하면 더 나은 대체 행동을 찾을 수 있습니다.
                </p>
            </header>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Trigger Input */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>무엇이 욕구를 유발했나요?</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="예: 알림을 봤을 때, 지루할 때..."
                        value={trigger}
                        onChange={(e) => setTrigger(e.target.value)}
                        required
                    />
                </div>

                {/* Mood Input (Simple Selection or Text) */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: '500' }}>
                        <Smile size={18} /> 기분이 어떠신가요?
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                        {['스트레스', '지루함', '피곤함', '불안함', '신남', '평범함'].map(m => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setMood(m)}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    border: mood === m ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.1)',
                                    background: mood === m ? 'rgba(109, 93, 252, 0.2)' : 'transparent',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Location Input */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: '500' }}>
                        <MapPin size={18} /> 어디에 계신가요?
                    </label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="예: 집, 사무실, 이동 중..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                    기록 저장
                </button>

            </form>
        </div>
    );
}
