import '../Account/Account.css';
import { useDispatch } from 'react-redux'; 
import { useState, useRef } from 'react';
import { updateUserThunk, uploadAvatarThunk } from '../../slices/userSlice';
import i18n from '../../i18n';

export default function Account() {
    const dispatch = useDispatch();
    const t = (key) => i18n.t(key);
    
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const fileInputRef = useRef(null);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const openChangePasswordModal = () => setIsChangePasswordOpen(true);
    const closeChangePasswordModal = () => setIsChangePasswordOpen(false);

    const handleChangePassword = async () => {
        if(newPassword.length < 6) {
            alert(t('alert_password_short'));
            return;
        }
        try {
            await dispatch(updateUserThunk({ ...currentUser, password: newPassword }));
            closeChangePasswordModal();
            alert(t('alert_password_success'));
        } catch (error) {
            alert(t('alert_password_error'));
        }
    };

   const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            // Вызываем санку
            await dispatch(uploadAvatarThunk({ 
                userId: currentUser.idUser, 
                file 
            })).unwrap();
            
            alert(t('avatar_success') || 'Фото обновлено');
        } catch (error) {
            alert(error || 'Ошибка при загрузке');
        }
    }
};

    // Определение источника картинки
    const getAvatarSrc = () => {
        if (currentUser?.avatar) {
            // Если в БД есть путь к фото, берем его с сервера
            return `http://localhost:5000${currentUser.avatar}`; 
        }
        // Иначе показываем дефолтные
        return currentUser.sex === 'male' ? "/data/images/boyProfile.png" : "/data/images/girlProfile.png";
    };

    const formatDate = (date) => date ? new Date(date).toLocaleDateString() : '—';

    return (
        <main className="account-page">
            <div className="account-grid expanded">
                {currentUser ? (
                    <>
                        <aside className="profile-aside-large">
                            {/* Обертка аватара теперь кликабельна */}
                            <div 
                                className="avatar-wrapper" 
                                onClick={() => fileInputRef.current.click()} 
                                style={{ cursor: 'pointer', position: 'relative' }}
                                title="Изменить фото"
                            >
                                <img 
                                    src={getAvatarSrc()} 
                                    alt="User Avatar" 
                                    className="main-avatar-large"
                                />
                                <div className="avatar-overlay">📷 Сменить</div> {/* CSS для ховера */}
                                {currentUser.isBlocked && <div className="blocked-badge">{t('status_blocked')}</div>}
                                
                                {/* Скрытый инпут */}
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    style={{ display: 'none' }} 
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                />
                            </div>
                            
                            <div className="aside-info">
                                <h1 className="user-fullname">{currentUser.name} {currentUser.surname}</h1>
                                <span className={`role-tag ${currentUser.role}`}>{currentUser.role}</span>
                                <p className="registration-date">{t('acc_since')}: {formatDate(currentUser.createdAt)}</p>
                            </div>

                            <button className="btn-change-pass-main" onClick={openChangePasswordModal}>
                                {t('btn_change_password')}
                            </button>
                        </aside>

                        {/* ПРАВАЯ ПАНЕЛЬ: Расширенные данные */}
                        <div className="profile-details-expanded">
                            <section className="details-card">
                                <div className="card-header">
                                    <h2>{t('title_personal_details')}</h2>
                                    <div className="header-line"></div>
                                </div>

                                <div className="details-grid-large">
                                    <div className="detail-box">
                                        <span className="detail-label">{t('acc_phone')}</span>
                                        <span className="detail-value">{currentUser.phone}</span>
                                    </div>
                                    <div className="detail-box">
                                        <span className="detail-label">{t('acc_birth')}</span>
                                        <span className="detail-value">{formatDate(currentUser.birthdate)}</span>
                                    </div>
                                    <div className="detail-box">
                                        <span className="detail-label">{t('acc_sex')}</span>
                                        <span className="detail-value">{t(`sex_${currentUser.sex}`)}</span>
                                    </div>
                                    <div className="detail-box">
                                        <span className="detail-label">{t('acc_id')}</span>
                                        <span className="detail-value">#{currentUser.idUser}</span>
                                    </div>
                                    
                                    {currentUser.diploma && (
                                        <div className="detail-box full-width">
                                            <span className="detail-label">{t('acc_diploma')}</span>
                                            <span className="detail-value diploma-text">{currentUser.diploma}</span>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </>
                ) : (
                    <div className="no-data-card">{t('no_user_data')}</div>
                )}
            </div>

            {/* Модалка (без изменений) */}
           {isChangePasswordOpen && (
                <div className="modal-backdrop">
                    <div className="modal-box animate-pop">
                        <div className="modal-header">
                            <h2>{t('title_change_password')}</h2>
                            <button className="close-x" onClick={closeChangePasswordModal}>&times;</button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="input-group">
                                <label>{t('label_current_password')}</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={currentPassword} 
                                    onChange={(e) => setCurrentPassword(e.target.value)} 
                                />
                            </div>
                            <div className="input-group">
                                <label>{t('label_new_password')}</label>
                                <input 
                                    type="password" 
                                    placeholder="Минимум 6 символов"
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn-cancel-link" onClick={closeChangePasswordModal}>
                                {t('cancel')}
                            </button>
                            <button className="btn-save-prime" onClick={handleChangePassword}>
                                {t('btn_save')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}