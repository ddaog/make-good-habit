import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingLayout from '../../components/OnboardingLayout';
import { RefreshCw, Zap, Gift, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

export default function ConceptIntro() {
    const [showExample, setShowExample] = useState(false);

    return (
        <OnboardingLayout
            title="습관은 고리가 있습니다"
            nextPath="/onboarding/ideal-life"
            isNextDisabled={false}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem', overflowY: 'auto', paddingBottom: '20px' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255, 99, 71, 0.2)', padding: '12px', borderRadius: '50%' }}>
                        <Zap color="#ff6347" size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>1. 신호 (Trigger)</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>욕구를 유발하는 상황이나 감정</p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(109, 93, 252, 0.2)', padding: '12px', borderRadius: '50%' }}>
                        <RefreshCw color="#6d5dfc" size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>2. 행동 (Action)</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>우리가 무의식적으로 하는 행동</p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(46, 204, 113, 0.2)', padding: '12px', borderRadius: '50%' }}>
                        <Gift color="#2ecc71" size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>3. 보상 (Reward)</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>그 행동이 주는 일시적인 만족감</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="glass-panel"
                    style={{ padding: '1.2rem', marginTop: '0.5rem', textAlign: 'center', background: 'var(--gradient-glass)' }}
                >
                    <p style={{ margin: 0, fontWeight: 'bold' }}>우리는 '행동'만 바꿔서<br />같은 보상을 얻게 해드릴게요.</p>
                </motion.div>

                {/* Example Toggle */}
                <button
                    onClick={() => setShowExample(!showExample)}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'var(--color-text-secondary)',
                        padding: '10px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '0.9rem'
                    }}
                >
                    <Lightbulb size={16} />
                    {showExample ? '예시 닫기' : '이해가 잘 안되시나요? 예시 보기'}
                    {showExample ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                <AnimatePresence>
                    {showExample && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div className="glass-panel" style={{ padding: '1.2rem', background: 'rgba(20,20,25,0.8)' }}>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                                    {['퇴근 스트레스', '침대 스마트폰', '오후 3시 군것질'].map(tag => (
                                        <span key={tag} style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', whiteSpace: 'nowrap' }}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#ffd700' }}>예시: 퇴근 후 스트레스</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 12px', fontSize: '0.9rem' }}>
                                    <span style={{ opacity: 0.6 }}>신호:</span> <span>직장에서 받은 스트레스</span>
                                    <span style={{ opacity: 0.6 }}>행동:</span> <span style={{ color: '#ff6b6b', textDecoration: 'line-through' }}>매운 야식 먹기</span>
                                    <span style={{ opacity: 0.6 }}>보상:</span> <span>스트레스 해소</span>

                                    <div style={{ gridColumn: '1 / -1', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />

                                    <span style={{ opacity: 0.6 }}>새 행동:</span> <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>따뜻한 차 마시기</span>
                                    <span style={{ gridColumn: '1 / -1', fontSize: '0.8rem', opacity: 0.8, marginTop: '4px' }}>
                                        결과: 위장은 편안하고, 스트레스는 똑같이 풀립니다.
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </OnboardingLayout>
    );
}
