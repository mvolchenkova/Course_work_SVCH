import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    loading: false,
    currentUser: null,
    error: null,
};

// Async thunk для логина пользователя
export const loginUser = createAsyncThunk('api/users/check', async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/users/check', credentials);
    return response.data; // Предполагается, что ответ содержит информацию о пользователе
});

// Async thunk для логаута пользователя
export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
    await axios.post('/api/auth/logout');
});

// Async thunk для получения пользователей
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('/api/users');
    return response.data;
});

// Создание слайса
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.idUser === action.payload.idUser);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.idUser !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload; // Сохраните данные пользователя после успешного логина
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null; // Очистите данные пользователя при логауте
            });
    },
});

// Экспорт редьюсеров
export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;