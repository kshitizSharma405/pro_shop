import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toast notification styles
import Header from "./components/Header.jsx"; // Import the Header component
import Footer from "./components/Footer.jsx"; // Import the Footer component

/**
 * Main App component that includes global layout and routing
 * @returns {JSX.Element} - The layout structure of the application
 */
const App = () => {
  return (
    <>
      {/* Header of the application */}
      <Header />

      {/* Main content area with a container */}
      <main className="py-3">
        <Container>
          {/* Outlet renders the matched child route component */}
          <Outlet />
        </Container>
      </main>

      {/* Footer of the application */}
      <Footer />

      {/* Toast notifications container for global usage */}
      <ToastContainer />
    </>
  );
};

export default App;
