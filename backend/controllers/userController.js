import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc    Authenticate user and return a token
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body

  const user = await User.findOne({ email }); // Find the user by email

  if (user && (await user.matchPassword(password))) {
    // Check if the user exists and the password matches
    generateToken(res, user._id); // Generate JWT token and set it as a cookie

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }); // Respond with user details
  } else {
    res.status(401); // Unauthorized error
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body; // Extract name, email, and password from the request body

  const userExists = await User.findOne({ email }); // Check if the user already exists

  if (!userExists) {
    // If the user does not exist, create a new user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id); // Generate JWT token for the new user
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      }); // Respond with user details
    } else {
      res.status(404); // Not found error
      throw new Error("Invalid user data");
    }
  } else {
    res.status(400); // Bad request error
    throw new Error("User already exists");
  }
});

/**
 * @desc    Logout the user and clear the JWT cookie
 * @route   POST /api/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true, // Ensure the cookie is only accessible by the server
    expires: new Date(0), // Expire the cookie immediately
  });

  res.status(200).json({ message: "Logged out successfully" }); // Success message
});

/**
 * @desc    Get the logged-in user's profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  // Placeholder implementation
  res.send("Get user profile");
});

/**
 * @desc    Update the logged-in user's profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // Extract name, email, and password from the request body

  const user = await User.findById(req.user._id); // Find the logged-in user by their ID

  if (user) {
    user.name = name || user.name; // Update name if provided
    user.email = email || user.email; // Update email if provided

    if (password) {
      user.password = password; // Update password if provided
    }

    const updatedUser = await user.save(); // Save the updated user to the database

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    }); // Respond with updated user details
  } else {
    res.status(404); // Not found error
    throw new Error("User not found");
  }
});

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}); // Fetch all users from the database

  res.status(200).json(users); // Respond with the list of users
});

/**
 * @desc    Delete a user by ID (Admin only)
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); // Find the user by ID

  if (user) {
    if (user.isAdmin) {
      res.status(400); // Bad request error
      throw new Error("Cannot delete admin user");
    } else {
      await User.deleteOne({ _id: user._id }); // Delete the user
      res.status(201).json({ message: "User deleted successfully" }); // Success message
    }
  } else {
    res.status(404); // Not found error
    throw new Error("User not found");
  }
});

/**
 * @desc    Get a user by ID (Admin only)
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password"); // Fetch user by ID, excluding the password field

  if (user) {
    res.status(200).json(user); // Respond with the user details
  } else {
    res.status(404); // Not found error
    throw new Error("User not found");
  }
});

/**
 * @desc    Update a user's details (Admin only)
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); // Find the user by ID

  if (user) {
    user.name = req.body.name || user.name; // Update name if provided
    user.email = req.body.email || user.email; // Update email if provided
    user.isAdmin = req.body.isAdmin ?? user.isAdmin; // Update admin status if provided

    const updatedUser = await user.save(); // Save the updated user to the database

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    }); // Respond with updated user details
  } else {
    res.status(404); // Not found error
    throw new Error("User not found");
  }
});

// Export all user-related controller functions
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
