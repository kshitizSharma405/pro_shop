import mongoose from "mongoose";
import connectDb from "./config/db.js";
import users from "./data/users.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import colors from "colors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDb();

// Function to import sample data into the database
const importData = async () => {
  try {
    // Delete existing data in Orders, Products, and Users collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert users from the users data array into the Users collection
    const createdUsers = await User.insertMany(users);
    // Assign the first created user as the admin user
    const adminUser = createdUsers[0]._id;

    // Map over the products array and assign the admin user to each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; // Add user field to each product
    });

    // Insert products with the assigned admin user into the Products collection
    await Product.insertMany(sampleProducts);

    // Log a success message in green and exit the process
    console.log("Data Imported!".green.inverse);
    process.exit(); // Exit the process after data import
  } catch (error) {
    // If an error occurs, log the error message in red and exit with failure status
    console.log(`${error}`.red.inverse);
    process.exit(1); // Exit with status code 1 (indicating error)
  }
};

// Function to destroy all data in the database
const destroyData = async () => {
  try {
    // Delete all data from Orders, Products, and Users collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Log a success message indicating the data has been destroyed
    console.log(`${"Data Destroyed!"}`.red.inverse);
    process.exit(); // Exit the process after destroying the data
  } catch (error) {
    // If an error occurs, log the error message in red and exit with failure status
    console.log(`${error}`.red.inverse);
    process.exit(1); // Exit with status code 1 (indicating error)
  }
};

// Check if the command line argument is '-d' for destroying data, else import data
if (process.argv[2] === "-d") {
  destroyData(); // Call destroyData if '-d' is passed
} else {
  importData(); // Otherwise, import the data
}
