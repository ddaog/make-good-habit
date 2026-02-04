import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useHabitStore } from '../../context/HabitStore';

export default function ExperimentProposal() {
    const navigate = useNavigate();
    const { startExperiment, userProfile } = useHabitStore();

    const handleSelect = (behavior) => {
        startExperiment({ name: behavior });
        navigate('/dashboard');
    };

    const alternativesMap = {
        'phone': [
            { id: 1, title: '손목 시계 확인', desc: '폰으로 시간을 보려다 딴짓하는 고리를 끊습니다.' },
            { id: 2, title: '종이책 1페이지', desc: '블루라이트 대신 종이의 질감을 느낍니다.' },
            { id: 3, title: '눈 감고 1분', desc: '시각 자극을 차단하고 뇌를 쉬게 합니다.' }
        ],
        'sleep': [
            { id: 1, title: '따뜻한 샤워', desc: '체온을 높였다 낮추어 졸음을 유도합니다.' },
            { id: 2, title: '감사 일기', desc: '자기 전 부정적인 생각을 비워냅니다.' },
            { id: 3, title: '스트레칭', desc: '긴장된 근육을 이완시킵니다.' }
        ],
        'food': [
            { id: 1, title: '탄산수 마시기', desc: '톡 쏘는 자극으로 식욕을 달랩니다.' },
            { id: 2, title: '양치질 하기', desc: '입안을 개운하게 하여 음식 생각을 끊습니다.' },
            { id: 3, title: '가볍게 산책', desc: '장소를 이동하여 시각적 트리거를 없앱니다.' }
        ],
        'smoke': [
            { id: 1, title: '사탕/껌', desc: '구강 만족감을 대체합니다.' },
            { id: 2, title: '찬물 세수', desc: '급격한 감각 변화로 욕구를 환기합니다.' },
            { id: 3, title: '스트레스볼', desc: '손의 움직임으로 불안을 해소합니다.' }
        ],
        'lazy': [
            { id: 1, title: '5-4-3-2-1 발사', desc: '카운트다운으로 뇌가 변명할 시간을 없앱니다.' },
            { id: 2, title: '아주 작은 청소', desc: '책상 정리 등 아주 쉬운 성공 경험을 만듭니다.' },
            { id: 3, title: '좋아하는 노래', desc: '텐션을 올려 행동 모드로 전환합니다.' }
        ],
        'other': [
            { id: 1, title: '심호흡 5회', desc: '보편적인 이완 방법입니다.' },
            { id: 2, title: '그냥 걷기', desc: '상황에서 벗어나는 가장 쉬운 방법입니다.' },
            { id: 3, title: '물 마시기', desc: '신체 상태를 리셋합니다.' }
        ]
    };

    const alternatives = alternativesMap[userProfile.habitCategory] || alternativesMap['other'];

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
