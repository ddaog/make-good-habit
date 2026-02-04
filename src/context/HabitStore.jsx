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
        return saved ? JSON.parse(saved) : { successCount: 0, failureCount: 0 };
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

    useEffect(() => {
        localStorage.setItem('gh_stats', JSON.stringify(experimentStats));
    }, [experimentStats]);

    // Actions
    const updateProfile = (key, value) => {
        setUserProfile(prev => ({ ...prev, [key]: value }));
    };

    const incrementSuccess = () => {
        setExperimentStats(prev => ({ ...prev, successCount: (prev.successCount || 0) + 1 }));
    };

    const incrementFailure = () => {
        setExperimentStats(prev => ({ ...prev, failureCount: (prev.failureCount || 0) + 1 }));
    };

    const setHabit = (habit) => {
        setTargetHabit(habit);
    };

    const addLog = (log) => {
        setLogs(prev => [log, ...prev]);
    };

    const updateLog = (id, newLog) => {
        setLogs(prev => prev.map(log => log.id === id ? newLog : log));
    };

    const deleteLog = (id) => {
        setLogs(prev => prev.filter(log => log.id !== id));
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
            logs, addLog, updateLog, deleteLog,
            activeExperiment, startExperiment, completeExperiment, experimentHistory,
            experimentStats, incrementSuccess, incrementFailure
        }}>
            {children}
        </HabitContext.Provider>
    );
};

export const useHabitStore = () => useContext(HabitContext);
