import React from "react";
import { Outlet, Navigate } from "react-router-dom"; // Import components for routing
import { useSelector } from "react-redux"; // Import Redux hook to access the state

// AdminRoute component to protect routes that require admin access
const AdminRoute = () => {
  // Get the user information from the Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // Check if the user is logged in and is an admin
  return userInfo && userInfo.isAdmin ? (
    // If the user is an admin, render the nested route (Outlet)
    <Outlet />
  ) : (
    // If the user is not an admin, redirect them to the login page
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
