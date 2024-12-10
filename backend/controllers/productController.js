import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

/**
 * @desc    Fetch all products with pagination and optional keyword search
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT; // Number of products to display per page
  const page = Number(req.query.pageNumber) || 1; // Current page number from query params, default to 1

  // Filter by keyword if provided (case-insensitive search on product name)
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  // Get total product count for pagination
  const count = await Product.countDocuments({ ...keyword });

  // Fetch products with pagination logic
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Respond with products, current page, and total pages
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

/**
 * @desc    Fetch a single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract product ID from route params
  const product = await Product.findById(id); // Find product by ID in the database

  if (product) {
    res.json(product); // Return product details if found
  } else {
    res.status(404); // Not found error
    throw new Error("Product not found");
  }
});

/**
 * @desc    Create a new product (Admin only)
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  try {
    // Create a new product with default sample data
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id, // Admin user creating the product
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    // Save the product to the database
    const createdProduct = await product.save();

    // Respond with the created product details
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500); // Internal server error
    throw new Error(error);
  }
});

/**
 * @desc    Update an existing product (Admin only)
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body; // Extract product details from request body

    const product = await Product.findById(req.params.id); // Find the product by ID

    if (product) {
      // Update product fields with new data
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      // Save the updated product to the database
      const updatedProduct = await product.save();

      // Respond with the updated product details
      res.status(200).json(updatedProduct);
    } else {
      res.status(404); // Not found error
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw new Error("Failed to update product");
  }
});

/**
 * @desc    Delete a product (Admin only)
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find product by ID

    if (product) {
      await Product.deleteOne({ _id: product._id }); // Delete the product
      res.status(200).json({ message: "Product deleted" }); // Success message
    } else {
      res.status(404); // Not found error
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw new Error("Failed to delete product");
  }
});

/**
 * @desc    Create a new review for a product
 * @route   POST /api/products/:id/review
 * @access  Private
 */
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body; // Extract rating and comment from request body
  const product = await Product.findById(req.params.id); // Find product by ID

  if (product) {
    // Check if the user has already reviewed the product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400); // Bad request error
      throw new Error("Product already reviewed");
    }

    // Create a new review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // Add the review to the product
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    // Update the average rating
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    // Save the product with the new review
    await product.save();

    // Respond with a success message
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404); // Not found error
    throw new Error("Product not found");
  }
});

/**
 * @desc    Fetch top-rated products
 * @route   GET /api/products/top
 * @access  Public
 */
const getTopProducts = asyncHandler(async (req, res) => {
  // Find top 3 products sorted by rating in descending order
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  // Respond with the top-rated products
  res.status(200).json(products);
});

// Export all controller functions to use in routes
export {
  getProductById,
  getTopProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProducts,
};
