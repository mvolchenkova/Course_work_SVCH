import '../Progress/Progress.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserThunk } from '../../slices/userSlice'; 
import ProgressBar from "@ramonak/react-progress-bar";
import AddActivityModal from '../AddActivityModal/AddActivityModal';
import i18n from '../../i18n';

export default function Progress() {
   const t = (key) => i18n.t(key);
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');

    // --- СОСТОЯНИЕ ---
    const [activities, setActivities] = useState([]); // Список блоков (занятий)
    const [totalPoints, setTotalPoints] = useState(0); // Общие баллы (опыт)
    const [achievements, setAchievements] = useState([]); // Разблокированные ачивки
    const [isModalOpen, setModalOpen] = useState(false);

    // Константы наград
    const POINTS_PER_STEP = 10;
    const BONUS_FULL_WEEK = 50;

    // --- ЗАГРУЗКА ДАННЫХ ---
    useEffect(() => {
        const savedActivities = JSON.parse(localStorage.getItem('userActivities')) || [];
        const savedPoints = Number(localStorage.getItem('totalPoints')) || 0;
        const savedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];

        setActivities(savedActivities);
        setTotalPoints(savedPoints);
        setAchievements(savedAchievements);

        checkWeeklyReset();
    }, []);

    // --- ЛОГИКА ЕЖЕНЕДЕЛЬНОГО СБРОСА ---
    const checkWeeklyReset = () => {
        const lastReset = localStorage.getItem('lastReset');
        const today = new Date();
        const isMonday = today.getDay() === 1;

        if (isMonday && lastReset !== today.toLocaleDateString()) {
            const currentActivities = JSON.parse(localStorage.getItem('userActivities')) || [];
            
            // При сбросе обнуляем только прогресс (current), но оставляем цели (aim)
            const resetActivities = currentActivities.map(act => ({ ...act, current: 0 }));
            
            setActivities(resetActivities);
            localStorage.setItem('userActivities', JSON.stringify(resetActivities));
            localStorage.setItem('lastReset', today.toLocaleDateString());
        }
    };

    // --- ДОБАВЛЕНИЕ НОВОЙ АКТИВНОСТИ (вызывается из модалки) ---
    const addNewActivity = (title, aim) => {
        const newAct = {
            id: Date.now(),
            title: title,
            aim: aim,
            current: 0,
            isCompleted: false
        };
        const updated = [...activities, newAct];
        saveData(updated, totalPoints);
    };

    // --- КЛИК ПО ПЛЮСУ (Выполнение шага) ---
    const handleIncrement = (id) => {
        let bonus = 0;
        const updated = activities.map(act => {
            if (act.id === id && act.current < act.aim) {
                const nextCurrent = act.current + 1;
                // Проверка на завершение блока (бонус за неделю)
                if (nextCurrent === act.aim) {
                    bonus = BONUS_FULL_WEEK;
                }
                return { ...act, current: nextCurrent };
            }
            return act;
        });

        const newPoints = totalPoints + POINTS_PER_STEP + bonus;
        saveData(updated, newPoints);
        checkAchievements(newPoints);
    };

    // --- СИСТЕМА ДОСТИЖЕНИЙ ---
    const checkAchievements = (points) => {
        const newAchievements = [...achievements];
        let changed = false;

        const rules = [
            { id: 'first_step', title: 'First Step', desc: 'Earn your first points!', cond: points >= 10 },
            { id: 'champion', title: 'Champion', desc: 'Reach 500 total points', cond: points >= 500 },
            { id: 'legend', title: 'Fitness Legend', desc: 'Reach 1000 total points', cond: points >= 1000 },
        ];

        rules.forEach(rule => {
            if (rule.cond && !newAchievements.find(a => a.id === rule.id)) {
                newAchievements.push(rule);
                changed = true;
                alert(`Achievement Unlocked: ${rule.title}!`);
            }
        });

        if (changed) {
            setAchievements(newAchievements);
            localStorage.setItem('achievements', JSON.stringify(newAchievements));
        }
    };

    // --- СОХРАНЕНИЕ ---
    const saveData = (newActivities, newPoints) => {
        setActivities(newActivities);
        setTotalPoints(newPoints);
        localStorage.setItem('userActivities', JSON.stringify(newActivities));
        localStorage.setItem('totalPoints', newPoints);

        // Синхронизация с сервером через Thunk
        if (userId) {
            dispatch(updateUserThunk({ userId, totalPoints: newPoints, activities: newActivities }));
        }
    };

    // --- УДАЛЕНИЕ АКТИВНОСТИ ---
    const deleteActivity = (id) => {
        // Оставляем только те активности, id которых не совпадает с удаляемым
        const updated = activities.filter(act => act.id !== id);
        
        // Сохраняем обновленный список в стейт и localStorage
        setActivities(updated);
        localStorage.setItem('userActivities', JSON.stringify(updated));

        // Синхронизируем с сервером (опционально)
        if (userId) {
            dispatch(updateUserThunk({ userId, totalPoints, activities: updated }));
        }
    };
    
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="progressDiv">
            {/* Header: Общий уровень и очки */}
            <div className="xp-header">
                <div className="points-display">
                    <span className="points-value">{totalPoints}</span>
                    <span className="points-label">{t('total_xp')}</span>
                </div>
                <ProgressBar 
                    completed={(totalPoints % 100)} // Прогресс до следующей "сотни"
                    maxCompleted={100}
                    bgColor="rgb(0, 200, 220)" 
                    labelColor="black"
                    height="15px"
                    labelSize="10px"
                />
            </div>

            {/* Секция достижений */}
            {/* <div className="achievements-mini-list">
                {achievements.map(ach => (
                    <div key={ach.id} className="ach-badge" title={ach.desc}>
                        🏆 {ach.title}
                    </div>
                ))}
            </div> */}

            {/* Список блоков активностей */}
            <div className="activities-grid">
                {activities.map(act => (
                    <div key={act.id} className={`activity-card ${act.current >= act.aim ? 'is-completed' : ''}`}>
                      
                       <div className="card-top">
                        <div className="card-header">
                            <div className="icon-box">
                                {act.current >= act.aim ? '🔥' : '⚡'}
                            </div>
                            <h3 className="smalle">{t(`activity_${act.title.replace(/\s+/g, '_')}`)}</h3>
                        </div>
                        
                        <button 
                            className="delete-btn-styled" 
                            onClick={() => window.confirm(t('delete_confirm')) && deleteActivity(act.id)}
                        >
                            ×
                        </button>
                    </div>

                        <div className="card-body">
                            <div className="stats-row">
                                <span className="current-num">{act.current}</span>
                                <span className="divider">/</span>
                                <span className="aim-num">{act.aim}</span>
                            </div>
                            <p className="unit-label">{t('this_week')}</p>
                        </div>

                        <div className="card-footer">
                            <div className="progress-wrapper">
                                <ProgressBar 
                                    completed={(act.current / act.aim) * 100} 
                                    bgColor={act.current >= act.aim ? "#FFD700" : "linear-gradient(90deg, #00C8DC, #00FFCC)"}
                                    height="12px"
                                    borderRadius="20px"
                                    isLabelVisible={false}
                                    baseBgColor="#f0f0f0"
                                />
                            </div>
                            <button 
                                className="action-plus-btn" 
                                onClick={() => handleIncrement(act.id)}
                                disabled={act.current >= act.aim}
                            >
                                {act.current >= act.aim ? '✓' : '+'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className='addActivityButton' onClick={() => setModalOpen(true)}>
                 {t('add_new_goal')}
            </button>

            
            <AddActivityModal 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                onAdd={addNewActivity} 
            /> 
        </div>
    );
}