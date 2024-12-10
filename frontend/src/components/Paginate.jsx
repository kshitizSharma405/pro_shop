import { Pagination } from "react-bootstrap"; // Import Pagination component from React Bootstrap
import { LinkContainer } from "react-router-bootstrap"; // Import LinkContainer for navigation with react-router

// Paginate component for rendering page navigation
const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  // Only render pagination if there are multiple pages
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          // Generate pagination items for each page
          <LinkContainer
            key={x + 1} // Add key to each LinkContainer to avoid React warnings
            to={
              // Check if the user is on admin page or search result page
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}` // For search results, include keyword and page number
                  : `/page/${x + 1}` // Normal page navigation
                : `/admin/productlist/${x + 1}` // For admin, navigate to the product list with page number
            }
          >
            <Pagination.Item active={x + 1 === page}>
              {" "}
              {/* Highlight active page */}
              {x + 1} {/* Display the page number */}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate; // Export the Paginate component
