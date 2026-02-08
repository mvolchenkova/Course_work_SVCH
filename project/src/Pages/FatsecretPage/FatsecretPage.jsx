import React, { useState } from 'react';
import '../FatsecretPage/FatsecretPage.css';
import CalorieCard from '../../Components/CalorieCard/CalorieCard';
import CalorieSearch from '../../Components/CalorieSearch/CalorieSearch';
import { useSelector } from 'react-redux';

export default function FatsecretPage() {
  const [meals, setMeals] = useState([
    { id: 1, title: 'Завтрак', current: 450, target: 500, icon: '🍳' },
    { id: 2, title: 'Обед', current: 0, target: 700, icon: '🍲' },
    { id: 3, title: 'Ужин', current: 0, target: 600, icon: '🥗' },
    { id: 4, title: 'Перекусы', current: 150, target: 300, icon: '🍎' },
  ]);

  const totalCalories = meals.reduce((sum, meal) => sum + meal.current, 0);
  const dailyGoal = 2100;

  const handleAddCalories = (id) => {
    const amount = prompt("Сколько калорий добавить?", "100");
    if (amount) {
      setMeals(meals.map(meal => 
        meal.id === id ? { ...meal, current: meal.current + parseInt(amount) } : meal
      ));
    }
  };

  const handleDeleteMeal = (id) => {
    if(window.confirm("Удалить этот прием пищи?")) {
      setMeals(meals.filter(meal => meal.id !== id));
    }
  };

    const todayLogs = useSelector(state => state.calorie.todayLogs);

    // Функция для расчета калорий по типу приема пищи
    const getSumForMeal = (type) => {
        return todayLogs
            .filter(log => log.mealType === type)
            .reduce((sum, log) => sum + (log.recordedCalories * log.grams / 100), 0);
    };

    // Обновляем состояние карточек на лету
    const updatedMeals = meals.map(meal => ({
        ...meal,
        current: Math.round(getSumForMeal(meal.title.toLowerCase())) // сопоставляем 'Завтрак' -> 'breakfast'
    }));

  return (
    <div className="progressDiv">
      {/* Шапка с общим прогрессом (используем ваши классы XP) */}
      <div className="xp-header">
        <div className="points-display">
          <span className="points-value" style={{ color: '#00c8dc' }}>{totalCalories}</span>
          <span className="divider">/</span>
          <span className="aim-num">{dailyGoal} ккал сегодня</span>
        </div>
      </div>

      <div className="activities-grid">
        {meals.map(meal => (
          <div key={meal.id} style={{ flex: '1 1 300px' }}>
            <CalorieCard 
              title={meal.title}
              current={meal.current}
              target={meal.target}
              icon={meal.icon}
              onAdd={() => handleAddCalories(meal.id)}
              onDelete={() => handleDeleteMeal(meal.id)}
            />
          </div>
        ))}

        {/* Карточка добавления новой категории */}
        <div 
            className="activity-card" 
            style={{ border: '2px dashed #ccc', boxShadow: 'none', justifyContent: 'center', cursor: 'pointer' }}
            onClick={() => alert('Тут можно открыть модалку создания приема пищи')}
        >
          <div className="card-body">
            <span style={{ fontSize: '3rem', color: '#ccc' }}>+</span>
            <p style={{ color: '#999', fontWeight: 'bold' }}>ДОБАВИТЬ ПРИЕМ</p>
          </div>
        </div>

        <CalorieSearch/>
      </div>
    </div>
  );
}