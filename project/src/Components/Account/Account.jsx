import '../Account/Account.css';
import { useSelector, useDispatch } from 'react-redux'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserThunk, logoutUser, updateUserThunk } from '../../slices/userSlice';

export default function Account() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openChangePasswordModal = () => setIsChangePasswordOpen(true);
    const closeChangePasswordModal = () => setIsChangePasswordOpen(false);

    const handleOnDelete = async () => {
        try {
            await dispatch(deleteUserThunk(currentUser.userId)); 
            closeModal();
            dispatch(logoutUser());  
            localStorage.removeItem('user');
            navigate('/'); 
            window.location.reload();
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleChangePassword = async () => {
        try {
            if(newPassword.length<6){
                alert('Password should be over 6 signs')
                return
            }
            const updatedUser = {
                ...currentUser,
                password: newPassword, // Include new password in user data
            };
            await dispatch(updateUserThunk(updatedUser));
            closeChangePasswordModal();
            alert('Password changed successfully!'); // Success message
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Failed to change password. Please try again.'); // Error message
        }
    };

    return (
        <main className="accMain PixelFont">
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
                                    <p className="userName PixelFont">{currentUser.name}</p>
                                    <p className='userName PixelFont'>{currentUser.surname}</p>
                                </div>
                            </div>
                            <div className='otherInfo'>
                                <p>PHONE: {currentUser.phone}</p>
                                <p>BIRTH DATE: {currentUser.birthdate}</p>
                            </div>
                            <div className='accButtons PixelFont'>
                                <button onClick={openChangePasswordModal}>CHANGE PASSWORD</button>
                                <button onClick={openModal} className="deleteAccBut">DELETE ACCOUNT</button>
                            </div>
                        </div>
                    ) : (
                        <p>No user data available.</p>
                    )}
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modalContent">
                            <h2>Confirmation of Deletion</h2>
                            <p>Are you sure you want to delete this account?</p>
                            <button onClick={handleOnDelete}>Yes, delete</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                )}
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
            </div>
        </main>
    );
}