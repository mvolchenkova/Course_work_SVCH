
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findFavPlans, setCurrentPlan } from '../slices/tplanSlice';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import {addFavoritePlan} from '../slices/userSlice'


export default function FavPlans() {
    const dispatch = useDispatch();
    const plans = useSelector(state=>state.trainingPlans.favPlans)
    console.log(plans)
    const isLoading = useSelector(state=>state.tplans)
    const userId = localStorage.getItem('userId')
    const [isModalOpen, setModalOpen] = useState(false);
    const favPlans = localStorage.getItem('favPlans')


    useEffect(() => {
        dispatch(findFavPlans()); 
    }, [dispatch]); 

    const toggleFavorite = async (idTplan) => {
        console.log('Current userId:', userId); 
        if (!userId) {
            alert('Please login to add favourites.');
            return;
        }
    
        try {
            const updatedUser = await dispatch(addFavoritePlan({ userId, idTplan })).unwrap(); 
            localStorage.setItem('user', JSON.stringify(updatedUser))
            localStorage.setItem('favPlans', JSON.stringify(updatedUser.favPlans))
            window.location.reload();
            console.log(updatedUser)
        } catch (error) {
            // Handle the error
            console.error("Error adding favorite plan:", error);
        }
    };

    const handlePlanClick = (plan) => {
        dispatch(setCurrentPlan(plan)); // Устанавливаем текущий план
    };

    const handleAddPlan = () => {
        setModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false); // Close the modal
    };

    return (
        <>
            <div className="planDiv">
                    
                    {isLoading ? (
                        <p>Loading plans...</p>
                    ) : plans ? (
                        plans.map(plan => (
                            <div key={plan.idTplan} className="planData artika">
                                <Link to='/plan' key={plan.idTplan} onClick={() => handlePlanClick(plan)} style={{ textDecoration: 'none' }}>
                                    <img src={`http://localhost:5000/${plan.img}`} alt={plan.title} className="planImg" />
                                    <div className="planText">
                                        <b>{plan.title}</b>
                                        <p>{plan.author}</p>
                                        <p>{plan.amount} trainings</p>
                                    </div>
                                </Link>
                                <IconButton 
                                    aria-label="add to favorites" 
                                    onClick={() => toggleFavorite(plan.idTplan)}
                                >
                                    {favPlans.includes(plan.idTplan) ? (
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
        </>
    );
}