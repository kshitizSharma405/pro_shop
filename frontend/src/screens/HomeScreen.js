import { Row, Col } from "react-bootstrap";
import Product from "../components/product.js";
import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      };
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);
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
