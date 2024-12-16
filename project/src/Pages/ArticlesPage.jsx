import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../slices/articleSlice';
import Footer from "../Components/Footer/Footer";
import HeaderLog from "../Components/HeaderLog/HeaderLog";
import AddArticleModal from '../Components/AddArticleModal/AddArticleModal'; 

export default function ArticlesPage() {
    const dispatch = useDispatch();
    const articles = useSelector((state) => state.articles.articles);
    const status = useSelector((state) => state.articles.status);
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления модальным окном

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchArticles());
        }
    }, [status, dispatch]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); // Переключение состояния модального окна
    };

    return (
        <>
            <HeaderLog />
            <main>
                <div>
                    <h1>ARTICLES</h1>
                    <button onClick={toggleModal}>Добавить статью</button> {/* Кнопка для добавления статьи */}
                    {articles.map(article => (
                        <div key={article.id}>
                            <p>{article.title} - {article.author}</p>
                            <a href={`/${article.content}`} download>Скачать файл</a>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
            {isModalOpen && <AddArticleModal onClose={toggleModal} />} {/* Условный рендеринг модального окна */}
        </>
    );
}