import '../AllPlans/AllPlans.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainingPlans, setCurrentPlan } from '../../slices/tplanSlice'; 

export default function AllPlans() {
    const dispatch = useDispatch();
    const plans = useSelector(state => state.trainingPlans.plans);
    const status = useSelector(state => state.trainingPlans.status);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [getInput, setInput] = useState('');
    const [favorites, setFavorites] = useState({});

    const isLoading = status === 'loading';

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTrainingPlans());
        }
    }, [status, dispatch]);

    useEffect(() => {
        setFilteredPlans(plans);
    }, [plans]);

    const handleGetInput = (e) => {
        setInput(e.target.value);
    };

    const handleSearch = () => {
        if (getInput.trim() === '') {
            setFilteredPlans(plans);
        } else {
            const searchPlans = plans.filter(item =>
                item.title.toLowerCase().includes(getInput.toLowerCase()) ||
                item.author.toLowerCase().includes(getInput.toLowerCase())
            );
            setFilteredPlans(searchPlans);
        }
    };

    const toggleFavorite = (planId) => {
        setFavorites(prev => ({
            ...prev,
            [planId]: !prev[planId],
        }));
    };

    const handlePlanClick = (plan) => {
        dispatch(setCurrentPlan(plan)); // Устанавливаем текущий план
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
                        value={getInput}
                        onChange={handleGetInput}
                    />
                    <button onClick={handleSearch} className="searchButton">Search</button>
                </div>
                <div className="planDiv">
                    {isLoading ? (
                        <p>Loading plans...</p>
                    ) : filteredPlans.length > 0 ? (
                        filteredPlans.map(plan => (
                            <div key={plan.id} className="planData PixelFont">
                                <Link to='/plan' onClick={() => handlePlanClick(plan)} style={{ textDecoration: 'none' }}>
                                    <img src={`http://localhost:5000/${plan.img}`} alt={plan.title} className="planImg" />
                                    <div className="planText">
                                        <b>{plan.title}</b>
                                        <p>{plan.author}</p>
                                        <p>{plan.amount} trainings</p>
                                    </div>
                                </Link>
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
                        ))
                    ) : (
                        <p>No plans found.</p>
                    )}
                </div>
            </div>
        </main>
    );
}