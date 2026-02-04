import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HabitProvider } from './context/HabitStore';
import ConceptIntro from './pages/onboarding/ConceptIntro';
import IdealLife from './pages/onboarding/IdealLife';
import CurrentLife from './pages/onboarding/CurrentLife';
import Suggestion from './pages/onboarding/Suggestion';
import Dashboard from './pages/Dashboard';
import UrgeLogger from './pages/UrgeLogger';
import LogHistory from './pages/LogHistory';
import ExperimentProposal from './pages/experiment/Proposal';
import Success from './pages/Success';
import './index.css';

const OnboardingIntro = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
      <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Rewrite</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>나쁜 습관을 당신의 슈퍼파워로 바꾸세요.</p>
      <button className="btn-primary" onClick={() => navigate('/onboarding/concept')}>여정 시작하기</button>
    </motion.div>
  );
};

function App() {
  return (
    <HabitProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </HabitProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<OnboardingIntro />} />
        <Route path="/onboarding/concept" element={<ConceptIntro />} />
        <Route path="/onboarding/ideal-life" element={<IdealLife />} />
        <Route path="/onboarding/current-life" element={<CurrentLife />} />
        <Route path="/onboarding/suggestion" element={<Suggestion />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/log-urge" element={<UrgeLogger />} />
        <Route path="/log-history" element={<LogHistory />} />
        <Route path="/experiment/proposal" element={<ExperimentProposal />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
