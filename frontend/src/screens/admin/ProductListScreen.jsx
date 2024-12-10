import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap"; // Importing React-Bootstrap components
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons for edit and delete actions
import Message from "../../components/Message"; // Custom Message component for displaying error/success messages
import Loader from "../../components/Loader"; // Custom Loader component for showing loading state
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice"; // API hooks to fetch, create, and delete products
import { LinkContainer } from "react-router-bootstrap"; // For linking the edit page with react-router-bootstrap
import { toast } from "react-toastify"; // For displaying toast notifications
import { useParams } from "react-router-dom"; // For retrieving dynamic route parameters (page number)
import Paginate from "../../components/Paginate"; // Custom pagination component

const ProductListScreen = () => {
  const { pageNumber } = useParams(); // Retrieve the page number from the URL parameters
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  }); // Fetch product data from API
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation(); // Mutation hook for creating a new product
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation(); // Mutation hook for deleting a product

  // Handler for deleting a product
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      // Confirm before deleting
      try {
        await deleteProduct(id); // Attempt to delete the product
        refetch(); // Refetch the product list to reflect the change
      } catch (err) {
        toast.error(err?.data?.message || err?.error); // Display error if deletion fails
      }
    }
  };

  // Handler for creating a new product
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a product?")) {
      // Confirm before creating
      try {
        await createProduct(); // Attempt to create a new product
        refetch(); // Refetch the product list to show the newly created product
      } catch (err) {
        toast.error(err?.data?.message || err.error); // Display error if creation fails
      }
    }
  };

  return (
    <>
      {/* Header with the title and "Create Product" button */}
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1> {/* Title of the product list screen */}
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product {/* Button to create a new product */}
          </Button>
        </Col>
      </Row>

      {/* Loader visible when product is being created or deleted */}
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {/* Conditional rendering based on loading/error states */}
      {isLoading ? (
        <Loader /> // Show loader while products are being fetched
      ) : error ? (
        <Message variant="danger">{error}</Message> // Show error message if an error occurs
      ) : (
        <>
          {/* Product table displaying the list of products */}
          <Table striped hover responsive className="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th> {/* Actions column for editing and deleting */}
              </tr>
            </thead>
            <tbody>
              {/* Map through products and render each product row */}
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    {/* Edit button - Redirects to edit page for the product */}
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-1">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    {/* Delete button - Calls deleteHandler to delete the product */}
                    <Button
                      variant="danger"
                      className="btn-sm mx-1"
                      onClick={() => {
                        return deleteHandler(product._id); // Delete the product when clicked
                      }}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination component */}
          <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
