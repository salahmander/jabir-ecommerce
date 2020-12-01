import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import * as productListActions from "../../store/actions/productActions/productListActions/productListActions";

import Loader from "../../components/UI/loader/Loader";
import Meta from "../../components/UI/meta/Meta";
import Message from "../../components/UI/message/Message";
import Paginate from "../../components/paginate/Paginate";
import ProductCard from "../../components/product/productCard/ProductCard";
import ProductCarousel from "../../components/product/productCarousel/ProductCarousel";

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(productListActions.fetchProductsList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-dark my-3">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
