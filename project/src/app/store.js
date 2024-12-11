import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import trainingPlansReducer from '../slices/tplanSlice';
import recipeReducer from '../slices/recipeSlice'
import reviewReducer from '../slices/reviewSlice'
import questionReducer from '../slices/questionSlice'
import adviceReducer from '../slices/adviceSlice'

const store = configureStore({
    reducer: {
        users: userReducer,
        trainingPlans: trainingPlansReducer,
        recipes: recipeReducer,
        reviews: reviewReducer,
        questions: questionReducer,
        advices: adviceReducer
    },
});

export default store;