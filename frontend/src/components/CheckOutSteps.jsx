import React from "react"; // Import React for JSX support
import { Nav } from "react-bootstrap"; // Import Nav from React-Bootstrap for navigation
import { LinkContainer } from "react-router-bootstrap"; // Import LinkContainer to link React-Bootstrap Nav items with React Router

// CheckOutSteps component to display the steps for checkout process
const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    // Render the Nav component for displaying the steps in the checkout process
    <Nav className="justify-content-center mb-4">
      {/* Sign In Step */}
      <Nav.Item>
        {step1 ? (
          // If step1 is true, make the "Sign In" step clickable, linking to the login page
          <LinkContainer to="/login">
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          // If step1 is false, disable the "Sign In" step
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      {/* Shipping Step */}
      <Nav.Item>
        {step2 ? (
          // If step2 is true, make the "Shipping" step clickable, linking to the shipping page
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          // If step2 is false, disable the "Shipping" step
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      {/* Payment Step */}
      <Nav.Item>
        {step3 ? (
          // If step3 is true, make the "Payment" step clickable, linking to the payment page
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          // If step3 is false, disable the "Payment" step
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      {/* Place Order Step */}
      <Nav.Item>
        {step4 ? (
          // If step4 is true, make the "Place Order" step clickable, linking to the place order page
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          // If step4 is false, disable the "Place Order" step
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckOutSteps;
