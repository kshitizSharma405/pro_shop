import path from "path"; // Import 'path' module to handle file paths in a cross-platform manner
import express from "express"; // Import Express to create the server and handle requests
import dotenv from "dotenv"; // Import dotenv to load environment variables from the .env file
import connectDB from "./config/db.js"; // Import the function to connect to the database
import cookieParser from "cookie-parser"; // Import cookie-parser middleware for handling cookies
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js"; // Import custom error handling middleware
import productRoutes from "./routes/productRoutes.js"; // Import routes for handling product-related requests
import userRoutes from "./routes/userRoutes.js"; // Import routes for handling user-related requests
import orderRoutes from "./routes/orderRoutes.js"; // Import routes for handling order-related requests
import uploadRoutes from "./routes/uploadRoutes.js"; // Import routes for handling file upload requests
import cors from "cors"; // Import CORS middleware to enable cross-origin requests

dotenv.config(); // Load environment variables from .env file

const port = process.env.PORT || 5000; // Set the port for the server (use the one from environment variables or default to 5000)

// Connect to the database using the connection function
connectDB();

const app = express(); // Initialize the Express app

// Enable CORS (Cross-Origin Resource Sharing) for handling requests from different origins
const corsOptions = {
  // In development, allow requests from the front-end running on localhost:3000.
  // In production, allow requests only from the actual front-end domain (replace with the real domain).
  origin:
    process.env.NODE_ENV === "production"
      ? "" // Replace with actual front-end URL in production
      : "http://localhost:3000", // Local development URL for React app
  credentials: true, // Allow sending cookies (credentials) along with requests
};

// Apply the CORS middleware to the Express app
app.use(cors(corsOptions));

app.use(cookieParser()); // Use cookie-parser to parse cookies attached to incoming requests
app.use(express.json()); // Middleware to parse JSON bodies in POST requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies (for form submissions)

// Set up the API routes for different resources (products, users, orders, uploads)
app.use("/api/products", productRoutes); // Products-related API routes
app.use("/api/users", userRoutes); // Users-related API routes
app.use("/api/orders", orderRoutes); // Orders-related API routes
app.use("/api/upload", uploadRoutes); // Uploads-related API routes

// Endpoint for PayPal client ID configuration
// This returns the PayPal client ID so the front-end can integrate PayPal
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Check environment (production or development) to serve the appropriate static files
const __dirname = new URL(".", import.meta.url).pathname; // This replaces `__dirname` in ES modules

if (process.env.NODE_ENV === "production") {
  // In production, serve the React app's build folder as static files
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // For any route that doesn't match an API route, serve the React index.html (for single-page app routing)
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // In development, serve the uploaded files (static assets like images, documents, etc.)
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // API root endpoint (can be used to verify if the API is running)
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error handling middleware
// Handles 404 errors (route not found) and any other errors that might occur
app.use(notFound);

// Custom error handler for catching all errors in the app and sending appropriate responses
app.use(errorHandler);

// Start the server and listen for incoming requests
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
