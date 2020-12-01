import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col, Image, Button, Form } from "react-bootstrap";

import * as cartActions from "../../../store/actions/cartActions/cartActions";

const CartItemList = ({ item, removeFromCartHandler }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Row>
        <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col md={3}>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
        </Col>
        <Col md={2}>£{item.price}</Col>
        <Col md={2}>
          <Form.Control
            as="select"
            value={item.qty}
            onChange={(event) =>
              dispatch(
                cartActions.addToCart(item.product, Number(event.target.value))
              )
            }
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={2}>
          <Button
            type="button"
            variant="light"
            onClick={() => removeFromCartHandler(item.product)}
          >
            <i className="fas fa-trash" />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CartItemList;
