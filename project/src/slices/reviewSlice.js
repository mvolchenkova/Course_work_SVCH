import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    reviews: [],
    error: null,
};

export const sendReview = createAsyncThunk('/api/reviews', async ({ idUser, text, rating, username }) => {
    console.log(username)
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/reviews`, { idUser, text, rating, username });
    return response.data; 
        
    }
);

export const fetchReviews = createAsyncThunk('api/reviews',
    async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews`); 
        return response.data;
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload); 
            })
            .addCase(sendReview.rejected, (state, action) => {
                state.error = action.payload; 
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews = action.payload; 
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.error = action.error.message; 
            });
    },
});

export default reviewSlice.reducer;