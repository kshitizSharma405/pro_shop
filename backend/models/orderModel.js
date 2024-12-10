import mongoose from "mongoose";

/**
 * @desc Order Schema defines the structure of the order document in MongoDB
 */
const orderSchema = new mongoose.Schema(
  {
    // The user who placed the order (linked to the User model)
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to a User
      required: true, // Mandatory field
      ref: "User", // Links this field to the User model
    },
    // Array of items in the order
    orderItems: [
      {
        name: { type: String, required: true }, // Name of the product
        qty: { type: Number, required: true }, // Quantity of the product ordered
        image: { type: String, required: true }, // Image URL of the product
        price: { type: Number, required: true }, // Price of the product
        product: {
          type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
          required: true,
          ref: "Product",
        },
      },
    ],
    // Shipping address details for the order
    shippingAddress: {
      address: { type: String, required: true }, // Street address
      city: { type: String, required: true }, // City name
      postalCode: { type: String, required: true }, // Postal/ZIP code
      country: { type: String, required: true }, // Country name
    },
    // Payment method chosen by the user (e.g., PayPal, Stripe)
    paymentMethod: {
      type: String,
      required: true,
    },
    // Payment result details (populated upon successful payment)
    paymentResult: {
      id: { type: String }, // Payment ID from the payment gateway
      status: { type: String }, // Payment status (e.g., "Completed")
      update_time: { type: String }, // Timestamp of payment update
      email_address: { type: String }, // Payer's email address
    },
    // Breakdown of the order price
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0, // Default to 0.0 if not specified
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // Payment status and date
    isPaid: {
      type: Boolean,
      required: true,
      default: false, // Defaults to unpaid
    },
    paidAt: {
      type: Date, // Date when payment was made
    },
    // Delivery status and date
    isDelivered: {
      type: Boolean,
      required: true,
      default: false, // Defaults to not delivered
    },
    deliveredAt: {
      type: Date, // Date when the order was delivered
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create a model from the schema
const Order = mongoose.model("Order", orderSchema);

export default Order; // Export the Order model
