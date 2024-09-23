import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
/**
 * @desc    Fetch all products
 * @route   Get /api/products
 * @access  Public
 */

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc    Fetch a products
 * @route   Get /api/product/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const { id } = await req.params;
  const product = await Product.findById(id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

/**
 * @desc    Create a product
 * @route   Post /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/image/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res.status(404);
    throw new Error("Resource not found");
  }
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.status(200).json({ message: "Product deleted" });
    }
  } catch (error) {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
