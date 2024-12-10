import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js"; // Import middleware to protect routes
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js"; // Import the relevant controller methods

const router = express.Router();

// Route to get all orders (Admin) and to add a new order (Authenticated User)
router
  .route("/")
  .get(protect, admin, getOrders) // Only admin can get all orders
  .post(protect, addOrderItems); // Authenticated users can add order items

// Route to get orders of the logged-in user
router.route("/mine").get(protect, getMyOrders); // Only authenticated users can view their orders

// Route to get a specific order by ID (Authenticated User)
router.route("/:id").get(protect, getOrderById); // Authenticated user can view their order by ID

// Route to update order status to paid (Authenticated User)
router.route("/:id/pay").put(protect, updateOrderToPaid); // Authenticated user can mark the order as paid

// Route to update order status to delivered (Admin)
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered); // Only admin can mark the order as delivered

export default router;
