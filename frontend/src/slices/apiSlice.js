import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// Base query configuration for making requests to the API
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL, // Base URL for all requests
  prepareHeaders: (headers, { getState }) => {
    // Function to add any additional headers before sending the request
    // For example, you can add an Authorization header here if needed
    // const token = getState().auth.token; // Retrieve the token from the Redux state
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`); // Add the token to the headers
    // }
    return headers;
  },
  credentials: "include", // Include credentials (cookies) in requests
});

// Create the API slice using Redux Toolkit's createApi function
export const apiSlice = createApi({
  baseQuery, // Set the base query for the API requests
  tagTypes: ["Product", "Order", "User"], // Define the types of tags for caching and cache invalidation
  endpoints: (builder) => ({}), // Empty endpoints object; it will be populated by other API slices
});

// You can export the apiSlice as the default export for easy usage in your store configuration
