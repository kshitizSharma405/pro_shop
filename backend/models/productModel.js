import mongoose from "mongoose";

/**
 * @desc Schema for individual product reviews
 */
const reviewSchema = new mongoose.Schema(
  {
    // The user who submitted the review
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      required: true,
      ref: "User",
    },
    // Name of the user who submitted the review
    name: {
      type: String,
      required: true,
    },
    // Rating given by the user (e.g., out of 5 stars)
    rating: {
      type: Number,
      required: true,
      default: 0, // Default rating is 0
    },
    // User's comment or feedback about the product
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

/**
 * @desc Schema for products in the database
 */
const productSchema = new mongoose.Schema(
  {
    // The user/admin who added the product
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      required: true,
      ref: "User",
    },
    // Name of the product
    name: {
      type: String,
      required: true,
    },
    // Image URL of the product
    image: {
      type: String,
      required: true,
    },
    // Brand of the product
    brand: {
      type: String,
      required: true,
    },
    // Category to which the product belongs
    category: {
      type: String,
      required: true,
    },
    // Detailed description of the product
    description: {
      type: String,
      required: true,
    },
    // Array of reviews submitted for the product
    reviews: [reviewSchema], // Nested review schema
    // Average rating of the product based on reviews
    rating: {
      type: Number,
      required: true,
      default: 0, // Default rating is 0
    },
    // Number of reviews submitted for the product
    numReviews: {
      type: Number,
      required: true,
      default: 0, // Default number of reviews is 0
    },
    // Price of the product
    price: {
      type: Number,
      required: true,
      default: 0, // Default price is 0
    },
    // Number of items in stock for the product
    countInStock: {
      type: Number,
      required: true,
      default: 0, // Default stock count is 0
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create and export the Product model based on the product schema
const Product = mongoose.model("Product", productSchema);
export default Product;
