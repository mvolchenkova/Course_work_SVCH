import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addArticle } from '../../slices/articleSlice';
import '../AddArticleModal/AddArticleModal.css'

export default function AddArticleModal({ onClose }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addArticle({title, author, content}));
        } catch (error) {
            console.error('Ошибка при добавлении статьи:', error);
        }
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit} id="uploadForm" encType="multipart/form-data">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder='Link'
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">ADD ARTICLE</button>
                <button type="button" onClick={onClose}>CANCEL</button> 
            </form>
        </div>
    );
}