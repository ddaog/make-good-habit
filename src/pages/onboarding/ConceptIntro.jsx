import { motion } from 'framer-motion';
import OnboardingLayout from '../../components/OnboardingLayout';
import { RefreshCw, Zap, Gift } from 'lucide-react';

export default function ConceptIntro() {
    return (
        <OnboardingLayout
            title="습관은 고리가 있습니다"
            nextPath="/onboarding/ideal-life"
            isNextDisabled={false}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>

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
                    style={{ padding: '1.2rem', marginTop: '1rem', textAlign: 'center', background: 'var(--gradient-glass)' }}
                >
                    <p style={{ margin: 0, fontWeight: 'bold' }}>우리는 '행동'만 바꿔서<br />같은 보상을 얻게 해드릴게요.</p>
                </motion.div>

            </div>
        </OnboardingLayout>
    );
}
