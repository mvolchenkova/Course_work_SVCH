import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    favPlans: [],
    favRecipes: [],
    loading: false,
    currentUser: null,
    error: null,
};

// Async thunk для логина пользователя
export const loginUser = createAsyncThunk('api/users/check', async ({phone, password}) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/check`, {phone, password});
    return response.data;
});

// Async thunk для логаута пользователя
export const logoutUser = createAsyncThunk('api/users/logoutUser', async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/logout`); // Убедитесь, что путь правильный
    return response.data;
});

// Async thunk для получения пользователей
export const fetchUsers = createAsyncThunk('api/users', async ({ page = 1, limit = 10 }) => {
    console.log(process.env.REACT_APP_API_URL);
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?page=${page}&limit=${limit}`);
    return response.data.users; 
});

// Async thunk для регистрации пользователя
export const registerUser = createAsyncThunk('api/users/register', async (userData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, userData);
    return response.data; 
});

export const adminAddUser = createAsyncThunk('api/users/register/admin', async (userData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, userData);
    return response.data; 
});

export const updateUserThunk = createAsyncThunk('api/users/:id', async ( currentUser ) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${currentUser.userId}`, currentUser );
    return response.data; 
});

export const becomeCoachThunk = createAsyncThunk('api/users/becomeCoach/:id', async ({ userId, diploma }) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/becomeCoach/${userId}`, {diploma});
    return response.data; 
});
   // const formData = new FormData();
    // formData.append('file', selectedFile);

// headers: {
        //     'Content-Type': 'multipart/form-data'
        // }

export const deleteUserThunk = createAsyncThunk(
    'user/deleteUser',
    async (userId) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete the user');
        }
        return userId; 
    }
);

export const toggleUserBlock = createAsyncThunk('api/users/:id/block', async (userId) => {
    const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users/${userId}/block`);
    return response.data; 
});

export const addFavoritePlan = createAsyncThunk('api/users/:id/addFavoritePlan', async ({userId, idTplan}) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}/addFavoritePlan`, {idTplan});
    return response.data;
}
);
export const addFavoriteRecipe = createAsyncThunk('api/users/:id/addFavoriteRecipe', async ({userId, idRecipe}) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}/addFavoriteRecipe`, {idRecipe});
    return response.data;
}
);
// export const fetchFavoritePlans = createAsyncThunk('api/users/:id/fetchFavoritePlans', async (userId) => {
//     const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}/favoritePlans`);
//     return response.data;
// });

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
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },   
        toggleBlock(state, action) {
            const user = state.users.find(user => user.idUser === action.payload);
            if (user) {
                user.isBlocked = !user.isBlocked; 
            }
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
                state.currentUser = action.payload.user; 
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
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload; // Записываем пользователей в состояние
              })
              .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
              })
            // .addCase(fetchUsers.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.users = action.payload.users; 
            // })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.currentUser = action.payload; 
                const index = state.users.findIndex(user => user.idUser === action.payload.idUser);
                if (index !== -1) {
                    state.users[index] = action.payload; 
                }
            })
            .addCase(adminAddUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload); 
            })
            .addCase(adminAddUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(toggleUserBlock.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const index = state.users.findIndex(user => user.idUser === updatedUser.idUser);
                if (index !== -1) {
                    state.users[index] = updatedUser; 
                }
            })
            .addCase(addFavoritePlan.fulfilled, (state, action) => {
                state.currentUser = action.payload;
             })
             .addCase(addFavoriteRecipe.fulfilled, (state, action) => {
                state.currentUser = action.payload;
             })
            
    },
});

// Экспорт редьюсеров
export const { addUser, updateUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;