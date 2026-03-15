import React, { useState, useEffect } from 'react';
import './AboutSite.css'; 
import { fetchReviews, createReview, answerReview } from '../../slices/reviewSlice'; 
import { useDispatch, useSelector } from 'react-redux';

const AboutSite = ({ currentUser }) => {
    const dispatch = useDispatch();
    const { items: reviews, isLoading, error } = useSelector(state => state.reviews);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [newReview, setNewReview] = useState({ text: '', rating: 5 });
    const [adminAnswers, setAdminAnswers] = useState({});

    // Настройки отображения
    const reviewsPerView = 3; // Сколько отзывов видим сразу

    useEffect(() => {
        dispatch(fetchReviews());
         console.log(reviews) 
    }, [dispatch]);

    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    const activeUser = currentUser || userFromStorage;
    const isAdmin = activeUser?.role === 'ADMIN' || activeUser?.role === 'admin';
    const username = activeUser?.name ?? 'Гость'; 
    
    // const maxIndex = reviews.length > reviewsPerView ? reviews.length - reviewsPerView : 0;
const maxIndex = Math.max(0, reviews.length - reviewsPerView);
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    // Ограничение количества точек (например, максимум 5 штук)
    const renderDots = () => {
        const totalDots = maxIndex + 1;;
        if (totalDots <= 1) return null;

        // Если отзывов слишком много, ограничиваем количество видимых точек до 7
        const maxVisibleDots = 7;
        let start = Math.max(0, currentIndex - Math.floor(maxVisibleDots / 2));
        let end = Math.min(totalDots, start + maxVisibleDots);
        
        if (end - start < maxVisibleDots) {
            start = Math.max(0, end - maxVisibleDots);
        }

        return reviews.slice(start, end).map((_, i) => {
            const actualIndex = start + i;
            return (
                <div 
                    key={actualIndex} 
                    className={`dot ${actualIndex === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(actualIndex)}
                />
            );
        });
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (!activeUser) return alert("Пожалуйста, авторизуйтесь!");
        const idUser = activeUser.idUser || activeUser.id || activeUser.userId;

        try {
            await dispatch(createReview({
                idUser: idUser, 
                text: newReview.text,
                rating: newReview.rating
            })).unwrap();
            setNewReview({ text: '', rating: 5 });
            setCurrentIndex(0);
            alert("Отзыв успешно добавлен!");
        } catch (err) {
            alert("Ошибка при сохранении: " + err);
        }
    };

    const submitAdminAnswer = async (reviewId) => {
        const answerText = adminAnswers[reviewId];
        if (!answerText || answerText.trim() === '') return alert("Введите текст ответа");

        try {
            await dispatch(answerReview({ idReview: reviewId, answer: answerText })).unwrap();
            alert("Ответ отправлен!");
            setAdminAnswers(prev => ({ ...prev, [reviewId]: '' }));
        } catch (err) {
            alert("Ошибка при отправке ответа: " + err);
        }
    };

    if (isLoading) return <div className="loading-box">Загрузка отзывов...</div>;
    if (error) return <div className="error-box">{error}</div>;

    return (
        <div className="reviews-section">
            <h2 className="points-value" style={{ marginBottom: '30px' }}>ОТЗЫВЫ</h2>

            <div className="slider-container">
                <button className="nav-btn prev" onClick={prevSlide}>‹</button>
                
                <div className="reviews-viewport">
                   <div 
                        className="reviews-track" 
                        style={{ 
                            transform: `translateX(-${currentIndex * (100 / reviews.length)}%)`,
                            width: `${(reviews.length / reviewsPerView) * 100}%` 
                        }}
                    >
                        {reviews.length > 0 ? reviews.map((rev) => (
                            <div 
                                key={rev.idReview} 
                                className="review-slide" 
                                style={{ flex: `0 0 ${100 / reviews.length}%` }}
                            >
                                <div className="review-card-styled">
                                    <div className="review-rating">
                                        {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                                    </div>
                                    <div className="review-author">
                                        <div className="author-avatar">👤</div>
                                        <div className="author-info">
                                            <span className="author-name">
                                                {rev.User?.name || `Пользователь #${rev.idUser}`}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p className="review-text-content">"{rev.text}"</p>

                                    {rev.answer && (
                                        <div className="admin-answer-box">
                                            <span className="admin-label">ОТВЕТ АДМИНИСТРАЦИИ:</span>
                                            <p className="admin-answer-text">{rev.answer}</p>
                                        </div>
                                    )}

                                    {isAdmin && !rev.answer && (
                                        <div className="admin-reply-form">
                                            <input 
                                                type="text"
                                                className="admin-input"
                                                placeholder="Ответить..."
                                                value={adminAnswers[rev.idReview] || ''}
                                                onChange={(e) => setAdminAnswers({
                                                    ...adminAnswers,
                                                    [rev.idReview]: e.target.value
                                                })}
                                            />
                                            <button 
                                                className="admin-send-btn"
                                                onClick={() => submitAdminAnswer(rev.idReview)}
                                            >
                                                ОТВЕТИТЬ
                                            </button>
                                        </div>
                                    )}

                                    
                                </div>
                            </div>
                        )) : <p>Отзывов пока нет</p>}
                    </div>
                </div>

                <button className="nav-btn next" onClick={nextSlide}>›</button>
            </div>

            <div className="slider-dots">
                {renderDots()}
            </div>

            <form className="add-review-styled" onSubmit={submitReview}>
                <h3 style={{ textTransform: 'uppercase', marginBottom: '20px' }}>
                    {activeUser ? `Оставить отзыв как ${activeUser?.name || 'пользователь'}` : "Оставить отзыв"}
                </h3>
                <div className='rev'>
                    <textarea 
                        className="review-input-styled"
                        style={{ minHeight: '100px', resize: 'none' }}
                        placeholder="ТВОИ ВПЕЧАТЛЕНИЯ"  
                        value={newReview.text}
                        maxLength={100}
                        required
                        onChange={e => setNewReview({ ...newReview, text: e.target.value })}
                    />
                    <p className='rev__limit'>
                        {newReview.text.length} / 100
                    </p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap:'10px' }}>
                    <div className="review-rating">
                        {[1, 2, 3, 4, 5].map(s => (
                            <span 
                                key={s} 
                                className={`star-picker ${s <= newReview.rating ? 'gold' : ''}`}
                                onClick={() => setNewReview({ ...newReview, rating: s })}
                            >★</span>
                        ))}
                    </div>
                    <button type="submit" className="submit-review-btn">ОТПРАВИТЬ</button>
                </div>
            </form>
        </div>
    );
};

export default AboutSite;