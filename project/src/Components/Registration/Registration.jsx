import '../Registration/Registration.css';
import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default function Registration() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        surname: '', name: '', phone: '', birthdate: '',
        password: '', repeatPassword: '', sex: '', role: 'user'
    });
    const [agreed, setAgreed] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.repeatPassword) return setErrorMsg('Пароли не совпадают!');
        if (!agreed) return setErrorMsg('Примите соглашение');

        try {
            const response = await axios.post(`${API_URL}/api/users`, formData);
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('userId', response.data.idUser);
            navigate('/homePage');
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Ошибка регистрации');
        }
    };

    return (
        <div className='mainDiv'>
            <div className="regAuthContainer">
                <div className="regFormWrapper">
                    <form className="regModernForm" onSubmit={handleSubmit}>
                        <div className="formHeader">
                            <h2>Создать аккаунт</h2>
                            <p>Уже есть аккаунт? <Link to="/authorization" className="yellowText">Войти</Link></p>
                        </div>

                        <div className="inputsGrid">
                            <div className="formGroup">
                                <label>Имя</label>
                                <input type="text" id="name" placeholder="Иван" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="formGroup">
                                <label>Фамилия</label>
                                <input type="text" id="surname" placeholder="Иванов" value={formData.surname} onChange={handleChange} required />
                            </div>
                            <div className="formGroup">
                                <label>Телефон</label>
                                <input type="text" id="phone" placeholder="+7 (999) 000-00-00" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="formGroup">
                                <label>Дата рождения</label>
                                <input type="date" id="birthdate" value={formData.birthdate} onChange={handleChange} required />
                            </div>
                            <div className="formGroup">
                                <label>Пароль</label>
                                <input type="password" id="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                            </div>
                            <div className="formGroup">
                                <label>Повтор пароля</label>
                                <input type="password" id="repeatPassword" placeholder="••••••••" value={formData.repeatPassword} onChange={handleChange} required />
                            </div>
                            <div className="formGroup">
                                <label>Пол</label>
                                <select id="sex" value={formData.sex} onChange={handleChange} required>
                                    <option value="">Выбрать</option>
                                    <option value="male">Мужской</option>
                                    <option value="female">Женский</option>
                                </select>
                            </div>
                            <div className="formGroup">
                                <label>Я пришел как...</label>
                                <select id="role" className="roleSelect" value={formData.role} onChange={handleChange} required>
                                    <option value="user">Атлет</option>
                                    <option value="trainer">Тренер</option>
                                </select>
                            </div>
                        </div>

                        {errorMsg && <div className="errorBadge">{errorMsg}</div>}

                        <div className="agreementRow">
                            <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} 
                                sx={{ color: '#FFD700', '&.Mui-checked': { color: '#FFD700' } }} />
                            <p>Я согласен с <Link to="/userAgreement" className="yellowText">пользовательским соглашением</Link></p>
                        </div>

                        <button type="submit" className="mainRegBtn">Зарегистрироваться</button>
                    </form>
                </div>
            </div>
        </div>
        
    );
}