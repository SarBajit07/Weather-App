const HISTORY_KEY = 'weather_app_history';

export const addToHistory = (location, temperature, recommendation) => {
    const newEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        location,
        temperature,
        recommendation
    };

    const existingHistory = getHistory();
    // Keep only last 10 entries
    const updatedHistory = [newEntry, ...existingHistory].slice(0, 10);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

export const getHistory = () => {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
};
