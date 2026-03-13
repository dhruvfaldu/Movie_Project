import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      toast.success(`${action.payload.name} logged in successfully`);
    },

    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("currentUser");
    },

  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;