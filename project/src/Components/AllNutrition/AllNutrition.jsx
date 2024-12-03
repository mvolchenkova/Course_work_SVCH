import '../AllNutrition/AllNutrition.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, setCurrentRecipe } from '../../slices/recipeSlice'; 

export default function AllNutrition() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes.recipes);
    const status = useSelector(state => state.recipes.status);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [getInput, setInput] = useState('');
    const [favorites, setFavorites] = useState({});

    const isLoading = status === 'loading';

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRecipes());
        }
    }, [status, dispatch]);

    useEffect(() => {
        setFilteredRecipes(recipes);
    }, [recipes]);

    const handleGetInput = (e) => {
        setInput(e.target.value);
    };

    const handleSearch = () => {
        if (getInput.trim() === '') {
            setFilteredRecipes(recipes);
        } else {
            const searchRecipes = recipes.filter(item =>
                item.title.toLowerCase().includes(getInput.toLowerCase())
            );
            setFilteredRecipes(searchRecipes);
        }
    };

    const toggleFavorite = (idRecipe) => {
        setFavorites(prev => ({
            ...prev,
            [idRecipe]: !prev[idRecipe],
        }));
    };

    const handlePlanClick = (recipe) => {
        dispatch(setCurrentRecipe(recipe)); 
    };

    return (
        <main className="allplansMain">
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
                        <p>Loading recipes...</p>
                    ) : filteredRecipes.length > 0 ? (
                        filteredRecipes.map(recipe => (
                            <div key={recipe.id} className="planData PixelFont">
                                <Link to='/recipe' onClick={() => handlePlanClick(recipe)} style={{ textDecoration: 'none' }}>
                                    <img src={`http://localhost:5000/${recipe.img}`} alt={recipe.title} className="planImg" />
                                    <div className="planText">
                                        <b>{recipe.title}</b>
                                        <p>{recipe.time} minutes</p>
                                    </div>
                                </Link>
                                <IconButton 
                                    aria-label="add to favorites" 
                                    onClick={() => toggleFavorite(recipe.id)}
                                >
                                    {favorites[recipe.id] ? (
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
            </div>
        </main>
    );
}