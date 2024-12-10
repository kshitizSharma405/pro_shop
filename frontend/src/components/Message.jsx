import React from "react"; // Import React library
import { Alert } from "react-bootstrap"; // Import Alert component from React Bootstrap

// Message component to display different types of alert messages
const Message = ({ variant = "info", children }) => {
  return (
    // Alert component that takes in a 'variant' prop to determine the type of alert (e.g., 'info', 'success', 'danger')
    <Alert variant={variant}>
      {children} {/* Render the children inside the alert */}
    </Alert>
  );
};

export default Message; // Export the Message component
