import React, { useRef, useState } from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar.jsx';
import Progress from '../../Components/Progress/Progress.jsx';
import '../HomePage/HomePage.css';

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
            <div className="container">
                <Toolbar />
                <div className="progressDiv">
                    <Progress />
                </div>
            </div>
        </div>
    );
}