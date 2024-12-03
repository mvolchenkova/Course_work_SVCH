import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import trainingPlansReducer from '../slices/tplanSlice';
import recipeReducer from '../slices/recipeSlice'

const store = configureStore({
    reducer: {
        users: userReducer,
        trainingPlans: trainingPlansReducer,
        recipes: recipeReducer
    },
});

export default store;