import './HeaderLog.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../slices/userSlice';

export default function HeaderLog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.users.currentUser);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());
            localStorage.removeItem('user'); 
            navigate('/'); 
            window.location.reload(); 
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            alert('Не удалось выйти из аккаунта. Попробуйте еще раз.'); 
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
                        <Link to = "/homePage" className="homelink">HOME</Link>
                        {currentUser.sex === 'male' ? (
                            <img src="/data/images/boyProfile.png" alt="Boy Profile" className="profileImage" />
                        ) : (
                            currentUser.sex === 'female'&& (
                                <img src="data/images/girlProfile.png" alt="Girl Profile" className="profileImage" />
                            )
                        )}
                        <span className="userName PixelFont">{currentUser.name}</span>
                        <button className="logoutButton PixelFont" onClick={handleLogout}>
                            LOG OUT
                        </button>
                    </>
                ) : null}
            </div>
        </header>
    );
}