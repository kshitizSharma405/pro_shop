import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Meta from "../components/Meta.jsx";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Rating from "../components/Rating.jsx";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { addToCart } from "../slices/cartSlice.js";

const ProductScreen = () => {
  const { id: productId } = useParams(); // Retrieve product ID from the URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  const [qty, setQty] = useState(1); // Default quantity set to 1
  const [rating, setRating] = useState(0); // Initial rating
  const [comment, setComment] = useState(""); // Initial comment
  const { userInfo } = useSelector((state) => state.auth); // Get user information from Redux store
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId); // Fetch product details by product ID

  // Handle adding the product to the cart
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty })); // Dispatch the action to add to cart
    navigate("/cart"); // Navigate to cart screen
  };

  // Handle review submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!rating || !comment) {
      toast.error("Please provide both rating and comment");
      return;
    }
    try {
      // Send review data to the server
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch(); // Refetch product details after review submission
      toast.success("Review Submitted");
      setRating(0); // Reset rating field
      setComment(""); // Reset comment field
    } catch (err) {
      // Handle errors if review submission fails
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader /> // Show loading spinner while product details are being fetched
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message> // Show error message if the product data fetch fails
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={5}>
              <Image
                src={
                  product.image.startsWith("/images")
                    ? product.image
                    : `/${product.image}`
                }
                alt={product.name}
                fluid
              />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {`${
                            product.countInStock > 0
                              ? "In Stock"
                              : "Out Of Stock"
                          }`}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* Review Section */}
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {loadingProductReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="my-2">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        {loadingProductReview ? "Submitting..." : "Submit"}
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
