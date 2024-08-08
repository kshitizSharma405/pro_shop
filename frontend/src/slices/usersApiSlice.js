import { apiSlice } from "@reduxjs/toolkit";
import USERS_URL from "../constants.js";

const usersApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: USERS_URL / auth,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSLice;
