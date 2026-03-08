import React, { useState } from 'react';
import '../CaloriesPage/CaloriesPage.css';
import i18n from '../../i18n';

export default function CaloriesPage() {
    const t = (key) => i18n.t(key);

    const optionsPercentage = [
        { value: 4, label: '3-4%' },
        { value: 7, label: '6-7%' },
        { value: 11, label: '10-12%' },
        { value: 16, label: '15-17%' },
        { value: 21, label: '20-22%' },
        { value: 25, label: '25%' },
        { value: 30, label: '30%' },
        { value: 35, label: '35%' },
        { value: 40, label: '40%' },
        { value: 45, label: '45%' },
        { value: 50, label: '50%' }
    ];

    const [weightValue, setWeightValue] = useState('');
    const [fatPercentage, setFatPercentage] = useState('');
    const [leanBodyMass, setLeanBodyMass] = useState(null);

    const handleWeightChange = (event) => {
        setWeightValue(event.target.value);
    };
    
    const handlePercentageChange = (event) => {
        setFatPercentage(event.target.value);
    };
    
    const handleCalculate = () => {
        const weightNumber = parseFloat(weightValue);
        const percentageNumber = parseFloat(fatPercentage);

        if (!isNaN(weightNumber) && !isNaN(percentageNumber) && weightNumber > 0 && percentageNumber > 0) {
            const calculatedLeanBodyMass = weightNumber - (weightNumber * (percentageNumber / 100));
            setLeanBodyMass(calculatedLeanBodyMass.toFixed(1));
        } else {
            setLeanBodyMass(null);
            alert(t('alert_calories_error'));
        }
    };

    return (
        <div className='caloriesCalculatorMain artika'>
            <p className="titlecal">
                {t('cal_main_title')}
            </p>
            <div className='imagesDiv'>
                <p className="chooseFat">
                    {t('cal_look_pictures')}
                </p>
                <div className="weightImgs">
                    <img src="/data/images/womenWeights.jpg" alt="Women Weights" />
                    <img src="/data/images/menWeights.jpg" alt="Men Weights" />
                </div>
            </div>
            <div className='chooseFatDiv'>
                <p className='chooseFat'>{t('cal_select_fat')}:</p>
                <select className="percentageSelect select" value={fatPercentage} onChange={handlePercentageChange}>
                    <option value="">-- {t('opt_select')} --</option>
                    {optionsPercentage.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className='weightInput'>
                <p>{t('cal_enter_weight')}:</p>
                <input className='kgInput select'
                    type="number" 
                    value={weightValue} 
                    onChange={handleWeightChange} 
                    placeholder={t('cal_weight_placeholder')} 
                />
            </div>
            <button onClick={handleCalculate}>{t('cal_btn_calculate')}</button>
            
            {leanBodyMass !== null && (
                <div className='results'>
                    <p className='leanMass'>{t('cal_lean_mass')}: {leanBodyMass} {t('unit_kg')}</p>
                    <div className='resultsFor'>
                        <div className='forDiv activity-card'>
                            <p className='titleFor'>{t('cal_title_cut')}</p>
                            <p>{t('nut_proteins')}: {(2 * leanBodyMass).toFixed(0)} {t('unit_g')} {t('and_more')}</p>
                            <p>{t('nut_fats')}: {(0.8 * leanBodyMass).toFixed(0)}-{Math.round(leanBodyMass)} {t('unit_g')}</p>
                            <p>{t('nut_carbs')}: {(3 * leanBodyMass).toFixed(0)}-{(5 * leanBodyMass).toFixed(0)} {t('unit_g')}</p>
                        </div>
                        <div className='forDiv activity-card'>
                            <p className='titleFor'>{t('cal_title_bulk')}</p>
                            <p>{t('nut_proteins')}: {(1.6 * leanBodyMass).toFixed(0)}-{(2 * leanBodyMass).toFixed(0)} {t('unit_g')}</p>
                            <p>{t('nut_fats')}: {Math.round(leanBodyMass)} {t('unit_g')}</p>
                            <p>{t('nut_carbs')}: {(5 * leanBodyMass).toFixed(0)} {t('unit_g')} {t('and_more')}</p>
                        </div>
                    </div>
                    <p className='comment'>{t('cal_individual_comment')}</p>
                    <div className='recommFor'>
                        <p className='titleFor'>{t('cal_recomm_title')}</p>
                        <p>• {t('cal_recomm_1')}</p>
                        <p>• {t('cal_recomm_2')}</p>
                        <p>• {t('cal_recomm_3')}</p>
                    </div>
                </div>
            )}
        </div>
    );
}