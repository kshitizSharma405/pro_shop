export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //   calculate item price
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //Calculate Shipping Price(If Order is over $100 the free else $10)
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

  //Calculate Tax Price (15% tax)
  state.taxPrice = addDecimal(Number(state.itemsPrice * 0.15).toFixed(2));

  //Calculate Total Price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
