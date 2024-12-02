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
    return response.data; // Возвращаем данные, если нужно
});

// Async thunk для получения пользователей
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
});

// Async thunk для регистрации пользователя
export const registerUser = createAsyncThunk('api/users/register', async (userData) => {
    const response = await axios.post('http://localhost:5000/api/users', userData);
    return response.data; 
});

export const registerTrainer = createAsyncThunk('api/users/becomeCoach', async (userData) => {
    const response = await axios.post('http://localhost:5000/api/users/becomeCoach', userData);
    return response.data;
});


export const updateTrainingAim = createAsyncThunk(`api/users/:id`, async ({userId, trAim }) => {
    const response = await axios.put(`http://localhost:5000/api/users/${userId}`, {userId, trAim });
    return response.data; // Возвращаем обновленные данные пользователя
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
            .addCase(registerTrainer.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(updateTrainingAim.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateTrainingAim.fulfilled, (state, action) => {
                console.log('Updated user:', action.payload);
                state.currentUser = action.payload; 
            })
            .addCase(updateTrainingAim.pending, (state) => {
                state.loading = true; 
            })
    },
});

// Экспорт редьюсеров
export const { addUser, updateUser, deleteUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;