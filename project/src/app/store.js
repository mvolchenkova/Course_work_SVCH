import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import trainingPlansReducer from '../slices/tplanSlice';
import recipeReducer from '../slices/recipeSlice';
import questionReducer from '../slices/questionSlice';
import adviceReducer from '../slices/adviceSlice';
import articleReducer from '../slices/articleSlice';
import chatReducer from '../slices/chatSlice';
import exerciseReducer from '../slices/exerciseSlice';
import calorieReducer from '../slices/calorieSlice'; 
import productReducer from '../slices/productSlice'
import reviewReducer from '../slices/reviewSlice'
import weightReducer from '../slices/weightSlice'

const store = configureStore({
    reducer: {
        users: userReducer,
        trainingPlans: trainingPlansReducer,
        recipes: recipeReducer,
        questions: questionReducer,
        advices: adviceReducer,
        articles: articleReducer,
        chat: chatReducer,
        exercises: exerciseReducer,
        calorie: calorieReducer, 
        products: productReducer,
        reviews: reviewReducer,
        weights: weightReducer
    },
});

export default store;