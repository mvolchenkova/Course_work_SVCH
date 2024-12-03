import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrainingPlans = createAsyncThunk('api/tplans/search', async () => {
    const response = await axios.get('http://localhost:5000/api/tplans/search');
    return response.data;
});

const trainingPlansSlice = createSlice({
    name: 'tplans',
    initialState: {
        plans: [],
        currentPlan: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        setCurrentPlan: (state, action) => {
            state.currentPlan = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrainingPlans.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTrainingPlans.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.plans = action.payload; 
            })
            .addCase(fetchTrainingPlans.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
    },
});

export const { setCurrentPlan } = trainingPlansSlice.actions; 
export default trainingPlansSlice.reducer;