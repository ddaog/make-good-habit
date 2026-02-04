import { useState } from 'react';
import OnboardingLayout from '../../components/OnboardingLayout';
import { useHabitStore } from '../../context/HabitStore';

export default function IdealLife() {
    const { updateProfile } = useHabitStore();
    const [text, setText] = useState('');

    const handleNext = () => {
        updateProfile('idealLife', text);
    };

    return (
        <OnboardingLayout
            title="당신의 이상적인 삶은 어떤 모습인가요?"
            nextPath="/onboarding/current-life"
            onNext={handleNext}
            isNextDisabled={text.length < 5}
        >
            <p>최고의 자아를 상상해보세요. 어떤 습관을 가지고 있나요? 어떤 기분인가요?</p>
            <textarea
                className="input-field glass-panel"
                rows={6}
                placeholder="예: 상쾌하게 일어나서 매일 운동하고, 집중력을 유지하며..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ resize: 'none', lineHeight: '1.5' }}
                autoFocus
            />
        </OnboardingLayout>
    );
}
