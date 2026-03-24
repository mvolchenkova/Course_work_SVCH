import '../RegAuth/RegAuth.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice';

export default function RegAuth() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(''); // Заменил алерты на стейт ошибки
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const resultAction = await dispatch(loginUser({ phone, password })).unwrap();
            const userData = resultAction.user;

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('userId', userData.userId);
            localStorage.setItem('name', userData.name);
            localStorage.setItem('role', userData.role);
            // ... остальные localStorage

            navigate('/homePage');
        } catch (error) {
            setErrorMsg(error.message || 'Неверный логин или пароль');
        }
    };

    return (
        <div className="mainDiv"> {/* Центрирующий контейнер */}
            <div className="regAuthContainer">
                <div className="regFormWrapper">
                    <form className="regModernForm" onSubmit={handleSubmit}>
                        <div className="formHeader">
                            <h2>Вход</h2>
                            <p>С возвращением! Заполните данные для входа</p>
                        </div>

                        <div className="formGroup">
                            <label htmlFor="phone">Телефон</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="+375 (__) ___-__-__"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {errorMsg && <div className="errorBadge">{errorMsg}</div>}

                        <button type="submit" className="mainRegBtn">Войти</button>

                        <p className="registerPrompt">
                            Еще нет аккаунта? <Link to="/registr" className="yellowText">Регистрация</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}