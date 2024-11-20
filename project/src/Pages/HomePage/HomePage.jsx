import React, { useRef, useState } from 'react';
import HeaderLog from '../../Components/HeaderLog/HeaderLog.jsx';
import Toolbar from '../../Components/Toolbar/Toolbar.jsx';
import Progress from '../../Components/Progress/Progress.jsx';
import '../HomePage/HomePage.css';
import Footer from '../../Components/Footer/Footer.jsx';

export default function HomePage() {
    const scrollableRef = useRef(null);
    const [sticky, setSticky] = useState(false);

    const handleScroll = () => {
        if (scrollableRef.current) {
            const scrollTop = scrollableRef.current.scrollTop;
            const headerHeight = 100; // Высота HeaderLog
            const toolbarHeight = 60; // Высота Toolbar

            // Проверяем, достиг ли нижний край прокручиваемого содержимого заголовка
            if (scrollTop > headerHeight + toolbarHeight) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        }
    };

    return (
        <div className="homeDiv">
            <div className="header">
                <HeaderLog />
            </div>
            <div className="container">
                <Toolbar />
                <div className="progressDiv">
                    <Progress />
                </div>
            </div>
            <Footer/>
        </div>
    );
}