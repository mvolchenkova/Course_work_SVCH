import '../Progress/Progress.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserThunk } from '../../slices/userSlice'; 
import * as d3 from "d3";

export default function Progress() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.users.currentUser?.userId);
    const [showAddAim, setShowAddAim] = useState(true); 
    const [showModal, setShowModal] = useState(false); 
    const [trainingAim, setTrainingAim] = useState(0); 
    const [finishedTr, setfinishedTr] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data) {
                    if (data.trAim) {
                        setTrainingAim(data.trAim);
                        setShowAddAim(false);
                    }
                    if (data.finishedTr) {
                        setfinishedTr(data.finishedTr);
                    }
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя:', error);
                setError(error.message);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

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
        if (!userId) {
            console.error('User ID is missing');
            return;
        }
    
        if (trainingAim < 1 || trainingAim > 7) {
            console.error('Invalid training aim:', trainingAim);
            return;
        }
    
        // Dispatch the updateUser thunk with both aim and trainings
        dispatch(updateUserThunk({ userId, trAim: trainingAim, finishedTr }))
            .unwrap()
            .then(() => {
                setShowAddAim(false);
                setShowModal(false);
            })
            .catch((error) => {
                console.error('Ошибка обновления цели:', error);
            });
    };

    const handleAddTraining = async () => {
    if (!userId) {
        console.error('User ID is missing');
        return;
    }

    // Increase the number of completed trainings
    const newFinishedTr = finishedTr + 1;
    setfinishedTr(newFinishedTr);

    // Dispatch the updateUser thunk with the new finished trainings count
    dispatch(updateUserThunk({ userId, trAim: trainingAim, finishedTr: newFinishedTr }))
        .unwrap()
        .catch(error => {
            console.error('Ошибка при добавлении выполненной тренировки:', error);
        });
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
                        <p className='complTr'>Your training aim: {trainingAim}</p>
                        <button className='PixelFont' onClick={() => setShowModal(true)}>CHANGE AIM</button>
                    </div>
                    <div>
                        <p className='complTr'>Completed trainings: {finishedTr}</p>
                        <div className='chart'>
                            <svg id="progressChart"></svg>
                            <button className="PixelFont addTrButton" onClick={handleAddTraining}>+</button> {/* Кнопка добавления тренировки */}
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