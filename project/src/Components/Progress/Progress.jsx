import '../Progress/Progress.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTrainingAim } from '../../slices/userSlice'; 

export default function Progress() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.users.currentUser?.userId); // Получаем userId из состояния
    const [showAddAim, setShowAddAim] = useState(true); 
    const [showModal, setShowModal] = useState(false); 
    const [trainingAim, setTrainingAim] = useState(0); 
    const [error, setError] = useState(null); // Для хранения ошибок

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data && data.trAim) {
                    setTrainingAim(data.trAim);
                    setShowAddAim(false);
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

    const handleAimSubmit = () => {
        if (!userId) {
            console.error('User ID is missing');
            return;
        }
    
        if (trainingAim < 1 || trainingAim > 7) {
            console.error('Invalid training aim:', trainingAim);
            return;
        }

        dispatch(updateTrainingAim({ userId, trAim: trainingAim }))
            .unwrap()
            .then(() => {
                setShowAddAim(false);
                setShowModal(false);
            })
            .catch((error) => {
                console.error('Ошибка обновления цели:', error);
            });
    };

    return (
        <div className="progressDiv">
            {error && <p className="error">{error}</p>} {/* Отображаем ошибку, если она есть */}
            <p className="PixelFont yourProgress">YOUR PROGRESS</p>

            {showAddAim && ( 
                <div className="addAim">
                    <button onClick={() => setShowModal(true)} className='PixelFont'>ADD YOUR TRAINING AIM</button>
                </div>
            )}

            {!showAddAim && (
                <div>
                    <p>Your training aim: {trainingAim}</p>
                    <button>CHANGE AIM</button>
                </div>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Select your training aim</h2>
                        <select 
                            value={trainingAim} 
                            onChange={(e) => setTrainingAim(Number(e.target.value))}
                        >
                            <option value={0}>Select number of trainings</option>
                            {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        <button onClick={handleAimSubmit}>Submit</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}