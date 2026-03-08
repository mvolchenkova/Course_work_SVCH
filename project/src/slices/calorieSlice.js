import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addMealEntry = createAsyncThunk(
    'calorie/addMeal',
    async (mealData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/calorie/log',
                mealData
            );
            return response.data;
        } catch (e) {
            console.log('POST ERROR:', e.response?.data);
            return rejectWithValue(e.response?.data);
        }
    }
);

export const fetchLogsByDate = createAsyncThunk(
    'calorie/fetchLogs',
    async ({ userId, date }) => {
        const response = await axios.get(
            `http://localhost:5000/api/calorie/log?idUser=${userId}&date=${date}`
        );
        return response.data;
    }
);

export const deleteMealEntry = createAsyncThunk(
    'calorie/deleteEntry',
    async (id) => {
        await axios.delete(`http://localhost:5000/api/calorie/log/${id}`);
        return id;
    }
);
export const fetchTodayLogs = createAsyncThunk(
    'calorie/fetchLogs',
    async ({ userId, date }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/calorie/log?idUser=${userId}&date=${date}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data);
        }
    }
);

const calorieSlice = createSlice({
    name: 'calorie',
    initialState: {
        todayLogs: [],
        status: 'idle'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addMealEntry.fulfilled, (state, action) => {
                state.todayLogs.push(action.payload);
            })
            .addCase(fetchTodayLogs.fulfilled, (state, action) => {
                state.todayLogs = action.payload;
            })
            .addCase(deleteMealEntry.fulfilled, (state, action) => {
                state.todayLogs = state.todayLogs.filter(log => (log.id || log.id) !== action.payload);
            })
        }
});

export default calorieSlice.reducer;
