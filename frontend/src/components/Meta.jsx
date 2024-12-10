import React from "react"; // Import React
import { Helmet } from "react-helmet-async"; // Import Helmet for handling meta tags in the document head

// Meta component for setting the title, description, and keywords of the page dynamically
const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title> {/* Dynamically set the page title */}
      <meta name="description" content={description} />{" "}
      {/* Dynamically set the page description */}
      <meta name="keywords" content={keyword} />{" "}
      {/* Dynamically set the keywords for the page */}
    </Helmet>
  );
};

// Setting default props for the component in case no values are passed in
Meta.defaultProps = {
  title: "Welcome to ProShop", // Default title of the page
  description: "We deliver the best products at affordable prices", // Default description of the page
  keyword: "electronics, buy electronics, cheap electronics", // Default keywords for SEO
};

export default Meta; // Export the Meta component
