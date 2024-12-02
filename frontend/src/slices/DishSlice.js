import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDishes } from "../APIs/api_path";

export const getDishes = createAsyncThunk("dishes/getall", async () => {
  try {
    const dishes = await getAllDishes();
    return dishes;
  } catch (error) {
    console.log(error);
    return;
  }
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const DishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDishes.fulfilled, (state, action) => {
        if (action.payload == null) return;
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default DishesSlice.reducer;
