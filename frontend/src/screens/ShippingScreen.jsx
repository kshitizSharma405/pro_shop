import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import { saveShippingAddress } from "../slices/cartSlice.js";
import CheckOutSteps from "../components/CheckOutSteps.jsx";

const ShippingScreen = () => {
  // Access cart and shipping address from Redux store
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Set initial form values from Redux state or defaults
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [error, setError] = useState(""); // For error handling (e.g., empty fields)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form submission handler
  const submitHandler = (e) => {
    e.preventDefault();

    // Validate the fields before submitting
    if (!address || !city || !postalCode || !country) {
      setError("All fields are required.");
      return;
    }

    // Dispatch the shipping address to Redux store and navigate to the next step
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      {/* Checkout Steps Component */}
      <CheckOutSteps step1 />

      <h1>Shipping</h1>

      {/* Display error message if fields are incomplete */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Shipping Address Form */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        {/* Submit Button */}
        <Button type="submit" className="my-2" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
