import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    advices: [],
    error: null,
};

export const createAdvice = createAsyncThunk(
    'api/advices',
    async ({ title, text }) => {
        const response = await axios.post('http://localhost:5000/api/advices', { title, text });
        return response.data;
    }
);

export const fetchAdvices = createAsyncThunk('api/advices', async () => {
    const response = await axios.get(`http://localhost:5000/api/advices`);
    return response.data; 
});


const adviceSlice = createSlice({
    name: 'advices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(createAdvice.fulfilled, (state, action) => {
            //     state.advices.push(action.payload); 
            // })
            .addCase(createAdvice.rejected, (state, action) => {
                state.error = action.error.message; 
            })
            .addCase(fetchAdvices.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload.questions; 
            })
    },
});

// Экспорт редьюсера
export default adviceSlice.reducer;