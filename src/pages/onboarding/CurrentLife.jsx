import { useState } from 'react';
import OnboardingLayout from '../../components/OnboardingLayout';
import { useHabitStore } from '../../context/HabitStore';

export default function CurrentLife() {
    const { updateProfile } = useHabitStore();
    const [text, setText] = useState('');

    const handleNext = () => {
        updateProfile('currentLife', text);
        // In a real app, I'd process this text here to get the 'suggestion'
    };

    return (
        <OnboardingLayout
            title="지금은 어떤가요?"
            nextPath="/onboarding/suggestion"
            onNext={handleNext}
            isNextDisabled={text.length < 5}
        >
            <p>솔직해져 보세요. 무엇이 당신을 가로막고 있나요? 바꾸고 싶은 습관은 무엇인가요?</p>
            <textarea
                className="input-field glass-panel"
                rows={6}
                placeholder="예: 새벽 2시까지 폰을 보고, 스트레스 받으면 정크푸드를 먹어요..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ resize: 'none', lineHeight: '1.5' }}
                autoFocus
            />
        </OnboardingLayout>
    );
}
