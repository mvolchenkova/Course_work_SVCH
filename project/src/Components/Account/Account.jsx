import '../Account/Account.css';
import { useSelector, useDispatch } from 'react-redux'; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserThunk, logoutUser, updateUserThunk } from '../../slices/userSlice';

export default function Account() {
    const dispatch = useDispatch();
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
    const navigate = useNavigate();
    
    const currentUser = JSON.parse(localStorage.getItem('user'));

    // Загружаем данные тренировочного плана из localStorage при монтировании
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
                alert('Password should be over 6 signs');
                return;
            }
            const updatedUser = {
                ...currentUser,
                password: newPassword,
            };
            await dispatch(updateUserThunk(updatedUser));
            closeChangePasswordModal();
            alert('Password changed successfully!');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Failed to change password. Please try again.');
        }
    };

    const handlePlanInputChange = (e) => {
        const { name, value } = e.target;
        setPlanData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreatePlan = () => {
        // Сохраняем данные в localStorage
        localStorage.setItem('trainingPlan', JSON.stringify(planData));
        alert('Training plan saved!');
        console.log('Saved data:', planData);
    };

    return (
        <main className="accMain smalle">
            <div className="accDiv">
                <div>
                    {currentUser ? (
                        <div className='acc'>
                            <div className="accDiv1">
                                {currentUser.sex === 'male' ? (
                                    <img src="/data/images/boyProfile.png" alt="Boy Profile" className="profileImageAcc" />
                                ) : (
                                    currentUser.sex === 'female' && (
                                        <img src="/data/images/girlProfile.png" alt="Girl Profile" className="profileImageAcc" />
                                    )
                                )}
                                <div className="nameSurname">
                                    <p className="userName smalle">{currentUser.name}</p>
                                    <p className='userName smalle'>{currentUser.surname}</p>
                                </div>
                            </div>
                            <div className='otherInfo'>
                                <p>PHONE: {currentUser.phone}</p>
                                <p>BIRTH DATE: {currentUser.birthdate}</p>
                            </div>
                            <div className='accButtons smalle'>
                                <button onClick={openChangePasswordModal}>CHANGE PASSWORD</button>
                            </div>
                        </div>
                    ) : (
                        <p>No user data available.</p>
                    )}
                </div>
                
                {isChangePasswordOpen && (
                    <div className="modal">
                        <div className="modalContent">
                            <h2>Change Password</h2>
                            <label>
                                Current Password:
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </label>
                            <label>
                                New Password:
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </label>
                            <button onClick={handleChangePassword}>Change Password</button>
                            <button onClick={closeChangePasswordModal}>Cancel</button>
                        </div>
                    </div>
                )}

                {/* Form for training plan */}
                <div className="planForm">
                    <h2>PREFERENCES</h2>
                    <label>
                        Training Experience:
                        <select className="select marginLeft5" name="experience" value={planData.experience} onChange={handlePlanInputChange}>
                            <option value="">Select experience</option>
                            <option value="0-6">0-6 months</option>
                            <option value="6-18">6-18 months</option>
                            <option value="18+">18+ months</option>
                        </select>
                    </label>
                    <label>
                        Diseases / Restrictions:
                        <input type="text" className="select marginLeft5" name="diseases" value={planData.diseases} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        Workouts per Week:
                        <input type="number" className="select marginLeft5" name="workoutsPerWeek" value={planData.workoutsPerWeek} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        Workouts per Group:
                        <input type="number" className="select marginLeft5" name="workoutsPerGroup" value={planData.workoutsPerGroup} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        Period (weeks):
                        <input type="number" className="select marginLeft5" name="periodWeeks" value={planData.periodWeeks} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        Training Preferences:
                        <select className="select marginLeft5" name="preferences" value={planData.preferences} onChange={handlePlanInputChange}>
                            <option value="">Select preference</option>
                            <option value="strength">Strength</option>
                            <option value="cardio">Cardio</option>
                            <option value="mixed">Mixed</option>
                        </select>
                    </label>
                    <label>
                        Available Equipment:
                        <select className="select marginLeft5" name="equipment" value={planData.equipment} onChange={handlePlanInputChange}>
                            <option value="">Select equipment</option>
                            <option value="gym">Gym</option>
                            <option value="dumbbells_home">Dumbbells at home</option>
                            <option value="nothing_home">Nothing at home</option>
                            <option value="pullup_bars">Pull-up bars</option>
                        </select>
                    </label>
                    <label>
                        Sex:
                        <select className="select marginLeft5" name="sex" value={planData.sex} onChange={handlePlanInputChange}>
                            <option value="">Select sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                    <label>
                        Cycle Phase (for women):
                        <select className="select marginLeft5" name="cyclePhase" value={planData.cyclePhase} onChange={handlePlanInputChange}>
                            <option value="">Select phase</option>
                            <option value="menstruation">Menstruation</option>
                            <option value="ovulation">Ovulation</option>
                            <option value="luteal">Luteal</option>
                        </select>
                    </label>
                    <button onClick={handleCreatePlan}>Save Training Plan</button>
                </div>
            </div>
        </main>
    );
}
