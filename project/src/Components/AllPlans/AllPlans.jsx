import '../AllPlans/AllPlans.css';
import AddPlanModal from '../AddPlanModal/AddPlanModal';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainingPlans, setCurrentPlan } from '../../slices/tplanSlice'; 
import {addFavoritePlan} from '../../slices/userSlice'
import { updateUser } from '../../slices/userSlice';

export default function AllPlans() {
    const dispatch = useDispatch();
    const plans = useSelector(state => state.trainingPlans.plans);
    const status = useSelector(state => state.trainingPlans.status);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [getInput, setInput] = useState('');
    const [favorites, setFavorites] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const role = localStorage.getItem('role')
    const isLoading = status === 'loading';
    const userId = localStorage.getItem('userId')
    const user = (localStorage.getItem('currentUser'))
    const favPlans = localStorage.getItem('favPlans')
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

    const toggleFavorite = async (idTplan) => {
        if (!userId) {
            alert('Please login to add favourites.');
            return;
        }
    
        try {
            const updatedUser = await dispatch(addFavoritePlan({ userId, idTplan })).unwrap(); 
            localStorage.setItem('user', JSON.stringify(updatedUser))
            localStorage.setItem('favPlans', JSON.stringify(updatedUser.favPlans))
            window.location.reload();
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
        <main className="allPlansMain">
            <p className=" allPlansTitle">
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
                    ) : filteredPlans ? (
                        filteredPlans.map(plan => (
                            <div key={plan.idTplan} className="planData">
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
            </div>
            { ( role == 'admin' || role == 'trainer' ) &&(
                <div>
                    <button onClick={handleAddPlan}>ADD PLAN</button>
                </div>
            )}
            
            <AddPlanModal isOpen={isModalOpen} onClose={closeModal} /> 
        </main>
    );
}