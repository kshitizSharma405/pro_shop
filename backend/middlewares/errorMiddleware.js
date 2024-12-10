/**
 * @desc    Middleware to handle 404 errors (resource not found)
 * @usage   Triggered when no matching route is found
 */
const notFound = (req, res, next) => {
  // Create a new error with a custom message including the requested URL
  const error = new Error(`Not Found - ${req.originalUrl}`);

  // Set the response status code to 404 (Not Found)
  res.status(404);

  // Pass the error to the next middleware (error handler)
  next(error);
};

/**
 * @desc    Middleware to handle all application errors
 * @usage   Catches and processes errors passed through `next()` or thrown in routes/middleware
 */
const errorHandler = (err, req, res, next) => {
  // If no status code was set, default to 500 (Internal Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Use the error message passed with the error object
  let message = err.message;

  // Send the error response as JSON
  res.status(statusCode).json({
    message, // Error message
    stack:
      process.env.NODE_ENV === "production"
        ? "🥞" // Hide stack trace in production
        : err.stack, // Provide stack trace in development for debugging
  });
};

export { notFound, errorHandler }; // Export both middlewares
