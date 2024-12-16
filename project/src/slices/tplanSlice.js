import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrainingPlans = createAsyncThunk('api/tplans/search', async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tplans/search`);
    return response.data;
});
export const adminAddPlan = createAsyncThunk('api/tplans', async (planData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/tplans`, planData);
    return response.data; 
});

export const deleteTrainingPlan = createAsyncThunk('api/tplans/delete', async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/tplans/${id}`);
    return id; 
});

export const updateTrainingPlan = createAsyncThunk('api/tplans/update', async ({ id, ...planData }) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/tplans/${id}`, planData);
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
        },
        removePlan: (state, action) => {
            state.plans = state.plans.filter(plan => plan.idTplan !== action.payload);
            if (state.currentPlan && state.currentPlan.idTplan === action.payload) {
                state.currentPlan = null; // Clear current plan if deleted
            }
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
            .addCase(adminAddPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.plans.push(action.payload); 
            })
            .addCase(adminAddPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTrainingPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.plans = state.plans.filter(plan => plan.idTplan !== action.payload);
                if (state.currentPlan && state.currentPlan.idTplan === action.payload) {
                    state.currentPlan = null; 
                }
            })
            .addCase(deleteTrainingPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateTrainingPlan.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.plans.findIndex(plan => plan.idTplan === action.payload.idTplan);
                if (index !== -1) {
                    state.plans[index] = action.payload; // Update the plan in the state
                }
                if (state.currentPlan && state.currentPlan.idTplan === action.payload.idTplan) {
                    state.currentPlan = action.payload; // Update currentPlan if it's the same
                }
            })
            .addCase(updateTrainingPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { setCurrentPlan, removePlan  } = trainingPlansSlice.actions; 
export default trainingPlansSlice.reducer;