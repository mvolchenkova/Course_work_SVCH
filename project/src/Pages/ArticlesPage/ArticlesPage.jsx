import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../slices/articleSlice';
import Footer from "../../Components/Footer/Footer";
import HeaderLog from "../../Components/HeaderLog/HeaderLog";
import AddArticleModal from '../../Components/AddArticleModal/AddArticleModal'; 
import '../ArticlesPage/ArticlesPage.css'

export default function ArticlesPage() {
    const dispatch = useDispatch();
    const articles = useSelector((state) => state.articles.articles);
    const status = useSelector((state) => state.articles.status);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const role = localStorage.getItem('role')

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
            <main className="articlesMain">
                <h1>ARTICLES</h1>
                {( role == 'trainer' || role == 'admin' ) && (
                        <button onClick={toggleModal}>ADD ARTICLE</button> 
                    )}
                <div className='articlesDiv'>
                    {articles.map(article => (
                        <div key={article.idArticle} className='articleDiv'>
                            <b>{article.author}</b>
                            <p>{article.title}</p>
                            <a href={article.content} id="articleLink">Go to article</a>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
            {isModalOpen && <AddArticleModal onClose={toggleModal} />} 
        </>
    );
}