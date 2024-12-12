import React from 'react';
import '../Star/Star.css'; 

const Star = ({ filled }) => {
    return (
        <span className={filled ? 'star filled' : 'star'}>★</span>
    );
};

export default Star;