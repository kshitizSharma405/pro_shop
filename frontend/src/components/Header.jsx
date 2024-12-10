import React from "react"; // Import React
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks for dispatching actions and selecting state
import { useNavigate } from "react-router-dom"; // Import navigation hook to navigate between routes
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap"; // Import Bootstrap components
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Import icons for cart and user
import logo from "../assets/logo.png"; // Import logo image
import { LinkContainer } from "react-router-bootstrap"; // Import LinkContainer for react-router-bootstrap integration
import { useLogoutMutation } from "../slices/usersApiSlice.js"; // Import logout API mutation hook
import { logout } from "../slices/authSlice.js"; // Import logout action from auth slice
import { toast } from "react-toastify"; // Import toast for notifications
import { resetCart } from "../slices/cartSlice.js"; // Import resetCart action from cart slice
import SearchBox from "./SearchBox.jsx"; // Import SearchBox component for search functionality

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart); // Get cart items from Redux store
  const { userInfo } = useSelector((state) => state.auth); // Get user information from Redux store
  const dispatch = useDispatch(); // Access dispatch function to dispatch actions
  const navigate = useNavigate(); // Access navigate function to navigate to different routes
  const [logoutApiCall] = useLogoutMutation(); // Initialize logout API mutation hook

  // Handler for logging out the user
  const logoutHandler = async () => {
    try {
      // Call the logout API
      await logoutApiCall().unwrap();
      // Dispatch logout and reset cart actions to the Redux store
      dispatch(logout());
      dispatch(resetCart());
      // Redirect user to the login page after successful logout
      navigate("/login");
    } catch (error) {
      // Display error notification if logout fails
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          {/* Link to the home page */}
          <LinkContainer to="/">
            <Navbar.Brand>
              {/* Display logo image and store name */}
              <img src={logo} alt="ProShop" />
              ProShop
            </Navbar.Brand>
          </LinkContainer>

          {/* Navbar toggle for responsive view */}
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>

          {/* Navbar collapse for better mobile view */}
          <Navbar.Collapse>
            <Nav className="ms-auto">
              {/* Include SearchBox component for search functionality */}
              <SearchBox />

              {/* Link to the cart page */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart{" "}
                  {/* Display item count in the cart if there are items */}
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {/* If the user is logged in, show dropdown with user options */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  {/* Link to the profile page */}
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {/* Option to log out */}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // If the user is not logged in, show Sign In link
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* If the user is an admin, show admin options */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  {/* Admin links for managing products, users, and orders */}
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
