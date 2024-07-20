import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductByid = asyncHandler(async (req, res, next) => {
  const { id } = await req.params;
  const product = await Product.findById(id);
  if (product) {
    return res.json({ product });
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

export { getAllProducts, getProductByid };
