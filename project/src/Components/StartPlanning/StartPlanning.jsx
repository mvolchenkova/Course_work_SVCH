import '../StartPlanning/StartPlanning.css';
import Button from '../Button/Button.jsx';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import i18n from '../../i18n'; // Импортируем i18n

export default function StartPlanning() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    
    const t = (key) => i18n.t(key);
    const currentUser = useSelector((state) => state.users.currentUser);

    return (
        <div className="startPlanningDiv">
            <p className="changeTitle">{t('start_planning_title')}</p>
            <p className="changeText">
                {t('start_planning_text')}
            </p>
            
            {!currentUser && (
                <Button text={t('btn_start_planning')} link="/authorization"/>
            )}
        </div>
    );
}