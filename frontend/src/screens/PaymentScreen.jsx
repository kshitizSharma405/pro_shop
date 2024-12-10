import React, { useEffect } from "react"; // React import and useEffect hook for handling side effects
import FormContainer from "../components/FormContainer"; // Form container component for layout
import { Form, Col, Button } from "react-bootstrap"; // Bootstrap components for form styling
import CheckOutSteps from "../components/CheckOutSteps"; // CheckOutSteps component for multi-step navigation
import { useState } from "react"; // useState hook for state management
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for dispatching actions and accessing state
import { useNavigate } from "react-router-dom"; // useNavigate hook from React Router for navigation
import { savePaymentMethod } from "../slices/cartSlice"; // Redux action to save payment method to the store

const PaymentScreen = () => {
  const [paymentMethod, setpaymentMethod] = useState("PayPal"); // Initialize state for payment method
  const dispatch = useDispatch(); // Initialize Redux dispatch function
  const navigate = useNavigate(); // Initialize navigate function from React Router
  const cart = useSelector((state) => state.cart); // Get the cart state from Redux store
  const { shippingAddress } = cart; // Destructure shipping address from cart state

  useEffect(() => {
    if (!shippingAddress) {
      // If no shipping address is found, redirect to the shipping page
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]); // Run the effect when navigate or shippingAddress changes

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(savePaymentMethod(paymentMethod)); // Dispatch action to save selected payment method
    navigate("/placeorder"); // Navigate to the place order page
  };

  return (
    <FormContainer>
      {/* CheckOutSteps component renders the progress steps */}
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select method</Form.Label>
          <Col>
            {/* Radio button for selecting PayPal or Credit Card payment method */}
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value={paymentMethod}
              checked
              onChange={(e) => setpaymentMethod(e.target.value)} // Update paymentMethod state when the option is selected
            ></Form.Check>
          </Col>
        </Form.Group>
        {/* Submit button to continue to the next step */}
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
