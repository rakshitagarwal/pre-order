import { configureStore } from "@reduxjs/toolkit";
import DishesSlice from "./slices/DishSlice";

export const store = configureStore({
  reducer: {
    dishes: DishesSlice,
  },
});
