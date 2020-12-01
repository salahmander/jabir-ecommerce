import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import * as shippingAddressAction from "../../store/actions/cartActions/cartActions";

import FormContainer from "../../components/form/FormContainer";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";

const ShippingPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postcode, setPostcode] = useState(shippingAddress.postcode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      shippingAddressAction.saveShippingAddress({
        address,
        city,
        postcode,
        country,
      })
    );
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            required
            onChange={(event) => setAddress(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            required
            onChange={(event) => setCity(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postcode"
            value={postcode}
            required
            onChange={(event) => setPostcode(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            required
            onChange={(event) => setCountry(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
