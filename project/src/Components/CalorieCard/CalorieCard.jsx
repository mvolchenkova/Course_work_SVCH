import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMealEntry } from '../../slices/calorieSlice';
import '../CalorieCard/CalorieCard.css'

const CalorieCard = ({ title, current, icon, logs, unit = "ккал" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

 const handleDelete = (e, id) => {
  e.stopPropagation();
  console.log("Клик по удалению, ID записи:", id); 
  if (id) {
    dispatch(deleteMealEntry(id));
  }
};
  return (
    <div className={`activity-card ${isOpen ? 'expanded' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="card-top">
        <div className="card-header">
          <div className="icon-box">{icon}</div>
          <h3>{title}</h3>
        </div>
        <div className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</div>
      </div>

      <div className="card-body">
        <div className="stats-row">
          <span className="current-num">{current}</span>
          <div className="unit-label">{unit}</div>
        </div>
      </div>

      {/* Выпадающий список продуктов */}
      {isOpen && (
        <div className="dropdown-list" onClick={(e) => e.stopPropagation()}>
          {logs.length > 0 ? (
            logs.map((log) => (
              <div key={log.idLog || log.id} className="dropdown-item">
                <div className="item-info">
                  <span className="item-name">{log.product?.productName || 'Продукт'} • </span>
                  <span className="item-meta">{log.grams}г • {log.recordedCalories} ккал</span>
                </div>
                <button 
                  className="delete-item-btn" 
                  onClick={(e) => handleDelete(e, log.idLog || log.id)}
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <div className="empty-msg">Нет записей</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalorieCard;