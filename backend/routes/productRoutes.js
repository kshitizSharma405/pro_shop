import express from "express";
import {
  createProductReview,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  getProducts,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import checkObjectId from "../middlewares/checkObjectId.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);
router.route("/:id/review").post(protect, checkObjectId, createProductReview);

export default router;
