import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap"; // Importing UI components
import { FaTrash } from "react-icons/fa"; // Trash icon for removing items
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import Message from "../components/Message.jsx"; // Custom Message component
import { addToCart, removeFromCart } from "../slices/cartSlice.js"; // Redux actions for adding/removing items

const CartScreen = () => {
  const navigate = useNavigate(); // For navigation
  const dispatch = useDispatch(); // For dispatching actions
  const { cartItems } = useSelector((state) => state.cart); // Access cartItems from Redux store

  // Function to handle adding items to the cart
  const addToCartHandler = async (product, qty) => {
    return dispatch(addToCart({ ...product, qty }));
  };

  // Function to handle removing items from the cart
  const removeFromCartHandler = (id) => {
    return dispatch(removeFromCart(id));
  };

  // Redirect to login page if not logged in
  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col md="8">
        <h1 style={{ marginLeft: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? ( // Display message if cart is empty
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {" "}
            {/* List of cart items */}
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image} // Product image
                        alt={item.name} // Alt text for image
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>{" "}
                      {/* Product name with link */}
                    </Col>
                    <Col md={2}>{item.price}</Col> {/* Product price */}
                    <Col md={2}>
                      {/* Dropdown to select product quantity */}
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      {/* Button to remove product from cart */}
                      <Button
                        as="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                {" "}
                Subtotal ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                .toFixed(2)}{" "}
              {/* Calculating and displaying subtotal */}
            </ListGroup.Item>
            <ListGroup.Item>
              {/* Button to proceed to checkout */}
              <Button
                type="button"
                disabled={cartItems.length === 0} // Disable if no items in cart
                onClick={checkOutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
