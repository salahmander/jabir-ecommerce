import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import * as productDetailAction from "../../../../store/actions/productActions/productDetailActions/productDetailActions";
import * as productEditAction from "../../../../store/actions/adminActions/productActions/productEditActions/productEditActions";

import Message from "../../../../components/UI/message/Message";
import Loader from "../../../../components/UI/loader/Loader";
import FormContainer from "../../../../components/form/FormContainer";

const ProductEditPage = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const productEdit = useSelector((state) => state.productEdit);
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = productEdit;

  useEffect(() => {
    if (successEdit) {
      dispatch(productEditAction.resetProductEdit());
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productDetailAction.fetchProductDetail(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successEdit]);

  const uploadFileHandler = (event) => {
    const file = event.target.files[0]; //Get first file from array.
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("/api/upload", formData, config)
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((error) => {
        console.error(error);
        setUploading(false);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      productEditAction.editProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingEdit && <Loader />}
        {errorEdit && <Message variant="danger">{errorEdit}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(event) => setCountInStock(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
