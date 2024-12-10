import React from "react";
import { Table, Button } from "react-bootstrap"; // Importing Bootstrap components for styling
import { FaTimes } from "react-icons/fa"; // Importing the 'FaTimes' icon for visual indication
import Message from "../../components/Message"; // Importing a custom Message component for error notifications
import Loader from "../../components/Loader"; // Importing a custom Loader component for showing loading state
import { useGetOrdersQuery } from "../../slices/orderApiSlice"; // Importing the API hook to fetch orders
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation

// The OrderListScreen component displays a table of orders with their details
const OrderListScreen = () => {
  // Using the hook to get orders data with loading and error states
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        // Display Loader component while data is being fetched
        <Loader />
      ) : error ? (
        // Display error message if fetching orders failed
        <Message variant="danger">
          {error?.data?.message || error.error}{" "}
          {/* Show specific error or fallback */}
        </Message>
      ) : (
        // Render table if data is successfully fetched
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              {/* Table headers */}
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through the orders and displaying each order's details in a row */}
            {orders.map((order) => (
              <tr key={order._id}>
                {/* Displaying order details */}
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>{" "}
                {/* Check if user exists */}
                <td>{order.createdAt.substring(0, 10)}</td>{" "}
                {/* Format date to show only YYYY-MM-DD */}
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    // If the order is paid, show the payment date
                    order.paidAt.substring(0, 10)
                  ) : (
                    // If not paid, show a red 'X' icon
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    // If the order is delivered, show the delivery date
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    // If not delivered, show a red 'X' icon
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {/* Link to the details page of the specific order */}
                  <Button
                    as={Link}
                    to={`/order/${order._id}`} // Navigates to the order details page
                    variant="light"
                    className="btn-sm"
                  >
                    Details
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

export default OrderListScreen;
