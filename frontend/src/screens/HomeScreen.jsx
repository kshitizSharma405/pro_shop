import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
const HomeScreen = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <React.Fragment>
          <h1>Latest Products</h1>

          <Row>
            {products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;
