import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../movies/movieSlice";
import authReducer from "../movies/authSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    auth: authReducer,
  },
});