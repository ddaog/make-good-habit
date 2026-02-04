import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Crown, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHabitStore } from '../context/HabitStore';
import confetti from 'canvas-confetti';

export default function Success() {
    const navigate = useNavigate();
    const { targetHabit } = useHabitStore();
    const [showPaywall, setShowPaywall] = useState(false);

    // Trigger confetti on mount
    useState(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6d5dfc', '#b65dfc', '#ffffff']
        });
    }, []);

    if (showPaywall) {
        return (
            <div className="container" style={{ textAlign: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div style={{ margin: '0 auto 1.5rem', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #FFD700 0%, #FDB931 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)' }}>
                        <Crown size={40} color="black" />
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>프로 멤버</h1>
                    <p style={{ marginBottom: '2rem' }}>변화할 수 있다는 것을 증명하셨습니다. 이제 잠재력을 폭발시키세요.</p>

                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                            <CheckCircle2 color="var(--color-accent)" size={20} />
                            <span>무제한 목표 설정</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                            <CheckCircle2 color="var(--color-accent)" size={20} />
                            <span>고급 분석 데이터</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckCircle2 color="var(--color-accent)" size={20} />
                            <span>AI 코칭</span>
                        </div>
                    </div>

                    <button className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
                        구독하기 - $4.99/월
                    </button>
                    <button className="btn-secondary" style={{ width: '100%' }} onClick={() => navigate('/dashboard')}>
                        나중에 하기
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container" style={{ textAlign: 'center', justifyContent: 'center' }}>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div style={{ marginBottom: '2rem', display: 'inline-block', padding: '20px', borderRadius: '50%', background: 'rgba(46, 204, 113, 0.2)' }}>
                    <CheckCircle2 size={64} color="#2ecc71" />
                </div>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>목표 달성!</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem' }}>
                    성공적으로 <strong style={{ color: 'white' }}>{targetHabit?.name || '나쁜 습관'}</strong>을 바꿨습니다.
                </p>

                <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(109, 93, 252, 0.2) 0%, rgba(20, 20, 25, 0.4) 100%)' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>12</div>
                    <div style={{ opacity: 0.7 }}>이겨낸 욕구</div>
                </div>

                <button
                    className="btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    onClick={() => setShowPaywall(true)}
                >
                    다음 목표 설정 <ArrowRight size={20} />
                </button>
            </motion.div>
        </div>
    );
}
