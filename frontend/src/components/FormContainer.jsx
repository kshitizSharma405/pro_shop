import { Container, Row, Col } from "react-bootstrap"; // Import React-Bootstrap components for layout
import React from "react"; // Import React for JSX support

// FormContainer component to wrap form elements and provide a centered layout
const FormContainer = ({ children }) => {
  return (
    <Container>
      {/* Row with centered content */}
      <Row className="justify-content-md-center">
        {/* Column with responsive width */}
        <Col xs={12} md={6}>
          {/* Render the children elements inside the column */}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
