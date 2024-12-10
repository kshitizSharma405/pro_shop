import React from "react";
import { Table, Button } from "react-bootstrap"; // Importing UI components from react-bootstrap
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa"; // Icons for different actions
import Message from "../../components/Message"; // Custom Message component for displaying error or success messages
import Loader from "../../components/Loader"; // Custom Loader component for showing loading state
import { toast } from "react-toastify"; // For displaying toast notifications
import {
  useGetUsersQuery, // API hook for fetching users
  useDeleteUserMutation, // API hook for deleting a user
} from "../../slices/usersApiSlice";
import { LinkContainer } from "react-router-bootstrap"; // For navigation using react-router

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery(); // Fetch users from the API
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation(); // Mutation hook for deleting a user

  // Function to handle deleting a user
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      // Confirmation before deleting
      try {
        await deleteUser(id); // Call the delete mutation
        refetch(); // Refetch the users list after deletion
        toast.success("User deleted"); // Show success message
      } catch (err) {
        toast.error(err?.data?.message || err?.error); // Show error message if deletion fails
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />} {/* Show loader when deleting */}
      {isLoading ? (
        <Loader /> // Show loader while fetching users
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message> // Show error message if fetching fails
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          {" "}
          {/* Display user table */}
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th> {/* Action buttons */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                  {/* Email as a clickable link */}
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} /> // Show a check icon if the user is an admin
                  ) : (
                    <FaTimes style={{ color: "red" }} /> // Show a cross icon if the user is not an admin
                  )}
                </td>
                <td>
                  <LinkContainer
                    to={`/admin/user/${user._id}/edit`}
                    className="mx-1"
                  >
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm mx-1"
                    onClick={() => deleteHandler(user._id)} // Delete user when clicked
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
