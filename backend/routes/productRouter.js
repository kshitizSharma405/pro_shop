import express from "express";
import {
  getAllProducts,
  getProductByid,
} from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/:id").get(getProductByid);

export default router;
