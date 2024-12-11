import Footer from '../../Components/Footer/Footer';
import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import '../Ask/Ask.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendReview } from '../../slices/reviewSlice';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
 
export default function WritingReviewPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');
    const [error, setError] = useState('');
    const [rating, setRating] = useState(0); 
    const [successMessage, setSuccessMessage] = useState('');
    const idUser = localStorage.getItem('userId')

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Простая валидация
        if (!email || !review) {
            setError('Все поля обязательны для заполнения.');
            return;
        }
        
        try {
            await dispatch(sendReview({ idUser, text: review, rating })).unwrap();
            setSuccessMessage('Ваш отзыв успешно отправлен!');
            setEmail('');
            setRating(0);
            setReview('');
            setError('');
        } catch (err) {
            setError('Ошибка при отправке отзыва. Попробуйте еще раз.');
        }
    };

    return (
        <main>
            <HeaderLog />
            <div className="ask-container">
                <h2>Напишие свой отзыв здесь. Ваше мнение важно для нас.</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Ваша электронная почта:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="review">Ваш отзыв:</label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                            style={{ height: '150px' }} // Увеличиваем высоту
                        ></textarea>
                    </div>
                    <div className="form-group rating">
                        <label htmlFor="rating">Ваша оценка:</label>
                        <Box sx={{ '& > legend': { mt: 2 } }}>
                            <Rating
                                name="rating"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                        </Box>
                    </div>
                    {error && <p className="error">{error}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                    <button type="submit">Отправить отзыв</button>
                </form>
            </div>
            <Footer />
        </main>
    );
}