import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAdvice } from '../../slices/adviceSlice'; 
import '../AddAdviceModal/AddAdviceModal.css'

const AddAdviceModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleAddAdvice = async () => {
        if (text.length > 500) {
            setError('Advice text should be under 500 signs.');
            return;
        }
        if (!title || !text) {
            setError('You should write both.');
            return;
        }

        setError('');
        await dispatch(createAdvice({ title, text }));
        setTitle('');
        setText('');
        onClose(); // Закрываем модальное окно после добавления
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Advice</h2>
                {error && <p className="error">{error}</p>}
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder="Advice" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={handleAddAdvice}>ADD ADVICE</button>
                <button onClick={onClose}>CLOSE</button>
            </div>
        </div>
    );
};

export default AddAdviceModal;