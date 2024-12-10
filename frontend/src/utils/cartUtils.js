/**
 * Adds a decimal point to the number, rounding to two decimal places
 * @param {number} num - The number to round
 * @returns {string} - The number formatted to two decimal places
 */
export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

/**
 * Updates the cart with recalculated pricing (item price, shipping, tax, and total)
 * @param {Object} state - The current state of the cart
 * @returns {Object} - The updated state with recalculated pricing
 */
export const updateCart = (state) => {
  // Calculate the total item price (sum of item price * quantity for each cart item)
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate the shipping price: Free if the order is over $100, otherwise $10
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price: 15% tax on the item price
  state.taxPrice = addDecimal(Number(state.itemsPrice * 0.15).toFixed(2));

  // Calculate the total price: items price + shipping price + tax price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Store the updated cart state in localStorage for persistence across sessions
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
