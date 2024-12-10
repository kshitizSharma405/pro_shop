import jwt from "jsonwebtoken";

// Function to generate JWT token and set it in the response cookie
const generateToken = (res, userId) => {
  // Check if JWT_SECRET environment variable is defined
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  // Check if the response object (res) is valid and contains the cookie method
  if (!res || !res.cookie) {
    throw new Error("Invalid response object provided");
  }

  try {
    // Generate a JWT token with the userId payload, signing it with the secret key
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Token will expire in 30 days
    });

    // Set the generated token as a cookie in the response
    res.cookie("jwt", token, {
      httpOnly: true, // Makes the cookie accessible only to the server (prevents JS access)
      secure: process.env.NODE_ENV === "production", // Set to true in production for secure cookies over HTTPS
      sameSite: "strict", // Restricts cross-site cookie usage (protects against CSRF)
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });

    // Optional: Log the success for debugging purposes
    console.log("Token generated and cookie set");
  } catch (error) {
    // Catch any errors during token generation or cookie setting
    console.error("Error generating token:", error);
    throw new Error("Error generating authentication token");
  }
};

// Export the function to use it in other parts of the application
export default generateToken;
