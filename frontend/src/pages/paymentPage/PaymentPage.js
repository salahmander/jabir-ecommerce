import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import * as savePaymentAction from "../../store/actions/cartActions/cartActions";

import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import FormContainer from "../../components/form/FormContainer";

import Message from "../../components/UI/message/Message";

const PaymentPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    if (paymentMethod.length === 0) {
      setMessage("Please select a payment method");
    } else {
      dispatch(savePaymentAction.savePaymentMethod(paymentMethod));
      history.push("/placeorder");
    }
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      {message && <Message variant="danger">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend"> Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              onChange={(event) => setPaymentMethod(event.target.value)}
            ></Form.Check>
          </Col>

          <Col>
            <Form.Check
              type="radio"
              label="Debit"
              id="Debit"
              name="paymentMethod"
              value="Debit"
              onChange={(event) => setPaymentMethod(event.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
