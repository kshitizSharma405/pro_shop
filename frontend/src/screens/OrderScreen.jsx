import React from "react"; // React import
import { useEffect } from "react"; // useEffect hook for handling side effects
import { Link, useParams } from "react-router-dom"; // React Router hooks for navigating and fetching params
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap"; // Bootstrap components for layout and styling
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"; // PayPal components for integration
import { useSelector } from "react-redux"; // Redux hook to access store
import { toast } from "react-toastify"; // Toast notifications
import Message from "../components/Message"; // Message component for displaying notifications
import Loader from "../components/Loader"; // Loader component for loading state
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../slices/orderApiSlice.js"; // API slice hooks for order and payment management

const OrderScreen = () => {
  const { id: orderId } = useParams(); // Extract orderId from URL parameters

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId); // Fetch order details using the order ID

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation(); // Mutation hook to handle order payment

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation(); // Mutation hook to mark an order as delivered

  const { userInfo } = useSelector((state) => state.auth); // Access user info from Redux store

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer(); // PayPal script reducer for handling PayPal state

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery(); // Fetch PayPal client ID from the server

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        // Set up the PayPal script options using the client ID and currency
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        // Only load PayPal script if the order is not paid yet
        if (!window.paypal) {
          loadPaypalScript(); // Load PayPal script if not already loaded
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]); // Dependency array to re-run effect

  // Handle PayPal approval after a successful transaction
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }); // Pay the order using the captured PayPal details
        refetch(); // Refetch the order details to update the state
        toast.success("Order is paid"); // Display success notification
      } catch (err) {
        toast.error(err?.data?.message || err.error); // Display error notification if payment fails
      }
    });
  }

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } }); // Test order payment
    refetch(); // Refetch the order details to update the state
    toast.success("Order is paid"); // Display success notification
  }

  function onError(err) {
    toast.error(err.message); // Display error notification if something goes wrong with PayPal
  }

  // Create PayPal order with the total price from the order
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice }, // Set the total price of the order
          },
        ],
      })
      .then((orderID) => {
        return orderID; // Return the created order ID
      });
  }

  // Handle the action to mark an order as delivered
  const deliverHandler = async () => {
    await deliverOrder(orderId); // Deliver the order using the mutation
    refetch(); // Refetch the order details to update the state
  };

  return isLoading ? (
    <Loader /> // Show loading indicator while fetching order data
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message> // Show error message if fetching fails
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message> // Show message if no items in the order
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* Payment and delivery actions */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader /> // Show loader if PayPal is pending
                  ) : (
                    <div>
                      {/* THIS BUTTON IS FOR TESTING ONLY, REMOVE BEFORE PRODUCTION! */}
                      <Button
                        style={{ marginBottom: "10px" }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button>

                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}{" "}
              {/* Show loader while marking as delivered */}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
