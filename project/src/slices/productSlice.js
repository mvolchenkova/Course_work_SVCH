import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный экшен в твоем стиле через axios
export const addProductToBase = createAsyncThunk(
    'api/products/addProduct', 
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}products`, productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при добавлении продукта');
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductToBase.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addProductToBase.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Добавляем новый продукт в массив items
                state.items.push(action.payload);
            })
            .addCase(addProductToBase.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default productSlice.reducer;