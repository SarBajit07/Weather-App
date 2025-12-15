import React from 'react';

const AiInsights = ({ recommendation, activity, reasoning, safetyTips }) => {
    return (
        <div className="ai-insights">
            {reasoning && (
                <div className="ai-reasoning">
                    <p><strong>🧠 AI Thought:</strong> <em>"{reasoning}"</em></p>
                </div>
            )}

            {safetyTips && safetyTips.length > 0 && (
                <div className="ai-safety">
                    <p><strong>🛡️ Knowledge Base Tips:</strong></p>
                    <ul>
                        {safetyTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="clothing-recommendation">
                <p><strong>💡 Wear:</strong> {recommendation}</p>
            </div>
            <div className="clothing-recommendation" style={{ marginTop: '15px' }}>
                <p><strong>🏃 Do:</strong> {activity}</p>
            </div>
        </div>
    );
};

export default AiInsights;
