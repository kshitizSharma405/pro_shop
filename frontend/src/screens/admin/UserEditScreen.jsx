import React, { useState, useEffect } from "react"; // Import React hooks for state and lifecycle management
import { toast } from "react-toastify"; // For displaying toast notifications
import { Link, useNavigate, useParams } from "react-router-dom"; // For navigation and getting route parameters
import { Form, Button } from "react-bootstrap"; // For form UI components from Bootstrap
import Message from "../../components/Message"; // Custom Message component for displaying error or success messages
import Loader from "../../components/Loader"; // Custom Loader component for showing loading state
import FormContainer from "../../components/FormContainer"; // Wrapper for the form UI
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slices/usersApiSlice"; // API hooks for getting user details and updating user

const UserEditScreen = () => {
  let { id: userId } = useParams(); // Retrieve the user ID from the URL parameters
  const [name, setName] = useState(""); // State for the user's name
  const [email, setEmail] = useState(""); // State for the user's email
  const [isAdmin, setIsAdmin] = useState(false); // State for the user's admin status

  // Fetch user details from the API using the user ID
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation(); // Mutation hook for updating user details

  const navigate = useNavigate(); // Hook for navigation

  // Handler for form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId,
      name,
      email,
      isAdmin, // Including the isAdmin field to update the user's admin status
    };
    try {
      // Perform the update operation
      const result = await updateUser(updatedUser);
      if (result.error) {
        toast.error(result.error); // Display error if update fails
      } else {
        toast.success("User updated"); // Display success if update is successful
        navigate("/admin/userlist"); // Navigate back to the user list page
        refetch(); // Refetch the user details after update
      }
    } catch (err) {
      toast.error("An error occurred"); // Catch any unexpected errors
    }
  };

  // Effect hook to set the form fields with the user data once fetched
  useEffect(() => {
    if (user) {
      setName(user.name); // Set the name field from fetched data
      setEmail(user.email); // Set the email field from fetched data
      setIsAdmin(user.isAdmin); // Set the admin status from fetched data
    }
  }, [user]); // Dependency on user data to ensure the form is updated when the user data changes

  return (
    <>
      {/* Link to navigate back to the user list */}
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      {/* Form container with the title */}
      <FormContainer>
        <h1>Edit User</h1>

        {/* Show loader while the user data is being updated */}
        {loadingUpdate && <Loader />}

        {/* Conditional rendering based on the loading state or error */}
        {isLoading ? (
          <Loader /> // Show loader while user data is being fetched
        ) : error ? (
          <Message variant="danger">{error}</Message> // Show error message if fetching user data fails
        ) : (
          // Form for editing the user
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update the name field value
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update the email field value
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin" className="my-2">
              <Form.Check
                type="checkbox"
                label="isAdmin"
                checked={isAdmin} // Use checked for checkbox input
                onChange={(e) => setIsAdmin(e.target.checked)} // Update the isAdmin value
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
