import { isValidObjectId } from "mongoose"; // Import the function to validate MongoDB Object IDs

/**
 * @desc    Middleware to validate MongoDB ObjectId in request parameters
 * @route   Applied to routes with `:id` parameter
 * @access  Any route where ObjectId validation is required
 * @usage   Use to ensure that the `id` parameter is a valid MongoDB ObjectId
 */
function checkObjectId(req, res, next) {
  // Check if the `id` parameter in the request is a valid MongoDB ObjectId
  if (!isValidObjectId(req.params.id)) {
    // If invalid, respond with a 404 status and throw an error
    res.status(404);
    throw new Error(`Invalid ObjectId: ${req.params.id}`);
  }
  // If valid, proceed to the next middleware or route handler
  next();
}

export default checkObjectId; // Export the middleware for use in other files
