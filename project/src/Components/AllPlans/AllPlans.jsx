import '../AllPlans/AllPlans.css';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import Categories from '../Categories/Categories'

export default function AllPlans() {
    const [planData, setPlanData] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [getInput, setInput] = useState('');
    const [favorites, setFavorites] = useState({}); // Состояние для избранных

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('data/jsonFiles/plans.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlanData(data);
                setFilteredPlans(data);
            } catch (error) {
                console.error('Error fetching the episodes:', error);
            }
        };

        fetchData();
    }, []);

    const handleGetInput = (e) => {
        setInput(e.target.value);
        if (e.target.value === '') {
            setFilteredPlans(planData);
        } else {
            const searchPlans = planData.filter(item =>
                item.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredPlans(searchPlans);
        }
    };

    const sortItemsById = () => {
        const sorted = [...planData].sort((a, b) => a.id - b.id);
        setFilteredPlans(sorted);
    };

    const toggleFavorite = (planId) => {
        setFavorites(prev => ({
            ...prev,
            [planId]: !prev[planId], // Переключаем состояние для данного плана
        }));
    };

    return (
        <main className="allPlansMain">
            <p className="PixelFont allPlansTitle">
                Lose weight, gain weight or always stay in shape - choose what's right for you!
            </p>
            
            <div className="plans">
                <div className="searchFilter">
                    <input
                        className="inputSearch"
                        type="text"
                        placeholder='Search'
                        onChange={handleGetInput}
                    />
                    <button className='Search-button' onClick={sortItemsById}>Filter</button>
                </div>
                <Categories/>
                <div className="planDiv">
                    {filteredPlans.map(plan => (
                        <div className="planData PixelFont" key={plan.id}>
                            <img src={plan.img} alt="" className="planImg" />
                            <div className="planText">
                                <p>{plan.title}</p>
                                <p>{plan.author}</p>
                                <p>{plan.amount} trainings</p>
                            </div>
                            <IconButton 
                                aria-label="add to favorites" 
                                onClick={() => toggleFavorite(plan.id)}
                            >
                                {favorites[plan.id] ? (
                                    <FavoriteIcon style={{ color: 'red' }} />
                                ) : (
                                    <FavoriteBorder />
                                )}
                            </IconButton>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}