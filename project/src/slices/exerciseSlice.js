    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';

    export const createExercise = createAsyncThunk('api/exercises', async (payload) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/exercises`, payload);
        return response.data;
    });

    export const fetchExercises = createAsyncThunk('api/exercises/fetchEx', async ({ page = 1, limit = 10 }) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/exercises?page=${page}&limit=${limit}`);
        return response.data; 
    });

    const exerciseSlice = createSlice({
        name: 'exercises',
        initialState: {
            exercises: [],
            // currentExercise: null,
            status: 'idle', 
            error: null,
        },
        reducers: {
            // setCurrentPlan: (state, action) => {
            //     state.currentPlan = action.payload;
            // },
            // removePlan: (state, action) => {
            //     state.plans = state.plans.filter(plan => plan.idTplan !== action.payload);
            //     if (state.currentPlan && state.currentPlan.idTplan === action.payload) {
            //         state.currentPlan = null; 
            //     }
            // }
        },
        extraReducers: (builder) => {
            builder
                .addCase(createExercise.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(createExercise.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.exercises = action.payload; 
                })
                .addCase(createExercise.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                })
                .addCase(fetchExercises.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetchExercises.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.exercises = action.payload.exercises; 
                })
                .addCase(fetchExercises.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                })
                
        },
    });

    // export const { setCurrentPlan, removePlan  } = exerciseSlice.actions; 
    export default exerciseSlice.reducer;