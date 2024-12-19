import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { becomeCoachThunk } from '../../slices/userSlice';
import '../BecomeCoach/BecomeCoach.css';

export default function BecomeCoach() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [diploma, setDiploma] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDiplomaChange = (e) => {
        setDiploma(e.target.value); // Обновляем состояние диплома
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            await dispatch(becomeCoachThunk({ userId, diploma })); // Отправляем только диплом
            navigate('/homePage'); 
        } catch (error) {
            console.error('Ошибка при загрузке:', error);
            alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="becomeDiv">
            <form className="becomeForm" onSubmit={handleSubmit}>
                <h2>Welcome to our team!</h2>
                <div className="formGroup1">
                    <label htmlFor="diploma">Diploma (link)</label>
                    <input 
                        type="text" 
                        id="diploma" 
                        value={diploma} 
                        onChange={handleDiplomaChange} // Обработчик изменения
                        required 
                    />
                </div>
                <button type="submit" className="btnBecCoach" disabled={isLoading}>
                    {isLoading ? "Becoming a Coach..." : "Become a Coach"}
                </button>
            </form>
        </div>
    );
}