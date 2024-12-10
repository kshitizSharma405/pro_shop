import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication, attempting to retrieve user info from localStorage safely
const initialState = {
  userInfo: (() => {
    try {
      // Safely attempt to get and parse userInfo from localStorage
      const storedUserInfo = localStorage.getItem("userInfo");
      return storedUserInfo ? JSON.parse(storedUserInfo) : null; // If found, parse and return, else null
    } catch (error) {
      // Log any error that happens during parsing
      console.error("Failed to parse userInfo from localStorage", error);
      return null; // Return null if any error occurs
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to store user credentials, both in state and localStorage
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // Update userInfo in state
      try {
        localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Persist user info in localStorage
      } catch (error) {
        console.error("Failed to store userInfo in localStorage", error); // Log any error
      }
    },
    // Action to clear user credentials and log out
    logout: (state) => {
      state.userInfo = null; // Clear user info from state
      try {
        localStorage.clear(); // Clear all localStorage data on logout
      } catch (error) {
        console.error("Failed to clear localStorage during logout", error); // Log any error
      }
    },
  },
});

// Export the action creators for usage in components
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer; // Export the reducer to be used in store
