import '../Registration/Registration.css';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../slices/userSlice'; 
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Registration() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        surname: '',
        name: '',
        phone:'',
        birthdate: '',
        password: '',
        repeatPassword: '',
        sex: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            alert("Пароли не совпадают!");
            return;
        }

        try {
            const userData = {
                surname: formData.surname,
                name: formData.name,
                phone: formData.phone, 
                password: formData.password,
                birthdate: formData.birthdate,
                sex: formData.sex,
                role: 'user',
            };
            
            localStorage.setItem('surname', userData.surname)
            localStorage.setItem('name', userData.name)
            localStorage.setItem('phone', userData.phone)
            localStorage.setItem('password', userData.password)
            localStorage.setItem('birthdate', userData.birthdate)
            localStorage.setItem('sex', userData.sex)
            localStorage.setItem('role', userData.role)
            const result = await dispatch(registerUser(userData)).unwrap();
            localStorage.setItem('userId', result.idUser);
            localStorage.setItem('favPlans', [])
            localStorage.setItem('favRecipes', [])
            localStorage.setItem('user', JSON.stringify(userData))
            navigate('/homePage')
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            alert('Ошибка при регистрации. Попробуйте еще раз.'); 
        }
    };

    return (
        <div className="regAuthDiv PixelFont">
            <img src="data/images/regBoy.png" alt="Registration" className="regImg" />
            <form className="regAuthForm" onSubmit={handleSubmit}>
                <h2>Registration</h2>
                <div className="formGroup">
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname" value={formData.surname} onChange={handleChange} required />
                </div>

                <div className="formGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="formGroup">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className="formGroup">
                    <label htmlFor="birthdate">Birth date</label>
                    <input type="date" id="birthdate" value={formData.birthdate} onChange={handleChange} required />
                </div>

                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="formGroup">
                    <label htmlFor="repeatPassword">Repeat password</label>
                    <input type="password" id="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required />
                </div>

                <div className="formGroup">
                    <label htmlFor="sex">Sex</label>
                    <input type="text" id="sex" value={formData.sex} onChange={handleChange} required />
                </div>

                <button type="submit" className="btnReg PixelFont">Registration</button>
                <div className='checkboxDiv'>
                    <Checkbox {...label} />
                    <p>I agree to the terms of <Link to="/userAgreement"><span className="yellowText">USER AGREEMENT</span></Link></p>
                </div>
            </form>
        </div>
    );
}