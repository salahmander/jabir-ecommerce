import React, { useEffect } from "react";

import { Button, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import * as orderListAction from "../../../store/actions/orderActions/orderListActions/orderListActions";

import Loader from "../../UI/loader/Loader";
import Message from "../../UI/message/Message";

const OrderProfile = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin); // get login state

  const { userInfo } = userLogin; // destructure userLogin: get data from action

  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login"); // Redirect to login if not loggedin.
    } else {
      dispatch(orderListAction.getOrderList());
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Col md={9}>
        <h1>My Orders</h1>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </>
  );
};

export default OrderProfile;
