import products from "../products.js";
import { Row, Col } from "react-bootstrap";
import Product from "../components/product.js";
import React from "react";
const HomeScreen = () => {
  return (
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
  );
};

export default HomeScreen;
