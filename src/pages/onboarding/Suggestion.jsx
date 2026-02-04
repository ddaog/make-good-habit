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

    const suggestions = {
        'phone': {
            name: "스마트폰 거리두기",
            target: "침실 밖 충전하기",
            reason: "물리적 거리를 두는 것이 의지력보다 강력합니다."
        },
        'sleep': {
            name: "수면 의식",
            target: "11시 조명 끄기",
            reason: "빛을 차단하여 멜라토닌 분비를 돕습니다."
        },
        'food': {
            name: "식욕 서핑",
            target: "물 한 잔 마시고 10분 대기",
            reason: "가짜 배고픔은 15분 내에 사라집니다."
        },
        'smoke': {
            name: "호흡 스위치",
            target: "심호흡 3번 하기",
            reason: "니코틴이 주는 이완 효과를 호흡으로 대체합니다."
        },
        'lazy': {
            name: "2분 규칙",
            target: "딱 2분만 작업하기",
            reason: "시작의 저항을 낮추면 관성이 생깁니다."
        },
        'other': {
            name: "의식적 멈춤",
            target: "행동 전 '멈춤' 외치기",
            reason: "무의식적인 행동 패턴을 끊어냅니다."
        }
    };

    const suggestedHabit = suggestions[userProfile.habitCategory] || suggestions['other'];

    const handleAccept = () => {
        setHabit(suggestedHabit);
        navigate('/experiment/proposal');
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
                첫 실험 선택하러 가기
            </button>
        </motion.div>
    );
}
