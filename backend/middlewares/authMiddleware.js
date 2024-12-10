import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

/**
 * @desc    Middleware to protect routes and ensure the user is authenticated
 * @route   Applied to private routes
 * @access  Private
 */
const protect = asyncHandler(async (req, res, next) => {
  // Retrieve the token from cookies
  const token = req.cookies.jwt;

  if (!token) {
    // If no token is found, respond with a 401 status
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the decoded user ID and exclude the password field
    req.user = await User.findById(decoded.userId).select("-password");

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Token verification failed:", error);

    // Respond with a 401 status if token verification fails
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

/**
 * @desc    Middleware to ensure the user has admin privileges
 * @route   Applied to admin-only routes
 * @access  Private/Admin
 */
const admin = (req, res, next) => {
  // Check if the authenticated user exists and has admin privileges
  if (req.user && req.user.isAdmin) {
    // Proceed to the next middleware or route handler
    next();
  } else {
    // Respond with a 401 status if the user is not an admin
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
