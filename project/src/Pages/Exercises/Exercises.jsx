// src/Pages/Exercises/Exercises.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExercises } from '../../slices/exerciseSlice'; // Путь к вашему слайсу
import ExerciseForm from '../../Components/ExerciseForm/ExerciseForm';
import ExerciseCard from '../../Components/ExerciseCard/ExerciseCard';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import './Exercises.css';

const Exercises = () => {
  const dispatch = useDispatch();
  
  // 1. Получаем данные только из Redux
  const { items: exercises, total, status, error: reduxError } = useSelector(state => state.exercises);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [filters, setFilters] = useState({
    experience: '',
    type: '',
    equipment: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12
  });

  const loading = status === 'loading';

  // 2. Проверка роли пользователя
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserRole(userData.role);
      } catch (e) {
        console.error('Ошибка парсинга данных пользователя', e);
      }
    }
  }, []);

  // 3. Единственный источник загрузки данных - Redux Thunk
  useEffect(() => {
    dispatch(fetchExercises({ 
      page: pagination.page, 
      limit: pagination.limit,
      ...filters 
    }));
  }, [pagination.page, filters, dispatch]);

  const canAddExercise = userRole === 'trainer' || userRole === 'admin';

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // После добавления упражнения можно вызвать рефетч
  const handleExerciseAdded = () => {
    dispatch(fetchExercises({ page: 1, limit: pagination.limit, ...filters }));
    setShowAddForm(false);
  };

  const clearFilters = () => {
    setFilters({
      experience: '',
      type: '',
      equipment: '',
      search: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const totalPages = Math.ceil(total / pagination.limit);

  return (
    <div className="exercises-page">
      <div className="exercises-header">
        <h1>Библиотека упражнений</h1>
        {canAddExercise && (
          <button 
            className="btn-add-exercise"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? '✕ Закрыть' : '+ Добавить упражнение'}
          </button>
        )}
      </div>

      {showAddForm && canAddExercise && (
        <div className="add-exercise-section">
          <ExerciseForm 
            onSuccess={handleExerciseAdded}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-item">
            <label>Поиск</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Название упражнения..."
            />
          </div>

          <div className="filter-item">
            <label>Уровень</label>
            <select name="experience" value={filters.experience} onChange={handleFilterChange}>
              <option value="">Все уровни</option>
              <option value="0-6 месяцев">Новичок (0-6 мес)</option>
              <option value="6-18 месяцев">Средний (6-18 мес)</option>
              <option value="18+ месяцев">Продвинутый (18+ мес)</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Тип</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">Все типы</option>
              <option value="жимовое">Жимовое</option>
              <option value="тяговое">Тяговое</option>
              <option value="толчковое">Толчковое</option>
              <option value="разводящее">Разводящее</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Оборудование</label>
            <select name="equipment" value={filters.equipment} onChange={handleFilterChange}>
              <option value="">Все</option>
              <option value="gym">Тренажёрный зал</option>
              <option value="dumbbells_barbell">Дом: гантели + штанга</option>
              <option value="dumbbells">Дом: только гантели</option>
              <option value="barbell">Дом: только штанга</option>
              <option value="fitnessband">Дом: только фитнес-резинки</option>
              <option value="minimal">Свой вес</option>
            </select>
          </div>
        </div>

        {(filters.search || filters.experience || filters.type || filters.equipment) && (
          <button className="btn-clear-filters" onClick={clearFilters}>
            Сбросить фильтры
          </button>
        )}

        <div className="results-info">
          Найдено упражнений: {total}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : reduxError ? (
        <div className="error-message">{reduxError}</div>
      ) : exercises.length === 0 ? (
        <div className="no-results">
          <p>Упражнения не найдены</p>
        </div>
      ) : (
        <>
          <div className="exercises-grid">
            {exercises.map(exercise => (
              <ExerciseCard 
                key={exercise.idExercise} 
                exercise={exercise}
                canEdit={canAddExercise}
                onUpdate={() => dispatch(fetchExercises({ page: pagination.page, limit: pagination.limit, ...filters }))}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                ←
              </button>
              
              <span>{pagination.page} из {totalPages}</span>
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === totalPages}
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Exercises;