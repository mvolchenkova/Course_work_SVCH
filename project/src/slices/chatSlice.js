// chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios correctly on the client-side

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (message) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat`, { message }); 
            return response.data.reply; 
        } catch (error) {
            if (error.response) {
              console.error("Server Error:", error.response.data);
              throw new Error(error.response.data.error || "Server Error"); 
            } else if (error.request) {
              console.error("Network Error:", error.request);
              throw new Error("Network Error");
            } else {
              console.error("Axios Error:", error.message);
              throw new Error("Error sending request");
            }
        }
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        response: '',
        status: 'idle',
        error: null,
    },
    reducers: {
        clearMessages(state) {
            state.messages = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages.push(action.meta.arg);
                state.response = action.payload;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { clearMessages } = chatSlice.actions;

export default chatSlice.reducer;