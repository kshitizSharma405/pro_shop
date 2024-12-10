import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * @desc Schema for User model
 */
const userSchema = new mongoose.Schema(
  {
    // Name of the user
    name: {
      type: String,
      required: true, // Name is required
    },
    // Email of the user
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Email should be unique for each user
    },
    // Password of the user (hashed before saving)
    password: {
      type: String,
      required: true, // Password is required
    },
    // Whether the user is an admin
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // By default, the user is not an admin
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

/**
 * @desc Method to compare entered password with stored hashed password
 * @param {string} enteredPassword - Password entered by the user during login
 * @returns {boolean} - True if passwords match, otherwise false
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * @desc Middleware to hash password before saving the user document
 * @param {Function} next - Callback to pass control to the next middleware
 */
userSchema.pre("save", async function (next) {
  // Check if the password was modified
  if (!this.isModified("password")) {
    next(); // If not, continue with the next middleware
  } else {
    // Generate salt and hash the password if it is being modified
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
  }
});

// Create and export the User model based on the user schema
const User = mongoose.model("User", userSchema);
export default User;
