import '../Account/Account.css';
import { useDispatch } from 'react-redux'; 
import { useState, useEffect } from 'react';
import { updateUserThunk } from '../../slices/userSlice';
import i18n from '../../i18n';

export default function Account() {
    const dispatch = useDispatch();
    const t = (key) => i18n.t(key);
    
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [planData, setPlanData] = useState({
        experience: '',
        diseases: '',
        workoutsPerWeek: '',
        workoutsPerGroup: '',
        periodWeeks: '',
        preferences: '',
        equipment: '',
        duration: '',
        sex: '',
        cyclePhase: ''
    });
    
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const savedPlan = localStorage.getItem('trainingPlan');
        if (savedPlan) {
            setPlanData(JSON.parse(savedPlan));
        }
    }, []);

    const openChangePasswordModal = () => setIsChangePasswordOpen(true);
    const closeChangePasswordModal = () => setIsChangePasswordOpen(false);

    const handleChangePassword = async () => {
        try {
            if(newPassword.length < 6){
                alert(t('alert_password_short'));
                return;
            }
            const updatedUser = {
                ...currentUser,
                password: newPassword,
            };
            await dispatch(updateUserThunk(updatedUser));
            closeChangePasswordModal();
            alert(t('alert_password_success'));
        } catch (error) {
            console.error('Error changing password:', error);
            alert(t('alert_password_error'));
        }
    };

    const handlePlanInputChange = (e) => {
        const { name, value } = e.target;
        setPlanData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreatePlan = () => {
        localStorage.setItem('trainingPlan', JSON.stringify(planData));
        alert(t('alert_plan_saved'));
    };

    return (
        <main className="accMain smalle">
            <div className="accDiv">
                <div>
                    {currentUser ? (
                        <div className='acc'>
                            <div className="accDiv1">
                                <img 
                                    src={currentUser.sex === 'male' ? "/data/images/boyProfile.png" : "/data/images/girlProfile.png"} 
                                    alt="Profile" 
                                    className="profileImageAcc" 
                                />
                                <div className="nameSurname">
                                    <p className="userName smalle">{currentUser.name}</p>
                                    <p className='userName smalle'>{currentUser.surname}</p>
                                </div>
                            </div>
                            <div className='otherInfo'>
                                <p>{t('acc_phone')}: {currentUser.phone}</p>
                                <p>{t('acc_birth')}: {currentUser.birthdate}</p>
                            </div>
                            <div className='accButtons smalle'>
                                <button onClick={openChangePasswordModal}>{t('btn_change_password')}</button>
                            </div>
                        </div>
                    ) : (
                        <p>{t('no_user_data')}</p>
                    )}
                </div>
                
                {isChangePasswordOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2 className='modal-title'>{t('title_change_password')}</h2>
                            <label>
                                {t('label_current_password')}:
                                <input
                                    type="password"
                                    className='select'
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </label>
                            <label>
                                {t('label_new_password')}:
                                <input
                                    type="password"
                                    className='select'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </label>
                            <div className="modal-buttons">
                                <button onClick={handleChangePassword}>{t('btn_save')}</button>
                                <button className="cancel-btn" onClick={closeChangePasswordModal}>{t('cancel')}</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="planForm">
                    <h2 className='modal-title'>{t('title_preferences')}</h2>
                    <label>
                        {t('plan_experience')}:
                        <select className="select marginLeft5" name="experience" value={planData.experience} onChange={handlePlanInputChange}>
                            <option value="">{t('opt_select')}</option>
                            <option value="0-6">{t('exp_junior')}</option>
                            <option value="6-18">{t('exp_middle')}</option>
                            <option value="18+">{t('exp_senior')}</option>
                        </select>
                    </label>
                    <label>
                        {t('plan_diseases')}:
                        <input type="text" className="select marginLeft5" name="diseases" value={planData.diseases} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        {t('plan_per_week')}:
                        <input type="number" className="select marginLeft5" name="workoutsPerWeek" value={planData.workoutsPerWeek} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        {t('plan_per_group')}:
                        <input type="number" className="select marginLeft5" name="workoutsPerGroup" value={planData.workoutsPerGroup} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        {t('plan_period')}:
                        <input type="number" className="select marginLeft5" name="periodWeeks" value={planData.periodWeeks} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        {t('plan_pref_type')}:
                        <select className="select marginLeft5" name="preferences" value={planData.preferences} onChange={handlePlanInputChange}>
                            <option value="">{t('opt_select')}</option>
                            <option value="strength">{t('pref_strength')}</option>
                            <option value="cardio">{t('pref_cardio')}</option>
                            <option value="mixed">{t('pref_mixed')}</option>
                        </select>
                    </label>
                    <label>
                        {t('plan_equipment')}:
                        <select className="select marginLeft5" name="equipment" value={planData.equipment} onChange={handlePlanInputChange}>
                            <option value="">{t('opt_select')}</option>
                            <option value="gym">{t('eq_gym')}</option>
                            <option value="dumbbells_home">{t('eq_dumbbells')}</option>
                            <option value="nothing_home">{t('eq_nothing')}</option>
                            <option value="pullup_bars">{t('eq_bars')}</option>
                        </select>
                    </label>
                    <label>
                        {t('plan_sex')}:
                        <select className="select marginLeft5" name="sex" value={planData.sex} onChange={handlePlanInputChange}>
                            <option value="">{t('opt_select')}</option>
                            <option value="male">{t('sex_male')}</option>
                            <option value="female">{t('sex_female')}</option>
                        </select>
                    </label>
                    {planData.sex === 'female' && (
                        <label>
                            {t('plan_cycle')}:
                            <select className="select marginLeft5" name="cyclePhase" value={planData.cyclePhase} onChange={handlePlanInputChange}>
                                <option value="">{t('opt_select')}</option>
                                <option value="menstruation">{t('cyc_menstruation')}</option>
                                <option value="ovulation">{t('cyc_ovulation')}</option>
                                <option value="luteal">{t('cyc_luteal')}</option>
                            </select>
                        </label>
                    )}
                    <button onClick={handleCreatePlan}>{t('btn_save_plan')}</button>
                </div>
            </div>
        </main>
    );
}