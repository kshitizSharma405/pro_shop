// Base URL for API requests based on the environment (development or production)
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://pro-shop-fvqq.onrender.com" // Production base URL (could be added if needed)
    : "http://localhost:5000"; // Local development server

// API endpoint URLs
export const PRODUCTS_URL = "/api/products"; // Endpoint to fetch products
export const USERS_URL = "/api/users"; // Endpoint to manage user data
export const ORDERS_URL = "/api/orders"; // Endpoint for handling orders
export const PAYPAL_URL = "/api/config/paypal"; // PayPal configuration endpoint (e.g., for client ID)
export const UPLOAD_URL = "/api/upload"; // Endpoint for uploading files (images, etc.)
