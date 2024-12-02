import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerTrainer } from '../../slices/userSlice';
import '../BecomeCoach/BecomeCoach.css';
import { useState } from 'react';

export default function BecomeCoach() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    const currentUser = useSelector((state) => state.users.currentUser);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFormData({ ...formData, diploma: file });
        } else {
            alert("Пожалуйста, загрузите файл формата PDF.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.diploma) {
            alert("Пожалуйста, загрузите диплом.");
            return;
        }
    
        const userData = new FormData();
        userData.append('role', 'trainer'); 
        userData.append('diploma', formData.diploma); // Убедитесь, что здесь файл
        userData.append('userId', currentUser.id); // Добавляем userId
    
        try {
            await dispatch(registerTrainer(userData)).unwrap();
            navigate('/homePage');
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            alert('Ошибка при регистрации. Попробуйте еще раз.');
        }
    };
    return (
        <div className="becomeDiv">
            <form className="becomeForm" onSubmit={handleSubmit}>
                <h2>Welcome to our team!</h2>
                <div className="formGroup1">
                    <label htmlFor="diploma">Diploma (PDF)</label>
                    <input 
                        type="file" 
                        id="diploma" 
                        accept="application/pdf" 
                        onChange={handleFileChange} 
                        required 
                    />
                </div>
                <button type="submit" className="btnBecCoach">Become a coach</button>
            </form>
        </div>
    );
}