import '../RegAuth/RegAuth.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice'; 

export default function RegAuth() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const resultAction = await dispatch(loginUser({ phone, password })).unwrap();
            
            // Сохранение данных пользователя в localStorage
            localStorage.setItem('user', JSON.stringify(resultAction)); 
            localStorage.setItem('userId', resultAction.userId);
            localStorage.setItem('trAim', resultAction.trAim);
            localStorage.setItem('finishedTr', resultAction.finishedTr);
            localStorage.setItem('name', resultAction.name);
            localStorage.setItem('role', resultAction.role)
    
            navigate('/homePage');
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || 'Неизвестная ошибка');
            } else if (error.request) {
                alert('Нет ответа от сервера. Проверьте соединение.');
            } else {
                alert('Вы заблокированы. Вход невозможен');
            }
            console.error('Ошибка входа:', error);
        }
    };

    
    return (
        <div className="regAuthDiv PixelFont">
            <img src="data/images/regGirl.png" alt="Registration" className="regImg" />
            <form className="regAuthForm" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <div className="formGroup">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn PixelFont">Sign In</button>
                <p className="registerPrompt">
                    or <Link to="/registr"><span className="yellowText">register</span></Link> if you don't have an account
                </p>
            </form>


        </div>
    );
}