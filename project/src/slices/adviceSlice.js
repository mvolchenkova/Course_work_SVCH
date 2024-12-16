import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    advices: [],
    error: null,
    loading: false,
};

export const createAdvice = createAsyncThunk(
    'api/advices/create',
    async ({ title, text }) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/advices`, { title, text });
        return response.data;
    }
);

export const fetchAdvices = createAsyncThunk('api/advices', async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/advices`);
    return response.data; 
});

const adviceSlice = createSlice({
    name: 'advices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdvices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdvices.fulfilled, (state, action) => {
                state.loading = false;
                state.advices = action.payload; 
            })
            .addCase(fetchAdvices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            })
            .addCase(createAdvice.rejected, (state, action) => {
                state.error = action.error.message; 
            });
    },
});

// Export reducer
export default adviceSlice.reducer;