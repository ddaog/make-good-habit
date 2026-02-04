import { createContext, useContext, useState, useEffect } from 'react';

const HabitContext = createContext(null);

export const HabitProvider = ({ children }) => {
    // Load initial state from localStorage if available
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('gh_profile');
        return saved ? JSON.parse(saved) : { idealLife: [], currentLife: '', habitCategory: 'other' };
    });

    const [targetHabit, setTargetHabit] = useState(() => {
        const saved = localStorage.getItem('gh_target');
        return saved ? JSON.parse(saved) : null;
    });

    const [experimentStats, setExperimentStats] = useState(() => {
        const saved = localStorage.getItem('gh_stats');
        return saved ? JSON.parse(saved) : { successCount: 0 };
    });

    const [logs, setLogs] = useState(() => {
        const saved = localStorage.getItem('gh_logs');
        return saved ? JSON.parse(saved) : [];
    });

    const [activeExperiment, setActiveExperiment] = useState(() => {
        const saved = localStorage.getItem('gh_activeExperiment');
        return saved ? JSON.parse(saved) : null;
    });

    const [experimentHistory, setExperimentHistory] = useState(() => {
        const saved = localStorage.getItem('gh_experimentHistory');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('gh_userProfile', JSON.stringify(userProfile));
    }, [userProfile]);

    useEffect(() => {
        if (targetHabit) localStorage.setItem('gh_targetHabit', JSON.stringify(targetHabit));
    }, [targetHabit]);

    useEffect(() => {
        localStorage.setItem('gh_logs', JSON.stringify(logs));
    }, [logs]);

    useEffect(() => {
        if (activeExperiment) localStorage.setItem('gh_activeExperiment', JSON.stringify(activeExperiment));
        else localStorage.removeItem('gh_activeExperiment'); // Cleanup if null
    }, [activeExperiment]);

    useEffect(() => {
        localStorage.setItem('gh_experimentHistory', JSON.stringify(experimentHistory));
    }, [experimentHistory]);

    // Actions
    const updateProfile = (key, value) => {
        setUserProfile(prev => ({ ...prev, [key]: value }));
    };

    const incrementSuccess = () => {
        setExperimentStats(prev => ({ ...prev, successCount: prev.successCount + 1 }));
    };

    const setHabit = (habit) => {
        setTargetHabit(habit);
    };

    const addLog = (log) => {
        setLogs(prev => [log, ...prev]);
    };

    const startExperiment = (experiment) => {
        setActiveExperiment({
            ...experiment,
            startDate: new Date().toISOString(),
            status: 'active'
        });
    };

    const completeExperiment = (success) => {
        if (!activeExperiment) return;

        const result = {
            ...activeExperiment,
            endDate: new Date().toISOString(),
            success: success,
            status: 'completed'
        };

        setExperimentHistory(prev => [result, ...prev]);
        setActiveExperiment(null);

        // Return result for UI to handle next steps if needed
        return result;
    };

    return (
        <HabitContext.Provider value={{
            userProfile, updateProfile,
            targetHabit, setHabit,
            logs, addLog,
            activeExperiment, startExperiment, completeExperiment, experimentHistory,
            experimentStats, incrementSuccess
        }}>
            {children}
        </HabitContext.Provider>
    );
};

export const useHabitStore = () => useContext(HabitContext);
