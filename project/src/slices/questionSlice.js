import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    questions: [],
    error: null,
};

export const sendQuestion = createAsyncThunk(
    'api/questions',
    async ({ userId, text }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/questions', { userId, text });
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response.data); 
        }
    }
);

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendQuestion.fulfilled, (state, action) => {
                state.questions.push(action.payload); 
            })
            .addCase(sendQuestion.rejected, (state, action) => {
                state.error = action.payload; 
            });
    },
});

export default questionSlice.reducer;