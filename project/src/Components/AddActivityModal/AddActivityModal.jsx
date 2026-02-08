import React, { useState } from 'react';
import '../AddActivityModal/AddActivityModal.css';
import i18n from '../../i18n';

export default function AddActivityModal({ isOpen, onClose, onAdd }) {
    const [aim, setAim] = useState(3); 

    if (!isOpen) return null;

    // Вспомогательная функция для перевода
    const t = (key) => i18n.t(key);

    const activityTypes = [
        "DRINK WATER",
        "STRENGTH TRAINING",
        "CARDIO TRAINING",
        "WALK",
        "STRETCHING",
        "ACTIVE GAMES"
    ];

    const handleAddClick = (title) => {
        // В onAdd по-прежнему улетает английский оригинал (например, "DRINK WATER")
        onAdd(title, aim);
        onClose(); 
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{t('new_goal')}</h2>
                
                <div className="aim-selector">
                    <p>{t('hm_times')}</p>
                    <div className="aim-buttons">
                        {[1, 2, 3, 4, 5, 6, 7].map(num => (
                            <button 
                                key={num}
                                className={`aim-btn ${aim === num ? 'active' : ''}`}
                                onClick={() => setAim(num)}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='addAcitivityBlock'>
                    <div className='activities-list'>
                        {activityTypes.map((type) => (
                            <div key={type} className='activity-item'>
                                {/* Превращаем "DRINK WATER" в ключ "activity_DRINK_WATER".
                                   replace заменяет пробел на подчеркивание для чистоты ключа.
                                */}
                                <p>{t(`activity_${type.replace(/\s+/g, '_')}`)}</p>
                                
                                <button 
                                    className="add-btn"
                                    onClick={() => handleAddClick(type)}
                                >
                                    {t('add')}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="cancel-btn" type="button" onClick={onClose}>
                        {t('cancel')}
                    </button>
                </div>
            </div>
        </div>
    );
}