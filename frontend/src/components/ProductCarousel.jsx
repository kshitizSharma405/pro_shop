import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  // Fetch data from the API using the custom hook provided by productsApiSlice
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  // Show loader while data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Show an error message if there's an error fetching the data
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  // Handle case where no products are available
  if (!products || products.length === 0) {
    return <Message variant="info">No top products available.</Message>;
  }

  // Main render: Product carousel with the fetched products
  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {/* Map over the products array and create a Carousel.Item for each product */}
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            {/* Display the product image */}
            <Image
              src={product.image}
              alt={product.name}
              fluid
              // Add 'fluid' prop to ensure responsive image rendering
            />
            {/* Add caption with product name and price */}
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
                {/* Display product name and price */}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
