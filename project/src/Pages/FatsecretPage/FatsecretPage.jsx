import React, { useState, useEffect } from 'react';
import '../FatsecretPage/FatsecretPage.css';
import CalorieCard from '../../Components/CalorieCard/CalorieCard';
import CalorieSearch from '../../Components/CalorieSearch/CalorieSearch';
import AddProductForm from '../../Components/AddProductForm/AddProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { addMealEntry, fetchTodayLogs } from '../../slices/calorieSlice';

export default function FatsecretPage() {
  const dispatch = useDispatch();
  
  // Состояние текущей выбранной даты
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [meals] = useState([
    { id: 1, title: 'Завтрак', icon: '🍳', eng: 'breakfast' },
    { id: 2, title: 'Обед', icon: '🍲', eng: 'lunch' },
    { id: 3, title: 'Ужин', icon: '🥗', eng: 'dinner' },
    { id: 4, title: 'Перекусы', icon: '🍎', eng: 'snack' },
  ]);

  const todayLogs = useSelector(state => state.calorie?.todayLogs || []);

  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      const user = JSON.parse(rawUser);
      const currentUserId = user?.idUser || user?.userId || user?.id;

      if (currentUserId) {
        // Важно: бэкенд должен уметь фильтровать по этой дате
        dispatch(fetchTodayLogs({ userId: currentUserId, date: selectedDate }));
      }
    }
  }, [dispatch, selectedDate]);

  const changeDate = (offset) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleAddProductToLog = (data) => {
    // Добавляем текущую дату к отправляемым данным
    dispatch(addMealEntry({ ...data, date: selectedDate })).then(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      const idUser = user?.idUser || user?.userId || user?.id;
      if (idUser) dispatch(fetchTodayLogs({ userId: idUser, date: selectedDate }));
    });
  };

  // ФИЛЬТРУЕМ ЛОГИ ТОЛЬКО ЗА ВЫБРАННУЮ ДАТУ ДЛЯ ОБЩЕГО СЧЕТЧИКА
  const filteredLogsByDate = todayLogs.filter(log => log.date === selectedDate);
  
  const totalCalories = filteredLogsByDate.reduce((sum, log) => sum + Number(log.recordedCalories || 0), 0);

  return (
    <div className="progressDiv">
      {/* Пагинация по дням */}
      <div className="date-pagination-container">
        <button onClick={() => changeDate(-1)} className="date-nav-btn prev">
          <span>◀</span>
        </button>
        
        <div className="date-display-card">
          <div className="calendar-icon">📅</div>
          <div className="date-info">
            <span className="date-title">
              {selectedDate === new Date().toISOString().split('T')[0] 
                ? "Сегодня" 
                : new Date(selectedDate).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'long' })}
            </span>
            <span className="date-subtitle">{selectedDate}</span>
          </div>
        </div>

        <button onClick={() => changeDate(1)} className="date-nav-btn next">
          <span>▶</span>
        </button>
      </div>

      <div className="xp-header">
        <div className="points-display">
          <span className="points-value" style={{ color: '#00c8dc' }}>
            {Math.round(totalCalories)}
          </span>
          <span className="aim-num">ккал за день</span>
        </div>
      </div>

      <div className="activities-grid">
        {meals.map(meal => {
          const mealTitleLower = meal.title.toLowerCase().trim();
          
          // Фильтруем логи конкретно для этой карточки и этой даты
          const logsForMeal = filteredLogsByDate.filter(log => {
            const dbType = log.mealType?.toLowerCase().trim();
            return dbType === mealTitleLower || dbType === meal.eng;
          });
          
          const calories = logsForMeal.reduce((sum, log) => sum + Number(log.recordedCalories || 0), 0);

          return (
            <div key={meal.id} style={{ marginBottom: '20px' }}>
              <CalorieCard
                title={meal.title}
                icon={meal.icon}
                current={Math.round(calories)}
                logs={logsForMeal} 
              />
            </div>
          );
        })}
      </div>
      
      <hr className="section-divider" />
      <div className="search-section">
        <h2 className="section-title">Найти и добавить продукт</h2>
        <CalorieSearch availableMeals={meals} onAddProduct={handleAddProductToLog} />
      </div>

      <hr className="section-divider" />
      <div className="add-product-section">
        <h2 className="section-title">Нет нужного продукта? Добавьте его</h2>
        <AddProductForm />
      </div>
    </div>
  );
}