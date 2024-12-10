import express from "express";
import {
  createProductReview, // Controller to handle creating a product review
  createProduct, // Controller to handle creating a product
  deleteProduct, // Controller to handle deleting a product
  getProductById, // Controller to get a single product by its ID
  updateProduct, // Controller to update a product
  getProducts, // Controller to get a list of all products
  getTopProducts, // Controller to get top-rated products
} from "../controllers/productController.js";
import { protect, admin } from "../middlewares/authMiddleware.js"; // Middleware to protect routes and ensure admin access
import checkObjectId from "../middlewares/checkObjectId.js"; // Middleware to check if the product ID is valid

const router = express.Router();

// Route to get all products or create a new product (Admin Only)
router
  .route("/")
  .get(getProducts) // Anyone can view the list of products
  .post(protect, admin, createProduct); // Only authenticated admins can create new products

// Route to get top-rated products
router.get("/top", getTopProducts); // Anyone can view the top-rated products

// Route to get, update, or delete a specific product by its ID
router
  .route("/:id")
  .get(checkObjectId, getProductById) // Anyone can view a specific product by its ID, with ID validation
  .put(protect, admin, checkObjectId, updateProduct) // Only authenticated admins can update a product
  .delete(protect, admin, checkObjectId, deleteProduct); // Only authenticated admins can delete a product

// Route to create a product review
router.route("/:id/review").post(protect, checkObjectId, createProductReview); // Only authenticated users can add a review for a product

export default router;
