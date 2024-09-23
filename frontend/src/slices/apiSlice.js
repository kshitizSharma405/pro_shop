import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // You can add any additional headers here
    return headers;
  },
  credentials: "include", // Include credentials (cookies)
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
