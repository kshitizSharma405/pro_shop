import React from "react"; // Import React
import { Card } from "react-bootstrap"; // Import Card component from react-bootstrap
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import Rating from "./Rating"; // Import the Rating component to display product ratings

// Product component receives a product object as a prop
const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      {/* Product image linking to the product detail page */}
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} alt={product.name} />{" "}
        {/* Display product image */}
      </Link>

      <Card.Body>
        {/* Product name linking to the product detail page */}
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong> {/* Display product name */}
          </Card.Title>
        </Link>
        <Card.Text as="div">
          {/* Display product rating and review count */}
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`} // Display the number of reviews
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>{" "}
        {/* Display product price */}
      </Card.Body>
    </Card>
  );
};

export default Product; // Export Product component for use in other parts of the app
