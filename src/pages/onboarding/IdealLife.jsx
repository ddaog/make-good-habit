import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingLayout from '../../components/OnboardingLayout';
import { useHabitStore } from '../../context/HabitStore';
import { Check, Edit3 } from 'lucide-react';

export default function IdealLife() {
    const { updateProfile } = useHabitStore();
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [customText, setCustomText] = useState('');

    const keywords = [
        "활기찬 아침", "깊은 몰입", "건강한 몸",
        "여유로운 마음", "자신감", "규칙적인 생활",
        "충분한 수면", "디지털 디톡스", "기타"
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
        const finalKeywords = selectedKeywords.map(k => k === "기타" ? customText : k).filter(k => k !== "");
        updateProfile('idealLife', finalKeywords.join(', '));
    };

    const isNextDisabled =
        selectedKeywords.length === 0 ||
        (selectedKeywords.includes("기타") && !customText.trim());

    return (
        <OnboardingLayout
            title="어떤 삶을 원하시나요?"
            nextPath="/onboarding/current-life"
            onNext={handleNext}
            isNextDisabled={isNextDisabled}
        >
            <p style={{ marginBottom: '2rem' }}>당신을 가장 잘 설명하는 키워드를 3개까지 선택해주세요.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
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
                                fontSize: '0.9rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textAlign: 'left'
                            }}
                        >
                            {keyword}
                            {isSelected && <Check size={16} color="var(--color-accent)" />}
                        </motion.button>
                    )
                })}
            </div>

            <AnimatePresence>
                {selectedKeywords.includes("기타") && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ marginBottom: '1.5rem' }}
                    >
                        <div style={{ position: 'relative' }}>
                            <Edit3 size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                            <input
                                type="text"
                                className="input-field"
                                placeholder="원하시는 삶을 직접 입력해주세요"
                                value={customText}
                                onChange={(e) => setCustomText(e.target.value)}
                                style={{ paddingLeft: '40px' }}
                                autoFocus
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </OnboardingLayout>
    );
}
