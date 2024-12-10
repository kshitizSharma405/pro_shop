import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Rating component takes 'value' (numeric rating) and 'text' (optional label)
const Rating = ({ value, text }) => {
  // Helper function to determine which star to display based on value
  const renderStar = (starValue) => {
    if (value >= starValue) return <FaStar />; // Full star
    if (value >= starValue - 0.5) return <FaStarHalfAlt />; // Half star
    return <FaRegStar />; // Empty star
  };

  return (
    <div className="rating">
      {/* Rendering 5 stars based on the rating value */}
      <span>{renderStar(1)}</span>
      <span>{renderStar(2)}</span>
      <span>{renderStar(3)}</span>
      <span>{renderStar(4)}</span>
      <span>{renderStar(5)}</span>

      {/* Optionally display text next to the rating */}
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;
