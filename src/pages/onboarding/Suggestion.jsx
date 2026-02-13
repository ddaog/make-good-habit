import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHabitStore } from '../../context/HabitStore';
import { Sparkles, ArrowRight, Target, FlaskConical } from 'lucide-react';

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
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ textAlign: 'center' }}
                >
                    <Sparkles size={48} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
                    <div className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        당신의 삶을 분석하는 중...
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container"
            style={{ justifyContent: 'center' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(109, 93, 252, 0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
                    <Sparkles size={32} color="var(--color-accent)" />
                </div>
                <h2 className="text-gradient" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>실험 가이드: 새로운 행동 시도하기</h2>
                <p style={{ fontSize: '0.95rem' }}>분석 결과, 당신의 첫 번째 실험 목표를 정했습니다.</p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem', border: '1px solid var(--color-accent)', background: 'rgba(109, 93, 252, 0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', opacity: 0.8 }}>
                    <Target size={16} color="var(--color-accent)" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>추천 목표</span>
                </div>
                <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.5rem' }}>{suggestedHabit.name}</h3>
                <p style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>{suggestedHabit.target}</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0, lineHeight: '1.5' }}>{suggestedHabit.reason}</p>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FlaskConical size={18} color="var(--color-accent)" />
                    실험은 이렇게 진행됩니다
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div className="badge">1</div>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>기존 습관의 <strong>신호(Trigger)</strong>가 올 때까지 기다립니다.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div className="badge">2</div>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>기존 습관 대신, <strong>선택한 새로운 행동</strong>을 시도합니다.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div className="badge">3</div>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>시도 후 <strong>효과가 있었는지</strong> 정직하게 평가합니다.</p>
                    </div>
                </div>
            </div>

            <button className="btn-primary" onClick={handleAccept} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                첫 실험 선택하러 가기 <ArrowRight size={18} />
            </button>
        </motion.div>
    );
}
