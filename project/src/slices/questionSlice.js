import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    questions: [],
    error: null,
};

export const sendQuestion = createAsyncThunk(
    'api/questions',
    async ({ userId, text, email }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/questions`, { userId, text, email });
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response.data); 
        }
    }
);

export const fetchQuestions = createAsyncThunk('api/questions', async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions?page=${page}&limit=${limit}`);
    return response.data; 
});

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(sendQuestion.fulfilled, (state, action) => {
            //     state.questions.push(action.payload); 
            // })
            .addCase(sendQuestion.rejected, (state, action) => {
                state.error = action.payload; 
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload.questions; 
            })
    },
});

export default questionSlice.reducer;