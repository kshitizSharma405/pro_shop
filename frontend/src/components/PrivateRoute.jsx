import React from "react"; // Import React
import { Outlet, Navigate } from "react-router-dom"; // Import Outlet for rendering child routes, Navigate for redirection
import { useSelector } from "react-redux"; // Import useSelector to access the Redux state

// PrivateRoute component for handling protected routes
const PrivateRoute = () => {
  // Destructure the userInfo from the Redux store's auth slice
  const { userInfo } = useSelector((state) => state.auth);

  // If user is authenticated, render the child routes (Outlet), else redirect to login
  return userInfo ? (
    <Outlet /> // Render child components if the user is logged in
  ) : (
    <Navigate to="/login" replace /> // Redirect to login if the user is not authenticated
  );
};

export default PrivateRoute; // Export the PrivateRoute component
