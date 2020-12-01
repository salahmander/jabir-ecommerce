import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import * as createOrderAction from "../../store/actions/orderActions/orderCreateActions/OrderCreateActions";

import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";

import Message from "../../components/UI/message/Message";

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  // add correct decimal places
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // calulate item price
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // if total item cost is over £100, then free shiping
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 5.99);

  // calulate tax price
  cart.taxPrice = addDecimals(Number((0.2 * cart.itemsPrice).toFixed(2)));

  // calulate total price
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    // dispatch action, with storage values
    dispatch(
      createOrderAction.createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {/* access shipping items in cart obj in store */}
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postcode}, {cart.shippingAddress.country},
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {/* access cartItems in cart obj in store */}
              {cart.cartItems.length === 0 ? (
                <Message> Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          {/* pass product id to placeholder */}
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x £{item.price} = £
                          {Math.round(item.qty * item.price).toFixed(2)}{" "}
                          {/* Round to 2 decimal places */}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              {/* ListGroup.Items are spacious divs */}
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>£{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>£{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>£{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>£{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
