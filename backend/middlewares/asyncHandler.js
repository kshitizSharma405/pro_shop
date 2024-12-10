/**
 * @desc    A middleware function to handle async/await errors in Express routes.
 *          It wraps asynchronous route handlers and passes errors to the next middleware.
 * @param   {Function} fn - The asynchronous route handler function.
 * @returns {Function} A function that wraps the route handler with error handling logic.
 */
const asyncHandler = (fn) => (req, res, next) => {
  // Call the async function and ensure that any errors are caught and passed to the next middleware
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
