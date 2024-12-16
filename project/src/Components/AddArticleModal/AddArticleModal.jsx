import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addArticle } from '../../slices/articleSlice';
import '../AddArticleModal/AddArticleModal.css'

export default function AddArticleModal({ onClose }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('file', file);
        for (const pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        
    
        console.log([...formData]); // Логируем содержимое FormData
    
        try {
            await dispatch(addArticle(formData));
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
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />
                <button type="submit">ADD ARTICLE</button>
                <button type="button" onClick={onClose}>CANCEL</button> 
            </form>
        </div>
    );
}