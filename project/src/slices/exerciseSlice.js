    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';

    export const createExercise = createAsyncThunk('api/exercises', async (payload) => {
        const response = await axios.post(`http://localhost:5000/api/exercises`, payload);
        return response.data;
    });

    export const fetchExercises = createAsyncThunk('api/exercises/fetchEx', async ({ page = 1, limit = 10 }) => {
        const response = await axios.get(`http://localhost:5000/api/exercises?page=${page}&limit=${limit}`);
        return response.data; 
    });

  export const getRandom = createAsyncThunk(
  'api/exercises/getRandomExercises',
  async ({ amount, exp }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/exercises/getRandomExercises',
        { params: { amount, exp } }
      );
      return response.data; // { initialPopulation, generations, finalPopulation }
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: "Network error" });
    }
  }
);
    const exerciseSlice = createSlice({
        name: 'exercises',
        initialState: {
            exercises: [],
            // currentExercise: null,
            randomExercises: [],
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
                .addCase(getRandom.pending, (state) => {
                    state.status = 'loading';
                })
                 .addCase(getRandom.fulfilled, (state, action) => {
                    state.loading = false;

                    // гарантированно есть ga
                    state.ga = {
                    initialPopulation: action.payload.initialPopulation,
                    generations: action.payload.generations,
                    finalPopulation: action.payload.finalPopulation,
                    bestWeek: action.payload.bestWeek,
                    bestFitness: action.payload.bestFitness
                    };
                })
                .addCase(getRandom.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                })
        },
    });

    // export const { setCurrentPlan, removePlan  } = exerciseSlice.actions; 
    export default exerciseSlice.reducer;