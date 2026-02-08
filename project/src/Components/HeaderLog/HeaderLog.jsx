import './HeaderLog.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../slices/userSlice';
import React, { useState } from 'react';
import i18n from '../../i18n';

export default function HeaderLog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const t = (key) => i18n.t(key);

    const currentUser = useSelector((state) => state.users.currentUser);

    const [currentLang, setCurrentLang] = useState(i18n.language);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ru' : 'en';
        i18n.changeLanguage(newLang);
        setCurrentLang(newLang);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());
            const itemsToRemove = ['user', 'finishedTr', 'trAim', 'userId', 'name'];
            itemsToRemove.forEach(item => localStorage.removeItem(item));
            
            navigate('/'); 
            window.location.reload(); 
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            alert(t('error_logout')); // Можно тоже перевести
        }
    };

    return (
        <header>
            <Link to="/">
                <img src="data/images/logo.png" alt="Logo" />
            </Link>
            
            <div className="options">
                {currentUser ? (
                    <>
                        {/* Переключатель языка */}
                        <button className="langSwitcher smalle" onClick={toggleLanguage}>
                            {i18n.language === 'en' ? 'EN' : 'RU'}
                        </button>

                        <Link to='/assistant' className="homelink">
                            {t('nav_assistant')}
                        </Link>
                        
                        <Link to="/homePage" className="homelink">
                            {t('nav_home')}
                        </Link>

                        {currentUser.sex === 'male' ? (
                            <img src="/data/images/boyProfile.png" alt="Boy Profile" className="profileImage" />
                        ) : (
                            currentUser.sex === 'female' && (
                                <img src="data/images/girlProfile.png" alt="Girl Profile" className="profileImage" />
                            )
                        )}

                        <Link to='/account'>
                            <span className="userName smalle">{currentUser.name}</span>
                        </Link>
                        
                        <button className="logoutButton smalle" onClick={handleLogout}>
                            {t('logout')}
                        </button>
                    </>
                ) : null}
            </div>
        </header>
    );
}