import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function OnboardingLayout({ title, children, nextPath, onNext, isNextDisabled = false }) {
    const navigate = useNavigate();

    const handleNext = () => {
        if (onNext) onNext();
        if (nextPath) navigate(nextPath);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container"
            style={{ justifyContent: 'center', height: '100%' }}
        >
            <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{title}</h1>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', minHeight: 0, paddingBottom: '1rem' }}>
                {children}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                <button
                    className="btn-primary"
                    style={{ width: '100%', opacity: isNextDisabled ? 0.5 : 1, pointerEvents: isNextDisabled ? 'none' : 'auto' }}
                    onClick={handleNext}
                >
                    계속하기
                </button>
            </div>
        </motion.div>
    );
}
