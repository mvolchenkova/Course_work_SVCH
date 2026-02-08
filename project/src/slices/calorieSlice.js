import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный экшен для добавления еды
export const addMealEntry = createAsyncThunk(
    'calorie/addMeal',
    async (mealData) => {
        const response = await axios.post('http://localhost:5000/api/calorie/log', mealData);
        return response.data;
    }
);

const calorieSlice = createSlice({
    name: 'calorie',
    initialState: {
        todayLogs: [], // Здесь храним список MealLog от сервера
        status: 'idle'
    },
    reducers: {
        setLogs: (state, action) => {
            state.todayLogs = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addMealEntry.fulfilled, (state, action) => {
            state.todayLogs.push(action.payload);
        });
    }
});

export const { setLogs } = calorieSlice.actions;
export default calorieSlice.reducer;