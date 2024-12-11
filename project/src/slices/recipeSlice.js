import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk('api/recipes/fetch', async () => {
    const response = await axios.get('http://localhost:5000/api/recipes');
    return response.data;
});

// export const adminAddRecipe = createAsyncThunk('api/recipes', async ({recipeData}) => {
//     console.log(recipeData)
//     const response = await axios.post('http://localhost:5000/api/recipes', {recipeData});
//     return response.data; 
export const adminAddRecipe = createAsyncThunk(
    'recipes/addRecipe',
    async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error adding recipe:", error);
            throw error; 
        }
    }
);
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
            .addCase(adminAddRecipe.pending, (state) => {
                state.status = 'loading'; // You might want to track loading for adding as well
            })
            .addCase(adminAddRecipe.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.recipes.push(action.payload); // Push to recipes array
            })
            .addCase(adminAddRecipe.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCurrentRecipe } = recipesSlice.actions; 
export default recipesSlice.reducer;