import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHabitStore } from '../../context/HabitStore';

export default function Suggestion() {
    const { userProfile, setHabit } = useHabitStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Mock AI Logic to "Analyze" their input
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Fake "thinking" time
        return () => clearTimeout(timer);
    }, []);

    const suggestedHabit = {
        name: "심야 스마트폰 사용",
        target: "밤 11시 취침",
        reason: "현재 생활 패턴을 볼 때, 이것이 에너지를 개선하는 가장 쉬운 방법입니다."
    };

    const handleAccept = () => {
        setHabit(suggestedHabit);
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <div className="container" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-gradient"
                    style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                >
                    당신의 삶을 분석하는 중...
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
            style={{ justifyContent: 'center' }}
        >
            <h2 className="text-gradient">시작점을 찾았습니다</h2>
            <p style={{ marginBottom: '2rem' }}>이상적인 삶에 도달하기 위해, 작게 시작해봅시다.</p>

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{suggestedHabit.name}</h3>
                <p style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>목표: {suggestedHabit.target}</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{suggestedHabit.reason}</p>
            </div>

            <button className="btn-primary" onClick={handleAccept} style={{ width: '100%' }}>
                도전 수락하기
            </button>
        </motion.div>
    );
}
