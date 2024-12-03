import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk('api/recipes', async () => {
    const response = await axios.get('http://localhost:5000/api/recipes');
    return response.data;
});

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        currentRecipe: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        setCurrentRecipe: (state, action) => {
            state.currentRecipe = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.recipes = action.payload; 
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
    },
});

export const { setCurrentRecipe } = recipesSlice.actions; 
export default recipesSlice.reducer;