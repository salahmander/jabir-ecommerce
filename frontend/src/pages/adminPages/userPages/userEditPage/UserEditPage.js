import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import * as userDetailAction from "../../../../store/actions/userActions/userDetailActions/userDetailActions";
import * as userEditAction from "../../../../store/actions/adminActions/userActions/userEditActions/userEditActions";

import Message from "../../../../components/UI/message/Message";
import Loader from "../../../../components/UI/loader/Loader";
import FormContainer from "../../../../components/form/FormContainer";

const UserEditPage = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userEdit = useSelector((state) => state.userEdit);
  const { loading: loadingEdit, error: errorEdit, successMessage } = userEdit;

  useEffect(() => {
    if (successMessage) {
      dispatch(userEditAction.resetUserEdit());
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(userDetailAction.getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successMessage]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(userEditAction.editUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
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

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(event) => setIsAdmin(event.target.checked)}
              ></Form.Check>
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

export default UserEditPage;
