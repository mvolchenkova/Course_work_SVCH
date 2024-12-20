import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронное действие для добавления статьи
export const addArticle = createAsyncThunk('api/articles', async ({title, author, content}) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/articles`, {title, author, content});
    return response.data;
});
export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles', // Название действия
    async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles/fetchArticles`);
        return response.data; // Возвращаем данные статей
    }
);

// Создание слайса
const articleSlice = createSlice({
    name: 'articles',
    initialState: {
        articles: [],
        status: 'idle', 
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addArticle.fulfilled, (state, action) => {
                state.articles.push(action.payload);
            });
    },
});


export default articleSlice.reducer;