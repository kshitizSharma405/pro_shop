import React from "react"; // Import React for JSX support
import { Container, Row, Col } from "react-bootstrap"; // Import required components from React-Bootstrap for layout

// Footer component to display the footer content with copyright information
const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          {/* Column to center the content and apply padding */}
          <Col className="text-center py-3">
            {/* Display the copyright symbol and the current year */}
            <p>ProShop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
