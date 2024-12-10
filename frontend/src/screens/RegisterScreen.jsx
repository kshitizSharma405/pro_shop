import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice.js";
import { useRegisterMutation } from "../slices/usersApiSlice.js";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";

const RegisterScreen = () => {
  // State hooks for managing form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Dispatch for Redux actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Register mutation hook for API request
  const [register, { isLoading }] = useRegisterMutation();

  // Retrieve user info from Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // Get redirect URL from query parameters
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // If user is already logged in, redirect to the specified page or home
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // Submit handler for the registration form
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Call register API mutation with provided form data
      const res = await register({ name, email, password }).unwrap();

      // Update Redux state with the user credentials
      dispatch(setCredentials({ ...res }));

      // Redirect user to the specified route after successful registration
      navigate(redirect);
    } catch (err) {
      // Display error message if registration fails
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        {/* Name input field */}
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Email input field */}
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Password input field */}
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Confirm password input field */}
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Register
        </Button>

        {/* Loader component when registering */}
        {isLoading && <Loader />}
      </Form>

      {/* Link to login page if user already has an account */}
      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Log in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
