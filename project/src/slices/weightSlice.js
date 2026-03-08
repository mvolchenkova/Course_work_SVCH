import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeightsThunk = createAsyncThunk(
  "weights/fetchWeights",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/weights/${userId}`
    );
    return response.data;
  }
);

export const addWeightThunk = createAsyncThunk(
  "weights/addWeight",
  async ({ userId, weight, date }) => {
    const response = await axios.post(
      `http://localhost:5000/api/weights/${userId}`,
      { weight, date }
    );
    return response.data;
  }
);

const initialState = {
  entries: [],
  loading: false,
  error: null,
};

const weightSlice = createSlice({
  name: "weight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeightsThunk.fulfilled, (state, action) => {
        state.entries = action.payload;
      })
      .addCase(addWeightThunk.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      });
  },
});

export default weightSlice.reducer;