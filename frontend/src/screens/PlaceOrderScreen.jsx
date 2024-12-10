import React, { useEffect } from "react";
import { Row, Col, Button, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CheckOutSteps from "../components/CheckOutSteps.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
import { useCreateOrderMutation } from "../slices/orderApiSlice.js";
import { clearCartItems } from "../slices/cartSlice.js";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart); // Cart data from Redux store
  const [createOrder, { isLoading, error }] = useCreateOrderMutation(); // Mutation to create the order

  // Redirect the user if shipping address or payment method is not provided
  useEffect(() => {
    if (!cart?.shippingAddress?.address) {
      navigate("/shipping"); // Navigate to shipping screen if address is not present
    } else if (!cart?.paymentMethod) {
      navigate("/payment"); // Navigate to payment screen if payment method is not provided
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  // Function to handle order placement
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems()); // Clear cart after placing the order
      navigate(`/order/${res?._id}`); // Navigate to the order details page
    } catch (error) {
      // Catch any errors from the server or network and display them to the user
      const errorMessage =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorMessage); // Show error message using toast
    }
  };

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />{" "}
      {/* Display the steps in checkout */}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {/* Shipping Address Section */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart?.shippingAddress?.address},{" "}
                {cart?.shippingAddress.city},{" "}
                {cart?.shippingAddress?.postalCode} ,{" "}
                {cart?.shippingAddress.country}
              </p>
            </ListGroup.Item>

            {/* Payment Method Section */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {cart?.paymentMethod}
              </p>
            </ListGroup.Item>

            {/* Order Items Section */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart?.cartItems?.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart?.cartItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item?.image}
                            alt={item?.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item?.product}`}>
                            {item?.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item?.qty} x {item?.price} = ${" "}
                          {(item?.qty * item?.price).toFixed(2)}
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
                <h2>Summary Order</h2>
              </ListGroup.Item>

              {/* Order Summary Section */}
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart?.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* Error Message if there is an error */}
              <ListGroup.Item>
                {error && (
                  <Message variant="danger">
                    {error?.data?.message || error.error}
                  </Message>
                )}
              </ListGroup.Item>

              {/* Place Order Button */}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={isLoading || cart?.cartItems?.length === 0}
                  onClick={placeOrderHandler}
                >
                  {isLoading ? "Placing Order..." : "Place Order"}
                </Button>
                {isLoading && <Loader />}{" "}
                {/* Show loader if the order is being placed */}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
