import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  // Initialize navigate function from react-router-dom
  const navigate = useNavigate();

  // Get keyword from URL params, fallback to empty string if not present
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || ""); // Set the initial keyword value

  // Submit handler function for search form
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (keyword.trim()) {
      setKeyword(""); // Reset keyword after submitting
      navigate(`/search/${keyword}`); // Navigate to search results page with the keyword
    } else {
      navigate("/"); // If no keyword, navigate to homepage
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      {/* Input field for entering search keyword */}
      <Form.Control
        type="text"
        name="q"
        value={keyword} // Controlled input value
        onChange={(e) => setKeyword(e.target.value)} // Update keyword on change
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5" // Bootstrap spacing classes
      ></Form.Control>

      {/* Search button */}
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
