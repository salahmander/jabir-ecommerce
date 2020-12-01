import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup } from "react-bootstrap";

import * as cartActions from "../../store/actions/cartActions/cartActions";

import Message from "../../components/UI/message/Message";
import CartItemList from "../../components/cart/cartItemList/CartItemList";
import CartSubtotal from "../../components/cart/cartSubtotalCard/CartSubtotalCard";

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;

  //Get qty from query param.
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(cartActions.addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <CartItemList
                  item={item}
                  removeFromCartHandler={removeFromCartHandler}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <CartSubtotal cartItems={cartItems} checkoutHandler={checkoutHandler} />
      </Col>
    </Row>
  );
};

export default CartPage;
