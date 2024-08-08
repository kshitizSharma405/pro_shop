import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
/**
 * @desc    Fetch all products
 * @route   Get /api/products
 * @access  Public
 */

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc    Fetch a products
 * @route   Get /api/product/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = await req.params;
  const product = await Product.findById(id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

export { getAllProducts, getProductById };
