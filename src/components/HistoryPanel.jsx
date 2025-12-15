import React from 'react';
import './Weather.css'; // Reuse existing styles or add new ones

const HistoryPanel = ({ history, onClose, onClear }) => {
    return (
        <div className="history-panel">
            <div className="history-header">
                <h3>🕒 Past Interactions</h3>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>

            {history.length === 0 ? (
                <p className="no-history">No history yet.</p>
            ) : (
                <div className="history-list">
                    {history.map((item) => (
                        <div key={item.id} className="history-item">
                            <div className="history-info">
                                <span className="history-city">{item.location}</span>
                                <span className="history-temp">{item.temperature}°C</span>
                            </div>
                            <p className="history-rec">"{item.recommendation}"</p>
                            <span className="history-time">{item.timestamp}</span>
                        </div>
                    ))}
                </div>
            )}

            {history.length > 0 && (
                <button className="clear-btn" onClick={onClear}>Clear History</button>
            )}
        </div>
    );
};

export default HistoryPanel;
