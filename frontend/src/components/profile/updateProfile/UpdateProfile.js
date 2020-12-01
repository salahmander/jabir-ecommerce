import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import * as userDetailActions from "../../../store/actions/userActions/userDetailActions/userDetailActions";
import * as userUpdateAction from "../../../store/actions/userActions/userUpdateActions/userUpdateActions";

import Loader from "../../UI/loader/Loader";
import Message from "../../UI/message/Message";

const UpdateProfile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail); // get detail state
  const userLogin = useSelector((state) => state.userLogin); // get login state

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const { loading, error, user } = userDetail; // destructure useDetail: get data from action
  const { userInfo } = userLogin; // destructure userLogin: get data from action

  useEffect(() => {
    if (!userInfo) {
      history.push("/login"); // Redirect to login if not logged in.
    } else {
      if (!user || !user.name || success) {
        // Check for the user.
        dispatch(userUpdateAction.resetUserUpdate());
        dispatch(userDetailActions.getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        userUpdateAction.updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };

  let errorMessage = error ? error : message;

  return (
    <>
      <Col md={3}>
        <h1>Update My Details</h1>
        {errorMessage && <Message variant="danger">{errorMessage}</Message>}
        {success && <Message variant="success">Profile Update</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default UpdateProfile;
