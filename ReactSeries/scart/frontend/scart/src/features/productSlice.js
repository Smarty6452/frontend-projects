import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      return response?.data;
    } catch (err) {
      return rejectWithValue("an error occured");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {}, // create action creator
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state, action) => {
        // immer to update
        state.status = "pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        // immer to update
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(productsFetch.rejected, (state, action) => {
        // immer to update
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
