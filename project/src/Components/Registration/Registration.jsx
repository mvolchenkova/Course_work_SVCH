import '../Registration/Registration.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const API_URL = 'http://localhost:5000';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Registration() {
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        surname: '',
        name: '',
        phone: '',
        birthdate: '',
        password: '',
        repeatPassword: '',
        sex: '',
    });

    const [agreed, setAgreed] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (formData.password !== formData.repeatPassword) {
            setErrorMsg('Пароли не совпадают!');
            return;
        }

        if (!agreed) {
            setErrorMsg('Необходимо принять пользовательское соглашение');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/users`, {
                surname: formData.surname,
                name: formData.name,
                phone: formData.phone,
                password: formData.password,
                birthdate: formData.birthdate,
                sex: formData.sex,
                role: 'user',
            });

            // Сохраняем только нужное — один объект user, не россыпь ключей
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('userId', response.data.idUser);
            localStorage.setItem('favPlans', JSON.stringify([]));
            localStorage.setItem('favRecipes', JSON.stringify([]));

            navigate('/homePage');
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            // Показываем первую ошибку валидации с бэкенда, если есть
            const backendError = error.response?.data?.errors?.[0]?.msg
                || error.response?.data?.message
                || 'Ошибка при регистрации. Попробуйте ещё раз.';
            setErrorMsg(backendError);
        }
    };

    return (
        <div className="regAuthDiv">
            <img src="data/images/regBoy.png" alt="Registration" className="regImg" />
            <form className="regAuthForm" onSubmit={handleSubmit}>
                <h2>Registration</h2>

                <div className="formGroup">
                    <label htmlFor="surname">Surname</label>
                    <input
                        type="text"
                        id="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="birthdate">Birth date</label>
                    <input
                        type="date"
                        id="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="repeatPassword">Repeat password</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* select вместо input — бэкенд принимает только 'male' | 'female' */}
                <div className="formGroup">
                    <label htmlFor="sex">Sex</label>
                    <select id="sex" value={formData.sex} onChange={handleChange} required>
                        <option value="">Выберите пол</option>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                </div>

                {/* Ошибка — одно место вместо alert */}
                {errorMsg && (
                    <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
                        {errorMsg}
                    </div>
                )}

                <button type="submit" className="btnReg">Registration</button>

                <div className='checkboxDiv'>
                    <Checkbox
                        {...label}
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <p>
                        I agree to the terms of{' '}
                        <Link to="/userAgreement">
                            <span className="yellowText">USER AGREEMENT</span>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}