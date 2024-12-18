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
        console.log('Login response:', resultAction);

        const userData = resultAction.user; 

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userId', userData.userId); 
        localStorage.setItem('trAim', userData.trAim);
        localStorage.setItem('finishedTr', userData.finishedTr);
        localStorage.setItem('name', userData.name);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('favPlans', JSON.stringify(userData.favPlans))
        localStorage.setItem('favRecipes', JSON.stringify(userData.favRecipes))
        // localStorage.setItem('token', userData.)

        navigate('/homePage');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const validationErrors = error.response.data.errors;
                validationErrors.forEach(err => {
                    alert(err.msg); // Or display the errors in a more user-friendly way
                });
            }
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