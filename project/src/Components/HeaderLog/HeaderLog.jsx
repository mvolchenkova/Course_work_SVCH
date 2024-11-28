import './HeaderLog.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../slices/userSlice.js'; // Укажите правильный путь к вашему слайсу
import Button from '../Button/Button.jsx';

export default function HeaderLog() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser); // Получаем текущего пользователя из состояния

    const handleLogout = async () => {
        await dispatch(logoutUser()); // Вызываем действие логаута
    };

    return (
        <header>
            <Link to="/">
                <img src="data/images/logo.png" alt="Logo" />
            </Link>
            <div className="options">
                {currentUser ? (
                    <>
                        <span className="userPhone PixelFont">{currentUser.phone}</span>
                        <button className="logoutButton PixelFont" onClick={handleLogout}>
                            LOG OUT
                        </button>
                    </>
                ) : null
                }
            </div>
        </header>
    );
}