import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils"; // Importing utility to handle cart updates

// Initial state for the cart, attempting to retrieve from localStorage if available
const initialState = (() => {
  try {
    // Safely attempt to retrieve and parse cart data from localStorage
    const storedCart = localStorage.getItem("cart");
    return storedCart
      ? JSON.parse(storedCart)
      : {
          // If cart data exists, parse it
          cartItems: [],
          shippingAddress: {},
          paymentMethod: "PayPal", // Default payment method
        };
  } catch (error) {
    // Log any error that occurs during parsing and fall back to initial state
    console.error("Failed to parse cart from localStorage", error);
    return {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "PayPal", // Default payment method in case of error
    };
  }
})();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add item to cart
    addToCart: (state, action) => {
      const item = action.payload; // Get the item to add
      const itemExists = state.cartItems.find((x) => x._id === item._id); // Check if item already exists in cart

      if (itemExists) {
        // If item exists, replace it with updated item
        state.cartItems = state.cartItems.map((x) =>
          x._id === itemExists._id ? item : x
        );
      } else {
        // Otherwise, add the new item to the cart
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state); // Update cart in localStorage
    },

    // Action to remove item from cart
    removeFromCart: (state, action) => {
      const itemId = action.payload; // Get the id of the item to remove
      state.cartItems = state.cartItems.filter((x) => x._id !== itemId); // Remove the item by id
      return updateCart(state); // Update cart in localStorage
    },

    // Action to save the shipping address
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload; // Save the shipping address
      return updateCart(state); // Update cart in localStorage
    },

    // Action to save the payment method
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload; // Save the payment method
      return updateCart(state); // Update cart in localStorage
    },

    // Action to clear all cart items
    clearCartItems: (state) => {
      state.cartItems = []; // Clear all cart items
      return updateCart(state); // Update cart in localStorage
    },

    // Action to reset the cart to its initial state
    resetCart: (state) => {
      // Reset the state to the initial state
      return initialState;
    },
  },
});

// Export the action creators for use in components
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
