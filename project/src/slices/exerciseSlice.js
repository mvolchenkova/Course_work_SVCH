import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/exercises';

// Получение списка с фильтрами и пагинацией
export const fetchExercises = createAsyncThunk(
    'exercises/fetchAll',
    async ({ page = 1, limit = 12, experience, type, equipment, search }, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, {
                params: { page, limit, experience, type, equipment, search }
            });
            return response.data; // Ожидаем { total, exercises, page }
        } catch (error) {
            return rejectWithValue(error.response?.data || "Ошибка при загрузке");
        }
    }
);

export const createExercise = createAsyncThunk(
    'exercises/create',
    async (payload, { rejectWithValue }) => {
        try {
            const isFormData = payload instanceof FormData;

            const response = await axios.post(API_URL, payload, {
                // Если FormData — обнуляем Content-Type, чтобы браузер сам
                // выставил multipart/form-data с правильным boundary.
                // Если кто-то задал глобальный 'application/json' — он перебьёт boundary
                // и multer упадёт с "Unexpected end of form"
                headers: isFormData
                    ? { 'Content-Type': undefined }
                    : {},
            });

            return response.data;
        } catch (error) {
            // Всегда возвращаем объект, а не строку — чтобы err.message работало в форме
            return rejectWithValue(
                error.response?.data || { message: 'Ошибка при создании упражнения' }
            );
        }
    }
);

export const getRandom = createAsyncThunk(
    'exercises/getRandom',
    async ({ amount, exp, equipment, restrictions }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/random`, {
                params: { amount, exp, equipment, restrictions }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: "Network error" });
        }
    }
);
export const fetchMuscles = createAsyncThunk(
    'exercises/fetchMuscles',
    async (_, { rejectWithValue }) => {
        try {
            // Используем полный URL или прокси
            const response = await axios.get('http://localhost:5000/api/muscles');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Ошибка при загрузке мышц");
        }
    }
);

const exerciseSlice = createSlice({
    name: 'exercises',
    initialState: {
        items: [],
        muscles: [],
        total: 0,
        currentPage: 1,
        ga: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        clearError: (state) => { state.error = null; }
    },
    extraReducers: (builder) => {
        builder
            // FETCH ALL
            .addCase(fetchExercises.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExercises.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.exercises;
                state.total = action.payload.total;
                state.currentPage = action.payload.page;
            })
            .addCase(fetchExercises.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            // CREATE
            .addCase(createExercise.fulfilled, (state, action) => {
                state.items.unshift(action.payload); // Добавляем новое в начало списка
                state.total += 1;
            })
            // GET RANDOM (GA)
            .addCase(getRandom.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ga = action.payload; // Сохраняем весь результат GA
            })
            .addCase(getRandom.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.error || "Ошибка алгоритма";
            })
            .addCase(fetchMuscles.fulfilled, (state, action) => {
                state.muscles = action.payload;
            })
    },
});

export const { clearError } = exerciseSlice.actions;
export default exerciseSlice.reducer;