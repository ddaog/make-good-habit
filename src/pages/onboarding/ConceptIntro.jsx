import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import OnboardingLayout from '../../components/OnboardingLayout';

export default function ConceptIntro() {
    const [showExample, setShowExample] = useState(false);
    const [activeExampleIndex, setActiveExampleIndex] = useState(0);

    const examples = [
        {
            tag: '퇴근 스트레스',
            title: '예시: 퇴근 후 스트레스',
            trigger: '피곤함과 허기',
            badAction: '매운 야식 먹기',
            reward: '일시적 만족',
            goodAction: '따뜻한 허브차 마시기',
            result: '위장에 부담 없이 몸과 마음이 이완됩니다.'
        },
        {
            tag: '침대 스마트폰',
            title: '예시: 잠들기 전 스마트폰',
            trigger: '심심함과 보상 심리',
            badAction: 'SNS 무한 스크롤',
            reward: '도파민 충전',
            goodAction: '종이책 1페이지 읽기',
            result: '블루라이트 없이 뇌가 이완되어 잠이 잘 옵니다.'
        },
        {
            tag: '오후 3시 군것질',
            title: '예시: 오후 3시 당 떨어짐',
            trigger: '피로감과 지루함',
            badAction: '초콜릿/과자 섭취',
            reward: '일시적 에너지',
            goodAction: '가벼운 스트레칭',
            result: '혈액순환으로 진짜 에너지가 충전됩니다.'
        }
    ];

    const activeExample = examples[activeExampleIndex];

    return (
        <OnboardingLayout
            title="습관은 고리가 있습니다"
            nextPath="/onboarding/ideal-life"
            isNextDisabled={false}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-panel"
                style={{ padding: '1.5rem', background: 'rgba(30,30,40,0.6)', marginBottom: '1.5rem' }}
            >
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: 'var(--color-accent)' }}>🔄 우리의 방법</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <div style={{ fontSize: '1.5rem' }}>1️⃣</div>
                        <div>
                            <strong>대체 행동 선택</strong>
                            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.9rem', opacity: 0.8 }}>나쁜 습관 대신 시도할 새로운 행동을 고릅니다.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <div style={{ fontSize: '1.5rem' }}>2️⃣</div>
                        <div>
                            <strong>실험하고 평가</strong>
                            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.9rem', opacity: 0.8 }}>실생활에서 시도해보고 효과를 솔직하게 평가합니다.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <div style={{ fontSize: '1.5rem' }}>3️⃣</div>
                        <div>
                            <strong>효과 없음 → 관찰 → 재시도</strong>
                            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.9rem', opacity: 0.8 }}>효과가 없었다면 그 순간을 기록하고 다른 방법을 시도합니다.</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Example Toggle */}
            <button
                onClick={() => setShowExample(!showExample)}
                style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    padding: '0.8rem 1.2rem',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
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
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="glass-panel" style={{ padding: '1.2rem', background: 'rgba(20,20,25,0.8)', marginTop: '1rem' }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                                {examples.map((ex, idx) => (
                                    <button
                                        key={ex.tag}
                                        onClick={() => setActiveExampleIndex(idx)}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            border: activeExampleIndex === idx ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.2)',
                                            background: activeExampleIndex === idx ? 'rgba(109, 93, 252, 0.2)' : 'transparent',
                                            color: 'white',
                                            fontSize: '0.85rem',
                                            whiteSpace: 'nowrap',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}>
                                        #{ex.tag}
                                    </button>
                                ))}
                            </div>

                            <motion.div
                                key={activeExample.title}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#ffd700' }}>{activeExample.title}</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 12px', fontSize: '0.9rem' }}>
                                    <span style={{ opacity: 0.6 }}>신호:</span> <span>{activeExample.trigger}</span>
                                    <span style={{ opacity: 0.6 }}>행동:</span> <span style={{ color: '#ff6b6b', textDecoration: 'line-through' }}>{activeExample.badAction}</span>
                                    <span style={{ opacity: 0.6 }}>보상:</span> <span>{activeExample.reward}</span>

                                    <div style={{ gridColumn: '1 / -1', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />

                                    <span style={{ opacity: 0.6 }}>새 행동:</span> <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>{activeExample.goodAction}</span>
                                    <span style={{ gridColumn: '1 / -1', fontSize: '0.8rem', opacity: 0.8, marginTop: '4px' }}>
                                        결과: {activeExample.result}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </OnboardingLayout>
    );
}
