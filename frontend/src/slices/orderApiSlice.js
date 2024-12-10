import { apiSlice } from "./apiSlice.js";
import { ORDERS_URL, PAYPAL_URL } from "../constants.js";

// Create an API slice for orders
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create a new order
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL, // POST request to create an order
        method: "POST",
        body: order, // Pass the order object as the body
      }),
    }),

    // Query to get order details by order ID
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`, // GET request to fetch order details using ID
      }),
      keepUnusedDataFor: 5, // Keep data in cache for 5 seconds before refetching
    }),

    // Mutation to pay for an order
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`, // PUT request to pay for an order
        method: "PUT",
        body: details, // Pass the payment details
      }),
    }),

    // Query to fetch PayPal client ID for integration
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL, // GET request to fetch PayPal client ID
      }),
      keepUnusedDataFor: 5, // Keep data in cache for 5 seconds before refetching
    }),

    // Query to get the current user's orders
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`, // GET request to fetch orders of the current user
      }),
      keepUnusedDataFor: 5, // Keep data in cache for 5 seconds before refetching
    }),

    // Query to get all orders
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL, // GET request to fetch all orders
      }),
      keepUnusedDataFor: 5, // Keep data in cache for 5 seconds before refetching
    }),

    // Mutation to mark an order as delivered
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`, // PUT request to mark the order as delivered
        method: "PUT",
      }),
    }),
  }),
});

// Export hooks for each action generated by `createApi` slice
export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = orderApiSlice;
