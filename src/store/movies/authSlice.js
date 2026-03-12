import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("currentUser"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser || null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },

    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("currentUser");
    },

  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;