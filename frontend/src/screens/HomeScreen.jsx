import React from "react";
import { Row, Col } from "react-bootstrap"; // Grid system for responsive layout
import Product from "../components/Product.jsx"; // Product display component
import { useGetProductsQuery } from "../slices/productsApiSlice.js"; // API query hook for fetching products
import Loader from "../components/Loader.jsx"; // Loader component to show while data is being fetched
import Message from "../components/Message.jsx"; // Message component to display errors or other information
import { Link, useParams } from "react-router-dom"; // Router hooks for navigation and params
import Paginate from "../components/Paginate.jsx"; // Pagination component for product pages
import ProductCarousel from "../components/ProductCarousel.jsx"; // Carousel for featured products

const HomeScreen = () => {
  // Destructuring pageNumber and keyword from the URL params
  const { pageNumber, keyword } = useParams();

  // API hook to fetch products based on page number and search keyword
  const { data, error, isLoading } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {!keyword ? ( // If no search keyword is provided, show the product carousel
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          {" "}
          {/* Link to go back to the homepage */}
          Go Back
        </Link>
      )}

      {/* If products are being loaded, show a loading spinner */}
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">
          {" "}
          {/* Show error message if there is an error */}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1> {/* Display "Latest Products" title */}
          <Row>
            {" "}
            {/* Grid of product cards */}
            {data.products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  {" "}
                  {/* Bootstrap grid columns for responsiveness */}
                  <Product product={product} />{" "}
                  {/* Display individual product */}
                </Col>
              );
            })}
          </Row>
          {/* Pagination component */}
          <Paginate
            page={data.page} // Current page
            pages={data.pages} // Total number of pages
            keyword={keyword ? keyword : ""} // Pass the search keyword if present
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
