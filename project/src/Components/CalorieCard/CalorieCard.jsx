import React from 'react';

const CalorieCard = ({ title, current, target, icon, onAdd, onDelete, unit = "ккал" }) => {
  const isCompleted = current >= target;

  return (
    <div className={`activity-card ${isCompleted ? 'is-completed' : ''}`}>
      <div className="card-top">
        <div className="card-header">
          <div className="icon-box">{icon}</div>
          <h3>{title}</h3>
        </div>
        <button className="delete-btn-styled" onClick={onDelete}>×</button>
      </div>

      <div className="card-body">
        <div className="stats-row">
          <span className="current-num">{current}</span>
          <span className="divider">/</span>
          <span className="aim-num">{target}</span>
        </div>
        <div className="unit-label">{unit}</div>
      </div>

      <div className="card-footer">
        <div className="progress-wrapper">
          {/* Здесь можно добавить scale/progress bar если нужно */}
          <div style={{ 
            height: '10px', 
            background: isCompleted ? '#ffd700' : '#eee', 
            borderRadius: '10px',
            width: `${Math.min((current / target) * 100, 100)}%` 
          }} />
        </div>
        <button 
          className="action-plus-btn" 
          onClick={onAdd}
          disabled={isCompleted}
        >
          {isCompleted ? '✓' : '+'}
        </button>
      </div>
    </div>
  );
};

export default CalorieCard;