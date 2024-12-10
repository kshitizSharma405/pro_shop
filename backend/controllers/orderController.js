import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  // Destructure required fields from the request body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Validate that the order contains items
  if (orderItems && orderItems.length === 0) {
    res.status(400); // Bad request error
    throw new Error("No Order Items");
  } else {
    // Create a new order instance with the provided details
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id, // Assign the product ID
        _id: undefined, // Remove the _id from individual items
      })),
      user: req.user._id, // Add the user ID from the logged-in user
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Save the order to the database
    const createdOrder = await order.save();

    // Respond with the created order details
    res.status(200).json(createdOrder);
  }
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  // Fetch all orders belonging to the logged-in user
  const orders = await Order.find({ user: req.user._id });

  // Respond with the user's orders
  res.status(200).json(orders);
});

// @desc    Get a specific order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // Find the order by ID and populate user details (name and email)
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    // Respond with the order details if found
    res.status(200).json(order);
  } else {
    res.status(404); // Not found error
    throw new Error("Order Not Found");
  }
});

// @desc    Update an order to mark it as paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Find the order by ID
  const order = await Order.findById(req.params.id);

  if (order) {
    // Update the payment status and details
    order.isPaid = true;
    order.paidAt = Date.now(); // Record the payment time
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    // Save the updated order to the database
    const updateOrder = await order.save();

    // Respond with the updated order details
    res.status(200).json(updateOrder);
  } else {
    res.status(404); // Not found error
    throw new Error("Order Not Found");
  }
});

// @desc    Update an order to mark it as delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // Find the order by ID
  const order = await Order.findById(req.params.id);

  if (order) {
    // Update the delivery status and time
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // Save the updated order to the database
    const updateOrder = await order.save();

    // Respond with the updated order details
    res.status(200).json(updateOrder);
  } else {
    res.status(404); // Not found error
    throw new Error("Order not found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // Fetch all orders and populate user details (id and name)
  const orders = await Order.find({}).populate("user", "id name");

  // Respond with the list of all orders
  res.status(200).json(orders);
});

// Export all the functions to use in routes or other parts of the application
export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
