import { useState } from 'react';
import { motion } from 'framer-motion';
import OnboardingLayout from '../../components/OnboardingLayout';
import { useHabitStore } from '../../context/HabitStore';
import { Smartphone, Moon, Utensils, Cigarette, Gamepad2, AlertCircle } from 'lucide-react';

export default function CurrentLife() {
    const { updateProfile } = useHabitStore();
    const [selectedId, setSelectedId] = useState(null);

    const habits = [
        { id: 'phone', label: '심야 스마트폰', icon: <Smartphone size={24} /> },
        { id: 'sleep', label: '늦은 취침', icon: <Moon size={24} /> },
        { id: 'food', label: '야식/과식', icon: <Utensils size={24} /> },
        { id: 'smoke', label: '흡연/음주', icon: <Cigarette size={24} /> },
        { id: 'lazy', label: '미루기', icon: <Gamepad2 size={24} /> },
        { id: 'other', label: '기타', icon: <AlertCircle size={24} /> },
    ];

    const handleNext = () => {
        const habit = habits.find(h => h.id === selectedId);
        updateProfile('currentLife', habit ? habit.label : '기타');
    };

    return (
        <OnboardingLayout
            title="가장 바꾸고 싶은 것은?"
            nextPath="/onboarding/suggestion"
            onNext={handleNext}
            isNextDisabled={!selectedId}
        >
            <p style={{ marginBottom: '2rem' }}>당신의 에너지를 가장 많이 뺏어가는 습관 하나를 골라주세요.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {habits.map((item) => {
                    const isSelected = selectedId === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedId(item.id)}
                            className="glass-panel"
                            style={{
                                padding: '1.5rem',
                                border: isSelected ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.1)',
                                background: isSelected ? 'rgba(109, 93, 252, 0.2)' : 'rgba(255,255,255,0.03)',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <div style={{ color: isSelected ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                                {item.icon}
                            </div>
                            <span style={{ fontSize: '1rem', fontWeight: isSelected ? '600' : '400' }}>{item.label}</span>
                        </motion.button>
                    );
                })}
            </div>
        </OnboardingLayout>
    );
}
