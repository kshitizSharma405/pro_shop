import React, { useEffect } from "react"; // React import
import { useState } from "react"; // React state management
import { Link, useLocation, useNavigate } from "react-router-dom"; // React Router hooks for navigation
import { useDispatch, useSelector } from "react-redux"; // Redux hooks to interact with state
import { setCredentials } from "../slices/authSlice.js"; // Redux action to set user credentials
import { useLoginMutation } from "../slices/usersApiSlice.js"; // Mutation hook to call the login API
import Loader from "../components/Loader.jsx"; // Loading indicator while waiting for API response
import { toast } from "react-toastify"; // To display notifications
import { Form, Button, Row, Col } from "react-bootstrap"; // Bootstrap components for layout
import FormContainer from "../components/FormContainer.jsx"; // Custom container component for the form

const LoginScreen = () => {
  // Declare state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch(); // Redux dispatch to send actions
  const navigate = useNavigate(); // Hook to programmatically navigate the user
  const [login, { isLoading }] = useLoginMutation(); // Mutation hook for login API
  const { userInfo } = useSelector((state) => state.auth); // Access user info from Redux store
  const { search } = useLocation(); // Get query parameters from the URL
  const sp = new URLSearchParams(search); // Parse query parameters
  const redirect = sp.get("redirect") || "/"; // Get the redirect path (defaults to homepage)

  // If user is already logged in, redirect to the specified path
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // Handle form submission for login
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Attempt login using email and password
      const res = await login({ email, password }).unwrap();
      // If successful, dispatch the user credentials to Redux store
      dispatch(setCredentials({ ...res }));
      navigate(redirect); // Redirect user after successful login
    } catch (err) {
      // If there's an error, show it as a toast notification
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <FormContainer>
      {" "}
      {/* Custom wrapper component for the form */}
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        {" "}
        {/* Form for login */}
        {/* Email input */}
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
          ></Form.Control>
        </Form.Group>
        {/* Password input */}
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
          ></Form.Control>
        </Form.Group>
        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading} // Disable button while loading
        >
          Sign In
        </Button>
        {isLoading && <Loader />} {/* Show loader if login is in progress */}
      </Form>
      {/* Link to register page for new users */}
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            {" "}
            {/* Conditional redirect */}
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
