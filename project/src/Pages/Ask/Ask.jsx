import Footer from '../../Components/Footer/Footer';
import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import '../Ask/Ask.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendQuestion } from '../../slices/questionSlice';

export default function Ask() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const userId = localStorage.getItem('userId')

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Простая валидация
        if (!email || !question) {
            setError('Все поля обязательны для заполнения.');
            return;
        }
        
        try {
            await dispatch(sendQuestion({ userId, text: question, email })).unwrap();
            setSuccessMessage('Ваш вопрос успешно отправлен!');
            setEmail('');
            setQuestion('');
            setError('');
        } catch (err) {
            setError('Ошибка при отправке вопроса. Попробуйте еще раз.');
        }
    };

    return (
        <main>
            <HeaderLog />
            <div className="ask-container">
                <h2>Ask us a question</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Your email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="question">Your question:</label>
                        <textarea
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                            style={{ height: '150px' }} // Увеличиваем высоту
                        ></textarea>
                    </div>
                    {error && <p className="error">{error}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                    <button type="submit">Send</button>
                </form>
            </div>
            <Footer />
        </main>
    );
}