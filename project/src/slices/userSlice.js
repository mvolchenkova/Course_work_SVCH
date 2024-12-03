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
    return response.data;
});

// Async thunk для логаута пользователя
export const logoutUser = createAsyncThunk('api/users/logoutUser', async () => {
    const response = await axios.post('http://localhost:5000/api/users/logout'); // Убедитесь, что путь правильный
    return response.data;
});

// Async thunk для получения пользователей
export const fetchUsers = createAsyncThunk('api/users', async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(`http://localhost:5000/api/users?page=${page}&limit=${limit}`);
    return response.data; 
});

// Async thunk для регистрации пользователя
export const registerUser = createAsyncThunk('api/users/register', async (userData) => {
    const response = await axios.post('http://localhost:5000/api/users', userData);
    return response.data; 
});

export const adminAddUser = createAsyncThunk('api/users/register/admin', async (userData) => {
    const response = await axios.post('http://localhost:5000/api/users', userData);
    return response.data; 
});

// Async thunk для обновления данных пользователя
export const updateUserThunk = createAsyncThunk('api/users/:id', async ({ currentUser }) => {
    const response = await axios.put(`http://localhost:5000/api/users/${currentUser.userId}`, { currentUser });
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
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
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
                state.currentUser = action.payload; 
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload; 
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            })
            // .addCase(registerTrainer.pending, (state) => {
            //     state.loading = true;
            //     state.error = null; // Сбрасываем ошибку перед началом загрузки
            // })
            // .addCase(registerTrainer.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.currentUser = action.payload; // Обновляем текущего пользователя
            // })
            // .addCase(registerTrainer.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message; // Сохраняем сообщение об ошибке
            // })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users; // Доступ к массиву пользователей
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.currentUser = action.payload; // Обновляем данные текущего пользователя
                const index = state.users.findIndex(user => user.idUser === action.payload.idUser);
                if (index !== -1) {
                    state.users[index] = action.payload; // Обновляем массив пользователей, если необходимо
                }
            })
            .addCase(adminAddUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload); // Add new user to the list
            })
            .addCase(adminAddUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

// Экспорт редьюсеров
export const { addUser, updateUser, deleteUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;