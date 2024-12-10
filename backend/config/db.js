// Importing the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Asynchronous function to establish a connection with the MongoDB database
const connectDB = async () => {
  try {
    // Attempting to connect to the MongoDB database using the connection string from environment variables
    const connect = await mongoose.connect(process.env.MONGO_URI);

    // Logging a success message with the host name of the connected database
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    // Logging an error message if the connection attempt fails
    console.log(`Error: ${error.message}`);

    // Exiting the process with a failure code (1) to indicate an unrecoverable error
    process.exit(1);
  }
};

// Exporting the connectDB function to be used in other parts of the application
export default connectDB;
