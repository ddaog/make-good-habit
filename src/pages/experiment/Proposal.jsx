import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { useHabitStore } from '../../context/HabitStore';
import { generateAlternatives } from '../../services/aiService';

export default function ExperimentProposal() {
    const navigate = useNavigate();
    const { startExperiment, userProfile } = useHabitStore();
    const [loading, setLoading] = useState(true);
    const [alternatives, setAlternatives] = useState([]);
    const [error, setError] = useState(null);

    const fallbacks = [
        { id: 1, title: '심호흡 5회', desc: '보편적인 이완 방법입니다.' },
        { id: 2, title: '그냥 걷기', desc: '상황에서 벗어나는 가장 쉬운 방법입니다.' },
        { id: 3, title: '물 마시기', desc: '신체 상태를 리셋합니다.' }
    ];

    useEffect(() => {
        async function fetchAlternatives() {
            setLoading(true);
            try {
                const aiAlternatives = await generateAlternatives(userProfile.habitCategory, userProfile.currentLife);
                setAlternatives(aiAlternatives);
            } catch (err) {
                console.error('AI Alternatives Failed:', err);
                setError(err.message === 'API_KEY_MISSING' ? 'KEY_MISSING' : 'FAILED');
                setAlternatives(fallbacks);
            } finally {
                setLoading(false);
            }
        }
        fetchAlternatives();
    }, [userProfile]);

    const handleSelect = (behavior) => {
        startExperiment({ name: behavior });
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <div className="container" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ textAlign: 'center' }}
                >
                    <Sparkles size={48} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
                    <div className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        맞춤 실험을 설계 중...
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, marginRight: '1rem' }}
                >
                    <ArrowLeft size={24} />
                </button>
                <div style={{ flex: 1, paddingRight: '24px' }}>
                    <h1 style={{ fontSize: '1.2rem', margin: 0 }}>실험 설계</h1>
                </div>
            </header>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ marginBottom: '2rem' }}
            >
                <Sparkles size={48} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
                <h2 className="text-gradient">새로운 시도</h2>
                <p>욕구가 느껴지는 순간, 기존 습관 대신 시도할 행동을 골라주세요.</p>
                <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>가장 시도해보고 싶은 전략 하나를 선택해 실험을 시작합니다.</p>
            </motion.div>

            {error && (
                <div style={{
                    padding: '10px',
                    background: 'rgba(231, 76, 60, 0.1)',
                    border: '1px solid rgba(231, 76, 60, 0.3)',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    fontSize: '0.8rem',
                    color: '#e74c3c',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textAlign: 'left'
                }}>
                    <AlertCircle size={14} />
                    {error === 'KEY_MISSING'
                        ? 'API 키가 설정되지 않아 기본 실험 세트를 표시합니다.'
                        : '연결 문제로 인해 기본 실험 세트를 표시합니다.'}
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {alternatives.map((alt) => (
                    <motion.button
                        key={alt.id}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        whileTap={{ scale: 0.98 }}
                        className="glass-panel"
                        onClick={() => handleSelect(alt.title)}
                        style={{
                            padding: '1.5rem',
                            textAlign: 'left',
                            border: '1px solid rgba(255,255,255,0.1)',
                            cursor: 'pointer',
                            color: 'white',
                            background: 'rgba(20,20,30,0.6)'
                        }}
                    >
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--color-accent)' }}>{alt.title}</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{alt.desc}</p>
                    </motion.button>
                ))}
            </div>

        </div>
    );
}
