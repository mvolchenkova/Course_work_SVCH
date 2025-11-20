import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import trainingPlansReducer from '../slices/tplanSlice';
import recipeReducer from '../slices/recipeSlice'
import questionReducer from '../slices/questionSlice'
import adviceReducer from '../slices/adviceSlice'
import articleReducer from '../slices/articleSlice'
import chatReducer from '../slices/chatSlice';
import exerciseReducer from '../slices/exerciseSlice'
const store = configureStore({
    reducer: {
        users: userReducer,
        trainingPlans: trainingPlansReducer,
        recipes: recipeReducer,
        questions: questionReducer,
        advices: adviceReducer,
        articles: articleReducer,
        chat: chatReducer,
        exercises: exerciseReducer
    },
});

export default store;