import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js"; // Import middleware for authentication and admin authorization
import {
  getUsers, // Controller to fetch all users
  authUser, // Controller to authenticate a user
  registerUser, // Controller to register a new user
  logoutUser, // Controller to log out a user
  getUserProfile, // Controller to get the profile of the authenticated user
  updateUserProfile, // Controller to update the profile of the authenticated user
  getUserById, // Controller to get a specific user by ID
  updateUser, // Controller to update user details
  deleteUser, // Controller to delete a user
} from "../controllers/userController.js";

const router = express.Router();

// Route to get all users (admin-only) or register a new user
router
  .route("/")
  .get(protect, admin, getUsers) // Only admin can access this route
  .post(registerUser); // Any user can register

// Routes for user profile: getting and updating (authenticated user)
router
  .route("/profile")
  .get(protect, getUserProfile) // Only authenticated user can view their profile
  .put(protect, updateUserProfile); // Only authenticated user can update their profile

// Route for logging out a user
router.post("/logout", logoutUser); // Allows a user to log out

// Route for user authentication (login)
router.post("/auth", authUser); // Authenticate user with email and password

// Routes for user management (admin-only actions)
router
  .route("/:id")
  .get(protect, admin, getUserById) // Admin can get any user by ID
  .put(protect, admin, updateUser) // Admin can update user details by ID
  .delete(protect, admin, deleteUser); // Admin can delete a user by ID

export default router;
