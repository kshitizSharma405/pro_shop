import React from "react"; // Import React
import { Spinner } from "react-bootstrap"; // Import the Spinner component from React Bootstrap

// Loader component to display a loading spinner
const Loader = () => {
  return (
    // The Spinner component is used to show a loading indicator
    <Spinner
      animation="border" // Border animation style, can be changed to "grow" if needed
      role="status" // Helps with accessibility by describing the spinner as a loading indicator
      aria-label="Loading..." // Describes the spinner for screen readers (improves accessibility)
      style={{
        height: "100px", // Sets the size of the spinner
        width: "100px", // Sets the size of the spinner
        display: "block", // Ensures the spinner is block-level (takes full width)
        margin: "auto", // Centers the spinner horizontally
      }}
    />
  );
};

export default Loader;
