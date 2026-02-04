import { useState } from 'react';
import { motion } from 'framer-motion';
import OnboardingLayout from '../../components/OnboardingLayout';
import { useHabitStore } from '../../context/HabitStore';
import { Check } from 'lucide-react';

export default function IdealLife() {
    const { updateProfile } = useHabitStore();
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    const keywords = [
        "활기찬 아침", "깊은 몰입", "건강한 몸",
        "여유로운 마음", "자신감", "규칙적인 생활",
        "충분한 수면", "디지털 디톡스"
    ];

    const toggleKeyword = (keyword) => {
        if (selectedKeywords.includes(keyword)) {
            setSelectedKeywords(prev => prev.filter(k => k !== keyword));
        } else {
            if (selectedKeywords.length < 3) {
                setSelectedKeywords(prev => [...prev, keyword]);
            }
        }
    };

    const handleNext = () => {
        updateProfile('idealLife', selectedKeywords.join(', '));
    };

    return (
        <OnboardingLayout
            title="어떤 삶을 원하시나요?"
            nextPath="/onboarding/current-life"
            onNext={handleNext}
            isNextDisabled={selectedKeywords.length === 0}
        >
            <p style={{ marginBottom: '2rem' }}>당신을 가장 잘 설명하는 키워드를 3개까지 선택해주세요.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {keywords.map(keyword => {
                    const isSelected = selectedKeywords.includes(keyword);
                    return (
                        <motion.button
                            key={keyword}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleKeyword(keyword)}
                            className="glass-panel"
                            style={{
                                padding: '1.2rem',
                                border: isSelected ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.1)',
                                background: isSelected ? 'rgba(109, 93, 252, 0.2)' : 'rgba(255,255,255,0.03)',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textAlign: 'left'
                            }}
                        >
                            {keyword}
                            {isSelected && <Check size={18} color="var(--color-accent)" />}
                        </motion.button>
                    )
                })}
            </div>
        </OnboardingLayout>
    );
}
