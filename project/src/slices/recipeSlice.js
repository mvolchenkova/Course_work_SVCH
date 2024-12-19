import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk('api/recipes/search', async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes/search`);
    return response.data;
});

// export const adminAddRecipe = createAsyncThunk('api/recipes', async ({recipeData}) => {
//     console.log(recipeData)
//     const response = await axios.post('${process.env.REACT_APP_API_URL}/recipes', {recipeData});
//     return response.data; 
export const adminAddRecipe = createAsyncThunk(
    'recipes/addRecipe',
    async (formData) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/recipes`, formData, {
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

export const findFavRecipes = createAsyncThunk('api/recipes/findFavRecipes', async (_, {rejectWithValue}) => {
    try{
        const favRecipes = JSON.parse(localStorage.getItem('favRecipes'));
        console.log(favRecipes);

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes/findFavRecipes`, {
            params: { favRecipes: JSON.stringify(favRecipes) } 
        });
        return response.data;
    }
    catch(error){
        rejectWithValue(error)
    }
    
});


const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        favRecipes: [],
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
            })
            .addCase(findFavRecipes.fulfilled, (state, action)=>{
                state.loading = false;
                state.favRecipes = action.payload;
            })
            .addCase(findFavRecipes.pending, (state)=>{
                state.loading = true;
                
            })
            .addCase(findFavRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { setCurrentRecipe } = recipesSlice.actions; 
export default recipesSlice.reducer;