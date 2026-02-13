import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronDown, ChevronUp, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';
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
                <h3 style={{ margin: '0 0 1.2rem 0', fontSize: '1.1rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>우리의 방법</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div className="badge">1</div>
                        <div>
                            <strong style={{ display: 'block', marginBottom: '4px' }}>대체 행동 선택</strong>
                            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>기존 습관 대신 시도할 새로운 행동을 고릅니다.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div className="badge">2</div>
                        <div>
                            <strong style={{ display: 'block', marginBottom: '4px' }}>실험하고 평가</strong>
                            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>일상에서 직접 시도해보고 효과를 솔직하게 기록합니다.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div className="badge">3</div>
                        <div>
                            <strong style={{ display: 'block', marginBottom: '4px' }}>상황 관찰 및 재시도</strong>
                            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>효과가 없었다면 그 순간을 기록하고 다른 방법을 찾습니다.</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Example Toggle */}
            <button
                onClick={() => setShowExample(!showExample)}
                style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '1rem',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                    marginBottom: '1rem'
                }}
            >
                <Lightbulb size={18} color="#ffd700" />
                <span>{showExample ? '예시 닫기' : '이해가 안 가신다면? 예시 보기'}</span>
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
                        <div className="glass-panel" style={{ padding: '1.2rem', background: 'rgba(20,20,25,0.8)', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '8px' }}>
                                {examples.map((ex, idx) => (
                                    <button
                                        key={ex.tag}
                                        onClick={() => setActiveExampleIndex(idx)}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            border: activeExampleIndex === idx ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.1)',
                                            background: activeExampleIndex === idx ? 'rgba(109, 93, 252, 0.2)' : 'transparent',
                                            color: 'white',
                                            fontSize: '0.8rem',
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
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="behavior-swap-container">
                                    <div className="behavior-item">
                                        <XCircle color="#ff6b6b" size={20} />
                                        <div style={{ flex: 1 }}>
                                            <span style={{ fontSize: '0.75rem', opacity: 0.5, display: 'block' }}>기존 습관</span>
                                            <span style={{ fontWeight: '500', textDecoration: 'line-through', opacity: 0.7 }}>{activeExample.badAction}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <ArrowRight size={24} style={{ opacity: 0.3 }} />
                                    </div>

                                    <div className="behavior-item" style={{ border: '1px solid rgba(46, 204, 113, 0.2)', background: 'rgba(46, 204, 113, 0.05)' }}>
                                        <CheckCircle2 color="#2ecc71" size={20} />
                                        <div style={{ flex: 1 }}>
                                            <span style={{ fontSize: '0.75rem', color: '#2ecc71', opacity: 0.8, display: 'block' }}>새로운 실험</span>
                                            <span style={{ fontWeight: '600', color: '#2ecc71' }}>{activeExample.goodAction}</span>
                                        </div>
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.85rem', margin: 0, opacity: 0.8, background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                                    ✨ <strong>결과:</strong> {activeExample.result}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </OnboardingLayout>
    );
}
