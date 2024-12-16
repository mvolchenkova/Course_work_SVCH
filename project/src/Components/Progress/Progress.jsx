import '../Progress/Progress.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserThunk } from '../../slices/userSlice'; 
import * as d3 from "d3";
import { Bar } from 'react-chartjs-2';

export default function Progress() {
    const dispatch = useDispatch();
    
    const [trainingAim, setTrainingAim] = useState(0);
    const [finishedTr, setFinishedTr] = useState(0);
    const userId = localStorage.getItem('userId');
    
    const [showAddAim, setShowAddAim] = useState(trainingAim === 0); 
    const [showModal, setShowModal] = useState(false); 
    const [error, setError] = useState(null);

    // Загрузка данных из localStorage
    useEffect(() => {
        const storedAim = Number(localStorage.getItem('trAim')) || 0;
        const storedFinishedTr = Number(localStorage.getItem('finishedTr')) || 0;
        
        setTrainingAim(storedAim);
        setFinishedTr(storedFinishedTr);
        setShowAddAim(storedAim === 0);

        // Проверка на сброс выполненных тренировок
        resetFinishedTrIfMonday(storedFinishedTr);
    }, []);

    const resetFinishedTrIfMonday = (storedFinishedTr) => {
        const lastReset = localStorage.getItem('lastReset') ? new Date(localStorage.getItem('lastReset')) : null;
        const today = new Date();
        
        if (today.getDay() === 1) { //сброс каждый понедельник
            if (!lastReset || lastReset.getDate() !== today.getDate() || lastReset.getMonth() !== today.getMonth() || lastReset.getFullYear() !== today.getFullYear()) {
                localStorage.setItem('finishedTr', 0);
                setFinishedTr(0);
                localStorage.setItem('lastReset', today.toISOString()); 
            }
        }
    };
    const [workoutHistory, setWorkoutHistory] = useState([]);

    const addWorkoutToHistory = (date, aim, completed) => {
        setWorkoutHistory(prev => [...prev, { date, aim, completed }]);
        localStorage.setItem('workoutHistory', JSON.stringify([...workoutHistory, { date, aim, completed }]));
    };
    
    useEffect(() => {
        const svg = d3.select("#progressChart");
        svg.selectAll("*").remove(); // Очищаем предыдущий график

        const width = 300, height = 25;
        const progress = trainingAim > 0 ? finishedTr / trainingAim : 0;

        svg.attr("width", width).attr("height", height);

        // Создание линии прогресса
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "#e0e0e0");

        svg.append("rect")
            .attr("width", width * progress)
            .attr("height", height)
            .attr("fill", "rgb(0,200,220)");
    }, [finishedTr, trainingAim]);

    const handleAimSubmit = () => {
        if (trainingAim < 1 || trainingAim > 7) {
            console.error('Invalid training aim:', trainingAim);
            return;
        }

        localStorage.setItem('trAim', trainingAim);
        setShowAddAim(false);

        // Обновляем пользователя с новой целью
        const userData = {
            userId,
            trAim: trainingAim,
            finishedTr // Сохраняем текущее количество завершенных тренировок
        };

        dispatch(updateUserThunk(userData))
            .unwrap()
            .catch(error => {
                console.error('Ошибка при обновлении тренировки:', error);
            });
    };

    const handleAddTraining = async () => {
        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        const newFinishedTr = finishedTr + 1;
        localStorage.setItem('finishedTr', newFinishedTr);
        setFinishedTr(newFinishedTr);

        // Обновляем пользователя с новым количеством завершенных тренировок
        const userData = {
            userId,
            trAim: trainingAim,
            finishedTr: newFinishedTr
        };

        dispatch(updateUserThunk(userData))
            .unwrap()
            .then(() => {
                localStorage.setItem('trAim', trainingAim);
                localStorage.setItem('finishedTr', newFinishedTr);
            })
            .catch(error => {
                console.error('Ошибка при добавлении выполненной тренировки:', error);
            });
            addWorkoutToHistory(new Date().toLocaleDateString(), trainingAim, newFinishedTr);
    };

    return (
        <div className="progressDiv">
            {error && <p className="error">{error}</p>}
            <p className="PixelFont yourProgress">YOUR PROGRESS</p>

            {showAddAim && ( 
                <div className="addAim">
                    <button onClick={() => setShowModal(true)} className='PixelFont'>ADD YOUR TRAINING AIM</button>
                </div>
            )}

            {!showAddAim && (
                <div className="aimAndProgressDiv">
                    <div className="aimdiv">
                        <p className='trAim'>Your training aim: {trainingAim}</p>
                        <button className='PixelFont' onClick={() => setShowModal(true)}>CHANGE AIM</button>
                    </div>
                    <div>
                        <p className='complTr'>Completed trainings: {finishedTr}</p>
                        <div className='chart'>
                            <svg id="progressChart"></svg>
                            <button className="PixelFont addTrButton" onClick={handleAddTraining}>+</button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Select your training aim</h2>
                        <select 
                            className='selectAim PixelFont'
                            value={trainingAim} 
                            onChange={(e) => setTrainingAim(Number(e.target.value))}
                        >
                            <option value={0}>Select number of trainings</option>
                            {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        <button className='PixelFont' onClick={handleAimSubmit}>Submit</button>
                        <button className='PixelFont' onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}