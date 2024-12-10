import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js"; // API slice for handling async data fetching
import cartSliceReducer from "./slices/cartSlice.js"; // Reducer for managing cart state
import authSliceReducer from "./slices/authSlice.js"; // Reducer for managing authentication state

// Configure the Redux store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add API slice reducer for handling API requests
    cart: cartSliceReducer, // Add cart reducer to manage shopping cart data
    auth: authSliceReducer, // Add auth reducer to manage user authentication data
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add API middleware to handle caching, invalidation, etc.
  devTools: true, // Enable Redux DevTools for easier debugging
});

export default store; // Export the configured store for use in the app
