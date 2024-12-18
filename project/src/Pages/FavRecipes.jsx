import HeaderLog from '../Components/HeaderLog/HeaderLog';
import Footer from '../Components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findFavRecipes, setCurrentRecipe } from '../slices/recipeSlice';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import {addFavoriteRecipe} from '../slices/userSlice'


export default function FavRecipes() {
    const dispatch = useDispatch();
    const recipes = useSelector(state=>state.recipes.favRecipes)
    console.log(recipes)
    const isLoading = useSelector(state=>state.recipes)
    const userId = localStorage.getItem('userId')
    const [isModalOpen, setModalOpen] = useState(false);
    const favRecipes = localStorage.getItem('favRecipes')


    useEffect(() => {
        dispatch(findFavRecipes()); 
    }, [dispatch]); 

    const toggleFavorite = async (idRecipe) => {
        console.log('Current userId:', userId); 
        if (!userId) {
            alert('Please login to add favourites.');
            return;
        }
    
        try {
            const updatedUser = await dispatch(addFavoriteRecipe({ userId, idRecipe })).unwrap(); 
            localStorage.setItem('user', JSON.stringify(updatedUser))
            localStorage.setItem('favRecipes', JSON.stringify(updatedUser.favRecipes))
            window.location.reload();
            console.log(updatedUser)
        } catch (error) {
            // Handle the error
            console.error("Error adding favorite recipe:", error);
        }
    };

    const handleRecipeClick = (recipe) => {
        dispatch(setCurrentRecipe(recipe)); // Устанавливаем текущий план
    };

    const handleAddRecipe = () => {
        setModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false); // Close the modal
    };

    return (
        <>
            <HeaderLog />
            <div className="planDiv">
                    {isLoading ? (
                        <p>Loading recipes...</p>
                    ) : recipes ? (
                        recipes.map(recipe => (
                            <div key={recipe.idRecipe} className="planData PixelFont">
                                <Link to='/recipe' key={recipe.idRecipe} onClick={() => handleRecipeClick(recipe)} style={{ textDecoration: 'none' }}>
                                    <img src={`http://localhost:5000/${recipe.img}`} alt={recipe.title} className="planImg" />
                                    <div className="planText">
                                        <b>{recipe.title}</b>
                                        <p>{recipe.time} minutes</p>
                                    </div>
                                </Link>
                                <IconButton 
                                    aria-label="add to favorites" 
                                    onClick={() => toggleFavorite(recipe.idRecipe)}
                                >
                                    {favRecipes.includes(recipe.idRecipe) ? (
                                        <FavoriteIcon style={{ color: 'red' }} />
                                    ) : (
                                        <FavoriteBorder />
                                    )}
                                </IconButton>
                            </div>
                        ))
                    ) : (
                        <p>No recipes found.</p>
                    )}
                </div>
            <Footer />
        </>
    );
}