import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reviews';

// 1. Получение всех отзывов
export const fetchReviews = createAsyncThunk(
    'reviews/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить отзывы");
        }
    }
);

// 2. Создание нового отзыва
export const createReview = createAsyncThunk(
    'reviews/create',
    async (reviewData, thunkAPI) => {
        try {
            // reviewData содержит { idUser, text, rating, ... }
            const response = await axios.post(API_URL, reviewData);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при отправке отзыва");
        }
    }
);

// 3. Отправка ответа администратора
export const answerReview = createAsyncThunk(
    'reviews/answer',
    async (answerData, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/answer`, answerData); 
            return response.data; 
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при отправке ответа");
        }
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // --- Загрузка отзывов ---
            .addCase(fetchReviews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // --- Создание отзыва ---
            .addCase(createReview.fulfilled, (state, action) => {
                // Добавляем новый отзыв в начало массива (чтобы он был первым)
                state.items.unshift(action.payload); 
            })
            .addCase(createReview.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(answerReview.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (rev) => rev.idReview === action.payload.idReview
                );
                
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(answerReview.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default reviewSlice.reducer;