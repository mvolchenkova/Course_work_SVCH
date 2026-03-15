// src/components/ExerciseCard/ExerciseCard.jsx
import React, { useState } from 'react';
import './ExerciseCard.css';

const ExerciseCard = ({ exercise, canEdit, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Константа для базового URL сервера (измените порт, если нужно)
  const API_URL = 'http://localhost:5000'; 

  const getExperienceLabel = (exp) => {
    const labels = {
      '0-6 месяцев': 'Начинающий',
      '6-18 месяцев': 'Средний',
      '18+ месяцев': 'Продвинутый'
    };
    return labels[exp] || exp;
  };

  const getEquipmentLabel = (eq) => {
    if (!eq) return 'Собственный вес';
    const labels = {
      'gym': 'Тренажерный зал',
      'home': 'Домашние условия',
      'minimal': 'Минимум инвентаря',
      'гантели': 'Гантели',
      'штанга': 'Штанга',
      'тренажеры': 'Тренажеры'
    };
    return eq.split(',').map(item => labels[item.trim()] || item.trim()).join(', ');
  };

  const renderTechnique = (tech) => {
    if (!tech) return null;
    if (typeof tech === 'string') return tech;
    if (tech.type === 'Buffer') {
      return new TextDecoder().decode(new Uint8Array(tech.data));
    }
    return String(tech);
  };

  // Важно: проверяем оба варианта ключа (muscles или Muscles) 
  // и наличие данных в связующей таблице (exercise_muscle)
  const allMuscles = exercise.muscles || exercise.Muscles || [];
  const primaryMuscles = allMuscles.filter(m => m.exercise_muscle?.isPrimary);
  const secondaryMuscles = allMuscles.filter(m => !m.exercise_muscle?.isPrimary);

  return (
    <div className={`exercise-card ${showDetails ? 'expanded' : ''}`}>
      <div className="exercise-card-header" onClick={() => setShowDetails(!showDetails)}>
        <div className="title-section">
          <h3>{exercise.exName}</h3>
          <div className="exercise-badges">
            <span className={`badge experience-${exercise.experience?.replace(/\s+/g, '-')}`}>
              {getExperienceLabel(exercise.experience)}
            </span>
            <span className={`badge type-${exercise.baseIsolation === 'базовое' ? 'base' : 'iso'}`}>
              {exercise.baseIsolation}
            </span>
          </div>
        </div>
        <div className="expand-icon">{showDetails ? '▲' : '▼'}</div>
      </div>

      <div className="exercise-card-preview">
        {primaryMuscles.length > 0 && (
          <div className="primary-muscles">
            <strong>Целевые:</strong>
            <div className="muscle-tags">
              {primaryMuscles.slice(0, 3).map(m => (
                <span key={m.idMuscle} className="muscle-tag main">{m.muscleName}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {showDetails && (
        <div className="exercise-card-details">
          {/* БЛОК ВИДЕО */}
          {exercise.videoPath && (
            <div className="exercise-video-section">
              <h4>Видео техники</h4>
              <video width="100%" controls className="exercise-video-player">
                <source src={`${API_URL}/${exercise.videoPath}`} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
          )}

          <div className="info-grid">
            <div className="detail-row">
              <span className="detail-label">Тип:</span>
              <span className="detail-value">{exercise.type}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Инвентарь:</span>
              <span className="detail-value">{getEquipmentLabel(exercise.equipment)}</span>
            </div>
          </div>

          {exercise.technique && (
            <div className="technique-section">
              <h4>Инструкция</h4>
              <p className="technique-text">{renderTechnique(exercise.technique)}</p>
            </div>
          )}

          {/* БЛОК НАГРУЗКИ */}
          {allMuscles.length > 0 && (
            <div className="muscles-detailed-section">
              <h4>Распределение нагрузки</h4>
              <div className="muscles-load-grid">
                {allMuscles.map(m => (
                  <div key={m.idMuscle} className="muscle-load-item">
                    <div className="muscle-info">
                      <span>{m.muscleName}</span>
                      <small>{m.exercise_muscle?.isPrimary ? 'Целевая' : 'Доп.'}</small>
                    </div>
                    <div className="load-bar-container">
                      <div 
                        className={`load-bar ${m.exercise_muscle?.isPrimary ? 'primary' : 'secondary'}`} 
                        style={{ width: `${m.exercise_muscle?.loadValue || 0}%` }}
                      ></div>
                      <span className="load-perc">{m.exercise_muscle?.loadValue || 0}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {canEdit && (
            <button className="btn-edit" onClick={() => onUpdate(exercise)}>
              Редактировать
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;