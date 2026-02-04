import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useHabitStore } from '../../context/HabitStore';

export default function ExperimentProposal() {
    const navigate = useNavigate();
    const { startExperiment } = useHabitStore();

    const handleSelect = (behavior) => {
        startExperiment({ name: behavior });
        navigate('/dashboard');
    };

    const alternatives = [
        {
            id: 1,
            title: 'Drink a Glass of Water',
            desc: 'Reset your physical state instantly.'
        },
        {
            id: 2,
            title: '5 Deep Breaths',
            desc: 'Calm the nervous system before acting.'
        },
        {
            id: 3,
            title: 'Walk Away for 2 Minutes',
            desc: 'Change your environment to break the loop.'
        }
    ];

    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, marginRight: '1rem' }}
                >
                    <ArrowLeft size={24} />
                </button>
                <div style={{ flex: 1, paddingRight: '24px' }}> {/* Balance the back button */}
                    <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Design Experiment</h1>
                </div>
            </header>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ marginBottom: '2rem' }}
            >
                <Sparkles size={48} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
                <h2 className="text-gradient">Time to Experiment</h2>
                <p>You've logged enough urges to understand your trigger. Now, let's substitute the routine.</p>
                <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Choose one action to test effectively next time the urge hits.</p>
            </motion.div>

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
