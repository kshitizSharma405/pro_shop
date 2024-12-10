import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // For showing notifications (success/error messages)
import { Link, useNavigate, useParams } from "react-router-dom"; // For routing and navigation
import { Form, Button } from "react-bootstrap"; // Importing Bootstrap components for styling
import Message from "../../components/Message"; // Custom message component to display error messages
import Loader from "../../components/Loader"; // Custom loader component to show loading state
import FormContainer from "../../components/FormContainer"; // Custom form container component to wrap the form
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice"; // Hooks for interacting with the product API slice

// ProductEditScreen allows admins to edit product details
const ProductEditScreen = () => {
  // Retrieving productId from URL params using useParams hook
  let { id: productId } = useParams();

  // State variables to manage product attributes
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  // API hooks to get product details, update product, and upload images
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate(); // For programmatic navigation

  // Submit handler to update the product details
  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      category,
      brand,
      description,
      countInStock,
      image,
    };
    // Triggering product update API call
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error); // Display error if the update fails
    } else {
      toast.success("Product updated"); // Show success toast on successful update
      navigate("/admin/productlist"); // Redirect to product list after update
    }
  };

  // Upload image handler
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]); // Attach the uploaded file to FormData
    try {
      // API call to upload the image and get the image URL
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message); // Show success message after image upload
      setImage(res.image); // Update the image state with the uploaded image URL
    } catch (err) {
      toast.error(err?.data?.message || err?.error); // Show error message if upload fails
    }
  };

  // UseEffect hook to set product details in state when product is fetched
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setImage(product.image);
    }
  }, [product]); // Dependency on 'product', ensures the effect runs when product data changes

  return (
    <>
      {/* Button to go back to the product list */}
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      {/* FormContainer for wrapping the edit form */}
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}{" "}
        {/* Show loader when the product is being updated */}
        {/* Loading state or error message */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}{" "}
            {/* Show error message if fetching product details fails */}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {/* Form group for editing product name */}
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Updating name state on input change
              ></Form.Control>
            </Form.Group>
            {/* Form group for editing product price */}
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)} // Updating price state on input change
              ></Form.Control>
            </Form.Group>
            {/* Form group for image URL */}
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image url"
                value={image}
                onChange={(e) => setImage(e.target.value)} // Updating image state on input change
              ></Form.Control>

              {/* File input for image upload */}
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={uploadFileHandler} // Triggering uploadFileHandler on file selection
              ></Form.Control>
            </Form.Group>
            {loadingUpload && <Loader />}{" "}
            {/* Show loader during image upload */}
            {/* Form group for editing brand */}
            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)} // Updating brand state on input change
              ></Form.Control>
            </Form.Group>
            {/* Form group for editing stock count */}
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter CountInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)} // Updating countInStock state on input change
              ></Form.Control>
            </Form.Group>
            {/* Form group for editing product category */}
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)} // Updating category state on input change
              ></Form.Control>
            </Form.Group>
            {/* Form group for editing product description */}
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Updating description state on input change
              ></Form.Control>
            </Form.Group>
            {/* Submit button to update the product */}
            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
