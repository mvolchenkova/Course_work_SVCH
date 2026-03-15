// src/components/ExerciseForm/ExerciseForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMuscles, createExercise } from '../../slices/exerciseSlice';
import './ExerciseForm.css';

const ExerciseForm = ({ onSuccess, onCancel, exerciseToEdit }) => {
  const dispatch = useDispatch();
  
  // Получаем данные из Redux
  const { muscles, status } = useSelector(state => state.exercises);
  const loading = status === 'loading';
  const [videoFile, setVideoFile] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    exName: '',
    experience: '0-6 месяцев',
    baseIsolation: 'базовое',
    type: 'силовое',
    restrictions: '',
    equipment: 'gym',
    technique: '',
  });
  
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchMuscles());
    
    if (exerciseToEdit) {
      setFormData({
        exName: exerciseToEdit.exName,
        experience: exerciseToEdit.experience,
        baseIsolation: exerciseToEdit.baseIsolation,
        type: exerciseToEdit.type,
        restrictions: exerciseToEdit.restrictions || '',
        equipment: exerciseToEdit.equipment,
        technique: exerciseToEdit.technique || '',
      });
      setSelectedMuscles(exerciseToEdit.muscles || []);
    }
  }, [exerciseToEdit, dispatch]);

  // --- ВОЗВРАЩЕННЫЕ ФУНКЦИИ (исправляют ошибки ESLint) ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMuscleSelect = (e) => {
    const muscleId = Number(e.target.value);
    if (!muscleId) return;
    
    // Ищем мышцу в общем списке из Redux
    const muscle = muscles.find(m => Number(m.idMuscle) === muscleId);
    
    if (!muscle) {
      console.warn("Мышца не найдена в списке:", muscleId);
      return;
    }

    // Проверяем на дубликаты
    if (selectedMuscles.some(m => Number(m.idMuscle) === muscleId)) return;

    // Добавляем новую мышцу в локальный список формы
    setSelectedMuscles(prev => [
      ...prev,
      {
        idMuscle: muscle.idMuscle,
        muscleName: muscle.muscleName,
        loadValue: 100, // Значение по умолчанию
        isPrimary: true // По умолчанию целевая
      }
    ]);

    // Важно: сбрасываем значение select, чтобы можно было выбрать ту же мышцу после удаления
    e.target.value = "";
  };

  const handleMuscleRemove = (muscleId) => {
    setSelectedMuscles(prev => prev.filter(m => m.idMuscle !== muscleId));
  };

  const handleMuscleChange = (muscleId, field, value) => {
    setSelectedMuscles(prev => prev.map(m => 
      m.idMuscle === muscleId ? { ...m, [field]: value } : m
    ));
  };

 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 50 * 1024 * 1024) { // Ограничение 50МБ
      setError('Файл слишком большой (макс. 50МБ)');
      return;
    }
    setVideoFile(file);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  const data = new FormData();
  
  // 1. Сначала добавляем текстовые поля
  data.append('exName', formData.exName);
  data.append('experience', formData.experience);
  data.append('baseIsolation', formData.baseIsolation);
  data.append('type', formData.type);
  data.append('equipment', formData.equipment);
  data.append('restrictions', formData.restrictions || '');
  data.append('technique', formData.technique || '');
  
  // 2. Добавляем мышцы как строку
  const musclesPayload = selectedMuscles.map(({ idMuscle, loadValue, isPrimary }) => ({
    idMuscle,
    loadValue: Number(loadValue),
    isPrimary: Boolean(isPrimary)
  }));
  data.append('muscles', JSON.stringify(musclesPayload));

  // 3. ФАЙЛ ДОБАВЛЯЕМ ПОСЛЕДНИМ
  if (videoFile) {
    data.append('video', videoFile); // Имя 'video' должно совпадать с upload.single('video')
  }

  if (exerciseToEdit) {
    data.append('idExercise', exerciseToEdit.idExercise);
  }

  dispatch(createExercise(data))
    .unwrap()
    .then(onSuccess)
    .catch(err => {
        setError(typeof err === 'string' ? err : (err.message || 'Ошибка при сохранении'));
    });
};
  return (
    <form className="exercise-form" onSubmit={handleSubmit}>
      <h2>{exerciseToEdit ? 'Редактировать' : 'Добавить'} упражнение</h2>
      
      <div className="form-group">
        <label>Название упражнения *</label>
        <input
          type="text"
          name="exName"
          value={formData.exName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Уровень</label>
          <select name="experience" value={formData.experience} onChange={handleInputChange}>
            <option value="0-6 месяцев">Новичок</option>
            <option value="6-18 месяцев">Средний</option>
            <option value="18+ месяцев">Продвинутый</option>
          </select>
        </div>

        <div className="form-group">
          <label>Тип</label>
          <select name="type" value={formData.type} onChange={handleInputChange}>
            <option value="тяговое">Тяговое</option>
            <option value="жимовое">Жимовое</option>
            <option value="толчковое">Толчковое</option>
             <option value="разводящее">Разводящее</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Базовое/Изолирующее</label>
          <select name="baseIsolation" value={formData.baseIsolation} onChange={handleInputChange}>
            <option value="базовое">Базовое</option>
            <option value="изолирующее">Изолирующее</option>
          </select>
        </div>

        <div className="form-group">
          <label>Оборудование</label>
          <select name="equipment" value={formData.equipment} onChange={handleInputChange}>
            <option value="gym">Зал</option>
            <option value="home">Дом</option>
            <option value="minimal">Минимум</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Задействованные мышцы *</label>
        <select onChange={handleMuscleSelect} value="">
          <option value="" disabled>Выберите мышцу</option>
          {muscles
            .filter(m => !selectedMuscles.some(sm => sm.idMuscle === m.idMuscle))
            .map(m => (
              <option key={m.idMuscle} value={m.idMuscle}>{m.muscleName}</option>
            ))}
        </select>

        <div className="selected-muscles">
          {selectedMuscles.map(m => (
            <div key={m.idMuscle} className="muscle-item">
              <span>{m.muscleName}</span>
              <input 
                type="number" 
                value={m.loadValue} 
                onChange={(e) => handleMuscleChange(m.idMuscle, 'loadValue', e.target.value)} 
              />
              <input 
                type="checkbox" 
                checked={m.isPrimary} 
                onChange={(e) => handleMuscleChange(m.idMuscle, 'isPrimary', e.target.checked)} 
              />
              <button type="button" onClick={() => handleMuscleRemove(m.idMuscle)}>✕</button>
            </div>
          ))}
        </div>
      </div>

<div className="form-group">
        <label>Видео техники выполнения</label>
        <div className="file-input-container">
          <input 
            type="file" 
            accept="video/*" 
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden-input"
            id="video-upload"
          />
          <label htmlFor="video-upload" className="btn-file-label">
            {videoFile ? `✅ ${videoFile.name}` : '📁 Выбрать видео'}
          </label>
          {videoFile && (
            <button type="button" className="btn-remove-file" onClick={() => setVideoFile(null)}>
              Удалить
            </button>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Текстовое описание техники</label>
        <textarea
          name="technique"
          value={formData.technique}
          onChange={handleInputChange}
          placeholder="Опишите нюансы выполнения..."
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button type="button" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  );
};

export default ExerciseForm;